// Shared logic for AI-agent bookings (public API). Server-only.
import { z } from "zod";
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from "@/lib/stripe.server";

export const SITE = "https://milpachef.mx";

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: CORS_HEADERS });
}

export function serverStripeEnv(): StripeEnv {
  const token = (import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined) ?? "";
  return token.startsWith("pk_live_") ? "live" : "sandbox";
}

export const bookSchema = z.object({
  tour_date_id: z.string().uuid(),
  party_size: z.number().int().min(1).max(10),
  guest_name: z.string().trim().min(2).max(100),
  guest_email: z.string().trim().email().max(255),
  guest_language: z.enum(["en", "es", "fr"]).default("en"),
  notes: z.string().max(500).optional(),
});

export type BookInput = z.infer<typeof bookSchema>;

export async function createAgentBooking(input: BookInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: tourDate } = await supabaseAdmin
    .from("tour_dates")
    .select("id, tour_id, starts_at, spots_left, active")
    .eq("id", input.tour_date_id)
    .maybeSingle();
  if (!tourDate || !tourDate.active) return { status: 404, body: { error: "date_not_found" } };
  if (new Date(tourDate.starts_at).getTime() < Date.now())
    return { status: 409, body: { error: "date_in_past" } };
  if (tourDate.spots_left < input.party_size)
    return { status: 409, body: { error: "not_enough_spots", spots_left: tourDate.spots_left } };

  const { data: tour } = await supabaseAdmin
    .from("tours")
    .select("id, title, slug, price_mxn, meeting_point")
    .eq("id", tourDate.tour_id)
    .maybeSingle();
  if (!tour) return { status: 404, body: { error: "experience_not_found" } };

  const unit = tour.price_mxn;
  const total = unit * input.party_size;

  const { data: booking, error } = await supabaseAdmin
    .from("bookings")
    .insert({
      tour_id: tour.id,
      tour_date_id: tourDate.id,
      guest_name: input.guest_name,
      guest_email: input.guest_email,
      party_size: input.party_size,
      notes: input.notes ? `[AI agent] ${input.notes}` : "[AI agent booking]",
      amount_mxn: total,
      unit_price_mxn: unit,
      currency: "mxn",
      status: "pending",
      guest_language: input.guest_language,
    })
    .select("id, access_token")
    .single();
  if (error || !booking) return { status: 500, body: { error: "booking_failed" } };

  supabaseAdmin.rpc("expire_stale_bookings").then(() => {}, () => {});

  try {
    const stripe = createStripeClient(serverStripeEnv());
    const token = (booking as { access_token: string }).access_token;
    const expiresAt = Math.floor(Date.now() / 1000) + 30 * 60;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: `${tour.title} — Milpa Chef`,
              description: `Reservation for ${input.party_size} guest(s)`,
            },
            unit_amount: unit * 100,
          },
          quantity: input.party_size,
        },
      ],
      customer_email: input.guest_email,
      expires_at: expiresAt,
      success_url: `${SITE}/booking/return?session_id={CHECKOUT_SESSION_ID}&bookingId=${booking.id}&t=${token}`,
      cancel_url: `${SITE}/reserve`,
      payment_intent_data: {
        description: `${tour.title} — Milpa Chef`,
        metadata: { booking_id: booking.id, lang: input.guest_language, source: "ai_agent" },
      },
      metadata: { booking_id: booking.id, lang: input.guest_language, source: "ai_agent" },
    });
    await supabaseAdmin.from("bookings").update({ stripe_session_id: session.id }).eq("id", booking.id);

    return {
      status: 201,
      body: {
        booking_id: booking.id,
        status: "pending_payment",
        experience: tour.title,
        starts_at: tourDate.starts_at,
        meeting_point: tour.meeting_point,
        party_size: input.party_size,
        total_mxn: total,
        currency: "mxn",
        checkout_url: session.url,
        expires_at: new Date(expiresAt * 1000).toISOString(),
        next_step:
          "Open checkout_url and complete payment. The reservation is confirmed and a digital ticket is emailed to guest_email once payment succeeds. Unpaid holds expire at expires_at.",
      },
    };
  } catch (e) {
    console.error("[agent-book]", e);
    await supabaseAdmin.from("bookings").update({ status: "canceled" }).eq("id", booking.id);
    return { status: 502, body: { error: "payment_setup_failed", detail: getStripeErrorMessage(e) } };
  }
}
