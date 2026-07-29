import { createServerFn } from "@tanstack/react-start";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";

export type CheckoutResult =
  | { clientSecret: string; bookingId: string; accessToken: string }
  | { error: string };

export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      tourId: string;
      partySize: number;
      guestName: string;
      guestEmail: string;
      notes?: string;
      lang: "en" | "es" | "fr";
      guestLanguage: "en" | "es" | "fr";
      returnUrl: string;
      environment: StripeEnv;
    }) => {
      if (!/^[a-f0-9-]{36}$/i.test(data.tourId)) throw new Error("Invalid tourId");
      if (!Number.isInteger(data.partySize) || data.partySize < 1 || data.partySize > 10) {
        throw new Error("Party size must be between 1 and 10");
      }
      const name = data.guestName.trim();
      if (name.length < 2 || name.length > 100) throw new Error("Please enter a valid name");
      const email = data.guestEmail.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid email");
      if (data.notes && data.notes.length > 500) throw new Error("Notes too long");
      if (!["en", "es", "fr"].includes(data.lang)) throw new Error("Invalid language");
      if (!["en", "es", "fr"].includes(data.guestLanguage)) throw new Error("Invalid guest language");
      if (!data.returnUrl.startsWith("http")) throw new Error("Invalid returnUrl");
      return { ...data, guestName: name, guestEmail: email };
    },
  )
  .handler(async ({ data }): Promise<CheckoutResult> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      // Trusted read of tour price + capacity
      const { data: tour, error: tourError } = await supabaseAdmin
        .from("tours")
        .select("id, title, price_mxn, spots_left, tour_date")
        .eq("id", data.tourId)
        .maybeSingle();
      if (tourError) throw new Error(tourError.message);
      if (!tour) return { error: "This tour is no longer available." };
      if (tour.spots_left < data.partySize) {
        return { error: `Only ${tour.spots_left} spot(s) left on this tour.` };
      }
      if (new Date(tour.tour_date).getTime() < Date.now()) {
        return { error: "This tour has already started." };
      }

      const unitPriceMxn = tour.price_mxn;
      const amountMxn = unitPriceMxn * data.partySize;

      // Create pending booking with trusted amount
      const { data: booking, error: insertError } = await supabaseAdmin
        .from("bookings")
        .insert({
          tour_id: tour.id,
          guest_name: data.guestName,
          guest_email: data.guestEmail,
          party_size: data.partySize,
          notes: data.notes ?? null,
          amount_mxn: amountMxn,
          unit_price_mxn: unitPriceMxn,
          currency: "mxn",
          status: "pending",
          guest_language: data.guestLanguage,
        })
        .select("id, access_token")
        .single();
      if (insertError || !booking) throw new Error(insertError?.message ?? "Booking insert failed");

      // Best-effort sweep of stale pending bookings so admin views stay tidy.
      supabaseAdmin.rpc("expire_stale_bookings").then(() => {}, () => {});

      // Create Stripe embedded session
      const stripe = createStripeClient(data.environment);
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "mxn",
              product_data: {
                name: `${tour.title} — Milpa Chef`,
                description: `Reservation for ${data.partySize} guest(s)`,
                metadata: { lovable_external_id: "gastro_tour" },
              },
              unit_amount: unitPriceMxn * 100,
            },
            quantity: data.partySize,
          },
        ],
        mode: "payment",
        ui_mode: "embedded_page",
        return_url: data.returnUrl,
        customer_email: data.guestEmail,
        payment_intent_data: {
          description: `${tour.title} — Milpa Chef`,
          metadata: { booking_id: booking.id, lang: data.lang },
        },
        metadata: { booking_id: booking.id, lang: data.lang },
      });

      // Persist session id
      await supabaseAdmin
        .from("bookings")
        .update({ stripe_session_id: session.id })
        .eq("id", booking.id);

      return {
        clientSecret: session.client_secret ?? "",
        bookingId: booking.id,
        accessToken: (booking as { access_token: string }).access_token,
      };
    } catch (error) {
      console.error("[startCheckout]", error);
      return { error: getStripeErrorMessage(error) };
    }
  });