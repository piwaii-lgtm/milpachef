import type { Lang } from "@/lib/i18n";

export type AreaSlug =
  | "experiences"
  | "consulting"
  | "products"
  | "academy"
  | "research"
  | "impact";

export type Area = {
  slug: AreaSlug;
  number: string;
  to: string;
  title: string;
  tagline: string;
  body: string;
  includes: string[];
  cta: string;
};

type AreaCopy = Omit<Area, "slug" | "number" | "to">;

const routes: Record<AreaSlug, { to: string; number: string }> = {
  experiences: { to: "/reserve", number: "01" },
  consulting: { to: "/consulting", number: "02" },
  products: { to: "/products", number: "03" },
  academy: { to: "/academy", number: "04" },
  research: { to: "/research", number: "05" },
  impact: { to: "/impact", number: "06" },
};

const copy: Record<Lang, Record<AreaSlug, AreaCopy>> = {
  es: {
    experiences: {
      title: "Experiencias",
      tagline: "Comprender la gastronomía desde su origen.",
      body: "Experiencias inmersivas para conocer la gastronomía mexicana a través de recorridos, clases de cocina, degustaciones y actividades con productores locales.",
      includes: ["Food tours", "Clases de cocina", "Experiencias privadas", "Eventos gastronómicos"],
      cta: "Ver experiencias",
    },
    consulting: {
      title: "Consultoría",
      tagline: "Proyectos gastronómicos con raíz y trazabilidad.",
      body: "Desarrollo y acompañamiento de proyectos gastronómicos con enfoque en sustentabilidad, identidad territorial y trazabilidad.",
      includes: ["Restaurantes", "Hoteles", "Destinos turísticos", "Menús sustentables", "Desarrollo de proveedores", "Diseño de experiencias"],
      cta: "Hablemos de tu proyecto",
    },
    products: {
      title: "Productos",
      tagline: "Ingredientes con nombre, comunidad y territorio.",
      body: "Selección de ingredientes provenientes de pequeños productores mexicanos que representan la biodiversidad y el patrimonio alimentario nacional.",
      includes: ["Ingredientes", "Kits", "Catálogos", "Regalos corporativos"],
      cta: "Ver el catálogo",
    },
    academy: {
      title: "Academia",
      tagline: "Aprender a comprender antes que simplemente consumir.",
      body: "Programas educativos dirigidos tanto al público general como a instituciones académicas y profesionales.",
      includes: ["Cursos", "Diplomados", "Talleres", "Conferencias", "Recursos educativos"],
      cta: "Solicitar un programa",
    },
    research: {
      title: "Investigación",
      tagline: "Conocimiento sobre los sistemas alimentarios mexicanos.",
      body: "Generación y difusión de conocimiento sobre gastronomía sustentable, patrimonio alimentario y sistemas agroalimentarios.",
      includes: ["Publicaciones", "Artículos", "Estudios", "Ponencias", "Proyectos académicos"],
      cta: "Colaborar en investigación",
    },
    impact: {
      title: "Impacto",
      tagline: "Comunidades, productores y patrimonio vivo.",
      body: "Acciones que fortalecen comunidades, productores y sistemas alimentarios locales mediante alianzas, proyectos sociales y conservación del patrimonio gastronómico. Proyectos realizados como director de Slow Food México y Comida Lenta A.C.",
      includes: ["Productores aliados", "Redes", "Asociaciones", "Conservación", "Impacto social"],
      cta: "Sumarse al proyecto",
    },
  },
  en: {
    experiences: {
      title: "Experiences",
      tagline: "Understanding gastronomy from its origin.",
      body: "Immersive experiences to discover Mexican gastronomy through walking tours, cooking classes, tastings and activities with local producers.",
      includes: ["Food tours", "Cooking classes", "Private experiences", "Gastronomic events"],
      cta: "See the experiences",
    },
    consulting: {
      title: "Consulting",
      tagline: "Food projects with roots and traceability.",
      body: "Development and support of gastronomic projects focused on sustainability, territorial identity and traceability.",
      includes: ["Restaurants", "Hotels", "Tourism destinations", "Sustainable menus", "Supplier development", "Experience design"],
      cta: "Talk about your project",
    },
    products: {
      title: "Products",
      tagline: "Ingredients with a name, a community, a territory.",
      body: "A selection of ingredients from small Mexican producers that represent the country's biodiversity and food heritage.",
      includes: ["Ingredients", "Kits", "Catalogues", "Corporate gifts"],
      cta: "Browse the catalogue",
    },
    academy: {
      title: "Academy",
      tagline: "Learning to understand before simply consuming.",
      body: "Educational programmes for the general public as well as academic institutions and professionals.",
      includes: ["Courses", "Diploma programmes", "Workshops", "Lectures", "Educational resources"],
      cta: "Request a programme",
    },
    research: {
      title: "Research",
      tagline: "Knowledge about Mexican food systems.",
      body: "Generating and sharing knowledge on sustainable gastronomy, food heritage and agrifood systems.",
      includes: ["Publications", "Articles", "Studies", "Conference papers", "Academic projects"],
      cta: "Collaborate on research",
    },
    impact: {
      title: "Impact",
      tagline: "Communities, producers and living heritage.",
      body: "Actions that strengthen communities, producers and local food systems through alliances, social projects and the conservation of gastronomic heritage — built on years directing Slow Food Mexico and Comida Lenta A.C.",
      includes: ["Allied producers", "Networks", "Associations", "Conservation", "Social impact"],
      cta: "Join the project",
    },
  },
  fr: {
    experiences: {
      title: "Expériences",
      tagline: "Comprendre la gastronomie depuis son origine.",
      body: "Des expériences immersives pour découvrir la gastronomie mexicaine à travers des parcours, des cours de cuisine, des dégustations et des rencontres avec les producteurs locaux.",
      includes: ["Food tours", "Cours de cuisine", "Expériences privées", "Événements gastronomiques"],
      cta: "Voir les expériences",
    },
    consulting: {
      title: "Conseil",
      tagline: "Des projets culinaires enracinés et traçables.",
      body: "Développement et accompagnement de projets gastronomiques axés sur la durabilité, l'identité territoriale et la traçabilité.",
      includes: ["Restaurants", "Hôtels", "Destinations touristiques", "Menus durables", "Développement de fournisseurs", "Conception d'expériences"],
      cta: "Parlons de votre projet",
    },
    products: {
      title: "Produits",
      tagline: "Des ingrédients avec un nom, une communauté, un territoire.",
      body: "Une sélection d'ingrédients issus de petits producteurs mexicains qui représentent la biodiversité et le patrimoine alimentaire national.",
      includes: ["Ingrédients", "Coffrets", "Catalogues", "Cadeaux d'entreprise"],
      cta: "Voir le catalogue",
    },
    academy: {
      title: "Académie",
      tagline: "Apprendre à comprendre avant de consommer.",
      body: "Des programmes éducatifs destinés au grand public comme aux institutions académiques et aux professionnels.",
      includes: ["Cours", "Diplômes", "Ateliers", "Conférences", "Ressources pédagogiques"],
      cta: "Demander un programme",
    },
    research: {
      title: "Recherche",
      tagline: "Des savoirs sur les systèmes alimentaires mexicains.",
      body: "Production et diffusion de connaissances sur la gastronomie durable, le patrimoine alimentaire et les systèmes agroalimentaires.",
      includes: ["Publications", "Articles", "Études", "Communications", "Projets académiques"],
      cta: "Collaborer à la recherche",
    },
    impact: {
      title: "Impact",
      tagline: "Communautés, producteurs et patrimoine vivant.",
      body: "Des actions qui renforcent les communautés, les producteurs et les systèmes alimentaires locaux par des alliances, des projets sociaux et la conservation du patrimoine gastronomique — issues de la direction de Slow Food Mexique et de Comida Lenta A.C.",
      includes: ["Producteurs alliés", "Réseaux", "Associations", "Conservation", "Impact social"],
      cta: "Rejoindre le projet",
    },
  },
};

export function getAreas(lang: Lang): Area[] {
  return (Object.keys(routes) as AreaSlug[]).map((slug) => ({
    slug,
    ...routes[slug],
    ...copy[lang][slug],
  }));
}

export function getArea(lang: Lang, slug: AreaSlug): Area {
  return { slug, ...routes[slug], ...copy[lang][slug] };
}

export const circle: Record<Lang, string[]> = {
  es: [
    "La investigación genera conocimiento.",
    "El conocimiento fortalece la academia.",
    "La academia mejora las consultorías.",
    "Las consultorías fortalecen restaurantes y productores.",
    "Los productores abastecen los productos.",
    "Los productos y productores enriquecen las experiencias.",
    "Las experiencias generan nuevas preguntas que alimentan la investigación.",
  ],
  en: [
    "Research generates knowledge.",
    "That knowledge strengthens the academy.",
    "The academy improves the consulting work.",
    "Consulting strengthens restaurants and producers.",
    "Producers supply the products.",
    "Products and producers enrich the experiences.",
    "Experiences raise new questions that feed the research.",
  ],
  fr: [
    "La recherche produit du savoir.",
    "Ce savoir nourrit l'académie.",
    "L'académie améliore le conseil.",
    "Le conseil renforce restaurants et producteurs.",
    "Les producteurs fournissent les produits.",
    "Produits et producteurs enrichissent les expériences.",
    "Les expériences soulèvent de nouvelles questions qui nourrissent la recherche.",
  ],
};

export const pillars: Record<Lang, { title: string; body: string }[]> = {
  es: [
    { title: "Gastronomía", body: "La cocina como expresión cultural." },
    { title: "Sustentabilidad", body: "Producción responsable, biodiversidad y consumo consciente." },
    { title: "Antropología", body: "Comprender la relación entre alimentación, cultura y sociedad." },
    { title: "Territorio", body: "Cada paisaje produce una gastronomía distinta." },
    { title: "Productores", body: "Reconocer y visibilizar a quienes hacen posible nuestros alimentos." },
    { title: "Educación", body: "Aprender a comprender antes que simplemente consumir." },
  ],
  en: [
    { title: "Gastronomy", body: "Cooking as cultural expression." },
    { title: "Sustainability", body: "Responsible production, biodiversity and conscious consumption." },
    { title: "Anthropology", body: "Understanding how food, culture and society relate." },
    { title: "Territory", body: "Every landscape produces a different cuisine." },
    { title: "Producers", body: "Recognising and making visible those who grow our food." },
    { title: "Education", body: "Learning to understand before simply consuming." },
  ],
  fr: [
    { title: "Gastronomie", body: "La cuisine comme expression culturelle." },
    { title: "Durabilité", body: "Production responsable, biodiversité et consommation consciente." },
    { title: "Anthropologie", body: "Comprendre le lien entre alimentation, culture et société." },
    { title: "Territoire", body: "Chaque paysage produit une cuisine différente." },
    { title: "Producteurs", body: "Reconnaître et rendre visibles celles et ceux qui nous nourrissent." },
    { title: "Éducation", body: "Apprendre à comprendre avant de consommer." },
  ],
};

export const philosophy: Record<Lang, string[]> = {
  es: [
    "La gastronomía mexicana no comienza en la cocina.",
    "Comienza en la tierra.",
    "En las semillas.",
    "En las comunidades.",
    "En quienes producen nuestros alimentos.",
  ],
  en: [
    "Mexican gastronomy does not begin in the kitchen.",
    "It begins in the soil.",
    "In the seeds.",
    "In the communities.",
    "In the people who grow our food.",
  ],
  fr: [
    "La gastronomie mexicaine ne commence pas en cuisine.",
    "Elle commence dans la terre.",
    "Dans les semences.",
    "Dans les communautés.",
    "Chez celles et ceux qui produisent nos aliments.",
  ],
};
