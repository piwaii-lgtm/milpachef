import type { AdminProduct, Price } from "@/lib/products.functions";

export type ProductCategory =
  | "salt"
  | "beans"
  | "chile"
  | "seed"
  | "cacao"
  | "insect"
  | "spirit"
  | "sweetener";

export type { Price };

export type Product = {
  slug: string;
  category: ProductCategory;
  origin: string;
  image: string;
  name: { en: string; es: string; fr: string };
  scientific?: string;
  description: { en: string; es: string; fr: string };
  prices: Price[];
};

/** Maps a database row into the shape the public catalog renders. */
export function toProduct(row: AdminProduct): Product {
  return {
    slug: row.slug,
    category: row.category as ProductCategory,
    origin: row.origin,
    image: row.image_url,
    scientific: row.scientific ?? undefined,
    name: { en: row.name_en, es: row.name_es, fr: row.name_fr },
    description: { en: row.description_en, es: row.description_es, fr: row.description_fr },
    prices: Array.isArray(row.prices) ? row.prices : [],
  };
}

export const CATEGORY_LABEL: Record<ProductCategory, { en: string; es: string; fr: string }> = {
  salt: { en: "Salt", es: "Sal", fr: "Sel" },
  beans: { en: "Heirloom beans", es: "Frijoles endémicos", fr: "Haricots endémiques" },
  chile: { en: "Chile", es: "Chile", fr: "Piment" },
  seed: { en: "Seed", es: "Semilla", fr: "Graine" },
  cacao: { en: "Cacao", es: "Cacao", fr: "Cacao" },
  insect: { en: "Edible insects", es: "Insectos comestibles", fr: "Insectes comestibles" },
  spirit: { en: "Spirit", es: "Destilado", fr: "Spiritueux" },
  sweetener: { en: "Sweetener", es: "Endulzante", fr: "Édulcorant" },
};
