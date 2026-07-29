import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { fetchTours, fetchTestimonials, pickQuote, type Tour } from "@/lib/tours";
import { heroImage, marketImage, classImage } from "@/lib/tour-images";
import { getAreas, philosophy } from "@/lib/platform";
import { TourCard } from "@/components/site/TourCard";
import { BookingDialog } from "@/components/site/BookingDialog";
import groupAsset from "@/assets/chef-group-table-aesthetic.jpg.asset.json";
import salomeaAsset from "@/assets/g-salomea.jpg.asset.json";
import marcoJuliaAsset from "@/assets/g-marco-julia.jpg.asset.json";
import robertoValeriaAsset from "@/assets/g-roberto-valeria.jpg.asset.json";

const guestPhotos: Record<string, string> = {
  Salomea: salomeaAsset.url,
  "Marco & Julia": marcoJuliaAsset.url,
  "Roberto & Valeria": robertoValeriaAsset.url,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Milpa Chef — Cholula food tours & Mexican cooking classes" },
      {
        name: "description",
        content:
          "Culinary experiences in Cholula, Puebla with chef Alfonso Rocha Robles: small-group Slow Food walking tours (MXN $595) and hands-on Mexican cooking classes (MXN $1,295). Heirloom corn, mole poblano, mezcal.",
      },
      { property: "og:title", content: "Milpa Chef — Cholula food tours & cooking classes" },
      {
        property: "og:description",
        content: "Small-group food tours and Mexican cooking classes in Cholula, Puebla.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const [booking, setBooking] = useState<Tour | null>(null);
  const { data: tours = [] } = useQuery({ queryKey: ["tours"], queryFn: () => fetchTours(3) });
  const { data: classes = [] } = useQuery({
    queryKey: ["tours", "classes", "home"],
    queryFn: () => fetchTours(3, "class"),
  });
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

      {/* Manifesto — more than a food tour */}
      <section className="container-editorial py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-14 items-start">
          <div className="font-serif text-3xl md:text-4xl text-primary leading-tight space-y-2">
            {philosophy[lang].map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div>
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
              {t("platform.eyebrow")}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
              {t("platform.title")}
            </h2>
            <p className="text-muted-foreground mt-5 leading-relaxed text-lg">
              {t("platform.lead")}
            </p>
            <Link
              to="/platform"
              className="mt-6 inline-flex text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-[color:var(--milpa-deep)]"
            >
              {t("nav.platform")} →
            </Link>
          </div>
        </div>

        {/* Six areas */}
        <div className="uppercase tracking-[0.3em] text-xs text-accent mt-20 mb-8">
          {t("platform.areas")}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {getAreas(lang).map((a) => (
            <Link key={a.slug} to={a.to} className="border-t-2 border-accent pt-4 group">
              <div className="text-xs tracking-widest text-muted-foreground mb-1">{a.number}</div>
              <div className="font-serif text-2xl text-primary group-hover:text-[color:var(--milpa-deep)]">
                {a.title}
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.tagline}</p>
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground max-w-3xl mt-12">{t("services.note")}</p>
      </section>

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

      {/* Cooking classes */}
      {classes.length > 0 && (
        <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
          <div className="absolute inset-0 opacity-25">
            <img src={classImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative container-editorial py-24 md:py-32 text-primary-foreground">
            <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
              <div className="max-w-xl">
                <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-3">
                  {t("classes.eyebrow")}
                </div>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                  {t("classes.homeTitle")}
                </h2>
                <p className="text-primary-foreground/80 mt-3">{t("classes.homeBody")}</p>
              </div>
              <Link
                to="/classes"
                className="inline-flex items-center text-sm uppercase tracking-widest text-[color:var(--corn)] border-b border-[color:var(--corn)] pb-1 hover:brightness-95"
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
      )}

      {/* Testimonials */}
      <section className="container-editorial py-24 md:py-32">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4 text-center">
          {t("testimonials.badge")}
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-primary text-center mb-16">
          {t("testimonials.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {testimonials.map((tt) => (
            <figure
              key={tt.id}
              className="border-l-2 border-accent pl-6 py-2 flex gap-5 items-start"
            >
              {guestPhotos[tt.guest_name] ? (
                <img
                  src={guestPhotos[tt.guest_name]}
                  alt={`${tt.guest_name}, guest of Milpa Chef`}
                  loading="lazy"
                  className="w-16 h-16 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="w-16 h-16 shrink-0 rounded-full bg-accent/15 text-accent font-serif text-2xl flex items-center justify-center"
                >
                  {tt.guest_name.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <blockquote className="font-serif text-2xl text-primary leading-snug italic">
                  “{pickQuote(tt, lang)}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground uppercase tracking-widest">
                  {tt.guest_name} · {tt.origin}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* Movement band */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="container-editorial py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center text-primary-foreground">
          <div>
            <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-4">
              {t("brand.motto")}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">{t("movement.title")}</h2>
            <p className="text-primary-foreground/80 mt-4 leading-relaxed">{t("movement.body")}</p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img
              src={groupAsset.url}
              alt="Alfonso Rocha with a group of guests around a long shared table in Cholula"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <BookingDialog tour={booking} open={!!booking} onClose={() => setBooking(null)} />
    </>
  );
}
