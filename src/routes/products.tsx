import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { PRODUCTS, CATEGORY_LABEL, type ProductCategory } from "@/lib/products";
import { productsPage } from "@/lib/section-copy";
import { Link } from "@tanstack/react-router";

const WHATSAPP_NUMBER = "5222217068200"; // +52 222 170 6820 (from catalog)

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Selección MilpaChef® — ancestral Mexican ingredients" },
      {
        name: "description",
        content:
          "Selección MilpaChef®: a curated catalog of ancestral Mexican ingredients with territorial identity — mountain salt, heirloom beans, Simojovel chile, cacao, chicatana ants, aguamiel and more, shipped across Mexico.",
      },
      { property: "og:title", content: "Selección MilpaChef® — ingredients with a story" },
      {
        property: "og:description",
        content:
          "Foods with territorial identity that preserve Mexico's biocultural heritage.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/products" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const COPY = {
  eyebrow: {
    en: "Catalog · Ancestral foods from Chiapas & Puebla",
    es: "Catálogo · Alimentos ancestrales de Chiapas y Puebla",
    fr: "Catalogue · Aliments ancestraux du Chiapas et de Puebla",
  },
  title: {
    en: "The pantry behind the tour.",
    es: "La despensa detrás del tour.",
    fr: "Le garde-manger derrière la balade.",
  },
  subtitle: {
    en: "A curated selection of heirloom ingredients that Alfonso sources directly from producer communities. Prices in MXN, ex-Cholula — shipping quoted on request.",
    es: "Selección de ingredientes que Alfonso trae directo de las comunidades productoras. Precios en MXN, puestos en Cholula — el envío se cotiza a la medida.",
    fr: "Une sélection d'ingrédients ancestraux qu'Alfonso sourcé directement auprès des communautés productrices. Prix en MXN, départ Cholula — livraison sur devis.",
  },
  all: { en: "All", es: "Todos", fr: "Tous" },
  origin: { en: "Origin", es: "Origen", fr: "Origine" },
  prices: { en: "Prices (MXN)", es: "Precios (MXN)", fr: "Prix (MXN)" },
  order: { en: "Order on WhatsApp", es: "Pedir por WhatsApp", fr: "Commander sur WhatsApp" },
  faqTitle: { en: "How to order", es: "Cómo pedir", fr: "Comment commander" },
  faqPay: {
    en: "Bank transfer (invoicing available on request).",
    es: "Transferencia bancaria (facturamos si lo necesitas).",
    fr: "Virement bancaire (facturation sur demande).",
  },
  faqShip: {
    en: "All prices are ex-Cholula (San Pedro / San Andrés). Shipping is quoted per order based on volume and destination.",
    es: "Los precios están puestos en Cholula (San Pedro / San Andrés). El costo de envío se cotiza según el pedido y destino.",
    fr: "Les prix s'entendent départ Cholula (San Pedro / San Andrés). Les frais de livraison sont calculés par commande, selon le volume et la destination.",
  },
  contactLine: {
    en: "WhatsApp / phone",
    es: "WhatsApp / teléfono",
    fr: "WhatsApp / téléphone",
  },
} as const;

function ProductsPage() {
  const { lang } = useI18n();
  const [cat, setCat] = useState<ProductCategory | "all">("all");

  const categories = useMemo(() => {
    const set = new Set<ProductCategory>(PRODUCTS.map((p) => p.category));
    return Array.from(set);
  }, []);

  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--milpa-deep)" }}
      >
        <div className="relative container-editorial py-20 md:py-28 text-primary-foreground">
          <div className="max-w-2xl">
            <div className="uppercase tracking-[0.3em] text-xs text-[color:var(--corn)] mb-4">
              {COPY.eyebrow[lang]}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-4">
              {COPY.title[lang]}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              {COPY.subtitle[lang]}
            </p>
          </div>
        </div>
      </section>

      <section className="container-editorial py-12 md:py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          <FilterPill active={cat === "all"} onClick={() => setCat("all")}>
            {COPY.all[lang]}
          </FilterPill>
          {categories.map((c) => (
            <FilterPill key={c} active={cat === c} onClick={() => setCat(c)}>
              {CATEGORY_LABEL[c][lang]}
            </FilterPill>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const msg = encodeURIComponent(
              lang === "es"
                ? `Hola Milpa Chef, me interesa: ${p.name.es}.`
                : lang === "fr"
                  ? `Bonjour Milpa Chef, je suis intéressé(e) par : ${p.name.fr}.`
                  : `Hi Milpa Chef, I'm interested in: ${p.name.en}.`,
            );
            return (
              <article
                key={p.slug}
                className="flex flex-col bg-card border border-border/60 rounded-sm overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.name[lang]}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <div className="uppercase tracking-[0.2em] text-[10px] text-[color:var(--milpa)] mb-2">
                      {CATEGORY_LABEL[p.category][lang]}
                    </div>
                    <h2 className="font-serif text-2xl leading-tight text-primary">
                      {p.name[lang]}
                    </h2>
                    {p.scientific && (
                      <div className="italic text-xs text-muted-foreground mt-1">
                        {p.scientific}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description[lang]}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <span className="uppercase tracking-wider">{COPY.origin[lang]}: </span>
                    {p.origin}
                  </div>
                  <div className="border-t border-border/60 pt-4">
                    <div className="uppercase tracking-[0.2em] text-[10px] text-muted-foreground mb-2">
                      {COPY.prices[lang]}
                    </div>
                    <ul className="space-y-1 text-sm">
                      {p.prices.map((pr) => (
                        <li key={pr.label} className="flex justify-between gap-4">
                          <span className="text-foreground/80">{pr.label}</span>
                          <span className="font-medium text-primary">{pr.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center justify-center rounded-sm bg-primary text-primary-foreground text-sm px-4 py-2 hover:bg-[color:var(--milpa-deep)] transition-colors"
                  >
                    {COPY.order[lang]}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 border-t border-border/60 pt-10 max-w-2xl">
          <h3 className="font-serif text-2xl text-primary mb-3">{COPY.faqTitle[lang]}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>{COPY.faqPay[lang]}</li>
            <li>{COPY.faqShip[lang]}</li>
            <li>
              <span className="uppercase tracking-wider text-xs text-foreground/70">
                {COPY.contactLine[lang]}:{" "}
              </span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="underline text-primary"
              >
                +52 222 170 6820
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-colors " +
        (active
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border text-muted-foreground hover:text-primary hover:border-primary/60")
      }
    >
      {children}
    </button>
  );
}