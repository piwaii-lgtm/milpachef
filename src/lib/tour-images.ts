import hero from "@/assets/hero-table.jpg";
import tortillas from "@/assets/tour-tortillas.jpg";
import street from "@/assets/tour-street.jpg";
import mezcal from "@/assets/tour-mezcal.jpg";
import market from "@/assets/story-market.jpg";
import classImg from "@/assets/tour-class.jpg";
import classCooking from "@/assets/class-cooking.jpg";
import classMarket from "@/assets/class-market.jpg";
import classDish from "@/assets/class-dish.jpg";

export const tourImages: Record<string, string> = {
  hero,
  tortillas,
  street,
  mezcal,
  market,
  class: classImg,
  "class-cooking": classCooking,
  "class-market": classMarket,
  "class-dish": classDish,
};

export const heroImage = hero;
export const marketImage = market;
export const classImage = classCooking;
export const classMarketImage = classMarket;
export const classDishImage = classDish;