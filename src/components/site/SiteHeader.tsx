import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n, type Lang } from "@/lib/i18n";
import logoAsset from "@/assets/milpa-chef-logo.png.asset.json";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const langs: Lang[] = ["en", "es", "fr"];
  const [open, setOpen] = useState(false);
  const linkCls =
    "text-sm tracking-wide uppercase text-primary/70 hover:text-primary transition-colors";
  const activeCls = "text-primary";
  const items = [
    { to: "/", label: t("nav.home"), exact: true },
    { to: "/tours", label: t("nav.tours") },
    { to: "/classes", label: t("nav.classes") },
    { to: "/products", label: t("nav.products") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className="border-b border-border/60 bg-background/85 backdrop-blur sticky top-0 z-40">
      <div className="container-editorial flex items-center justify-between h-16">
        <Link to="/" className="flex items-center" aria-label="Milpa Chef — home">
          <img
            src={logoAsset.url}
            alt="Milpa Chef"
            className="h-10 md:h-11 w-auto"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkCls} activeProps={{ className: activeCls }} activeOptions={{ exact: true }}>
            {t("nav.home")}
          </Link>
          <Link to="/tours" className={linkCls} activeProps={{ className: activeCls }}>
            {t("nav.tours")}
          </Link>
          <Link to="/classes" className={linkCls} activeProps={{ className: activeCls }}>
            {t("nav.classes")}
          </Link>
          <Link to="/products" className={linkCls} activeProps={{ className: activeCls }}>
            {t("nav.products")}
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
            to="/reserve"
            className="hidden sm:inline-flex items-center rounded-sm bg-primary text-primary-foreground text-sm px-4 py-2 hover:bg-[color:var(--milpa-deep)] transition-colors"
          >
            {t("nav.book")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t("nav.menu")}
            className="md:hidden inline-flex flex-col justify-center gap-1.5 p-2 text-primary"
          >
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/60 bg-background">
          <ul className="container-editorial py-4 flex flex-col gap-3">
            {items.map((i) => (
              <li key={i.to}>
                <Link
                  to={i.to}
                  onClick={() => setOpen(false)}
                  className={linkCls}
                  activeProps={{ className: activeCls }}
                  activeOptions={i.exact ? { exact: true } : undefined}
                >
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/reserve"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-sm bg-primary text-primary-foreground text-sm px-4 py-2"
              >
                {t("nav.book")}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}