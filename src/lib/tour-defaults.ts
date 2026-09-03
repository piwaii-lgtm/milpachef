import type { TourInput } from "@/lib/tours.functions";

/** Generic photo + copy applied automatically when a new event card is added. */
export const TOUR_DEFAULTS: Record<"tour" | "class", Omit<TourInput, "tour_date" | "slug">> = {
  tour: {
    title: "Gastro Tour by Milpa Chef",
    duration_minutes: 150,
    meeting_point: "Restaurante Milli cocina de maíces, Cholula",
    capacity: 10,
    spots_left: 10,
    price_mxn: 595,
    image_key: "hero",
    image_url: null,
    category: "tour",
    description_en:
      "Walk Cholula with Alfonso and taste the flavours of the milpa: heirloom corn, street antojitos, salsas and mezcal, with the stories behind every bite.",
    description_es:
      "Recorre Cholula con Alfonso y prueba los sabores de la milpa: maíces criollos, antojitos de calle, salsas y mezcal, con la historia detrás de cada bocado.",
    description_fr:
      "Parcourez Cholula avec Alfonso et goûtez aux saveurs de la milpa : maïs créoles, antojitos de rue, salsas et mezcal, avec l'histoire derrière chaque bouchée.",
  },
  class: {
    title: "Cooking Class — Cholula traditional dishes",
    duration_minutes: 240,
    meeting_point: "Restaurante Milli cocina de maíces, Cholula",
    capacity: 8,
    spots_left: 8,
    price_mxn: 1295,
    image_key: "class-cooking",
    image_url: null,
    category: "class",
    description_en:
      "Cook traditional Cholula dishes hands-on with Alfonso: nixtamal and fresh tortillas, salsas de molcajete and a seasonal main, then share the table.",
    description_es:
      "Cocina platillos tradicionales de Cholula con Alfonso: nixtamal y tortillas hechas a mano, salsas de molcajete y un plato de temporada, para compartir en la mesa.",
    description_fr:
      "Cuisinez des plats traditionnels de Cholula avec Alfonso : nixtamal et tortillas fraîches, salsas au molcajete et un plat de saison, puis partagez la table.",
  },
};

export function defaultSlug(category: "tour" | "class", date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const rand = Math.random().toString(36).slice(2, 5);
  return `${category === "class" ? "cooking-class" : "gastro-tour"}-${stamp}-${rand}`;
}