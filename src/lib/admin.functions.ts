import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from "@/lib/stripe.server";

export type BookingRow = {
  id: string;
  tour_id: string;
  guest_name: string;
  guest_email: string;
  party_size: number;
  amount_mxn: number;
  status: string;
  guest_language: string;
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  paid_at: string | null;
  created_at: string;
  notes: string | null;
  tour_title: string;
  tour_date: string;
};

export type BookingStatus = {
  status: "pending" | "paid" | "failed" | "canceled" | "refunded" | "expired" | "unknown";
  tourTitle?: string;
  tourDate?: string;
  meetingPoint?: string;
  partySize?: number;
  amountMxn?: number;
  guestEmail?: string;
};

export const getBookingStatus = createServerFn({ method: "GET" })
  .inputValidator((data: { bookingId: string; token: string }) => {
    if (!/^[a-f0-9-]{36}$/i.test(data.bookingId)) throw new Error("Invalid bookingId");
    if (!/^[a-f0-9-]{36}$/i.test(data.token)) throw new Error("Invalid token");
    return data;
  })
  .handler(async ({ data }): Promise<BookingStatus> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("bookings")
      .select(
        "status, party_size, amount_mxn, guest_email, access_token, tour_dates(starts_at), tours!inner(title, tour_date, meeting_point)",
      )
      .eq("id", data.bookingId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return { status: "unknown" };
    if ((row as { access_token: string }).access_token !== data.token) {
      return { status: "unknown" };
    }
    const tour = row.tours as unknown as {
      title: string;
      tour_date: string | null;
      meeting_point: string;
    };
    const chosen = (row as { tour_dates: { starts_at: string } | null }).tour_dates;
    return {
      status: row.status as BookingStatus["status"],
      tourTitle: tour.title,
      tourDate: chosen?.starts_at ?? tour.tour_date ?? undefined,
      meetingPoint: tour.meeting_point,
      partySize: row.party_size,
      amountMxn: row.amount_mxn,
      guestEmail: row.guest_email,
    };
  });

export const listBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<BookingRow[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roleRow, error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (roleErr) throw new Error(roleErr.message);
    if (!roleRow) throw new Response("Forbidden", { status: 403 });
    // Opportunistic sweep of abandoned pending bookings (>30 min).
    await supabaseAdmin.rpc("expire_stale_bookings");
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select(
        "id, tour_id, guest_name, guest_email, party_size, amount_mxn, status, guest_language, stripe_session_id, stripe_payment_intent, paid_at, created_at, notes, tour_dates(starts_at), tours!inner(title, tour_date)",
      )
      .order("paid_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => {
      const tour = r.tours as unknown as { title: string; tour_date: string | null };
      const chosen = (r as unknown as { tour_dates: { starts_at: string } | null }).tour_dates;
      return {
        id: r.id,
        tour_id: r.tour_id,
        guest_name: r.guest_name,
        guest_email: r.guest_email,
        party_size: r.party_size,
        amount_mxn: r.amount_mxn,
        status: r.status,
        guest_language: (r as { guest_language: string | null }).guest_language ?? "en",
        stripe_session_id: r.stripe_session_id,
        stripe_payment_intent: (r as { stripe_payment_intent: string | null }).stripe_payment_intent,
        paid_at: r.paid_at,
        created_at: r.created_at,
        notes: r.notes,
        tour_title: tour.title,
        tour_date: chosen?.starts_at ?? tour.tour_date ?? '',
      };
    });
  });

export const cancelAndRefundBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { bookingId: string; environment: StripeEnv }) => {
    if (!/^[a-f0-9-]{36}$/i.test(data.bookingId)) throw new Error("Invalid bookingId");
    if (data.environment !== "sandbox" && data.environment !== "live") throw new Error("Invalid env");
    return data;
  })
  .handler(async ({ data, context }): Promise<{ ok: true; refunded: boolean } | { error: string }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roleRow, error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (roleErr) throw new Error(roleErr.message);
    if (!roleRow) throw new Response("Forbidden", { status: 403 });
    const { data: b, error } = await supabaseAdmin
      .from("bookings")
      .select("id, status, stripe_payment_intent")
      .eq("id", data.bookingId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!b) return { error: "Booking not found" };
    if (b.status === "refunded" || b.status === "canceled") {
      return { ok: true, refunded: false };
    }

    // If paid, issue a Stripe refund first. Only after Stripe accepts do we mutate DB.
    if (b.status === "paid") {
      if (!b.stripe_payment_intent) return { error: "Missing Stripe payment intent on this booking" };
      try {
        const stripe = createStripeClient(data.environment);
        await stripe.refunds.create({ payment_intent: b.stripe_payment_intent });
      } catch (e) {
        return { error: getStripeErrorMessage(e) };
      }
    }

    const { data: rpcData, error: rpcErr } = await supabaseAdmin.rpc("refund_booking_and_restore", {
      _booking_id: data.bookingId,
    });
    if (rpcErr) throw new Error(rpcErr.message);
    const row = Array.isArray(rpcData) ? rpcData[0] : rpcData;
    return { ok: true, refunded: Boolean(row?.was_paid) };
  });