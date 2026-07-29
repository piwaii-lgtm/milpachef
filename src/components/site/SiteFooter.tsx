import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer
      className="mt-24 text-primary-foreground"
      style={{ backgroundColor: "var(--milpa-deep)" }}
    >
      <div className="container-editorial py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-serif text-3xl mb-3">Milpa Chef</div>
          <p className="text-primary-foreground/70 max-w-xs text-sm leading-relaxed">
            {t("footer.tagline")}
          </p>
        </div>
        <div>
          <div className="uppercase tracking-widest text-xs text-primary-foreground/50 mb-3">
            {t("nav.tours")}
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tours" className="hover:text-[color:var(--corn)]">{t("nav.tours")}</Link></li>
            <li><Link to="/about" className="hover:text-[color:var(--corn)]">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-[color:var(--corn)]">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="uppercase tracking-widest text-xs text-primary-foreground/50 mb-3">
            {t("contact.title")}
          </div>
          <ul className="space-y-2 text-sm">
            <li>Cholula, Puebla · México</li>
            <li><a href="mailto:hola@milpachef.com" className="hover:text-[color:var(--corn)]">hola@milpachef.com</a></li>
            <li>
              <a
                href="https://www.instagram.com/milpachef/"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[color:var(--corn)]"
              >
                @milpachef
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-editorial py-6 text-xs text-primary-foreground/50 flex justify-between">
          <span>{t("footer.rights")}</span>
          <span>Cholula · Puebla · MX</span>
        </div>
      </div>
    </footer>
  );
}