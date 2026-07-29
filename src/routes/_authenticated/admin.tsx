import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { listBookings, cancelAndRefundBooking } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Milpa Chef" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function statusPill(status: string) {
  const base = "inline-block px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-widest";
  if (status === "paid") return `${base} bg-[color:var(--milpa)]/15 text-[color:var(--milpa-deep)]`;
  if (status === "failed") return `${base} bg-red-100 text-red-800`;
  if (status === "canceled" || status === "expired") return `${base} bg-neutral-200 text-neutral-700`;
  if (status === "refunded") return `${base} bg-blue-100 text-blue-800`;
  return `${base} bg-amber-100 text-amber-800`;
}

function AdminPage() {
  const fetchBookings = useServerFn(listBookings);
  const cancel = useServerFn(cancelAndRefundBooking);
  const [busyId, setBusyId] = useState<string | null>(null);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => fetchBookings(),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const onCancel = async (id: string, paid: boolean) => {
    const msg = paid
      ? "Refund this booking in Stripe and restore the spot? This cannot be undone."
      : "Cancel this pending booking?";
    if (!confirm(msg)) return;
    setBusyId(id);
    try {
      const res = await cancel({ data: { bookingId: id, environment: getStripeEnvironment() } });
      if ("error" in res) throw new Error(res.error);
      toast.success(res.refunded ? "Refunded via Stripe and spot restored" : "Booking canceled");
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Cancel failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="container-editorial py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-4xl text-primary">Bookings</h1>
          <p className="text-sm text-muted-foreground">
            {data
              ? `${data.filter((b) => b.status === "paid").length} paid · ${data.length} total`
              : ""}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => refetch()} className="text-sm underline text-primary">
            Refresh
          </button>
          <Link to="/" className="text-sm underline text-muted-foreground">
            Site
          </Link>
          <button onClick={signOut} className="text-sm underline text-muted-foreground">
            Sign out
          </button>
        </div>
      </div>

      <AdminTabs />

      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {error && (
        <p className="text-red-700">
          {error instanceof Error ? error.message : "You don't have access to this page."}
        </p>
      )}
      {data && data.length === 0 && (
        <p className="text-muted-foreground">No bookings yet.</p>
      )}
      {data && data.length > 0 && (
        <div className="overflow-x-auto border border-border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tour</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Party</th>
                <th className="px-4 py-3">Lang</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((b) => {
                const canCancel = b.status === "paid" || b.status === "pending";
                return (
                <tr key={b.id} className="border-t border-border/60 align-top">
                  <td className="px-4 py-3">
                    <span className={statusPill(b.status)}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3 max-w-[220px]">{b.tour_title}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {new Date(b.tour_date).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div>{b.guest_name}</div>
                    <div className="text-xs text-muted-foreground">{b.guest_email}</div>
                  </td>
                  <td className="px-4 py-3">{b.party_size}</td>
                  <td className="px-4 py-3 uppercase text-xs tracking-widest text-muted-foreground">
                    {b.guest_language}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">MXN ${b.amount_mxn}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {new Date(b.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    {canCancel && (
                      <button
                        onClick={() => onCancel(b.id, b.status === "paid")}
                        disabled={busyId === b.id}
                        className="text-xs underline text-red-700 disabled:opacity-50"
                      >
                        {busyId === b.id
                          ? "Working…"
                          : b.status === "paid"
                            ? "Refund"
                            : "Cancel"}
                      </button>
                    )}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}