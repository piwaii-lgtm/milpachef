import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/milpachef/", handle: "@milpachef" },
  { label: "Facebook", href: "https://www.facebook.com/milpachefmx/", handle: "/milpachefmx" },
  { label: "TikTok", href: "https://www.tiktok.com/@milpachef", handle: "@milpachef" },
];

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

  useEffect(() => {
    const src = "https://www.tiktok.com/embed.js";
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    document.body.appendChild(s);
  }, []);

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
            <a href="mailto:alfonso@milpachef.com" className="hover:text-accent">
              alfonso@milpachef.com
            </a>
          </dd>
        </div>
        {socials.map((s) => (
          <div key={s.label} className="grid grid-cols-3 py-6 items-baseline gap-4">
            <dt className="uppercase tracking-widest text-xs text-muted-foreground">{s.label}</dt>
            <dd className="col-span-2 font-serif text-2xl text-primary">
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-accent"
              >
                {s.handle}
              </a>
            </dd>
          </div>
        ))}
        <div className="grid grid-cols-3 py-6 items-baseline gap-4">
          <dt className="uppercase tracking-widest text-xs text-muted-foreground">Cholula, MX</dt>
          <dd className="col-span-2 text-muted-foreground">
            San Andrés &amp; San Pedro Cholula · meeting point shared upon reservation.
          </dd>
        </div>
      </dl>

      <div className="mt-20">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
          {t("contact.feedBadge")}
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight mb-8">
          {t("contact.feedTitle")}
        </h2>
        <div
          className="rounded-md border border-border overflow-hidden"
          style={{ backgroundColor: "color-mix(in oklab, var(--milpa) 6%, var(--cream))" }}
        >
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border">
            <div>
              <div className="font-serif text-xl text-primary leading-none">TikTok</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                @milpachef
              </div>
            </div>
            <a
              href="https://www.tiktok.com/@milpachef"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center rounded-sm bg-primary text-primary-foreground px-4 py-2 text-xs uppercase tracking-widest hover:brightness-110"
            >
              {t("contact.follow")}
            </a>
          </div>
          <div className="px-2 py-4 md:px-6 flex justify-center">
            <blockquote
              className="tiktok-embed w-full"
              cite="https://www.tiktok.com/@milpachef"
              data-unique-id="milpachef"
              data-embed-type="creator"
              style={{ maxWidth: 780, minWidth: 288 }}
            >
              <section>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.tiktok.com/@milpachef?refer=creator_embed"
                >
                  @milpachef
                </a>
              </section>
            </blockquote>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mt-6">
          {t("contact.feedNote")}{" "}
          <a
            href="https://www.instagram.com/milpachef/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent hover:underline"
          >
            @milpachef
          </a>
        </p>
      </div>
    </section>
  );
}