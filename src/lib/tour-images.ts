import hero from "@/assets/hero-table.jpg";
import tortillas from "@/assets/tour-tortillas.jpg";
import street from "@/assets/tour-street.jpg";
import mezcal from "@/assets/tour-mezcal.jpg";
import market from "@/assets/story-market.jpg";
import classImg from "@/assets/tour-class.jpg";
import classCooking from "@/assets/class-cooking.jpg";
import classMarket from "@/assets/class-market.jpg";
import classDish from "@/assets/class-dish.jpg";
import chefMarketAsset from "@/assets/chef-market.png.asset.json";
import classCoasterAsset from "@/assets/class-coaster.jpeg.asset.json";

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
  "class-coaster": classCoasterAsset.url,
};

export const heroImage = hero;
export const marketImage = chefMarketAsset.url;
export const classImage = classCooking;
export const classMarketImage = classMarket;
export const classDishImage = classDish;