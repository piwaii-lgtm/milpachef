import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { getArea, getAreas, type AreaSlug } from "@/lib/platform";

type Props = {
  slug: AreaSlug;
  image: string;
  imageAlt: string;
  /** Where the primary call to action leads. */
  ctaTo?: string;
};

export function AreaPage({ slug, image, imageAlt, ctaTo = "/contact" }: Props) {
  const { t, lang } = useI18n();
  const area = getArea(lang, slug);
  const others = getAreas(lang).filter((a) => a.slug !== slug);

  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundColor: "var(--milpa-deep)" }}>
        <div className="absolute inset-0 opacity-30">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-editorial py-24 md:py-32 text-primary-foreground">
          <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-5">
            {area.number} · MilpaChef®
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] max-w-3xl">{area.title}</h1>
          <p className="font-serif italic text-xl md:text-2xl text-[color:var(--corn)] mt-5">
            {area.tagline}
          </p>
          <p className="text-primary-foreground/80 max-w-2xl mt-6 text-lg leading-relaxed">
            {area.body}
          </p>
          <Link
            to={ctaTo}
            className="mt-9 inline-flex items-center rounded-sm bg-[color:var(--corn)] text-primary px-6 py-3 text-sm font-medium hover:brightness-95"
          >
            {area.cta}
          </Link>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-24 grid md:grid-cols-2 gap-16">
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-6">
            {t("platform.includes")}
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {area.includes.map((item) => (
              <li key={item} className="py-4 font-serif text-2xl text-primary">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-6">
            {t("platform.circle.title")}
          </div>
          <p className="text-muted-foreground leading-relaxed">{t("platform.circle.body")}</p>
          <div className="aspect-[4/3] overflow-hidden rounded-md mt-8">
            <img src={image} alt={imageAlt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section
        className="py-20"
        style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 8%, var(--cream))" }}
      >
        <div className="container-editorial">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-8">
            {t("platform.areas")}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {others.map((a) => (
              <Link key={a.slug} to={a.to} className="border-t-2 border-accent pt-4 group">
                <div className="text-xs text-muted-foreground tracking-widest mb-1">{a.number}</div>
                <div className="font-serif text-xl text-primary group-hover:text-[color:var(--milpa-deep)]">
                  {a.title}
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
