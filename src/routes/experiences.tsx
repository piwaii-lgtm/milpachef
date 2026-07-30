import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { getArea } from "@/lib/platform";
import { fetchTours, type Tour } from "@/lib/tours";
import { TourCard } from "@/components/site/TourCard";
import { BookingDialog } from "@/components/site/BookingDialog";
import { heroImage, classImage } from "@/lib/tour-images";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiences — food tours & cooking classes in Cholula | MilpaChef" },
      {
        name: "description",
        content:
          "MilpaChef experiences in Cholula, Puebla: small-group food tours (MXN $595), traditional cooking classes (MXN $1,295), market walks and private experiences with local producers.",
      },
      { property: "og:title", content: "MilpaChef Experiences in Cholula" },
      {
        property: "og:description",
        content: "Food tours, cooking classes and private experiences guided by chef-anthropologist Alfonso Rocha.",
      },
      { property: "og:url", content: "/experiences" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/experiences" }],
  }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  const { t, lang } = useI18n();
  const area = getArea(lang, "experiences");
  const [booking, setBooking] = useState<Tour | null>(null);
  const { data: tours = [] } = useQuery({ queryKey: ["tours", "exp"], queryFn: () => fetchTours(3) });
  const { data: classes = [] } = useQuery({
    queryKey: ["tours", "classes", "exp"],
    queryFn: () => fetchTours(3, "class"),
  });

  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-30">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-editorial py-24 md:py-32 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-5">
            01 · MilpaChef®
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-3xl">{area.title}</h1>
          <p className="font-serif italic text-xl md:text-2xl text-[color:var(--corn)] mt-5">
            {area.tagline}
          </p>
          <p className="text-primary-foreground/80 max-w-2xl mt-6 text-lg leading-relaxed">
            {area.body}
          </p>
          <Link
            to="/reserve"
            className="mt-9 inline-flex items-center rounded-sm bg-[color:var(--corn)] text-primary px-6 py-3 text-sm font-medium hover:brightness-95"
          >
            {t("nav.book")}
          </Link>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {area.includes.map((item) => (
            <div key={item} className="border-t-2 border-accent pt-4">
              <div className="font-serif text-2xl text-primary">{item}</div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <div>
              <div className="uppercase tracking-[0.3em] text-xs text-accent mb-3">
                {t("nav.tours")}
              </div>
              <h2 className="font-serif text-4xl text-primary">{t("agenda.title")}</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">{t("agenda.subtitle")}</p>
            </div>
            <Link
              to="/tours"
              className="text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-[color:var(--milpa-deep)]"
            >
              {t("agenda.viewAll")} →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onBook={setBooking} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-25">
          <img src={classImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-editorial py-20 md:py-28 text-primary-foreground">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <div className="max-w-xl">
              <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-3">
                {t("classes.eyebrow")}
              </div>
              <h2 className="font-serif text-4xl leading-tight">{t("classes.homeTitle")}</h2>
              <p className="text-primary-foreground/80 mt-3">{t("classes.homeBody")}</p>
            </div>
            <Link
              to="/classes"
              className="text-sm uppercase tracking-widest text-[color:var(--corn)] border-b border-[color:var(--corn)] pb-1"
            >
              {t("classes.cta")} →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {classes.map((tour) => (
              <TourCard key={tour.id} tour={tour} onBook={setBooking} />
            ))}
          </div>
        </div>
      </section>

      <BookingDialog tour={booking} open={!!booking} onClose={() => setBooking(null)} />
    </>
  );
}