import salImg from "@/assets/products/sal-130g.asset.json";
import frijolRojoImg from "@/assets/products/frijol-rojo.asset.json";
import frijolIbesImg from "@/assets/products/frijol-ibes.asset.json";
import patasheteImg from "@/assets/products/patashete.asset.json";
import chileImg from "@/assets/products/chile.asset.json";
import achioteImg from "@/assets/products/achiote.asset.json";
import cacaoImg from "@/assets/products/cacao.asset.json";
import chicatanaImg from "@/assets/products/chicatana.asset.json";
import pulcattaImg from "@/assets/products/pulcatta.asset.json";
import aguamielImg from "@/assets/products/aguamiel.asset.json";
import mielImg from "@/assets/products/miel.asset.json";

export type ProductCategory = "salt" | "beans" | "chile" | "seed" | "cacao" | "insect" | "spirit" | "sweetener";

export type Price = { label: string; price: string };

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

export const PRODUCTS: Product[] = [
  {
    slug: "sal-maya-zinacantan",
    category: "salt",
    origin: "Zinacantán, Chiapas",
    image: salImg.url,
    name: {
      en: "Ancestral Maya Salt of Zinacantán",
      es: "Sal Ancestral Maya de Zinacantán",
      fr: "Sel Maya ancestral de Zinacantán",
    },
    description: {
      en: "Maya salt from the millennia-old Tsotsil community of Atz'am in Zinacantán, Chiapas. Obtained by evaporating well water — a technique documented in the region for over 1,500 years.",
      es: "Sal maya de la comunidad tsotsil milenaria de Atz'am, en Zinacantán, Chiapas. Se obtiene por evaporación del agua del pozo, técnica documentada en la región desde hace más de 1,500 años.",
      fr: "Sel maya de la communauté tsotsil millénaire d'Atz'am, à Zinacantán, Chiapas. Obtenu par évaporation de l'eau du puits — une technique documentée dans la région depuis plus de 1 500 ans.",
    },
    prices: [
      { label: "130 g jar", price: "$90" },
      { label: "Box of 12 jars", price: "$80 / jar" },
      { label: "1–10 kg", price: "$450 / kg" },
      { label: "10 kg +", price: "$400 / kg" },
    ],
  },
  {
    slug: "frijol-ibes",
    category: "beans",
    origin: "Los Altos de Chiapas",
    image: frijolIbesImg.url,
    scientific: "Phaseolus dumosus",
    name: {
      en: "Red-Yellow Ibes Beans",
      es: "Frijol Ibes Rojos-Amarillos",
      fr: "Haricots Ibes rouges-jaunes",
    },
    description: {
      en: "Endemic Chiapas bean grown in Tsotsil communities of the Highlands.",
      es: "Frijol endémico de Chiapas, cultivado en comunidades tsotsiles de Los Altos.",
      fr: "Haricot endémique du Chiapas, cultivé dans les communautés tsotsiles des Hauts-Plateaux.",
    },
    prices: [{ label: "1 kg", price: "$130" }],
  },
  {
    slug: "frijol-rojo-mata",
    category: "beans",
    origin: "Teopisca, Chiapas",
    image: frijolRojoImg.url,
    scientific: "Phaseolus dumosus",
    name: {
      en: "Red Bush Bean",
      es: "Frijol rojo de mata",
      fr: "Haricot rouge de brousse",
    },
    description: {
      en: "Endemic red bean cultivated in Teopisca, Chiapas.",
      es: "Frijol rojo endémico cultivado en Teopisca, Chiapas.",
      fr: "Haricot rouge endémique cultivé à Teopisca, Chiapas.",
    },
    prices: [{ label: "1 kg", price: "$90" }],
  },
  {
    slug: "patashete",
    category: "beans",
    origin: "Motozintla, Chiapas",
    image: patasheteImg.url,
    scientific: "Phaseolus lunatus",
    name: { en: "Patashete Bean", es: "Patashete", fr: "Haricot Patashete" },
    description: {
      en: "Endemic lima bean cultivated in the communities of Motozintla, Chiapas.",
      es: "Frijol endémico cultivado en comunidades de Motozintla, Chiapas.",
      fr: "Haricot endémique cultivé dans les communautés de Motozintla, Chiapas.",
    },
    prices: [{ label: "1 kg", price: "$130" }],
  },
  {
    slug: "chile-simojovel",
    category: "chile",
    origin: "Simojovel, Chiapas",
    image: chileImg.url,
    name: { en: "Simojovel Chile", es: "Chile Simojovel", fr: "Piment Simojovel" },
    description: {
      en: "Small, very hot red chile — 2 cm long, conical. Used regionally in Simojovel, Chiapas, for ciguamonte, tamal de bola and hot salsas.",
      es: "Chile fresco pequeño muy picante, rojo y cónico. Mide 2 cm de largo. Se usa en Simojovel, Chiapas, para el ciguamonte, tamal de bola y salsas picantes.",
      fr: "Petit piment rouge très fort, de forme conique, 2 cm de long. Utilisé à Simojovel, Chiapas, dans le ciguamonte, le tamal de bola et diverses sauces piquantes.",
    },
    prices: [
      { label: "250 g bag", price: "$450" },
      { label: "25 g jar", price: "$80" },
      { label: "Box of 12 jars", price: "$110 / jar" },
    ],
  },
  {
    slug: "achiote-tenejapa",
    category: "seed",
    origin: "Tenejapa, Chiapas",
    image: achioteImg.url,
    scientific: "Bixa orellana",
    name: {
      en: "Agroecological Achiote Seed",
      es: "Semilla de achiote agroecológica",
      fr: "Graine de rocou agroécologique",
    },
    description: {
      en: "Achiote seed grown by Tzeltal communities of Tenejapa, Chiapas, under agroecological practices.",
      es: "Semilla de achiote cultivada por comunidades tzeltales de Tenejapa, Chiapas, con prácticas agroecológicas.",
      fr: "Graine de rocou cultivée par les communautés tzeltales de Tenejapa, Chiapas, en agroécologie.",
    },
    prices: [{ label: "1 kg", price: "$280" }],
  },
  {
    slug: "cacao-soconusco",
    category: "cacao",
    origin: "Soconusco, Chiapas",
    image: cacaoImg.url,
    name: {
      en: "Washed Agroecological Cacao",
      es: "Cacao lavado agroecológico",
      fr: "Cacao lavé agroécologique",
    },
    description: {
      en: "Washed cacao grown in the Soconusco region of Chiapas.",
      es: "Cacao lavado cultivado en la región del Soconusco, Chiapas.",
      fr: "Cacao lavé cultivé dans la région du Soconusco, au Chiapas.",
    },
    prices: [{ label: "1 kg", price: "$650" }],
  },
  {
    slug: "hormiga-chicatana",
    category: "insect",
    origin: "Chiapas",
    image: chicatanaImg.url,
    name: {
      en: "Chicatana Ant",
      es: "Hormiga chicatana",
      fr: "Fourmi chicatana",
    },
    description: {
      en: "Large dark-brown or reddish ant (Atta mexicana / cephalotes), harvested in May–July across Veracruz, Oaxaca, Chiapas, Guerrero, Guanajuato, Puebla, Morelos and Estado de México.",
      es: "Hormiga grande de color café oscuro o rojizo (Atta mexicana / cephalotes). Abunda en mayo, junio y julio en Veracruz, Oaxaca, Chiapas, Guerrero, Guanajuato, Puebla, Morelos y Estado de México.",
      fr: "Grande fourmi brun foncé ou rougeâtre (Atta mexicana / cephalotes). Abondante en mai, juin et juillet dans Veracruz, Oaxaca, Chiapas, Guerrero, Guanajuato, Puebla, Morelos et l'État de Mexico.",
    },
    prices: [{ label: "1 kg", price: "$4,500" }],
  },
  {
    slug: "pulcatta",
    category: "spirit",
    origin: "Zacatlán de las Manzanas, Puebla",
    image: pulcattaImg.url,
    name: {
      en: "Pulcatta — Distilled Pulque",
      es: "Pulcatta — Destilado de pulque",
      fr: "Pulcatta — Pulque distillé",
    },
    description: {
      en: "Mexican spirit distilled from pulque of Zacatlán de las Manzanas. Pleasant pulque flavor with a complex fruity aroma of herbs and highland woods. 38% ABV.",
      es: "Bebida espirituosa mexicana destilada de pulque de Zacatlán de las Manzanas. Sabor agradable a pulque y aroma complejo afrutado a hierbas y maderas del Altiplano. 38% de alcohol.",
      fr: "Spiritueux mexicain distillé à partir de pulque de Zacatlán de las Manzanas. Saveur agréable de pulque et arôme complexe fruité aux herbes et bois de l'Altiplano. 38 % d'alcool.",
    },
    prices: [
      { label: "750 ml bottle", price: "$500" },
      { label: "5 bottles", price: "$400 / bottle" },
    ],
  },
  {
    slug: "concentrado-aguamiel",
    category: "sweetener",
    origin: "Altiplano, México",
    image: aguamielImg.url,
    name: {
      en: "Aguamiel Concentrate (Nekumetl)",
      es: "Concentrado de aguamiel (Nekumetl)",
      fr: "Concentré d'aguamiel (Nekumetl)",
    },
    description: {
      en: "Nekumetl — Mesoamerican maguey sugar. One of the oldest sweeteners of pre-Hispanic peoples, predating European sugar and stingless-bee honey. Over 10 liters of fresh aguamiel yield one liter of concentrate. Use as honey, or to marinate meats, in cocktails, dressings and salsas.",
      es: "Nekumetl (azúcar de maguey) en náhuatl — uno de los endulzantes más antiguos de Mesoamérica, previo al azúcar europea y a la miel de abejas sin aguijón. Se requieren más de 10 litros de aguamiel fresca para un litro de concentrado. Se usa como miel, para marinar carnes, en coctelería, aderezos y salsas.",
      fr: "Nekumetl (sucre de maguey) en náhuatl — l'un des plus anciens édulcorants de Mésoamérique, antérieur au sucre européen et au miel d'abeilles sans dard. Plus de 10 litres d'aguamiel frais donnent un litre de concentré. S'utilise comme du miel, pour mariner les viandes, en cocktails, vinaigrettes et salsas.",
    },
    prices: [
      { label: "250 ml glass jar", price: "$145" },
      { label: "Box of 12 jars", price: "$125 / jar" },
    ],
  },
  {
    slug: "miel-multifloral",
    category: "sweetener",
    origin: "México",
    image: mielImg.url,
    name: {
      en: "Multifloral Bee Honey",
      es: "Miel de abeja multifloral",
      fr: "Miel d'abeille multifloral",
    },
    description: {
      en: "Raw multifloral honey, harvested from hives foraging a diversity of wild and cultivated blossoms. Unfiltered and unpasteurized.",
      es: "Miel cruda multifloral, cosechada de colmenas que liban una diversidad de flores silvestres y cultivadas. Sin filtrar ni pasteurizar.",
      fr: "Miel brut multifloral, récolté de ruches butinant une diversité de fleurs sauvages et cultivées. Ni filtré ni pasteurisé.",
    },
    prices: [{ label: "250 g jar", price: "$145" }],
  },
];

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