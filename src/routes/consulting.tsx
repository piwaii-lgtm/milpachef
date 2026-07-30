import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { consultingPage } from "@/lib/section-copy";
import consultingImg from "@/assets/area-consulting.jpg";
import { marketImage } from "@/lib/tour-images";

export const Route = createFileRoute("/consulting")({
  head: () => ({
    meta: [
      { title: "Consulting — the MilpaChef® Intervention Model | MilpaChef" },
      {
        name: "description",
        content:
          "MilpaChef® consulting for restaurants, hotels, tourism, institutions, producers and communities: a four-scale intervention model covering product, organisation, territory and food systems.",
      },
      { property: "og:title", content: "MilpaChef® Consulting — gastronomy with territorial identity" },
      {
        property: "og:description",
        content:
          "A methodological framework for culinary projects with territorial identity and social impact.",
      },
      { property: "og:url", content: "/consulting" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/consulting" }],
  }),
  component: ConsultingPage,
});

function ConsultingPage() {
  const { lang } = useI18n();
  const c = consultingPage[lang];

  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-30">
          <img src={consultingImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-editorial py-24 md:py-32 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-5">
            {c.eyebrow}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl">{c.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mt-6 text-lg leading-relaxed">
            {c.intro}
          </p>
        </div>
      </section>

      {/* Statement */}
      <section className="container-editorial py-16 md:py-20">
        <blockquote className="border-l-2 border-accent pl-8 font-serif text-2xl md:text-3xl text-primary leading-snug max-w-4xl">
          {c.statement}
        </blockquote>
      </section>

      {/* Modelo de intervención */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">{c.modelLabel}</div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight max-w-3xl">
            {c.modelTitle}
          </h2>
          <p className="text-muted-foreground mt-5 max-w-3xl leading-relaxed">{c.modelLead}</p>
          <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">{c.modelBody}</p>

          <ol className="mt-12 space-y-6">
            {c.scales.map((s, i) => (
              <li
                key={s.name}
                className="bg-card border border-border/60 rounded-sm p-7 md:p-9 grid md:grid-cols-[auto_1fr] gap-8"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground md:w-24">
                  0{i + 1}
                </div>
                <div>
                  <div className="font-serif text-3xl text-primary">{s.name}</div>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
                  {s.items && (
                    <ul className="flex flex-wrap gap-2 mt-5">
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className="px-3 py-1.5 rounded-full text-xs border border-border text-muted-foreground"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-5 text-sm text-primary font-medium border-t border-border pt-4">
                    {s.objective}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Colaboraciones */}
      <section className="container-editorial py-20 md:py-24">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">{c.collabLabel}</div>
        <h2 className="font-serif text-3xl md:text-4xl text-primary max-w-2xl leading-tight">
          {c.collabTitle}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {c.collabs.map((x) => (
            <div key={x.title} className="border-t-2 border-accent pt-4">
              <div className="font-serif text-2xl text-primary">{x.title}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{x.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-14 items-start">
          <div>
            <h3 className="font-serif text-3xl text-primary leading-tight">{c.popupTitle}</h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">{c.popupBody}</p>
            <p className="text-muted-foreground mt-4 leading-relaxed">{c.popupNote}</p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {c.popupItems.map((i) => (
              <li key={i} className="text-primary border-b border-border pb-2">
                — {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trayectoria */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="container-editorial py-20 md:py-28 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-4">
            {c.trackLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight max-w-2xl">
            {c.trackTitle}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mt-5 leading-relaxed">{c.trackLead}</p>

          <div className="grid md:grid-cols-2 gap-14 mt-14">
            <div>
              <div className="font-serif text-2xl text-[color:var(--corn)]">{c.slowFoodTitle}</div>
              <p className="text-primary-foreground/80 mt-3 leading-relaxed">{c.slowFoodBody}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {c.funders.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-full text-xs border border-primary-foreground/30"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <ul className="mt-6 space-y-3">
                {c.regions.map((r) => (
                  <li key={r} className="border-t border-primary-foreground/20 pt-3 text-sm">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-serif text-2xl text-[color:var(--corn)]">{c.orgsTitle}</div>
              <p className="text-primary-foreground/80 mt-3 leading-relaxed">{c.orgsBody}</p>
              <ul className="mt-5 space-y-3">
                {c.orgs.map((o) => (
                  <li key={o} className="border-t border-primary-foreground/20 pt-3">
                    {o}
                  </li>
                ))}
              </ul>
              <div className="aspect-[4/3] overflow-hidden rounded-md mt-8">
                <img
                  src={marketImage}
                  alt="Alfonso Rocha working with producers at a Mexican market"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="container-editorial py-20 md:py-24">
        <h2 className="font-serif text-3xl md:text-4xl text-primary max-w-3xl leading-tight">
          {c.projectsTitle}
        </h2>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {c.projects.map((p) => (
            <article key={p.title} className="border-t-2 border-accent pt-5">
              <h3 className="font-serif text-2xl text-primary">{p.title}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">{p.body}</p>
              {p.items && (
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {p.items.map((i) => (
                    <li key={i}>— {i}</li>
                  ))}
                </ul>
              )}
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-[color:var(--milpa-deep)]"
                >
                  Instagram ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section
        className="py-20"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
            {c.processLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary">{c.processTitle}</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-10">
            {c.process.map((s, i) => (
              <li key={s.title} className="border-t-2 border-accent pt-4">
                <div className="text-xs text-muted-foreground tracking-widest mb-1">0{i + 1}</div>
                <div className="font-serif text-2xl text-primary">{s.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="container-editorial py-20 md:py-28 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-3xl mx-auto leading-tight">
          {c.ctaTitle}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">{c.ctaBody}</p>
        <Link
          to="/contact"
          className="mt-9 inline-flex items-center rounded-sm bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-[color:var(--milpa-deep)]"
        >
          {c.ctaButton}
        </Link>
      </section>
    </>
  );
}
