import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { resourcesPage } from "@/lib/site-copy";
import { marketImage } from "@/lib/tour-images";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — research, publications & recipes | MilpaChef" },
      {
        name: "description",
        content:
          "Research, publications, recipes and impact projects from MilpaChef on Mexican food heritage, sustainable gastronomy and the producers behind the milpa.",
      },
      { property: "og:title", content: "MilpaChef Resources" },
      {
        property: "og:description",
        content: "Knowledge, publications and recipes on Mexican food heritage.",
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
  const c = resourcesPage[lang];
  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-25">
          <img src={marketImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-editorial py-24 md:py-32 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-5">
            MilpaChef®
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-3xl">{c.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mt-6 text-lg leading-relaxed">
            {c.subtitle}
          </p>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-28">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-10">{c.itemsLabel}</div>
        <div className="grid sm:grid-cols-2 gap-10">
          {c.items.map((item) => (
            <Link key={item.title} to={item.to} className="border-t-2 border-accent pt-4 group">
              <div className="font-serif text-2xl text-primary group-hover:text-[color:var(--milpa-deep)]">
                {item.title}
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}