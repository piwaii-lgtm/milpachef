import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { experiencesPage } from "@/lib/site-copy";
import { fetchTestimonials, pickQuote } from "@/lib/tours";
import { marketImage } from "@/lib/tour-images";
import expHero from "@/assets/exp-hero.jpg.asset.json";
import expClasses from "@/assets/exp-classes.jpg.asset.json";
import expPrivate from "@/assets/chef-group-table-aesthetic.jpg.asset.json";
import expTable from "@/assets/exp-table.jpg.asset.json";
import expTerritorio from "@/assets/exp-territorio.jpg.asset.json";
import expProductores from "@/assets/exp-productores.jpg.asset.json";
import expCultura from "@/assets/exp-cultura.jpg.asset.json";
import expConocimiento from "@/assets/exp-conocimiento.jpg.asset.json";
import salomeaAsset from "@/assets/g-salomea.jpg.asset.json";
import marcoJuliaAsset from "@/assets/g-marco-julia.jpg.asset.json";
import robertoValeriaAsset from "@/assets/g-roberto-valeria.jpg.asset.json";

const guestPhotos: Record<string, string> = {
  Salomea: salomeaAsset.url,
  "Marco & Julia": marcoJuliaAsset.url,
  "Roberto & Valeria": robertoValeriaAsset.url,
};

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiences in Cholula | MilpaChef" },
      {
        name: "description",
        content:
          "MilpaChef experiences in Cholula, Puebla: food tours, traditional cooking classes and private experiences that connect territory, producers and Mexican food culture.",
      },
      { property: "og:title", content: "MilpaChef Experiences" },
      {
        property: "og:description",
        content:
          "Food tours, cooking classes and private experiences guided by chef-anthropologist Alfonso Rocha Robles.",
      },
      { property: "og:url", content: "/experiences" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/experiences" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: experiencesPage.en.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  const { t, lang } = useI18n();
  const c = experiencesPage[lang];
  const optionImages = [marketImage, expClasses.url, expPrivate.url];
  const pillarImages = [
    expTerritorio.url,
    expProductores.url,
    expCultura.url,
    expConocimiento.url,
  ];
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-35">
          <img src={expHero.url} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--milpa-deep) 45%, transparent) 0%, color-mix(in oklab, var(--milpa-deep) 88%, transparent) 100%)",
            }}
          />
        </div>
        <div className="relative container-editorial py-24 md:py-36 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-5">
            MilpaChef®
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05]">{c.heroTitle}</h1>
          <p className="text-primary-foreground/85 max-w-2xl mt-7 text-lg leading-relaxed">
            {c.heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2 — What makes it different */}
      <section className="container-editorial py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-14 items-start">
          <div>
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">{c.diffEyebrow}</div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
              {c.diffTitle}
            </h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">{c.diffBody}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {c.pillars.map((p, i) => (
            <div key={p.label}>
              <div className="aspect-[4/3] overflow-hidden rounded-md mb-4">
                <img
                  src={pillarImages[i]}
                  alt={p.label}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="border-t-2 border-accent pt-4">
                <div className="font-serif text-2xl text-primary">{p.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — Choose your experience */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-3">{c.chooseEyebrow}</div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-2xl">{c.chooseTitle}</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {c.options.map((o, i) => (
              <article key={o.to} className="flex flex-col">
                <Link to={o.to} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-md mb-5">
                    <img
                      src={optionImages[i]}
                      alt={o.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-primary group-hover:text-[color:var(--milpa-deep)]">
                    {o.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground mt-3 leading-relaxed flex-1">{o.body}</p>
                <Link
                  to={o.to}
                  className="mt-5 inline-flex text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-[color:var(--milpa-deep)] self-start"
                >
                  {o.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — How we work */}
      <section className="container-editorial py-20 md:py-28">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-3">{c.howEyebrow}</div>
        <h2 className="font-serif text-3xl md:text-4xl text-primary">{c.howTitle}</h2>
        <ol className="grid md:grid-cols-4 gap-8 mt-12">
          {c.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="font-serif text-5xl text-accent/40">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-serif text-2xl text-primary mt-2">{s.title}</div>
              <p className="text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
              {i < c.steps.length - 1 && (
                <span aria-hidden className="hidden md:block absolute -right-4 top-6 text-accent">
                  ↓
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* 5 — What to expect */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-20">
          <img src={expTable.url} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-editorial py-20 md:py-28 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-3">
            {c.expectEyebrow}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-2xl">{c.expectTitle}</h2>
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4 mt-10 max-w-4xl">
            {c.expect.map((e) => (
              <li key={e} className="flex gap-3 text-primary-foreground/85 leading-relaxed">
                <span className="text-[color:var(--corn)]" aria-hidden>
                  —
                </span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Testimonials */}
      {testimonials.length > 0 && (
        <section className="container-editorial py-20 md:py-28">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4 text-center">
            {c.testimonialsEyebrow}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary text-center mb-4">
            {c.testimonialsTitle}
          </h2>
          <p className="text-center text-sm uppercase tracking-widest text-accent mb-14">
            {t("testimonials.badge")}
          </p>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {testimonials.map((tt) => (
              <figure key={tt.id} className="border-l-2 border-accent pl-6 py-2 flex gap-5 items-start">
                {guestPhotos[tt.guest_name] ? (
                  <img
                    src={guestPhotos[tt.guest_name]}
                    alt={`${tt.guest_name}, guest of MilpaChef`}
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
      )}

      {/* 7 — FAQ */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial max-w-3xl">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-3">{c.faqEyebrow}</div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10">{c.faqTitle}</h2>
          <dl className="divide-y divide-border/70 border-y border-border/70">
            {c.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-serif text-xl text-primary">{f.q}</dt>
                <dd className="text-muted-foreground mt-1">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 8 — Closing */}
      <section className="container-editorial py-24 md:py-28 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-3xl mx-auto leading-tight">
          {c.closingTitle}
        </h2>
        <p className="font-serif italic text-xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
          “{c.closingQuote}”
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {c.options.map((o) => (
            <Link
              key={o.to}
              to={o.to}
              className="inline-flex items-center rounded-sm bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-[color:var(--milpa-deep)]"
            >
              {o.title}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
