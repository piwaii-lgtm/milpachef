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
      tourDateId: string;
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
      if (!/^[a-f0-9-]{36}$/i.test(data.tourDateId)) throw new Error("Please choose a date");
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
        .select("id, title, price_mxn, meeting_point")
        .eq("id", data.tourId)
        .maybeSingle();
      if (tourError) throw new Error(tourError.message);
      if (!tour) return { error: "This experience is no longer available." };

      // Trusted read of the selected date
      const { data: tourDate, error: dateError } = await supabaseAdmin
        .from("tour_dates")
        .select("id, tour_id, starts_at, spots_left, active")
        .eq("id", data.tourDateId)
        .maybeSingle();
      if (dateError) throw new Error(dateError.message);
      if (!tourDate || tourDate.tour_id !== tour.id || !tourDate.active) {
        return { error: "That date is no longer available." };
      }
      if (tourDate.spots_left < data.partySize) {
        return { error: `Only ${tourDate.spots_left} spot(s) left on that date.` };
      }
      if (new Date(tourDate.starts_at).getTime() < Date.now()) {
        return { error: "That date has already passed." };
      }

      const unitPriceMxn = tour.price_mxn;
      const amountMxn = unitPriceMxn * data.partySize;

      // Create pending booking with trusted amount
      const { data: booking, error: insertError } = await supabaseAdmin
        .from("bookings")
        .insert({
          tour_id: tour.id,
          tour_date_id: tourDate.id,
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