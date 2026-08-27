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
import chefMilpaAsset from "@/assets/chef-milpa.png.asset.json";
import chefGroupTableAsset from "@/assets/chef-group-table-aesthetic.jpg.asset.json";
import expHeroAsset from "@/assets/exp-hero.jpg.asset.json";
import expTableAsset from "@/assets/exp-table.jpg.asset.json";
import expClassesAsset from "@/assets/exp-classes.jpg.asset.json";
import expPrivateAsset from "@/assets/exp-private.jpg.asset.json";
import expTerritorioAsset from "@/assets/exp-territorio.jpg.asset.json";
import expProductoresAsset from "@/assets/exp-productores.jpg.asset.json";
import expCulturaAsset from "@/assets/exp-cultura.jpg.asset.json";
import expConocimientoAsset from "@/assets/exp-conocimiento.jpg.asset.json";
import acadHeroAsset from "@/assets/acad-hero.jpg.asset.json";
import acadBeijingAsset from "@/assets/acad-beijing.jpg.asset.json";
import acadSlowfoodAsset from "@/assets/acad-slowfood.jpg.asset.json";
import philTourAsset from "@/assets/phil-tour.jpg.asset.json";
import philMercadoAsset from "@/assets/phil-mercado.jpg.asset.json";
import philAprendeAsset from "@/assets/phil-aprende.jpg.asset.json";
import philExperienciasAsset from "@/assets/phil-experiencias.jpg.asset.json";

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
  "chef-milpa": chefMilpaAsset.url,
  "chef-group-table": chefGroupTableAsset.url,
  "exp-hero": expHeroAsset.url,
  "exp-table": expTableAsset.url,
  "exp-classes": expClassesAsset.url,
  "exp-private": expPrivateAsset.url,
  "exp-territorio": expTerritorioAsset.url,
  "exp-productores": expProductoresAsset.url,
  "exp-cultura": expCulturaAsset.url,
  "exp-conocimiento": expConocimientoAsset.url,
  "acad-hero": acadHeroAsset.url,
  "acad-beijing": acadBeijingAsset.url,
  "acad-slowfood": acadSlowfoodAsset.url,
  "phil-tour": philTourAsset.url,
  "phil-mercado": philMercadoAsset.url,
  "phil-aprende": philAprendeAsset.url,
  "phil-experiencias": philExperienciasAsset.url,
};

export const heroImage = hero;
export const marketImage = chefMarketAsset.url;
export const classImage = classCooking;
export const classMarketImage = classMarket;
export const classDishImage = classDish;