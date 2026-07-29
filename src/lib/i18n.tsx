import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es" | "fr";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.tours": "Tours",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.book": "Reserve a spot",
  "hero.eyebrow": "Cholula, Puebla · Slow Food",
  "hero.title": "A three-hour walk through Cholula's living food scene.",
  "hero.subtitle": "Gastro Tour by Milpa Chef. Six tasting stops, one town told through its cooks, farmers and mezcaleros.",
  "hero.cta": "See upcoming tours",
  "hero.secondary": "Read our story",
  "hero.price": "MXN $450 · ~3 hours · Small group of 10",
  "about.title": "Food is how Cholula tells its story.",
  "about.body": "Milpa Chef is a Cholula-based cook and Slow Food advocate. Every tour is built around producers she trusts — heirloom-corn farmers, mole grandmothers, mezcal families — and everything you taste is sourced with intention. No rushing between photo spots. Just good food, honest people, and the stories behind them.",
  "about.pillar1.title": "Sourced with intention",
  "about.pillar1.body": "Native corn, seasonal produce, family-run molinos. Slow Food principles guide every stop.",
  "about.pillar2.title": "Small groups, real conversations",
  "about.pillar2.body": "Max 10 guests. You'll sit at market counters and actually talk to the cooks.",
  "about.pillar3.title": "One town, six tastes",
  "about.pillar3.body": "From morning atole to evening mezcal, a portrait of Cholula in six generous stops.",
  "agenda.title": "Upcoming tours",
  "agenda.subtitle": "Reserve a spot on the next Gastro Tour. Vegetarian option available on request.",
  "agenda.spotsLeft": "spots left",
  "agenda.soldOut": "Sold out",
  "agenda.book": "Reserve",
  "agenda.viewAll": "View full agenda",
  "agenda.meetingPoint": "Meeting point",
  "agenda.duration": "Duration",
  "agenda.durationValue": "~3 hours",
  "testimonials.title": "What guests say",
  "book.title": "Reserve your spot",
  "book.subtitle": "You'll receive a confirmation by email. Payment is completed at checkout.",
  "book.name": "Full name",
  "book.email": "Email",
  "book.party": "Number of guests",
  "book.notes": "Dietary notes (optional)",
  "book.submit": "Continue to payment",
  "book.submitting": "Reserving…",
  "book.total": "Total",
  "book.success": "Reservation received!",
  "book.successBody": "We've saved your spot. A confirmation email is on its way with the payment link.",
  "book.error": "Something went wrong. Please try again.",
  "book.close": "Close",
  "contact.title": "Get in touch",
  "contact.body": "Private tours, chef's table dinners, custom itineraries — write us and we'll design something for you.",
  "contact.email": "hola@milpachef.com",
  "contact.instagram": "Follow on Instagram",
  "footer.tagline": "Food tours in Cholula, cooked with intention.",
  "footer.rights": "© Milpa Chef. All rights reserved.",
  "lang.label": "Language",
};

const es: Dict = {
  "nav.home": "Inicio",
  "nav.tours": "Tours",
  "nav.about": "Nosotros",
  "nav.contact": "Contacto",
  "nav.book": "Reservar",
  "hero.eyebrow": "Cholula, Puebla · Slow Food",
  "hero.title": "Tres horas caminando por la escena gastronómica viva de Cholula.",
  "hero.subtitle": "Gastro Tour por Milpa Chef. Seis paradas, un pueblo contado a través de sus cocineras, campesinos y mezcaleros.",
  "hero.cta": "Ver próximos tours",
  "hero.secondary": "Nuestra historia",
  "hero.price": "MXN $450 · ~3 horas · Grupo pequeño de 10",
  "about.title": "La comida es como Cholula cuenta su historia.",
  "about.body": "Milpa Chef es cocinera cholulteca y activista de Slow Food. Cada tour se construye alrededor de productores de confianza — familias de maíz nativo, abuelas del mole, casas de mezcal — y todo lo que pruebas está elegido con intención. Sin correr entre fotos. Sólo buena comida, gente honesta y las historias detrás.",
  "about.pillar1.title": "Origen con intención",
  "about.pillar1.body": "Maíz nativo, producto de temporada, molinos familiares. Los principios de Slow Food guían cada parada.",
  "about.pillar2.title": "Grupos pequeños, conversaciones reales",
  "about.pillar2.body": "Máximo 10 personas. Te sientas en las barras del mercado y platicas con quien cocina.",
  "about.pillar3.title": "Un pueblo, seis sabores",
  "about.pillar3.body": "Del atole de la mañana al mezcal del atardecer: un retrato de Cholula en seis paradas generosas.",
  "agenda.title": "Próximos tours",
  "agenda.subtitle": "Reserva tu lugar en el próximo Gastro Tour. Opción vegetariana con aviso previo.",
  "agenda.spotsLeft": "lugares",
  "agenda.soldOut": "Agotado",
  "agenda.book": "Reservar",
  "agenda.viewAll": "Ver agenda completa",
  "agenda.meetingPoint": "Punto de encuentro",
  "agenda.duration": "Duración",
  "agenda.durationValue": "~3 horas",
  "testimonials.title": "Lo que dicen quienes vinieron",
  "book.title": "Reserva tu lugar",
  "book.subtitle": "Recibirás un correo de confirmación. El pago se completa en el checkout.",
  "book.name": "Nombre completo",
  "book.email": "Correo",
  "book.party": "Número de personas",
  "book.notes": "Notas dietéticas (opcional)",
  "book.submit": "Continuar al pago",
  "book.submitting": "Reservando…",
  "book.total": "Total",
  "book.success": "¡Reserva recibida!",
  "book.successBody": "Guardamos tu lugar. Te enviamos un correo con el enlace de pago.",
  "book.error": "Algo salió mal. Intenta de nuevo.",
  "book.close": "Cerrar",
  "contact.title": "Escríbenos",
  "contact.body": "Tours privados, cenas de chef's table, itinerarios a la medida — escríbenos y diseñamos algo para ti.",
  "contact.email": "hola@milpachef.com",
  "contact.instagram": "Síguenos en Instagram",
  "footer.tagline": "Tours gastronómicos en Cholula, cocinados con intención.",
  "footer.rights": "© Milpa Chef. Todos los derechos reservados.",
  "lang.label": "Idioma",
};

const fr: Dict = {
  "nav.home": "Accueil",
  "nav.tours": "Balades",
  "nav.about": "À propos",
  "nav.contact": "Contact",
  "nav.book": "Réserver",
  "hero.eyebrow": "Cholula, Puebla · Slow Food",
  "hero.title": "Trois heures dans la scène culinaire vivante de Cholula.",
  "hero.subtitle": "Gastro Tour par Milpa Chef. Six dégustations, une ville racontée par ses cuisinières, paysans et mezcaleros.",
  "hero.cta": "Voir les prochaines dates",
  "hero.secondary": "Notre histoire",
  "hero.price": "450 MXN · ~3 heures · Petit groupe de 10",
  "about.title": "La cuisine, c'est ainsi que Cholula raconte son histoire.",
  "about.body": "Milpa Chef est cheffe à Cholula et militante Slow Food. Chaque balade tourne autour de producteurs de confiance — familles de maïs ancien, grand-mères du mole, familles de mezcal — et tout ce que vous goûtez est choisi avec intention. Pas de course entre spots photo. Juste de la bonne cuisine, des gens sincères et leurs histoires.",
  "about.pillar1.title": "Approvisionnement engagé",
  "about.pillar1.body": "Maïs ancien, produits de saison, moulins familiaux. Les principes Slow Food guident chaque arrêt.",
  "about.pillar2.title": "Petits groupes, vraies rencontres",
  "about.pillar2.body": "10 personnes maximum. On s'assoit au comptoir et on parle vraiment avec les cuisinières.",
  "about.pillar3.title": "Une ville, six goûts",
  "about.pillar3.body": "De l'atole du matin au mezcal du soir : un portrait de Cholula en six étapes généreuses.",
  "agenda.title": "Prochaines dates",
  "agenda.subtitle": "Réservez votre place. Option végétarienne sur demande.",
  "agenda.spotsLeft": "places",
  "agenda.soldOut": "Complet",
  "agenda.book": "Réserver",
  "agenda.viewAll": "Voir toutes les dates",
  "agenda.meetingPoint": "Point de rendez-vous",
  "agenda.duration": "Durée",
  "agenda.durationValue": "~3 heures",
  "testimonials.title": "Ils y sont allés",
  "book.title": "Réservez votre place",
  "book.subtitle": "Vous recevrez une confirmation par email. Le paiement se fait au checkout.",
  "book.name": "Nom complet",
  "book.email": "Email",
  "book.party": "Nombre de personnes",
  "book.notes": "Régime alimentaire (optionnel)",
  "book.submit": "Continuer vers le paiement",
  "book.submitting": "Réservation…",
  "book.total": "Total",
  "book.success": "Réservation reçue !",
  "book.successBody": "Nous avons gardé votre place. Un email arrive avec le lien de paiement.",
  "book.error": "Quelque chose a mal tourné. Réessayez.",
  "book.close": "Fermer",
  "contact.title": "Contactez-nous",
  "contact.body": "Balades privées, chef's table, itinéraires sur mesure — écrivez-nous et on imagine quelque chose pour vous.",
  "contact.email": "hola@milpachef.com",
  "contact.instagram": "Suivez sur Instagram",
  "footer.tagline": "Balades gourmandes à Cholula, cuisinées avec intention.",
  "footer.rights": "© Milpa Chef. Tous droits réservés.",
  "lang.label": "Langue",
};

const dicts: Record<Lang, Dict> = { en, es, fr };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("mc.lang") : null;
    if (stored === "en" || stored === "es" || stored === "fr") {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("mc.lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  const t = (key: string) => dicts[lang][key] ?? dicts.en[key] ?? key;
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}