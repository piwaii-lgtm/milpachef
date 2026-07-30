import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { privatePage } from "@/lib/site-copy";
import groupAsset from "@/assets/chef-group-table-aesthetic.jpg.asset.json";

export const Route = createFileRoute("/private-experiences")({
  head: () => ({
    meta: [
      { title: "Private experiences in Mexico — tailor-made | MilpaChef" },
      {
        name: "description",
        content:
          "Tailor-made Mexican gastronomy experiences for travellers, companies, universities and groups, designed and guided by chef-anthropologist Alfonso Rocha Robles.",
      },
      { property: "og:title", content: "MilpaChef private experiences" },
      {
        property: "og:description",
        content: "Custom food tours, cooking classes and field programmes for groups, companies and universities.",
      },
      { property: "og:url", content: "/private-experiences" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/private-experiences" }],
  }),
  component: PrivateExperiencesPage,
});

function PrivateExperiencesPage() {
  const { lang } = useI18n();
  const c = privatePage[lang];

  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-35">
          <img src={groupAsset.url} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-editorial py-24 md:py-32 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-5">
            MilpaChef®
          </div>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]">{c.heroTitle}</h1>
          <p className="text-primary-foreground/85 max-w-2xl mt-6 text-lg leading-relaxed">
            {c.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-24">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-3">{c.forEyebrow}</div>
        <h2 className="font-serif text-3xl md:text-4xl text-primary">{c.forTitle}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {c.audiences.map((a) => (
            <div key={a.title} className="border-t-2 border-accent pt-4">
              <div className="font-serif text-2xl text-primary">{a.title}</div>
              <p className="text-muted-foreground mt-2 leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8">{c.includesTitle}</h2>
          <ul className="space-y-3">
            {c.includes.map((i) => (
              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="text-accent" aria-hidden>
                  —
                </span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-editorial py-24 text-center">
        <h2 className="font-serif text-4xl text-primary max-w-2xl mx-auto leading-tight">
          {c.ctaTitle}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">{c.ctaBody}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:alfonso@milpachef.com"
            className="inline-flex items-center rounded-sm bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-[color:var(--milpa-deep)]"
          >
            {c.ctaButton}
          </a>
          <a
            href="https://wa.me/522221706820"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-sm border border-primary text-primary px-6 py-3 text-sm hover:bg-primary/5"
          >
            {c.ctaWhatsApp}
          </a>
        </div>
      </section>
    </>
  );
}
