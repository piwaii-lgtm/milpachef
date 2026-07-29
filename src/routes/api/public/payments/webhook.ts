import { createFileRoute } from "@tanstack/react-router";
import { type StripeEnv, verifyWebhook } from "@/lib/stripe.server";
import { sendBookingConfirmation } from "@/lib/email.server";

type SessionLike = {
  id?: string;
  payment_intent?: string;
  payment_status?: string;
  metadata?: Record<string, string | undefined>;
};
type PaymentIntentLike = {
  id?: string;
  metadata?: Record<string, string | undefined>;
};

async function confirm(bookingId: string, sessionId: string, paymentIntent: string, lang: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("confirm_booking_and_decrement", {
    _booking_id: bookingId,
    _session_id: sessionId,
    _payment_intent: paymentIntent,
  });
  if (error) {
    console.error("[webhook] confirm rpc failed", error);
    return;
  }
  const row = Array.isArray(data) ? data[0] : data;
  if (!row || row.already_paid) return;
  try {
    await sendBookingConfirmation({
      email: row.guest_email,
      name: row.guest_name,
      tourTitle: row.tour_title,
      tourDate: row.tour_date,
      meetingPoint: row.meeting_point,
      partySize: row.party_size,
      amountMxn: row.amount_mxn,
      bookingId: row.booking_id,
      lang: (lang === "es" || lang === "fr" ? lang : "en") as "en" | "es" | "fr",
    });
  } catch (e) {
    console.error("[webhook] email send failed (non-fatal)", e);
  }
}

async function markFailed(bookingId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.rpc("mark_booking_failed", { _booking_id: bookingId });
  if (error) console.error("[webhook] mark_failed rpc failed", error);
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const s = event.data.object as SessionLike;
      const bookingId = s.metadata?.booking_id;
      if (!bookingId) return;
      if (s.payment_status === "unpaid") return;
      await confirm(bookingId, s.id ?? "", s.payment_intent ?? "", s.metadata?.lang ?? "en");
      break;
    }
    case "payment_intent.succeeded": {
      const pi = event.data.object as PaymentIntentLike;
      const bookingId = pi.metadata?.booking_id;
      if (!bookingId) return;
      await confirm(bookingId, "", pi.id ?? "", pi.metadata?.lang ?? "en");
      break;
    }
    case "checkout.session.expired":
    case "checkout.session.async_payment_failed": {
      const s = event.data.object as SessionLike;
      const bookingId = s.metadata?.booking_id;
      if (bookingId) await markFailed(bookingId);
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as PaymentIntentLike;
      const bookingId = pi.metadata?.booking_id;
      if (bookingId) await markFailed(bookingId);
      break;
    }
    default:
      console.log("[webhook] unhandled", event.type);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          console.error("[webhook] invalid env", rawEnv);
          return Response.json({ received: true, ignored: "invalid env" });
        }
        try {
          await handleWebhook(request, rawEnv as StripeEnv);
          return Response.json({ received: true });
        } catch (e) {
          console.error("[webhook] error", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});