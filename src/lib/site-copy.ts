import type { Lang } from "@/lib/i18n";

export type HomeCopy = {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroSecondary: string;
  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophyLines: string[];
  philosophyBody: string[];
  philosophyCta: string;
  howEyebrow: string;
  howTitle: string;
  howLead: string;
  founderEyebrow: string;
  founderName: string;
  founderBody: string[];
  founderCta: string;
  testimonialsEyebrow: string;
  testimonialsLead: string;
  closingTitle: string;
  closingBody: string;
  closingCta: string;
};

export const home: Record<Lang, HomeCopy> = {
  es: {
    heroTitle: "Comprender la gastronomía es comprender México.",
    heroSubtitle:
      "MilpaChef® es un centro de conocimiento dedicado a comprender, preservar y compartir la gastronomía mexicana y su patrimonio biocultural mediante experiencias, investigación, educación, consultoría y colaboración con productores y comunidades.",
    heroCta: "Explorar experiencias",
    heroSecondary: "Conoce MilpaChef®",
    philosophyEyebrow: "Nuestra filosofía",
    philosophyTitle: "La gastronomía es mucho más que comida.",
    philosophyLines: ["Es territorio.", "Es historia.", "Es agricultura.", "Es cultura.", "Es identidad."],
    philosophyBody: [
      "En MilpaChef® creemos que comprender el origen de nuestros alimentos transforma la manera en que entendemos México.",
      "Por eso cada proyecto de MilpaChef®, ya sea una experiencia, una investigación, una consultoría o un programa educativo, busca acercar a las personas a los ingredientes, productores, paisajes y conocimientos que hacen posible nuestra gastronomía.",
    ],
    philosophyCta: "Leer nuestra filosofía",
    howEyebrow: "Cómo lo hacemos",
    howTitle: "Cuatro áreas de trabajo.",
    howLead:
      "Transformamos esta visión en acciones concretas a través de cuatro áreas de trabajo.",
    founderEyebrow: "Nuestro fundador",
    founderName: "Alfonso S. Rocha Robles",
    founderBody: [
      "Alfonso es chef, antropólogo e investigador y divulgador del patrimonio gastronómico mexicano.",
      "Desde hace más de 17 años trabaja junto a comunidades, productores, universidades y organizaciones para documentar, enseñar y promover el patrimonio alimentario mexicano.",
      "Su visión dio origen a MilpaChef®, un centro de conocimiento que conecta la gastronomía con el territorio, la cultura, el patrimonio biocultural y las personas que hacen posible nuestra alimentación.",
    ],
    founderCta: "Conoce nuestra historia",
    testimonialsEyebrow: "Testimonios",
    testimonialsLead:
      "Las experiencias y proyectos de MilpaChef han colaborado con viajeros, universidades, chefs, restaurantes, investigadores y organizaciones que comparten nuestra visión de la gastronomía.",
    closingTitle: "Descubre una nueva forma de comprender la gastronomía mexicana.",
    closingBody:
      "Ya sea participando en una experiencia, desarrollando un proyecto, aprendiendo sobre patrimonio alimentario o colaborando con productores locales, MilpaChef® te invita a descubrir una forma distinta de comprender la gastronomía mexicana, conectando personas, territorios, conocimientos y patrimonio biocultural.",
    closingCta: "Explora MilpaChef®",
  },
  en: {
    heroTitle: "To understand gastronomy is to understand Mexico.",
    heroSubtitle:
      "MilpaChef® is a knowledge centre devoted to understanding, preserving and sharing Mexican gastronomy and its biocultural heritage through experiences, research, education, consulting and collaboration with producers and communities.",
    heroCta: "Explore the experiences",
    heroSecondary: "Discover MilpaChef®",
    philosophyEyebrow: "Our philosophy",
    philosophyTitle: "Gastronomy is far more than food.",
    philosophyLines: ["It is territory.", "It is history.", "It is agriculture.", "It is culture.", "It is identity."],
    philosophyBody: [
      "At MilpaChef® we believe that understanding where our food comes from transforms the way we understand Mexico.",
      "That is why every MilpaChef® project — an experience, a research study, a consultancy or an educational programme — brings people closer to the ingredients, producers, landscapes and knowledge that make our gastronomy possible.",
    ],
    philosophyCta: "Read our philosophy",
    howEyebrow: "How we do it",
    howTitle: "Four areas of work.",
    howLead: "We turn this vision into concrete action through four areas of work.",
    founderEyebrow: "Our founder",
    founderName: "Alfonso S. Rocha Robles",
    founderBody: [
      "Alfonso is a chef, anthropologist, researcher and communicator of Mexican gastronomic heritage.",
      "For more than 17 years he has worked alongside communities, producers, universities and organisations to document, teach and promote Mexican food heritage.",
      "His vision gave rise to MilpaChef®, a knowledge centre connecting gastronomy with territory, culture, biocultural heritage and the people who make our food possible.",
    ],
    founderCta: "Read our story",
    testimonialsEyebrow: "Testimonials",
    testimonialsLead:
      "MilpaChef experiences and projects have worked with travellers, universities, chefs, restaurants, researchers and organisations who share our vision of gastronomy.",
    closingTitle: "Discover a new way of understanding Mexican gastronomy.",
    closingBody:
      "Whether you join an experience, develop a project, learn about food heritage or collaborate with local producers, MilpaChef® invites you to discover a different way of understanding Mexican gastronomy — connecting people, territories, knowledge and biocultural heritage.",
    closingCta: "Explore MilpaChef®",
  },
  fr: {
    heroTitle: "Comprendre la gastronomie, c'est comprendre le Mexique.",
    heroSubtitle:
      "MilpaChef® est un centre de connaissance dédié à comprendre, préserver et partager la gastronomie mexicaine et son patrimoine bioculturel à travers des expériences, la recherche, l'éducation, le conseil et la collaboration avec les producteurs et les communautés.",
    heroCta: "Explorer les expériences",
    heroSecondary: "Découvrir MilpaChef®",
    philosophyEyebrow: "Notre philosophie",
    philosophyTitle: "La gastronomie est bien plus que la nourriture.",
    philosophyLines: ["C'est le territoire.", "C'est l'histoire.", "C'est l'agriculture.", "C'est la culture.", "C'est l'identité."],
    philosophyBody: [
      "Chez MilpaChef®, nous croyons que comprendre l'origine de nos aliments transforme notre façon de comprendre le Mexique.",
      "C'est pourquoi chaque projet MilpaChef® — une expérience, une recherche, un conseil ou un programme éducatif — rapproche les personnes des ingrédients, des producteurs, des paysages et des savoirs qui rendent notre gastronomie possible.",
    ],
    philosophyCta: "Lire notre philosophie",
    howEyebrow: "Comment nous le faisons",
    howTitle: "Quatre domaines de travail.",
    howLead: "Nous transformons cette vision en actions concrètes à travers quatre domaines de travail.",
    founderEyebrow: "Notre fondateur",
    founderName: "Alfonso S. Rocha Robles",
    founderBody: [
      "Alfonso est chef, anthropologue, chercheur et passeur du patrimoine gastronomique mexicain.",
      "Depuis plus de 17 ans, il travaille avec des communautés, des producteurs, des universités et des organisations pour documenter, enseigner et promouvoir le patrimoine alimentaire mexicain.",
      "Sa vision a donné naissance à MilpaChef®, un centre de connaissance qui relie la gastronomie au territoire, à la culture, au patrimoine bioculturel et aux personnes qui nous nourrissent.",
    ],
    founderCta: "Découvrir notre histoire",
    testimonialsEyebrow: "Témoignages",
    testimonialsLead:
      "Les expériences et projets MilpaChef ont réuni voyageurs, universités, chefs, restaurants, chercheurs et organisations qui partagent notre vision de la gastronomie.",
    closingTitle: "Découvrez une nouvelle façon de comprendre la gastronomie mexicaine.",
    closingBody:
      "Que ce soit en vivant une expérience, en développant un projet, en apprenant sur le patrimoine alimentaire ou en collaborant avec des producteurs locaux, MilpaChef® vous invite à découvrir une autre façon de comprendre la gastronomie mexicaine, en reliant personnes, territoires, savoirs et patrimoine bioculturel.",
    closingCta: "Explorer MilpaChef®",
  },
};

export type PhilosophyCopy = {
  title: string;
  subtitle: string;
  understandTitle: string;
  understandBody: string;
  principlesLabel: string;
  principles: { title: string; body: string }[];
  missionLabel: string;
  mission: string;
  visionLabel: string;
  vision: string;
  howLabel: string;
  how: { title: string; body: string }[];
  inviteTitle: string;
  inviteBody: string;
  invites: { title: string; body: string; to: string }[];
};

export const philosophyPage: Record<Lang, PhilosophyCopy> = {
  es: {
    title: "Nuestra Filosofía",
    subtitle:
      "Creemos que comprender la gastronomía es comprender el territorio, la cultura y las personas que la hacen posible. Por eso, en MilpaChef trabajamos para investigar, preservar y compartir el patrimonio gastronómico de México a través de experiencias, educación, consultoría y colaboración con comunidades.",
    understandTitle: "La gastronomía comienza mucho antes de la cocina.",
    understandBody:
      "Para nosotros, la gastronomía no se limita a las recetas ni a los restaurantes. Comienza en el territorio, en la biodiversidad, en las semillas, en los sistemas agrícolas, en los mercados, en los conocimientos tradicionales y en las comunidades que los han preservado durante generaciones. Cocinar es solo una parte de una historia mucho más amplia.",
    principlesLabel: "Nuestros principios",
    principles: [
      { title: "Comprender antes que intervenir.", body: "Escuchamos, investigamos y aprendemos del territorio antes de proponer soluciones." },
      { title: "Valorar a quienes producen los alimentos.", body: "Reconocemos el papel de productores, cocineras tradicionales, artesanos y comunidades como guardianes del patrimonio gastronómico." },
      { title: "Conectar conocimiento y acción.", body: "Creemos que la investigación cobra sentido cuando se transforma en experiencias, educación, proyectos y acciones concretas." },
      { title: "Promover redes de colaboración.", body: "Trabajamos junto con universidades, restaurantes, productores, empresas, instituciones y viajeros para fortalecer los sistemas alimentarios locales." },
      { title: "Compartir el conocimiento.", body: "La gastronomía se fortalece cuando el conocimiento circula, inspira y llega a más personas." },
    ],
    missionLabel: "Nuestra misión",
    mission:
      "Inspirar una comunidad de personas capaces de comprender, preservar y transformar la gastronomía mexicana mediante el conocimiento, la educación, la investigación y la colaboración con quienes forman parte de su patrimonio biocultural.",
    visionLabel: "Nuestra visión",
    vision:
      "Ser un referente nacional e internacional en la investigación, divulgación y aplicación de la gastronomía mexicana como herramienta para fortalecer el patrimonio biocultural, los sistemas alimentarios locales y las comunidades que los sostienen.",
    howLabel: "¿Cómo lo hacemos?",
    how: [
      { title: "Comprender", body: "Investigamos, documentamos y aprendemos del territorio." },
      { title: "Vivir", body: "Creamos experiencias gastronómicas que conectan a las personas con la cultura y los alimentos." },
      { title: "Aprender", body: "Compartimos conocimiento mediante cursos, publicaciones y conferencias." },
      { title: "Transformar", body: "Desarrollamos consultorías que generan impacto en restaurantes, destinos, instituciones y comunidades." },
      { title: "Compartir", body: "Difundimos conocimientos, productos e iniciativas que fortalecen una comunidad comprometida con la gastronomía mexicana." },
    ],
    inviteTitle: "¿Cómo quieres formar parte de esta visión?",
    inviteBody:
      "Cada persona encuentra una forma distinta de conectar con la gastronomía mexicana. Explora el camino que mejor se adapte a tus intereses.",
    invites: [
      { title: "Vive una experiencia", body: "Food Tours, clases de cocina y experiencias privadas.", to: "/experiences" },
      { title: "Aprende con nosotros", body: "Cursos, conferencias, diplomados y publicaciones.", to: "/academy" },
      { title: "Desarrolla un proyecto", body: "Consultoría para OSC, restaurantes, hoteles, destinos e instituciones.", to: "/consulting" },
      { title: "Descubre nuestros productos", body: "Ingredientes con historia y proyectos vinculados al territorio.", to: "/products" },
    ],
  },
  en: {
    title: "Our Philosophy",
    subtitle:
      "We believe that understanding gastronomy means understanding the territory, the culture and the people who make it possible. At MilpaChef we research, preserve and share Mexico's gastronomic heritage through experiences, education, consulting and collaboration with communities.",
    understandTitle: "Gastronomy begins long before the kitchen.",
    understandBody:
      "For us, gastronomy is not limited to recipes or restaurants. It begins in the territory, in biodiversity, in seeds, in farming systems, in markets, in traditional knowledge and in the communities that have preserved it for generations. Cooking is only one part of a much larger story.",
    principlesLabel: "Our principles",
    principles: [
      { title: "Understand before intervening.", body: "We listen, research and learn from the territory before proposing solutions." },
      { title: "Value those who produce the food.", body: "We recognise producers, traditional cooks, artisans and communities as guardians of gastronomic heritage." },
      { title: "Connect knowledge and action.", body: "Research makes sense when it turns into experiences, education, projects and concrete action." },
      { title: "Build networks of collaboration.", body: "We work with universities, restaurants, producers, companies, institutions and travellers to strengthen local food systems." },
      { title: "Share the knowledge.", body: "Gastronomy grows stronger when knowledge circulates, inspires and reaches more people." },
    ],
    missionLabel: "Our mission",
    mission:
      "To inspire a community of people able to understand, preserve and transform Mexican gastronomy through knowledge, education, research and collaboration with those who are part of its biocultural heritage.",
    visionLabel: "Our vision",
    vision:
      "To be a national and international reference in the research, communication and application of Mexican gastronomy as a tool to strengthen biocultural heritage, local food systems and the communities that sustain them.",
    howLabel: "How we do it",
    how: [
      { title: "Understand", body: "We research, document and learn from the territory." },
      { title: "Experience", body: "We create gastronomic experiences that connect people with culture and food." },
      { title: "Learn", body: "We share knowledge through courses, publications and lectures." },
      { title: "Transform", body: "We develop consulting that creates impact for restaurants, destinations, institutions and communities." },
      { title: "Share", body: "We spread knowledge, products and initiatives that strengthen a community committed to Mexican gastronomy." },
    ],
    inviteTitle: "How do you want to be part of this vision?",
    inviteBody:
      "Everyone finds a different way to connect with Mexican gastronomy. Explore the path that best fits your interests.",
    invites: [
      { title: "Live an experience", body: "Food tours, cooking classes and private experiences.", to: "/experiences" },
      { title: "Learn with us", body: "Courses, lectures, diploma programmes and publications.", to: "/academy" },
      { title: "Develop a project", body: "Consulting for NGOs, restaurants, hotels, destinations and institutions.", to: "/consulting" },
      { title: "Discover our products", body: "Ingredients with a story and projects rooted in the territory.", to: "/products" },
    ],
  },
  fr: {
    title: "Notre Philosophie",
    subtitle:
      "Nous croyons que comprendre la gastronomie, c'est comprendre le territoire, la culture et les personnes qui la rendent possible. Chez MilpaChef, nous cherchons, préservons et partageons le patrimoine gastronomique du Mexique à travers des expériences, l'éducation, le conseil et la collaboration avec les communautés.",
    understandTitle: "La gastronomie commence bien avant la cuisine.",
    understandBody:
      "Pour nous, la gastronomie ne se limite ni aux recettes ni aux restaurants. Elle commence dans le territoire, la biodiversité, les semences, les systèmes agricoles, les marchés, les savoirs traditionnels et les communautés qui les préservent depuis des générations. Cuisiner n'est qu'une partie d'une histoire bien plus vaste.",
    principlesLabel: "Nos principes",
    principles: [
      { title: "Comprendre avant d'intervenir.", body: "Nous écoutons, recherchons et apprenons du territoire avant de proposer des solutions." },
      { title: "Valoriser celles et ceux qui produisent.", body: "Nous reconnaissons producteurs, cuisinières traditionnelles, artisans et communautés comme gardiens du patrimoine gastronomique." },
      { title: "Relier savoir et action.", body: "La recherche prend son sens lorsqu'elle se transforme en expériences, éducation, projets et actions concrètes." },
      { title: "Créer des réseaux de collaboration.", body: "Nous travaillons avec universités, restaurants, producteurs, entreprises, institutions et voyageurs pour renforcer les systèmes alimentaires locaux." },
      { title: "Partager le savoir.", body: "La gastronomie se renforce quand le savoir circule, inspire et atteint plus de personnes." },
    ],
    missionLabel: "Notre mission",
    mission:
      "Inspirer une communauté capable de comprendre, préserver et transformer la gastronomie mexicaine par le savoir, l'éducation, la recherche et la collaboration avec celles et ceux qui font partie de son patrimoine bioculturel.",
    visionLabel: "Notre vision",
    vision:
      "Devenir une référence nationale et internationale dans la recherche, la diffusion et l'application de la gastronomie mexicaine comme outil de renforcement du patrimoine bioculturel, des systèmes alimentaires locaux et des communautés qui les soutiennent.",
    howLabel: "Comment nous le faisons",
    how: [
      { title: "Comprendre", body: "Nous recherchons, documentons et apprenons du territoire." },
      { title: "Vivre", body: "Nous créons des expériences gastronomiques qui relient les personnes à la culture et aux aliments." },
      { title: "Apprendre", body: "Nous partageons le savoir par des cours, des publications et des conférences." },
      { title: "Transformer", body: "Nous développons des conseils à impact pour restaurants, destinations, institutions et communautés." },
      { title: "Partager", body: "Nous diffusons savoirs, produits et initiatives qui renforcent une communauté engagée." },
    ],
    inviteTitle: "Comment voulez-vous faire partie de cette vision ?",
    inviteBody:
      "Chacun trouve sa façon de se relier à la gastronomie mexicaine. Explorez le chemin qui correspond le mieux à vos intérêts.",
    invites: [
      { title: "Vivez une expérience", body: "Food tours, cours de cuisine et expériences privées.", to: "/experiences" },
      { title: "Apprenez avec nous", body: "Cours, conférences, diplômes et publications.", to: "/academy" },
      { title: "Développez un projet", body: "Conseil pour ONG, restaurants, hôtels, destinations et institutions.", to: "/consulting" },
      { title: "Découvrez nos produits", body: "Des ingrédients avec une histoire, ancrés dans le territoire.", to: "/products" },
    ],
  },
};

export type ResourcesCopy = {
  title: string;
  subtitle: string;
  itemsLabel: string;
  items: { title: string; body: string; to: string }[];
};

export const resourcesPage: Record<Lang, ResourcesCopy> = {
  es: {
    title: "Recursos",
    subtitle:
      "Investigación, publicaciones, recetarios y proyectos de impacto: el conocimiento que MilpaChef® genera y comparte sobre el patrimonio alimentario mexicano.",
    itemsLabel: "Qué encontrarás aquí",
    items: [
      { title: "Investigación", body: "Publicaciones, artículos, estudios y ponencias sobre sistemas alimentarios mexicanos.", to: "/research" },
      { title: "Impacto", body: "Proyectos con productores, comunidades y organizaciones aliadas.", to: "/impact" },
      { title: "Recetario MilpaChef", body: "Platillos ancestrales cocinados con ingredientes de la milpa.", to: "/products" },
      { title: "Manifiesto y materiales", body: "Documentos y recursos educativos. Escríbenos para solicitarlos.", to: "/contact" },
    ],
  },
  en: {
    title: "Resources",
    subtitle:
      "Research, publications, recipes and impact projects: the knowledge MilpaChef® generates and shares about Mexican food heritage.",
    itemsLabel: "What you'll find here",
    items: [
      { title: "Research", body: "Publications, articles, studies and conference papers on Mexican food systems.", to: "/research" },
      { title: "Impact", body: "Projects with producers, communities and allied organisations.", to: "/impact" },
      { title: "MilpaChef recipe book", body: "Ancestral dishes cooked with milpa ingredients.", to: "/products" },
      { title: "Manifesto & materials", body: "Documents and educational resources — write to us to request them.", to: "/contact" },
    ],
  },
  fr: {
    title: "Ressources",
    subtitle:
      "Recherche, publications, recettes et projets d'impact : le savoir que MilpaChef® produit et partage sur le patrimoine alimentaire mexicain.",
    itemsLabel: "Ce que vous trouverez ici",
    items: [
      { title: "Recherche", body: "Publications, articles, études et communications sur les systèmes alimentaires mexicains.", to: "/research" },
      { title: "Impact", body: "Projets avec producteurs, communautés et organisations partenaires.", to: "/impact" },
      { title: "Recettaire MilpaChef", body: "Plats ancestraux cuisinés avec les ingrédients de la milpa.", to: "/products" },
      { title: "Manifeste et supports", body: "Documents et ressources pédagogiques — écrivez-nous pour les demander.", to: "/contact" },
    ],
  },
};