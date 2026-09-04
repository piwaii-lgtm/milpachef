import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { getAreas, circle, philosophy, pillars } from "@/lib/platform";
import { heroImage } from "@/lib/tour-images";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "The MilpaChef platform — six areas, one philosophy" },
      {
        name: "description",
        content:
          "MilpaChef is more than a food tour: experiences, consulting, products, academy, research and impact — a platform for sustainable Mexican gastronomy based in Cholula, Puebla.",
      },
      { property: "og:title", content: "The MilpaChef platform — six areas, one philosophy" },
      { property: "og:image", content: "https://milpachef.mx/og-milpachef.jpg" },
      { name: "twitter:image", content: "https://milpachef.mx/og-milpachef.jpg" },
      {
        property: "og:description",
        content:
          "Experiences, consulting, products, academy, research and impact for sustainable Mexican gastronomy.",
      },
      { property: "og:url", content: "/platform" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/platform" }],
  }),
  component: PlatformPage,
});

function PlatformPage() {
  const { t, lang } = useI18n();
  const areas = getAreas(lang);

  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-25">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-editorial py-24 md:py-32 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-5">
            {t("platform.eyebrow")}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.08] max-w-4xl">
            {t("platform.title")}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mt-6 text-lg leading-relaxed">
            {t("platform.lead")}
          </p>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="container-editorial py-20 md:py-24 grid md:grid-cols-2 gap-14">
        {(["mission", "vision"] as const).map((k) => (
          <div key={k}>
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
              {t(`${k}.label`)}
            </div>
            <p className="font-serif text-2xl md:text-3xl text-primary leading-snug">
              {t(`${k}.body`)}
            </p>
          </div>
        ))}
      </section>

      {/* Philosophy */}
      <section style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}>
        <div className="container-editorial py-20 md:py-24">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-6">
            {t("philosophy.label")}
          </div>
          <div className="font-serif text-3xl md:text-5xl text-primary leading-tight space-y-2 max-w-3xl">
            {philosophy[lang].map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Six areas */}
      <section className="container-editorial py-20 md:py-28">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-10">
          {t("platform.areas")}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {areas.map((a) => (
            <article key={a.slug} className="border-t-2 border-accent pt-5">
              <div className="text-xs tracking-widest text-muted-foreground mb-2">{a.number}</div>
              <h2 className="font-serif text-3xl text-primary">{a.title}</h2>
              <p className="font-serif italic text-accent mt-1">{a.tagline}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{a.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {a.includes.map((i) => (
                  <li
                    key={i}
                    className="text-xs uppercase tracking-wider text-primary/70 border border-border rounded-full px-3 py-1"
                  >
                    {i}
                  </li>
                ))}
              </ul>
              <Link
                to={a.to}
                className="mt-5 inline-flex text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-[color:var(--milpa-deep)]"
              >
                {t("platform.explore")} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* The circle */}
      <section style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="container-editorial py-20 md:py-28 text-primary-foreground grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              {t("platform.circle.title")}
            </h2>
            <p className="text-primary-foreground/80 mt-5 leading-relaxed">
              {t("platform.circle.body")}
            </p>
          </div>
          <ol className="space-y-4">
            {circle[lang].map((step, i) => (
              <li key={step} className="flex gap-4 items-baseline">
                <span className="text-[color:var(--corn)] text-xs tracking-widest w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-xl leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-editorial py-20 md:py-28">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-10">
          {t("pillars.label")}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pillars[lang].map((p) => (
            <div key={p.title}>
              <div className="w-8 h-px bg-accent mb-3" />
              <h3 className="font-serif text-2xl text-primary mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-14 max-w-3xl text-muted-foreground leading-relaxed">{t("value.body")}</p>
        <p className="mt-4 max-w-3xl font-serif text-2xl text-primary leading-snug">
          {t("value.sells")}
        </p>
      </section>
    </>
  );
}
