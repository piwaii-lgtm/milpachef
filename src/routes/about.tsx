import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { pillars, philosophy } from "@/lib/platform";
import chefAsset from "@/assets/chef-milpa.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MilpaChef — Alfonso Rocha, chef & anthropologist" },
      {
        name: "description",
        content:
          "Alfonso Rocha is a chef, anthropologist and sustainable gastronomy specialist with over seventeen years working with rural communities, producers and universities across Mexico. MilpaChef is his platform for food heritage.",
      },
      { property: "og:title", content: "About MilpaChef — Alfonso Rocha" },
      {
        property: "og:description",
        content: "Chef, anthropologist and specialist in sustainable Mexican gastronomy.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();
  return (
    <section className="container-editorial py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
            {t("nav.about")}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-primary leading-tight mb-6">
            {t("about.title")}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about.body")}</p>

          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="w-8 h-px bg-accent mb-3" />
                <div className="font-serif text-lg text-primary mb-2">
                  {t(`about.pillar${i}.title`)}
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {t(`about.pillar${i}.body`)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-md bg-[#f2a71b]">
          <img
            src={chefAsset.url}
            alt="Milpa Chef holding heirloom black corn in Cholula"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Philosophy */}
      <div className="mt-24 grid md:grid-cols-2 gap-14 items-start">
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
            {t("philosophy.label")}
          </div>
          <div className="font-serif text-3xl md:text-4xl text-primary leading-tight space-y-2">
            {philosophy[lang].map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
            {t("chef.label")}
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">{t("chef.body")}</p>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mt-10 mb-4">
            {t("tone.label")}
          </div>
          <p className="text-muted-foreground leading-relaxed">{t("tone.body")}</p>
        </div>
      </div>

      {/* Pillars */}
      <div className="mt-24">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-10">
          {t("pillars.label")}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pillars[lang].map((p) => (
            <div key={p.title}>
              <div className="w-8 h-px bg-accent mb-3" />
              <h2 className="font-serif text-2xl text-primary mb-1">{p.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & vision */}
      <div className="mt-24 grid md:grid-cols-2 gap-14">
        {(["mission", "vision"] as const).map((k) => (
          <div key={k}>
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
              {t(`${k}.label`)}
            </div>
            <p className="font-serif text-2xl text-primary leading-snug">{t(`${k}.body`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}