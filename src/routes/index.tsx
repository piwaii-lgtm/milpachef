import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { fetchTours, fetchTestimonials, pickQuote, type Tour } from "@/lib/tours";
import { heroImage, marketImage, classImage } from "@/lib/tour-images";
import { getArea } from "@/lib/platform";
import { home as homeCopy } from "@/lib/site-copy";
import chefAsset from "@/assets/chef-milpa.png.asset.json";
import consultingImg from "@/assets/area-consulting.jpg";
import academyImg from "@/assets/area-academy.jpg";
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
      { title: "MilpaChef — sustainable Mexican gastronomy in Cholula" },
      {
        name: "description",
        content:
          "Sustainable Mexican gastronomy in Cholula, Puebla: food tours, cooking classes, ancestral products, consulting and academy, led by chef-anthropologist Alfonso Rocha.",
      },
      { property: "og:title", content: "MilpaChef — more than a food tour in Cholula" },
      {
        property: "og:description",
        content: "Experiences, products, consulting, academy, research and impact around sustainable Mexican gastronomy.",
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
  const c = homeCopy[lang];
  const areaImages: Record<string, string> = {
    experiences: groupAsset.url,
    products: marketImage,
    consulting: consultingImg,
    academy: academyImg,
  };
  const areaLinks: Record<string, string> = {
    experiences: "/experiences",
    products: "/products",
    consulting: "/consulting",
    academy: "/academy",
  };
  const mainAreas = (["experiences", "products", "consulting", "academy"] as const).map((s) =>
    getArea(lang, s),
  );
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
              {c.heroTitle}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              {c.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/experiences"
                className="inline-flex items-center rounded-sm bg-[color:var(--corn)] text-primary px-6 py-3 text-sm font-medium hover:brightness-95"
              >
                {c.heroCta}
              </Link>
              <Link
                to="/philosophy"
                className="inline-flex items-center rounded-sm border border-primary-foreground/40 text-primary-foreground px-6 py-3 text-sm hover:bg-primary-foreground/10"
              >
                {c.heroSecondary}
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
            {c.philosophyLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div>
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
              {c.philosophyEyebrow}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
              {c.philosophyTitle}
            </h2>
            {c.philosophyBody.map((p) => (
              <p key={p} className="text-muted-foreground mt-5 leading-relaxed text-lg">
                {p}
              </p>
            ))}
            <Link
              to="/philosophy"
              className="mt-6 inline-flex text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-[color:var(--milpa-deep)]"
            >
              {c.philosophyCta} →
            </Link>
          </div>
        </div>

        {/* Four areas of work */}
        <div className="uppercase tracking-[0.3em] text-xs text-accent mt-20 mb-3">
          {c.howEyebrow}
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-primary">{c.howTitle}</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">{c.howLead}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {mainAreas.map((a) => (
            <Link key={a.slug} to={areaLinks[a.slug]} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-md mb-4">
                <img
                  src={areaImages[a.slug]}
                  alt={`${a.title} — ${a.tagline}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
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
            {c.founderEyebrow}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">
            {c.founderName}
          </h2>
          {c.founderBody.map((p) => (
            <p key={p} className="text-muted-foreground leading-relaxed text-lg mb-4">
              {p}
            </p>
          ))}
          <Link
            to="/about"
            className="mt-4 inline-flex text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-[color:var(--milpa-deep)]"
          >
            {c.founderCta} →
          </Link>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-md bg-[#f2a71b]">
          <img
            src={chefAsset.url}
            alt="Alfonso S. Rocha Robles, founder of MilpaChef, holding heirloom black corn"
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
          {c.testimonialsEyebrow}
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-primary text-center mb-16">
          {t("testimonials.title")}
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto -mt-10 mb-14">
          {c.testimonialsLead}
        </p>
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

      {/* Closing invitation */}
      <section className="container-editorial py-24 md:py-28 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-3xl mx-auto leading-tight">
          {c.closingTitle}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
          {c.closingBody}
        </p>
        <Link
          to="/philosophy"
          className="mt-9 inline-flex items-center rounded-sm bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-[color:var(--milpa-deep)]"
        >
          {c.closingCta}
        </Link>
      </section>

      <BookingDialog tour={booking} open={!!booking} onClose={() => setBooking(null)} />
    </>
  );
}
