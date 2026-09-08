import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { fetchTours, type Tour, type TourDate } from "@/lib/tours";
import { TourCard } from "@/components/site/TourCard";
import { BookingDialog } from "@/components/site/BookingDialog";

const seoCopy = {
  en: {
    h1: "Cholula food tours, Puebla, Chiapas & Oaxaca food tours",
    lead: "Book a food tour in Cholula, Puebla, Chiapas or Oaxaca with Milpa Chef: small-group walking tours built around local producers, with up to ten tastings of heirloom corn, mole, mezcal and street food. Tours run year-round in English, Spanish and French.",
    intro: [
      "Our Cholula food tours, Puebla food tours, Chiapas food tours and Oaxaca food tours are built around the people who grow, mill, cook and sell the food: every stop is a market, molino, cocina or vendor we know by name.",
      "Groups stay small (max 10), walks last about 2.5 hours, and vegetarian versions are available on request.",
    ],
  },
  es: {
    h1: "Tours gastronómicos en Cholula, Puebla, Chiapas y Oaxaca",
    lead: "Reserva un food tour en Cholula, Puebla, Chiapas u Oaxaca con Milpa Chef: recorridos a pie en grupo pequeño centrados en productores locales, con hasta diez degustaciones de maíz criollo, mole, mezcal y comida de calle. Los tours se realizan todo el año en español, inglés y francés.",
    intro: [
      "Nuestros tours gastronómicos en Cholula, Puebla, Chiapas y Oaxaca se construyen alrededor de quienes cultivan, muelen, cocinan y venden la comida: cada parada es un mercado, un molino, una cocina o un puesto que conocemos por nombre.",
      "Grupos de máximo 10 personas, alrededor de 2.5 horas de caminata y versión vegetariana con aviso previo.",
    ],
  },
  fr: {
    h1: "Tours gastronomiques à Cholula, Puebla, Chiapas et Oaxaca",
    lead: "Réservez un food tour à Cholula, Puebla, Chiapas ou Oaxaca avec Milpa Chef : des balades gourmandes en petit groupe autour de producteurs locaux, avec jusqu'à dix dégustations de maïs criollo, mole, mezcal et cuisine de rue. Les tours ont lieu toute l'année en français, espagnol et anglais.",
    intro: [
      "Nos tours gastronomiques de Cholula, Puebla, Chiapas et Oaxaca se construisent autour des personnes qui cultivent, moulent, cuisinent et vendent : chaque arrêt est un marché, un moulin, une cuisine ou un stand que nous connaissons par son nom.",
      "Groupes de 10 personnes maximum, environ 2h30 de marche, et version végétarienne du tour gastronomique sur demande.",
    ],
  },
} as const;

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "Cholula Food Tours & Puebla, Chiapas, Oaxaca Food Tours — Milpa Chef" },
      {
        name: "description",
        content:
          "Book a Cholula food tour or a food tour in Puebla, Chiapas and Oaxaca with Milpa Chef: small-group walking tours with up to ten tastings. Dates in English, Spanish and French.",
      },
      { property: "og:title", content: "Cholula food tours & Puebla, Chiapas, Oaxaca food tours" },
      { property: "og:image", content: "https://milpachef.mx/og-milpachef.jpg" },
      { name: "twitter:image", content: "https://milpachef.mx/og-milpachef.jpg" },
      {
        property: "og:description",
        content:
          "Small-group Cholula food tours and food tours in Puebla, Chiapas and Oaxaca led by Milpa Chef. See upcoming dates and reserve online.",
      },
      { property: "og:url", content: "https://milpachef.mx/tours" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://milpachef.mx/tours" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: "Food Tours by Milpa Chef",
          description:
            "Small-group food tours through Cholula, Puebla, Chiapas and Oaxaca: markets, molinos and street vendors with up to ten tastings.",
          touristType: ["Food lovers", "Cultural travelers"],
          url: "https://milpachef.mx/tours",
          provider: {
            "@type": "Organization",
            name: "Milpa Chef",
            url: "https://milpachef.mx",
          },
          itinerary: {
            "@type": "ItemList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Cholula market and producers" },
              { "@type": "ListItem", position: 2, name: "Puebla molinos and street food" },
              { "@type": "ListItem", position: 3, name: "Chiapas coffee and cacao" },
              { "@type": "ListItem", position: 4, name: "Oaxaca mole and mezcal tastings" },
            ],
          },
        }),
      },
    ],
  }),
  component: ToursPage,
});

function ToursPage() {
  const { t, lang } = useI18n();
  const s = seoCopy[lang as keyof typeof seoCopy] ?? seoCopy.en;
  const [booking, setBooking] = useState<{ tour: Tour; date: TourDate } | null>(null);
  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["tours", "food-tours"],
    queryFn: () => fetchTours(24, "tour"),
  });

  return (
    <section className="container-editorial py-16 md:py-24">
      <div className="max-w-3xl mb-16">
        <div className="uppercase tracking-[0.3em] text-xs text-accent mb-4">
          {t("agenda.title")}
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-primary leading-tight mb-4">
          {s.h1}
        </h1>
        <p className="text-muted-foreground text-lg">{s.lead}</p>
        {s.intro.map((p) => (
          <p key={p} className="text-muted-foreground mt-4 leading-relaxed">
            {p}
          </p>
        ))}
      </div>


      {isLoading ? (
        <div className="text-muted-foreground">…</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onBook={(tour, date) => setBooking({ tour, date })} />
          ))}
        </div>
      )}

      <BookingDialog
        tour={booking?.tour ?? null}
        date={booking?.date ?? null}
        open={!!booking}
        onClose={() => setBooking(null)}
      />

      {/* Tastings + practical info (tours only) */}
      <div className="mt-24 md:mt-32 border-t border-border pt-16">
        <div className="max-w-2xl mb-12">
          <div className="uppercase tracking-[0.3em] text-xs text-accent mb-3">
            {t("tastings.title")}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
            {t("tastings.title")}
          </h2>
          <p className="text-muted-foreground mt-3">{t("tastings.subtitle")}</p>
        </div>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6">
          {[
            "t.nahuatl",
            "t.pulque",
            "t.crickets",
            "t.mole",
            "t.mezcal",
            "t.coffee",
            "t.beer",
            "t.cocktail",
            "t.sweets",
            "t.icecream",
          ].map((k) => (
            <li key={k} className="border-t border-accent/40 pt-3">
              <div className="font-serif text-lg text-primary leading-snug">{t(k)}</div>
            </li>
          ))}
        </ul>
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="border-l-2 border-accent pl-6">
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-2">
              {t("meet.title")}
            </div>
            <p className="font-serif text-xl text-primary">{t("meet.value")}</p>
          </div>
          <div className="border-l-2 border-accent pl-6">
            <div className="uppercase tracking-[0.3em] text-xs text-accent mb-2">
              {t("cancel.title")}
            </div>
            <p className="font-serif text-xl text-primary">{t("cancel.body")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
