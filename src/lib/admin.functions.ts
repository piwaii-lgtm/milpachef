import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type BookingRow = {
  id: string;
  tour_id: string;
  guest_name: string;
  guest_email: string;
  party_size: number;
  amount_mxn: number;
  status: string;
  stripe_session_id: string | null;
  paid_at: string | null;
  created_at: string;
  notes: string | null;
  tour_title: string;
  tour_date: string;
};

export type BookingStatus = {
  status: "pending" | "paid" | "failed" | "canceled" | "unknown";
  tourTitle?: string;
  tourDate?: string;
  meetingPoint?: string;
  partySize?: number;
  amountMxn?: number;
  guestEmail?: string;
};

export const getBookingStatus = createServerFn({ method: "GET" })
  .inputValidator((data: { bookingId: string }) => {
    if (!/^[a-f0-9-]{36}$/i.test(data.bookingId)) throw new Error("Invalid bookingId");
    return data;
  })
  .handler(async ({ data }): Promise<BookingStatus> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("bookings")
      .select(
        "status, party_size, amount_mxn, guest_email, tours!inner(title, tour_date, meeting_point)",
      )
      .eq("id", data.bookingId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return { status: "unknown" };
    const tour = row.tours as unknown as {
      title: string;
      tour_date: string;
      meeting_point: string;
    };
    return {
      status: row.status as BookingStatus["status"],
      tourTitle: tour.title,
      tourDate: tour.tour_date,
      meetingPoint: tour.meeting_point,
      partySize: row.party_size,
      amountMxn: row.amount_mxn,
      guestEmail: row.guest_email,
    };
  });

export const listBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<BookingRow[]> => {
    const { data: isAdmin, error: roleErr } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleErr) throw new Error(roleErr.message);
    if (!isAdmin) throw new Response("Forbidden", { status: 403 });

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select(
        "id, tour_id, guest_name, guest_email, party_size, amount_mxn, status, stripe_session_id, paid_at, created_at, notes, tours!inner(title, tour_date)",
      )
      .order("paid_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => {
      const tour = r.tours as unknown as { title: string; tour_date: string };
      return {
        id: r.id,
        tour_id: r.tour_id,
        guest_name: r.guest_name,
        guest_email: r.guest_email,
        party_size: r.party_size,
        amount_mxn: r.amount_mxn,
        status: r.status,
        stripe_session_id: r.stripe_session_id,
        paid_at: r.paid_at,
        created_at: r.created_at,
        notes: r.notes,
        tour_title: tour.title,
        tour_date: tour.tour_date,
      };
    });
  });