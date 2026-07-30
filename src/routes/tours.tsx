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
          "Full agenda of upcoming Gastro Tours by Milpa Chef in Cholula, Puebla. Small groups of 10, Slow Food sourcing.",
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
    queryKey: ["tours", "food-tours"],
    queryFn: () => fetchTours(24, "tour"),
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

      {/* Tastings + practical info (tours only) */}
      <div className="mt-24 md:mt-32 border-t border-border pt-16">
        <div className="max-w-2xl mb-12">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-3">
            {t("tastings.title")}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
            {t("tastings.title")}
          </h2>
          <p className="text-muted-foreground mt-3">{t("tastings.subtitle")}</p>
        </div>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6">
          {[
            "t.nahuatl",
            "t.pulque",
            "t.crickets",
            "t.mole",
            "t.mezcal",
            "t.coffee",
            "t.beer",
            "t.cocktail",
            "t.sweets",
            "t.icecream",
          ].map((k) => (
            <li key={k} className="border-t border-accent/40 pt-3">
              <div className="font-serif text-lg text-primary leading-snug">{t(k)}</div>
            </li>
          ))}
        </ul>
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="border-l-2 border-accent pl-6">
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-2">
              {t("meet.title")}
            </div>
            <p className="font-serif text-xl text-primary">{t("meet.value")}</p>
          </div>
          <div className="border-l-2 border-accent pl-6">
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-2">
              {t("cancel.title")}
            </div>
            <p className="font-serif text-xl text-primary">{t("cancel.body")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}