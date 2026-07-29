import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { fetchTours, type Tour } from "@/lib/tours";
import { TourCard } from "@/components/site/TourCard";
import { BookingDialog } from "@/components/site/BookingDialog";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "Upcoming food tours in Cholula — Milpa Chef" },
      {
        name: "description",
        content:
          "Full agenda of upcoming Gastro Tours by Milpa Chef in Cholula, Puebla. MXN $595, small groups of 10, Slow Food sourcing.",
      },
      { property: "og:title", content: "Upcoming food tours in Cholula" },
      {
        property: "og:description",
        content: "See dates for the next Gastro Tour by Milpa Chef and reserve online.",
      },
      { property: "og:url", content: "/tours" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/tours" }],
  }),
  component: ToursPage,
});

function ToursPage() {
  const { t } = useI18n();
  const [booking, setBooking] = useState<Tour | null>(null);
  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["tours", "all"],
    queryFn: () => fetchTours(24),
  });

  return (
    <section className="container-editorial py-16 md:py-24">
      <div className="max-w-3xl mb-16">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
          {t("agenda.title")}
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-primary leading-tight mb-4">
          {t("agenda.title")}
        </h1>
        <p className="text-muted-foreground text-lg">{t("agenda.subtitle")}</p>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">…</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onBook={setBooking} />
          ))}
        </div>
      )}

      <BookingDialog tour={booking} open={!!booking} onClose={() => setBooking(null)} />
    </section>
  );
}