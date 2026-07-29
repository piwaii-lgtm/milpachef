import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Milpa Chef — Private food tours in Cholula" },
      {
        name: "description",
        content:
          "Get in touch for private food tours, chef's table dinners and custom Cholula itineraries with Milpa Chef.",
      },
      { property: "og:title", content: "Contact Milpa Chef" },
      {
        property: "og:description",
        content: "Private tours, chef's table, custom itineraries in Cholula.",
      },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  return (
    <section className="container-editorial py-16 md:py-24 max-w-3xl">
      <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
        {t("nav.contact")}
      </div>
      <h1 className="font-serif text-4xl md:text-6xl text-primary leading-tight mb-6">
        {t("contact.title")}
      </h1>
      <p className="text-muted-foreground text-lg mb-10">{t("contact.body")}</p>

      <dl className="divide-y divide-border border-y border-border">
        <div className="grid grid-cols-3 py-6 items-baseline gap-4">
          <dt className="uppercase tracking-widest text-xs text-muted-foreground">Email</dt>
          <dd className="col-span-2 font-serif text-2xl text-primary">
            <a href="mailto:hola@milpachef.com" className="hover:text-accent">hola@milpachef.com</a>
          </dd>
        </div>
        <div className="grid grid-cols-3 py-6 items-baseline gap-4">
          <dt className="uppercase tracking-widest text-xs text-muted-foreground">Instagram</dt>
          <dd className="col-span-2 font-serif text-2xl text-primary">
            <a
              href="https://www.instagram.com/milpachef/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-accent"
            >
              @milpachef
            </a>
          </dd>
        </div>
        <div className="grid grid-cols-3 py-6 items-baseline gap-4">
          <dt className="uppercase tracking-widest text-xs text-muted-foreground">Cholula, MX</dt>
          <dd className="col-span-2 text-muted-foreground">
            San Andrés &amp; San Pedro Cholula · meeting point shared upon reservation.
          </dd>
        </div>
      </dl>
    </section>
  );
}