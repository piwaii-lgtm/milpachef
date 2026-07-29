import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/booking/return")({
  head: () => ({
    meta: [
      { title: "Reservation confirmed — Milpa Chef" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    session_id: typeof s.session_id === "string" ? s.session_id : undefined,
  }),
  component: BookingReturn,
});

function BookingReturn() {
  const { t } = useI18n();
  const { session_id } = Route.useSearch();
  return (
    <section className="container-editorial py-24 md:py-32 text-center max-w-2xl">
      <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
        {t("book.success")}
      </div>
      <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
        {t("book.success")}
      </h1>
      <p className="text-muted-foreground text-lg mb-10">{t("book.successBody")}</p>
      {session_id && (
        <p className="text-xs text-muted-foreground mb-8">Ref: {session_id.slice(0, 20)}…</p>
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