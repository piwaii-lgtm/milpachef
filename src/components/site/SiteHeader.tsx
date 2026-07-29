import { Link } from "@tanstack/react-router";
import { useI18n, type Lang } from "@/lib/i18n";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const langs: Lang[] = ["en", "es", "fr"];
  const linkCls =
    "text-sm tracking-wide uppercase text-primary/70 hover:text-primary transition-colors";
  const activeCls = "text-primary";

  return (
    <header className="border-b border-border/60 bg-background/85 backdrop-blur sticky top-0 z-40">
      <div className="container-editorial flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-sm flex items-center justify-center text-primary-foreground font-serif text-xl"
            style={{ backgroundColor: "var(--milpa)" }}
          >
            M
          </span>
          <span className="font-serif text-xl text-primary leading-none">Milpa Chef</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkCls} activeProps={{ className: activeCls }} activeOptions={{ exact: true }}>
            {t("nav.home")}
          </Link>
          <Link to="/tours" className={linkCls} activeProps={{ className: activeCls }}>
            {t("nav.tours")}
          </Link>
          <Link to="/about" className={linkCls} activeProps={{ className: activeCls }}>
            {t("nav.about")}
          </Link>
          <Link to="/contact" className={linkCls} activeProps={{ className: activeCls }}>
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground" aria-label={t("lang.label")}>
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={
                  "px-2 py-1 rounded-sm uppercase tracking-wider transition-colors " +
                  (lang === l ? "text-primary font-medium" : "text-muted-foreground hover:text-primary")
                }
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            to="/tours"
            className="hidden sm:inline-flex items-center rounded-sm bg-primary text-primary-foreground text-sm px-4 py-2 hover:bg-[color:var(--milpa-deep)] transition-colors"
          >
            {t("nav.book")}
          </Link>
        </div>
      </div>
    </header>
  );
}