import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import logoAsset from "@/assets/milpa-chef-logo.png.asset.json";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer
      className="mt-24 text-primary-foreground"
      style={{ backgroundColor: "var(--milpa-deep)" }}
    >
      <div className="container-editorial py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <img
            src={logoAsset.url}
            alt="Milpa Chef"
            className="h-16 w-auto mb-4 brightness-0 invert opacity-95"
            loading="lazy"
          />
          <p className="text-primary-foreground/70 max-w-xs text-sm leading-relaxed">
            {t("footer.tagline")}
          </p>
          <p className="mt-3 font-serif italic text-[color:var(--corn)]">{t("brand.motto")}</p>
        </div>
        <div>
          <div className="uppercase tracking-widest text-xs text-primary-foreground/50 mb-3">
            {t("footer.experiences")}
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tours" className="hover:text-[color:var(--corn)]">{t("nav.tours")}</Link></li>
            <li><Link to="/classes" className="hover:text-[color:var(--corn)]">{t("nav.classes")}</Link></li>
            <li><Link to="/reserve" className="hover:text-[color:var(--corn)]">{t("footer.reserve")}</Link></li>
          </ul>
          <div className="uppercase tracking-widest text-xs text-primary-foreground/50 mt-6 mb-3">
            {t("footer.shop")}
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-[color:var(--corn)]">{t("nav.products")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="uppercase tracking-widest text-xs text-primary-foreground/50 mb-3">
            {t("footer.company")}
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[color:var(--corn)]">{t("nav.home")}</Link></li>
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
            <li><a href="mailto:alfonso@milpachef.com" className="hover:text-[color:var(--corn)]">alfonso@milpachef.com</a></li>
            <li>
              <a
                href="https://wa.me/522221706820"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[color:var(--corn)]"
              >
                WhatsApp · +52 222 170 6820
              </a>
            </li>
          </ul>
          <div className="uppercase tracking-widest text-xs text-primary-foreground/50 mt-6 mb-3">
            {t("footer.follow")}
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.instagram.com/milpachef/"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[color:var(--corn)]"
              >
                Instagram · @milpachef
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/milpachefmx/"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[color:var(--corn)]"
              >
                Facebook · /milpachefmx
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@milpachef"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[color:var(--corn)]"
              >
                TikTok · @milpachef
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