import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { resourcesSection, YOUTUBE_CHANNEL } from "@/lib/section-copy";
import { recursosHeroImage, recursosRecetasImage } from "@/lib/tour-images";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — recipes, videos & knowledge | MilpaChef" },
      {
        name: "description",
        content:
          "Free MilpaChef® resources: digital recipe books with ancestral ingredients, cooking videos and articles on Mexican biocultural heritage.",
      },
      { property: "og:title", content: "MilpaChef® Resources" },
      {
        property: "og:description",
        content: "Recipes, videos and knowledge to keep exploring sustainable Mexican gastronomy.",
      },
      { property: "og:url", content: "/resources" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { lang } = useI18n();
  const c = resourcesSection[lang];

  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-25">
          <img src={marketImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-editorial py-24 md:py-32 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-5">
            {c.eyebrow}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-3xl">{c.title}</h1>
          <p className="font-serif italic text-xl md:text-2xl text-[color:var(--corn)] mt-5 max-w-2xl">
            {c.subtitle}
          </p>
          <p className="text-primary-foreground/80 max-w-2xl mt-6 text-lg leading-relaxed">
            {c.intro}
          </p>
        </div>
      </section>

      {/* Recetas */}
      <section className="container-editorial py-20 md:py-24 grid md:grid-cols-2 gap-14 items-start">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
            {c.recipesTitle}
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-lg">{c.recipesBody}</p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {c.recipesIncludes.map((i) => (
              <li key={i} className="text-primary border-b border-border pb-2">
                — {i}
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center rounded-sm bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-[color:var(--milpa-deep)]"
          >
            {c.recipesCta}
          </Link>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-md">
          <img
            src={classMarketImage}
            alt="Native ingredients used in MilpaChef recipes"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Videos */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
            {c.videosTitle}
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-lg">{c.videosBody}</p>
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center rounded-sm border border-primary text-primary px-6 py-3 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {c.videosCta} ↗
          </a>
        </div>
      </section>

      {/* Más conocimiento */}
      <section className="container-editorial py-20 md:py-24">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-10">{c.moreLabel}</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.more.map((item) => (
            <Link key={item.title} to={item.to} className="border-t-2 border-accent pt-4 group">
              <div className="font-serif text-2xl text-primary group-hover:text-[color:var(--milpa-deep)]">
                {item.title}
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-editorial pb-24 md:pb-32 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-3xl mx-auto leading-tight">
          {c.ctaTitle}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">{c.ctaBody}</p>
        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noreferrer"
          className="mt-9 inline-flex items-center rounded-sm bg-[color:var(--corn)] text-primary px-6 py-3 text-sm font-medium hover:brightness-95"
        >
          {c.ctaButton}
        </a>
      </section>
    </>
  );
}
