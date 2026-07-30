import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { fetchTours, type Tour } from "@/lib/tours";
import { TourCard } from "@/components/site/TourCard";
import { BookingDialog } from "@/components/site/BookingDialog";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Reserve a spot in Cholula | Milpa Chef" },
      {
        name: "description",
        content:
          "Book upcoming Cholula food tours and hands-on Mexican cooking classes with Milpa Chef. Small groups, English, Spanish or French.",
      },
      { property: "og:title", content: "Reserve a spot — Milpa Chef" },
      {
        property: "og:description",
        content: "Pick from upcoming Cholula food tours and Mexican cooking classes.",
      },
      { property: "og:url", content: "/reserve" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reserve" }],
  }),
  component: ReservePage,
});

function ReservePage() {
  const { t } = useI18n();
  const [booking, setBooking] = useState<Tour | null>(null);
  const { data: tours = [], isLoading: toursLoading } = useQuery({
    queryKey: ["tours", "food-tours", "reserve"],
    queryFn: () => fetchTours(24, "tour"),
  });
  const { data: classes = [], isLoading: classesLoading } = useQuery({
    queryKey: ["tours", "classes", "reserve"],
    queryFn: () => fetchTours(24, "class"),
  });

  const isLoading = toursLoading || classesLoading;
  const isEmpty = !isLoading && tours.length === 0 && classes.length === 0;

  return (
    <section className="container-editorial py-16 md:py-24">
      <div className="max-w-3xl mb-16">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
          {t("nav.book")}
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-primary leading-tight mb-4">
          {t("reserve.title")}
        </h1>
        <p className="text-muted-foreground text-lg">{t("reserve.subtitle")}</p>
      </div>

      {isLoading && <p className="text-muted-foreground">…</p>}
      {isEmpty && <p className="text-muted-foreground">{t("reserve.empty")}</p>}

      {tours.length > 0 && (
        <div className="mb-20">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8">
            {t("reserve.toursHeading")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onBook={setBooking} />
            ))}
          </div>
        </div>
      )}

      {classes.length > 0 && (
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8">
            {t("reserve.classesHeading")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((tour) => (
              <TourCard key={tour.id} tour={tour} onBook={setBooking} />
            ))}
          </div>
        </div>
      )}

      <BookingDialog tour={booking} open={!!booking} onClose={() => setBooking(null)} />
    </section>
  );
}