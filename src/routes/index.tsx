import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { fetchTours, fetchTestimonials, pickQuote, type Tour } from "@/lib/tours";
import { heroImage, marketImage } from "@/lib/tour-images";
import { TourCard } from "@/components/site/TourCard";
import { BookingDialog } from "@/components/site/BookingDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Milpa Chef — Cholula food tours led by a Slow Food chef" },
      {
        name: "description",
        content:
          "Join Milpa Chef for a small-group Slow Food walking tour of Cholula, Puebla. Heirloom-corn tortillas, seasonal mole, mezcal and the producers behind them.",
      },
      { property: "og:title", content: "Milpa Chef — Cholula food tours" },
      {
        property: "og:description",
        content: "Small-group Slow Food walking tours in Cholula, Puebla.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const [booking, setBooking] = useState<Tour | null>(null);
  const { data: tours = [] } = useQuery({ queryKey: ["tours"], queryFn: () => fetchTours(3) });
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-40">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--milpa-deep) 40%, transparent) 0%, color-mix(in oklab, var(--milpa-deep) 85%, transparent) 100%)",
            }}
          />
        </div>
        <div className="relative container-editorial py-28 md:py-40 text-primary-foreground">
          <div className="max-w-2xl">
            <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-6">
              {t("hero.eyebrow")}
            </div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/tours"
                className="inline-flex items-center rounded-sm bg-[color:var(--corn)] text-primary px-6 py-3 text-sm font-medium hover:brightness-95"
              >
                {t("hero.cta")}
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-sm border border-primary-foreground/40 text-primary-foreground px-6 py-3 text-sm hover:bg-primary-foreground/10"
              >
                {t("hero.secondary")}
              </Link>
            </div>
            <div className="mt-10 text-xs uppercase tracking-widest text-primary-foreground/60">
              {t("hero.price")}
            </div>
          </div>
        </div>
      </section>

      {/* About / pillars */}
      <section className="container-editorial py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
            {t("nav.about")}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">
            {t("about.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t("about.body")}</p>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="w-8 h-px bg-accent mb-3" />
                <div className="font-serif text-lg text-primary mb-1">
                  {t(`about.pillar${i}.title`)}
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {t(`about.pillar${i}.body`)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-md">
          <img
            src={marketImage}
            alt="Milpa Chef at a Cholula market"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Upcoming tours preview */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <div className="uppercase tracking-[0.3em] text-xs text-accent mb-3">
                {t("agenda.title")}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-xl">
                {t("agenda.title")}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">{t("agenda.subtitle")}</p>
            </div>
            <Link
              to="/tours"
              className="hidden md:inline-flex items-center text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-[color:var(--milpa-deep)]"
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

      {/* Testimonials */}
      <section className="container-editorial py-24 md:py-32">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4 text-center">
          {t("testimonials.title")}
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-primary text-center mb-16">
          {t("testimonials.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {testimonials.map((tt) => (
            <figure
              key={tt.id}
              className="border-l-2 border-accent pl-6 py-2"
            >
              <blockquote className="font-serif text-2xl text-primary leading-snug italic">
                “{pickQuote(tt, lang)}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground uppercase tracking-widest">
                {tt.guest_name} · {tt.origin}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <BookingDialog tour={booking} open={!!booking} onClose={() => setBooking(null)} />
    </>
  );
}
