import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { marketImage } from "@/lib/tour-images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Milpa Chef — Slow Food in Cholula" },
      {
        name: "description",
        content:
          "Milpa Chef is a Cholula-based cook and Slow Food advocate leading small-group food tours that put producers, native corn and sustainability first.",
      },
      { property: "og:title", content: "About Milpa Chef" },
      {
        property: "og:description",
        content: "A Cholula-based cook and Slow Food advocate.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
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
        <div className="aspect-[4/5] overflow-hidden rounded-md">
          <img
            src={marketImage}
            alt="Milpa Chef in a Cholula market"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}