import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n, type Lang } from "@/lib/i18n";
import logoAsset from "@/assets/milpa-chef-logo.png.asset.json";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const langs: Lang[] = ["en", "es", "fr"];
  const [open, setOpen] = useState(false);
  const linkCls =
    "text-[11px] xl:text-sm tracking-wide uppercase whitespace-nowrap text-primary/70 hover:text-primary transition-colors";
  const activeCls = "text-primary";
  const items: { to: string; label: string; exact?: boolean }[] = [
    { to: "/", label: t("nav.home"), exact: true },
    { to: "/philosophy", label: t("nav.philosophy") },
    { to: "/experiences", label: t("nav.experiences") },
    { to: "/academy", label: t("nav.academy") },
    { to: "/consulting", label: t("nav.consulting") },
    { to: "/products", label: t("nav.products") },
    { to: "/resources", label: t("nav.resources") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="border-b border-border/60 bg-background/85 backdrop-blur sticky top-0 z-40">
      <div className="container-editorial flex items-center justify-between gap-3 h-16">
        <Link to="/" className="flex items-center" aria-label="Milpa Chef — home">
          <img
            src={logoAsset.url}
            alt="Milpa Chef"
            className="h-10 md:h-11 w-auto"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6">
          {items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className={linkCls}
              activeProps={{ className: activeCls }}
              activeOptions={i.exact ? { exact: true } : undefined}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 xl:gap-4">
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