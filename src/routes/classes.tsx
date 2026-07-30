import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { fetchTours, type Tour } from "@/lib/tours";
import { TourCard } from "@/components/site/TourCard";
import { BookingDialog } from "@/components/site/BookingDialog";
import { classImage } from "@/lib/tour-images";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Cholula cooking classes | Milpa Chef" },
      {
        name: "description",
        content:
          "Hands-on Mexican cooking classes in Cholula with chef Alfonso Rocha: heirloom-corn tortillas, mole poblano, antojitos and tamales in small groups.",
      },
      { property: "og:title", content: "Cholula cooking classes with Milpa Chef" },
      {
        property: "og:description",
        content: "Hands-on Cholula cooking classes — heirloom corn, mole, tamales.",
      },
      { property: "og:url", content: "/classes" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/classes" }],
  }),
  component: ClassesPage,
});

function ClassesPage() {
  const { t } = useI18n();
  const [booking, setBooking] = useState<Tour | null>(null);
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["tours", "classes"],
    queryFn: () => fetchTours(24, "class"),
  });

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--milpa-deep)" }}
      >
        <div className="absolute inset-0 opacity-35">
          <img src={classImage} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--milpa-deep) 40%, transparent) 0%, color-mix(in oklab, var(--milpa-deep) 88%, transparent) 100%)",
            }}
          />
        </div>
        <div className="relative container-editorial py-24 md:py-32 text-primary-foreground">
          <div className="max-w-2xl">
            <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-4">
              {t("classes.eyebrow")}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-4">
              {t("classes.title")}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              {t("classes.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 md:py-24">
        <h2 className="font-serif text-3xl md:text-4xl mb-8">
          {t("classes.upcoming")}
        </h2>
        {isLoading ? (
          <div className="text-muted-foreground">…</div>
        ) : classes.length === 0 ? (
          <p className="text-muted-foreground">No cooking classes scheduled right now. Check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((tour) => (
              <TourCard key={tour.id} tour={tour} onBook={setBooking} />
            ))}
          </div>
        )}

        <BookingDialog tour={booking} open={!!booking} onClose={() => setBooking(null)} />
      </section>
    </>
  );
}