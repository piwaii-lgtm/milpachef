import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { academyPage } from "@/lib/section-copy";
import academyImg from "@/assets/area-academy.jpg";
import { classImage } from "@/lib/tour-images";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Academy — teaching, research & publications | MilpaChef" },
      {
        name: "description",
        content:
          "MilpaChef® Academy: university teaching at UDLAP, research on biocultural heritage and food systems, publications, lectures and training formats in sustainable Mexican gastronomy.",
      },
      { property: "og:title", content: "MilpaChef® Academy — learning from the territory" },
      {
        property: "og:description",
        content: "Teaching, applied research, publications and training on Mexican food heritage.",
      },
      { property: "og:url", content: "/academy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/academy" }],
  }),
  component: AcademyPage,
});

function AcademyPage() {
  const { lang } = useI18n();
  const c = academyPage[lang];

  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-30">
          <img src={academyImg} alt="" className="w-full h-full object-cover" />
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

      {/* Enfoque */}
      <section className="container-editorial py-20 md:py-24 grid md:grid-cols-[1fr_1.2fr] gap-14 items-start">
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">{c.focusTitle}</div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
            {c.focusLead}
          </h2>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed">{c.focusBody}</p>
      </section>

      {/* Líneas de trabajo */}
      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-10">{c.linesLabel}</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {c.lines.map((l) => (
              <div key={l.title} className="border-t-2 border-accent pt-4">
                <div className="font-serif text-2xl text-primary">{l.title}</div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Docencia */}
      <section className="container-editorial py-20 md:py-24 grid md:grid-cols-2 gap-14 items-start">
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
            {c.teachingLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight mb-4">
            {c.teachingTitle}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{c.teachingLead}</p>
          <div className="mt-8 border-l-2 border-accent pl-6">
            <div className="font-serif text-2xl text-primary">{c.teachingInstitution}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
              {c.teachingRole}
            </div>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              {c.teachingCourses.map((course) => (
                <li key={course}>— {course}</li>
              ))}
            </ul>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-8">{c.teachingNote}</p>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-md">
          <img
            src={academyImg}
            alt="Alfonso Rocha Robles lecturing on sustainable gastronomy"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Investigación */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="container-editorial py-20 md:py-28 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-4">
            {c.researchLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight max-w-2xl">
            {c.researchTitle}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mt-5 leading-relaxed">
            {c.researchLead}
          </p>

          <div className="grid md:grid-cols-2 gap-14 mt-14">
            <div>
              <div className="uppercase tracking-[0.2em] text-xs text-[color:var(--corn)] mb-5">
                {c.publicationsLabel}
              </div>
              <ul className="space-y-5">
                {c.publications.map((p) => (
                  <li key={p.text} className="border-t border-primary-foreground/20 pt-4">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif text-xl hover:text-[color:var(--corn)]"
                    >
                      {p.text} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="uppercase tracking-[0.2em] text-xs text-[color:var(--corn)] mb-5">
                {c.talksLabel}
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-5">
                {c.talksIntro}
              </p>
              <ul className="space-y-4">
                {c.talks.map((tk) => (
                  <li
                    key={tk.text}
                    className="border-t border-primary-foreground/20 pt-4 text-primary-foreground/90 leading-relaxed"
                  >
                    {tk.href ? (
                      <a
                        href={tk.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[color:var(--corn)]"
                      >
                        {tk.text} ↗
                      </a>
                    ) : (
                      tk.text
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formación + vinculación */}
      <section className="container-editorial py-20 md:py-24 grid md:grid-cols-2 gap-16">
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-6">
            {c.formatsLabel}
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {c.formats.map((f) => (
              <li key={f} className="py-4 font-serif text-2xl text-primary">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">{c.collabLabel}</div>
          <h2 className="font-serif text-3xl text-primary mb-4">{c.collabTitle}</h2>
          <p className="text-muted-foreground leading-relaxed">{c.collabBody}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {c.collabItems.map((i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider border border-border text-muted-foreground"
              >
                {i}
              </span>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center rounded-sm bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-[color:var(--milpa-deep)]"
          >
            {c.cta}
          </Link>
        </div>
      </section>

      {/* Trayectoria */}
      <section
        className="py-20"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial grid md:grid-cols-[1fr_1.2fr] gap-14 items-start">
          <div>
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
              {c.trackLabel}
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">{c.trackBody}</p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {c.trackItems.map((i) => (
              <li key={i} className="text-primary border-b border-border pb-3">
                — {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cierre */}
      <section className="container-editorial py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img
              src={classImage}
              alt="Hands-on learning with heirloom corn masa"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
              {c.closingTitle}
            </h2>
            <p className="text-muted-foreground mt-4">{c.closingLead}</p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {c.closingLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="flex items-center justify-between py-4 font-serif text-xl text-primary hover:text-[color:var(--milpa-deep)]"
                  >
                    {l.label} <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
