import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "@/lib/i18n";
import { getBookingStatus } from "@/lib/admin.functions";

export const Route = createFileRoute("/booking/return")({
  head: () => ({
    meta: [
      { title: "Reservation confirmed — Milpa Chef" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    session_id: typeof s.session_id === "string" ? s.session_id : undefined,
    bookingId: typeof s.bookingId === "string" ? s.bookingId : undefined,
  }),
  component: BookingReturn,
});

function BookingReturn() {
  const { t } = useI18n();
  const { session_id, bookingId } = Route.useSearch();
  const fetchStatus = useServerFn(getBookingStatus);

  useEffect(() => {
    if (bookingId && typeof window !== "undefined") {
      sessionStorage.removeItem(`stripe-cs:${bookingId}`);
    }
  }, [bookingId]);

  const { data, isLoading } = useQuery({
    queryKey: ["booking-status", bookingId],
    queryFn: () => fetchStatus({ data: { bookingId: bookingId! } }),
    enabled: !!bookingId,
    // Poll a few times so slow webhooks catch up
    refetchInterval: (q) => (q.state.data?.status === "paid" ? false : 2000),
    refetchIntervalInBackground: false,
  });

  const isPaid = data?.status === "paid";
  const isPending = !data || data.status === "pending" || isLoading;

  return (
    <section className="container-editorial py-24 md:py-32 text-center max-w-2xl">
      {isPaid ? (
        <>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
            {t("book.success")}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            {data?.tourTitle ?? t("book.success")}
          </h1>
          <p className="text-muted-foreground text-lg mb-6">{t("book.successBody")}</p>
          {data?.guestEmail && (
            <p className="text-sm text-muted-foreground mb-2">
              A confirmation has been sent to <b>{data.guestEmail}</b>.
            </p>
          )}
          {data?.meetingPoint && (
            <p className="text-sm text-muted-foreground mb-8">
              Meeting point: {data.meetingPoint}
            </p>
          )}
        </>
      ) : isPending ? (
        <>
          <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">
            Confirming your payment…
          </h1>
          <p className="text-muted-foreground">This usually takes a few seconds.</p>
        </>
      ) : (
        <>
          <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">
            We couldn't confirm this payment
          </h1>
          <p className="text-muted-foreground mb-8">
            Status: {data?.status}. If money was taken, contact us and we'll sort it out.
          </p>
        </>
      )}
      {session_id && (
        <p className="text-xs text-muted-foreground mb-8">Ref: {session_id.slice(0, 24)}…</p>
      )}
      <Link
        to="/tours"
        className="inline-flex rounded-sm bg-primary text-primary-foreground px-6 py-3 hover:bg-[color:var(--milpa-deep)]"
      >
        {t("agenda.viewAll")}
      </Link>
    </section>
  );
}