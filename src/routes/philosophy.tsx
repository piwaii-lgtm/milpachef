import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { philosophyPage } from "@/lib/site-copy";
import { philosophy } from "@/lib/platform";
import philMercado from "@/assets/phil-mercado.jpg.asset.json";
import philAprende from "@/assets/phil-aprende.jpg.asset.json";
import philProyecto from "@/assets/phil-proyecto.jpg.asset.json";
import philExperiencias from "@/assets/phil-experiencias.jpg.asset.json";
import philInvite from "@/assets/phil-invite.jpg.asset.json";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "Our Philosophy | MilpaChef" },
      {
        name: "description",
        content:
          "MilpaChef is not a tour agency but a knowledge centre: the manifesto, principles and vision behind our work with Mexican gastronomy and territory.",
      },
      { property: "og:title", content: "Our Philosophy — MilpaChef" },
      {
        property: "og:description",
        content: "Gastronomy begins long before the kitchen: territory, seeds, markets and communities.",
      },
      { property: "og:url", content: "/philosophy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/philosophy" }],
  }),
  component: PhilosophyPage,
});

function PhilosophyPage() {
  const { lang } = useI18n();
  const c = philosophyPage[lang];

  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-30">
          <img
            src={philMercado.url}
            alt=""
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
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

      <section className="container-editorial py-20 md:py-28 grid md:grid-cols-[1fr_1.2fr] gap-14 items-start">
        <div className="font-serif text-3xl md:text-4xl text-primary leading-tight space-y-2">
          {philosophy[lang].map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
            {c.understandTitle}
          </h2>
          <p className="text-muted-foreground mt-5 leading-relaxed text-lg">{c.understandBody}</p>
        </div>
      </section>

      <section className="container-editorial pb-4 grid sm:grid-cols-3 gap-4">
        {[
          { src: philAprende.url, alt: "Cook preparing nixtamal masa over a wood-fired comal" },
          { src: philProyecto.url, alt: "Chef Alfonso with a producer at a traditional market stall" },
          { src: philExperiencias.url, alt: "Guest choosing heirloom tomatoes at an agroecological market" },
        ].map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover rounded-sm"
          />
        ))}
      </section>

      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-10">
            {c.principlesLabel}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {c.principles.map((p) => (
              <div key={p.title}>
                <div className="w-8 h-px bg-accent mb-3" />
                <h3 className="font-serif text-2xl text-primary mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-24 grid md:grid-cols-2 gap-14">
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">{c.missionLabel}</div>
          <p className="font-serif text-2xl text-primary leading-snug">{c.mission}</p>
        </div>
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">{c.visionLabel}</div>
          <p className="font-serif text-2xl text-primary leading-snug">{c.vision}</p>
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="container-editorial py-20 md:py-28 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-10">
            {c.howLabel}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {c.how.map((h, i) => (
              <div key={h.title} className="border-t-2 border-[color:var(--corn)] pt-4">
                <div className="text-xs tracking-widest text-primary-foreground/60 mb-1">
                  0{i + 1}
                </div>
                <div className="font-serif text-2xl">{h.title}</div>
                <p className="text-sm text-primary-foreground/75 mt-2 leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-28">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-2xl leading-tight">
              {c.inviteTitle}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">{c.inviteBody}</p>
          </div>
          <img
            src={philTour.url}
            alt="Chef Alfonso showing dried shrimp to a guest during a market tour"
            loading="lazy"
            className="w-full aspect-[3/4] object-cover rounded-sm"
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {c.invites.map((inv) => (
            <Link key={inv.title} to={inv.to} className="border-t-2 border-accent pt-4 group">
              <div className="font-serif text-2xl text-primary group-hover:text-[color:var(--milpa-deep)]">
                {inv.title}
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{inv.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}