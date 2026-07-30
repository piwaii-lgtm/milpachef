import type { Lang } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Academia                                                            */
/* ------------------------------------------------------------------ */

export type AcademyCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  focusTitle: string;
  focusLead: string;
  focusBody: string;
  linesLabel: string;
  lines: { title: string; body: string }[];
  teachingLabel: string;
  teachingTitle: string;
  teachingLead: string;
  teachingInstitution: string;
  teachingRole: string;
  teachingCourses: string[];
  teachingNote: string;
  researchLabel: string;
  researchTitle: string;
  researchLead: string;
  publicationsLabel: string;
  publications: { text: string; href: string }[];
  talksLabel: string;
  talksIntro: string;
  talks: { text: string; href?: string }[];
  formatsLabel: string;
  formats: string[];
  collabLabel: string;
  collabTitle: string;
  collabBody: string;
  collabItems: string[];
  trackLabel: string;
  trackBody: string;
  trackItems: string[];
  closingTitle: string;
  closingLead: string;
  closingLinks: { label: string; to: string }[];
  cta: string;
};

export const academyPage: Record<Lang, AcademyCopy> = {
  es: {
    eyebrow: "Academia MilpaChef®",
    title: "La gastronomía también se estudia, se investiga y se enseña.",
    intro:
      "La Academia MilpaChef® nace de la convicción de que la gastronomía puede estudiarse, investigarse y enseñarse como una expresión del patrimonio biocultural, los sistemas alimentarios y la cultura. Nuestro objetivo es compartir conocimiento que conecte la investigación académica con la experiencia práctica en territorio, formando personas capaces de comprender la gastronomía mexicana desde una perspectiva integral.",
    focusTitle: "Nuestro enfoque",
    focusLead: "Aprender desde el territorio",
    focusBody:
      "La gastronomía no se comprende únicamente en una cocina o en un aula. También se aprende recorriendo mercados, trabajando con productores, documentando saberes tradicionales e investigando la relación entre alimentación, cultura y biodiversidad. Por ello, la Academia MilpaChef® integra la investigación, la docencia y la experiencia de campo como parte de un mismo proceso de aprendizaje.",
    linesLabel: "Líneas de trabajo",
    lines: [
      {
        title: "Gastronomía mexicana",
        body: "Patrimonio gastronómico mexicano, con especial énfasis en los sistemas alimentarios de la milpa y el maguey, las cocinas regionales y las tradiciones alimentarias.",
      },
      {
        title: "Gastronomía sustentable",
        body: "Sistemas alimentarios, biodiversidad, cadenas cortas de comercialización, consumo responsable y desarrollo territorial.",
      },
      {
        title: "Patrimonio biocultural",
        body: "Relación entre comunidades, conocimientos tradicionales, territorio y alimentación.",
      },
      {
        title: "Investigación aplicada",
        body: "Proyectos que vinculan la investigación académica con experiencias, consultoría y divulgación.",
      },
    ],
    teachingLabel: "Docencia",
    teachingTitle: "Experiencia docente de MilpaChef®",
    teachingLead: "La formación académica también forma parte del trabajo de MilpaChef®.",
    teachingInstitution: "Universidad de las Américas Puebla (UDLAP)",
    teachingRole: "Profesor de asignatura",
    teachingCourses: [
      "Cultura Gastronómica de México y el Mundo (Otoño 2025)",
      "Gastronomía Sustentable (Primavera 2026)",
    ],
    teachingNote:
      "La experiencia docente de MilpaChef® busca integrar la formación universitaria con el conocimiento generado en campo, acercando a los estudiantes a los desafíos contemporáneos de la gastronomía mexicana y la sustentabilidad.",
    researchLabel: "Investigación y publicaciones",
    researchTitle: "Producción académica",
    researchLead:
      "La investigación constituye uno de los pilares de MilpaChef®. A través de publicaciones, ponencias y proyectos académicos buscamos contribuir a la comprensión y preservación del patrimonio gastronómico mexicano.",
    publicationsLabel: "Publicaciones",
    publications: [
      {
        text: "Preservación biocultural del agave pulquero de San Mateo Ozolco",
        href: "https://udlap.academia.edu/AlfonsoRochaRobles",
      },
      {
        text: "Arca del Gusto de México — prefacio y fichas de pinole y tlachique",
        href: "https://www.slowfood.com/es/blog-and-news/arca-del-gusto-mexico-unidos-para-salvarguardar-la-tradicion/",
      },
    ],
    talksLabel: "Ponencias y congresos",
    talksIntro:
      "Julio 2026 — Segundo Congreso Internacional Transdisciplinario de Investigación en Sostenibilidad y Agenda 2030 (Universidad Autónoma del Estado de México).",
    talks: [
      {
        text: "La ecogastronomía de Slow Food como enfoque transdisciplinario para la gastronomía sustentable en México.",
        href: "https://www.youtube.com/watch?v=UmxKvA2zJNs",
      },
      {
        text: "Cadenas cortas agroalimentarias y resiliencia del sistema alimentario en San Pedro Cholula: un enfoque de articulación multiactor.",
        href: "https://www.youtube.com/watch?v=S1yOYlEoAtU",
      },
      {
        text: "Hacia un modelo de evaluación de la gastronomía sustentable en México: una propuesta metodológica desde la ecogastronomía y los sistemas alimentarios territoriales.",
        href: "https://www.youtube.com/watch?v=MRo0cTWHCFY",
      },
      {
        text: "Conferencias impartidas en más de 35 universidades mexicanas entre 2012 y 2022 sobre ecogastronomía, Slow Food y patrimonio alimentario.",
      },
    ],
    formatsLabel: "Modalidades de formación",
    formats: [
      "Formación universitaria",
      "Cursos especializados",
      "Talleres prácticos",
      "Conferencias",
      "Formación para organizaciones",
    ],
    collabLabel: "Vinculación académica",
    collabTitle: "Colaboraciones",
    collabBody:
      "MilpaChef® busca colaborar con universidades, centros de investigación, estudiantes, organizaciones y profesionales interesados en la gastronomía, el patrimonio biocultural y los sistemas alimentarios.",
    collabItems: [
      "Proyectos de investigación",
      "Publicaciones",
      "Congresos",
      "Seminarios",
      "Desarrollo curricular",
      "Tesis",
      "Estancias académicas",
      "Redes de investigación",
    ],
    trackLabel: "Trayectoria académica",
    trackBody:
      "La propuesta académica de MilpaChef® se construye a partir de más de una década de trabajo en gastronomía, patrimonio biocultural y sistemas alimentarios.",
    trackItems: [
      "Investigación sobre patrimonio alimentario",
      "Coordinación de proyectos nacionales con Slow Food México",
      "Trabajo con comunidades rurales e indígenas",
      "Docencia universitaria",
      "Participación en congresos nacionales e internacionales",
      "Publicaciones académicas y de divulgación",
    ],
    closingTitle: "El conocimiento también se vive.",
    closingLead: "Después de conocer nuestra propuesta académica puedes:",
    closingLinks: [
      { label: "Participar en una experiencia gastronómica", to: "/experiences" },
      { label: "Explorar nuestros recursos", to: "/resources" },
      { label: "Colaborar en un proyecto", to: "/consulting" },
      { label: "Conocer nuestros productos", to: "/products" },
    ],
    cta: "Escríbenos",
  },
  en: {
    eyebrow: "MilpaChef® Academy",
    title: "Gastronomy can also be studied, researched and taught.",
    intro:
      "The MilpaChef® Academy was born from the conviction that gastronomy can be studied, researched and taught as an expression of biocultural heritage, food systems and culture. Our aim is to share knowledge that connects academic research with hands-on fieldwork, training people who understand Mexican gastronomy as a whole.",
    focusTitle: "Our approach",
    focusLead: "Learning from the territory",
    focusBody:
      "Gastronomy is not understood in a kitchen or a classroom alone. It is also learned by walking markets, working with producers, documenting traditional knowledge and researching the relationship between food, culture and biodiversity. That is why the MilpaChef® Academy integrates research, teaching and fieldwork into a single learning process.",
    linesLabel: "Lines of work",
    lines: [
      {
        title: "Mexican gastronomy",
        body: "Mexican culinary heritage, with special emphasis on the food systems of the milpa and the maguey, regional cuisines and food traditions.",
      },
      {
        title: "Sustainable gastronomy",
        body: "Food systems, biodiversity, short supply chains, responsible consumption and territorial development.",
      },
      {
        title: "Biocultural heritage",
        body: "The relationship between communities, traditional knowledge, territory and food.",
      },
      {
        title: "Applied research",
        body: "Projects that connect academic research with experiences, consulting and public outreach.",
      },
    ],
    teachingLabel: "Teaching",
    teachingTitle: "MilpaChef® in the classroom",
    teachingLead: "University teaching is part of MilpaChef®'s work.",
    teachingInstitution: "Universidad de las Américas Puebla (UDLAP)",
    teachingRole: "Adjunct professor",
    teachingCourses: [
      "Food Culture of Mexico and the World (Fall 2025)",
      "Sustainable Gastronomy (Spring 2026)",
    ],
    teachingNote:
      "MilpaChef®'s teaching brings university training together with knowledge generated in the field, exposing students to the contemporary challenges of Mexican gastronomy and sustainability.",
    researchLabel: "Research & publications",
    researchTitle: "Academic output",
    researchLead:
      "Research is one of MilpaChef®'s pillars. Through publications, conference papers and academic projects we contribute to the understanding and preservation of Mexican food heritage.",
    publicationsLabel: "Publications",
    publications: [
      {
        text: "Biocultural preservation of the pulque agave of San Mateo Ozolco",
        href: "https://udlap.academia.edu/AlfonsoRochaRobles",
      },
      {
        text: "Ark of Taste Mexico — preface and entries on pinole and tlachique",
        href: "https://www.slowfood.com/es/blog-and-news/arca-del-gusto-mexico-unidos-para-salvarguardar-la-tradicion/",
      },
    ],
    talksLabel: "Talks & conferences",
    talksIntro:
      "July 2026 — Second International Transdisciplinary Congress on Sustainability Research and Agenda 2030 (Universidad Autónoma del Estado de México).",
    talks: [
      {
        text: "Slow Food eco-gastronomy as a transdisciplinary approach to sustainable gastronomy in Mexico.",
        href: "https://www.youtube.com/watch?v=UmxKvA2zJNs",
      },
      {
        text: "Short agri-food chains and food-system resilience in San Pedro Cholula: a multi-stakeholder approach.",
        href: "https://www.youtube.com/watch?v=S1yOYlEoAtU",
      },
      {
        text: "Towards an assessment model for sustainable gastronomy in Mexico: a methodological proposal from eco-gastronomy and territorial food systems.",
        href: "https://www.youtube.com/watch?v=MRo0cTWHCFY",
      },
      {
        text: "Lectures given at more than 35 Mexican universities between 2012 and 2022 on eco-gastronomy, Slow Food and food heritage.",
      },
    ],
    formatsLabel: "Available formats",
    formats: [
      "University teaching",
      "Specialised courses",
      "Hands-on workshops",
      "Lectures",
      "Training for organisations",
    ],
    collabLabel: "Academic partnerships",
    collabTitle: "Collaborations",
    collabBody:
      "MilpaChef® works with universities, research centres, students, organisations and professionals interested in gastronomy, biocultural heritage and food systems.",
    collabItems: [
      "Research projects",
      "Publications",
      "Conferences",
      "Seminars",
      "Curriculum development",
      "Theses",
      "Academic residencies",
      "Research networks",
    ],
    trackLabel: "Academic track record",
    trackBody:
      "MilpaChef®'s academic work builds on more than a decade in gastronomy, biocultural heritage and food systems.",
    trackItems: [
      "Research on food heritage",
      "Coordination of national projects with Slow Food Mexico",
      "Work with rural and Indigenous communities",
      "University teaching",
      "National and international conferences",
      "Academic and outreach publications",
    ],
    closingTitle: "Knowledge is also something you live.",
    closingLead: "After exploring our academic work, you can:",
    closingLinks: [
      { label: "Join a culinary experience", to: "/experiences" },
      { label: "Explore our resources", to: "/resources" },
      { label: "Collaborate on a project", to: "/consulting" },
      { label: "Discover our products", to: "/products" },
    ],
    cta: "Get in touch",
  },
  fr: {
    eyebrow: "Académie MilpaChef®",
    title: "La gastronomie s'étudie, se recherche et s'enseigne.",
    intro:
      "L'Académie MilpaChef® est née de la conviction que la gastronomie peut être étudiée, recherchée et enseignée comme une expression du patrimoine bioculturel, des systèmes alimentaires et de la culture. Notre objectif : partager un savoir qui relie la recherche académique à l'expérience de terrain, et former des personnes capables de comprendre la gastronomie mexicaine dans son ensemble.",
    focusTitle: "Notre approche",
    focusLead: "Apprendre depuis le territoire",
    focusBody:
      "La gastronomie ne se comprend pas seulement en cuisine ou en salle de classe. Elle s'apprend aussi en parcourant les marchés, en travaillant avec les producteurs, en documentant les savoirs traditionnels et en étudiant la relation entre alimentation, culture et biodiversité. L'Académie MilpaChef® intègre donc recherche, enseignement et terrain dans un même processus d'apprentissage.",
    linesLabel: "Axes de travail",
    lines: [
      {
        title: "Gastronomie mexicaine",
        body: "Patrimoine gastronomique mexicain, avec un accent sur les systèmes alimentaires de la milpa et du maguey, les cuisines régionales et les traditions alimentaires.",
      },
      {
        title: "Gastronomie durable",
        body: "Systèmes alimentaires, biodiversité, circuits courts, consommation responsable et développement territorial.",
      },
      {
        title: "Patrimoine bioculturel",
        body: "Relation entre communautés, savoirs traditionnels, territoire et alimentation.",
      },
      {
        title: "Recherche appliquée",
        body: "Des projets qui relient la recherche académique aux expériences, au conseil et à la diffusion.",
      },
    ],
    teachingLabel: "Enseignement",
    teachingTitle: "MilpaChef® à l'université",
    teachingLead: "La formation universitaire fait aussi partie du travail de MilpaChef®.",
    teachingInstitution: "Universidad de las Américas Puebla (UDLAP)",
    teachingRole: "Professeur vacataire",
    teachingCourses: [
      "Culture gastronomique du Mexique et du monde (automne 2025)",
      "Gastronomie durable (printemps 2026)",
    ],
    teachingNote:
      "L'enseignement de MilpaChef® relie la formation universitaire au savoir produit sur le terrain, en confrontant les étudiants aux défis contemporains de la gastronomie mexicaine et de la durabilité.",
    researchLabel: "Recherche et publications",
    researchTitle: "Production académique",
    researchLead:
      "La recherche est l'un des piliers de MilpaChef®. À travers publications, communications et projets académiques, nous contribuons à comprendre et préserver le patrimoine gastronomique mexicain.",
    publicationsLabel: "Publications",
    publications: [
      {
        text: "Préservation bioculturelle de l'agave à pulque de San Mateo Ozolco",
        href: "https://udlap.academia.edu/AlfonsoRochaRobles",
      },
      {
        text: "Arche du Goût du Mexique — préface et fiches pinole et tlachique",
        href: "https://www.slowfood.com/es/blog-and-news/arca-del-gusto-mexico-unidos-para-salvarguardar-la-tradicion/",
      },
    ],
    talksLabel: "Conférences et congrès",
    talksIntro:
      "Juillet 2026 — Deuxième Congrès international transdisciplinaire de recherche sur la durabilité et l'Agenda 2030 (Universidad Autónoma del Estado de México).",
    talks: [
      {
        text: "L'éco-gastronomie de Slow Food comme approche transdisciplinaire de la gastronomie durable au Mexique.",
        href: "https://www.youtube.com/watch?v=UmxKvA2zJNs",
      },
      {
        text: "Circuits courts agroalimentaires et résilience du système alimentaire à San Pedro Cholula : une approche multi-acteurs.",
        href: "https://www.youtube.com/watch?v=S1yOYlEoAtU",
      },
      {
        text: "Vers un modèle d'évaluation de la gastronomie durable au Mexique : proposition méthodologique issue de l'éco-gastronomie et des systèmes alimentaires territoriaux.",
        href: "https://www.youtube.com/watch?v=MRo0cTWHCFY",
      },
      {
        text: "Conférences données dans plus de 35 universités mexicaines entre 2012 et 2022 sur l'éco-gastronomie, Slow Food et le patrimoine alimentaire.",
      },
    ],
    formatsLabel: "Formats de formation",
    formats: [
      "Formation universitaire",
      "Cours spécialisés",
      "Ateliers pratiques",
      "Conférences",
      "Formation pour organisations",
    ],
    collabLabel: "Partenariats académiques",
    collabTitle: "Collaborations",
    collabBody:
      "MilpaChef® collabore avec des universités, centres de recherche, étudiants, organisations et professionnels intéressés par la gastronomie, le patrimoine bioculturel et les systèmes alimentaires.",
    collabItems: [
      "Projets de recherche",
      "Publications",
      "Congrès",
      "Séminaires",
      "Développement de programmes",
      "Mémoires et thèses",
      "Séjours académiques",
      "Réseaux de recherche",
    ],
    trackLabel: "Parcours académique",
    trackBody:
      "La proposition académique de MilpaChef® s'appuie sur plus d'une décennie de travail en gastronomie, patrimoine bioculturel et systèmes alimentaires.",
    trackItems: [
      "Recherche sur le patrimoine alimentaire",
      "Coordination de projets nationaux avec Slow Food Mexique",
      "Travail avec des communautés rurales et autochtones",
      "Enseignement universitaire",
      "Congrès nationaux et internationaux",
      "Publications académiques et de vulgarisation",
    ],
    closingTitle: "Le savoir se vit aussi.",
    closingLead: "Après avoir découvert notre proposition académique, vous pouvez :",
    closingLinks: [
      { label: "Vivre une expérience gastronomique", to: "/experiences" },
      { label: "Explorer nos ressources", to: "/resources" },
      { label: "Collaborer à un projet", to: "/consulting" },
      { label: "Découvrir nos produits", to: "/products" },
    ],
    cta: "Écrivez-nous",
  },
};

/* ------------------------------------------------------------------ */
/* Consultoría                                                         */
/* ------------------------------------------------------------------ */

export type ConsultingCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  statement: string;
  modelLabel: string;
  modelTitle: string;
  modelLead: string;
  modelBody: string;
  scales: { name: string; body: string; items?: string[]; objective: string }[];
  collabLabel: string;
  collabTitle: string;
  collabs: { title: string; body: string }[];
  popupTitle: string;
  popupBody: string;
  popupItems: string[];
  popupNote: string;
  trackLabel: string;
  trackTitle: string;
  trackLead: string;
  slowFoodTitle: string;
  slowFoodBody: string;
  funders: string[];
  regions: string[];
  orgsTitle: string;
  orgsBody: string;
  orgs: string[];
  projectsTitle: string;
  projects: { title: string; body: string; items?: string[]; href?: string }[];
  processLabel: string;
  processTitle: string;
  process: { title: string; body: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

export const consultingPage: Record<Lang, ConsultingCopy> = {
  es: {
    eyebrow: "Consultoría MilpaChef®",
    title: "Acompañamos proyectos que fortalecen la relación entre gastronomía, territorio, comunidades y sistemas alimentarios.",
    intro:
      "La consultoría de MilpaChef® integra gastronomía, antropología, patrimonio biocultural y sostenibilidad para desarrollar proyectos con identidad territorial e impacto social, cultural, ambiental y económico.",
    statement:
      "Desde el desarrollo de un ingrediente local hasta el fortalecimiento de sistemas alimentarios completos, el Modelo de Intervención MilpaChef® ofrece un marco metodológico para diseñar proyectos gastronómicos con identidad territorial, impacto social y visión de largo plazo.",
    modelLabel: "Modelo de Intervención MilpaChef®",
    modelTitle: "Una metodología para comprender e intervenir la gastronomía desde diferentes escalas.",
    modelLead:
      "Cada proyecto tiene una escala distinta, pero todos forman parte de un mismo sistema alimentario.",
    modelBody:
      "En MilpaChef® adaptamos nuestra consultoría al nivel de intervención que cada iniciativa necesita, sin perder de vista su conexión con el territorio, las comunidades y el patrimonio biocultural. El modelo propone cuatro escalas complementarias.",
    scales: [
      {
        name: "Producto",
        body: "Fortalecimiento, valorización y desarrollo de ingredientes con identidad territorial.",
        items: [
          "Sal de montaña de Chiapas",
          "Maguey pulquero de Tlaxcala",
          "Frijoles nativos de Chiapas",
          "Destilado de maíz (pox) de Chiapas",
          "Hormiga chicatana de Chiapas",
        ],
        objective: "Generar valor agregado a partir del patrimonio biocultural de un producto.",
      },
      {
        name: "Organización",
        body: "Consultoría para restaurantes, hoteles, empresas, cooperativas y emprendimientos gastronómicos.",
        items: [
          "Conceptualización en gastronomía sustentable",
          "Desarrollo de menús ecogastronómicos",
          "Compras locales con medición de impacto",
          "Capacitación en ecogastronomía",
          "Experiencias eco-gastronómicas y laboratorios del gusto",
        ],
        objective: "Construir organizaciones eco-gastronómicas con identidad y propósito.",
      },
      {
        name: "Territorio",
        body: "Diseño de estrategias para destinos gastronómicos y regiones productoras.",
        items: [
          "Turismo gastronómico",
          "Patrimonio alimentario",
          "Rutas gastronómicas",
          "Diagnósticos territoriales",
          "Desarrollo local",
        ],
        objective: "Fortalecer la identidad gastronómica de un territorio.",
      },
      {
        name: "Sistema alimentario",
        body: "La escala más amplia del modelo.",
        items: [
          "Seguridad alimentaria",
          "Soberanía alimentaria",
          "Biodiversidad",
          "Cadenas cortas agroalimentarias",
          "Políticas públicas",
          "Desarrollo territorial",
        ],
        objective: "Contribuir a sistemas alimentarios más resilientes, sostenibles e incluyentes.",
      },
    ],
    collabLabel: "¿En qué podemos colaborar?",
    collabTitle: "Trabajamos con quienes hacen posible la gastronomía.",
    collabs: [
      { title: "Restaurantes", body: "Diseño conceptual, identidad gastronómica, abastecimiento local, sustentabilidad y capacitación." },
      { title: "Hoteles", body: "Desarrollo de experiencias gastronómicas, integración de productos locales y programas de sostenibilidad." },
      { title: "Turismo", body: "Rutas gastronómicas, interpretación del patrimonio alimentario y diseño de experiencias." },
      { title: "Instituciones", body: "Universidades, gobiernos, organizaciones civiles y organismos internacionales." },
      { title: "Productores y comunidades", body: "Valorización de productos, fortalecimiento de cadenas cortas y desarrollo territorial." },
    ],
    popupTitle: "Experiencias gastronómicas temporales",
    popupBody:
      "Diseño, producción y ejecución de experiencias gastronómicas efímeras que conectan territorio, productores y comensales.",
    popupItems: [
      "Cenas maridaje",
      "Pop-ups gastronómicos",
      "Chef's Table",
      "Residencias gastronómicas",
      "Menús de temporada",
      "Eventos privados",
      "Activaciones para hoteles, cervecerías y marcas",
      "Talleres y degustaciones",
    ],
    popupNote:
      "Estas experiencias funcionan como espacios de innovación, divulgación y experimentación donde la gastronomía sustentable se vive de manera directa.",
    trackLabel: "Experiencia que respalda el modelo",
    trackTitle: "Más de una década de proyectos en territorio.",
    trackLead:
      "La metodología de MilpaChef® se sustenta en más de una década de trabajo en proyectos de gastronomía, patrimonio biocultural y sistemas alimentarios.",
    slowFoodTitle: "Slow Food México y Centroamérica (2012–2022)",
    slowFoodBody:
      "Como Consejero Internacional de Slow Food México y Centroamérica, Alfonso Rocha coordinó y participó en proyectos de desarrollo sustentable eco-gastronómico, soberanía alimentaria y patrimonio biocultural financiados por organismos internacionales.",
    funders: ["Unión Europea", "Fundación W. K. Kellogg", "Fundación Ford", "FAO"],
    regions: [
      "Puebla y Tlaxcala — maguey pulquero",
      "Península de Yucatán — miel melipona y cerdo pelón",
      "Reserva de la Biosfera de Sian Ka'an, Quintana Roo — langosta espinosa",
      "Chiapas — sistema milpa y tostadas artesanales",
    ],
    orgsTitle: "Organismos internacionales",
    orgsBody:
      "En 2021 participó en proyectos con Conservation International y WWF relacionados con cadenas de valor, maíz, miel, turismo y diagnósticos de sistemas alimentarios en la costa de Oaxaca.",
    orgs: ["Conservation International", "World Wide Fund for Nature (WWF)"],
    projectsTitle: "Restaurantes, hospitalidad y proyectos gastronómicos",
    projects: [
      {
        title: "Centro cultural de gastronomía sustentable — Costa de Oaxaca (2022)",
        body: "Participación en la creación y desarrollo de un espacio dedicado a la gastronomía sustentable, concebido como un centro de encuentro entre productores, visitantes y comunidad local.",
        items: [
          "Bistró con cocina de ingredientes locales",
          "Huerto demostrativo",
          "Tienda de productos regionales",
          "Mercado de productores",
          "Talleres y experiencias gastronómicas",
          "Degustaciones y clases de cocina",
        ],
        href: "https://www.instagram.com/milpahuertomx/",
      },
      {
        title: "Restaurante Atzam — San Cristóbal de las Casas (2023)",
        body: "Desarrollo y operación de un restaurante de cocina ítalo-mexicana con ingredientes provenientes de comunidades indígenas de Chiapas: abastecimiento local, trazabilidad, innovación y valorización del patrimonio alimentario.",
        href: "https://www.instagram.com/atzam.milpachef/",
      },
    ],
    processLabel: "Nuestro proceso de trabajo",
    processTitle: "Cinco pasos, un mismo método.",
    process: [
      { title: "Comprender", body: "Investigamos el territorio, sus actores y su contexto." },
      { title: "Diagnosticar", body: "Identificamos oportunidades y desafíos." },
      { title: "Diseñar", body: "Construimos estrategias adaptadas a cada proyecto." },
      { title: "Implementar", body: "Acompañamos la ejecución y el desarrollo del proyecto." },
      { title: "Evaluar", body: "Medimos resultados y proponemos mejoras para asegurar su continuidad." },
    ],
    ctaTitle: "Conversemos sobre tu proyecto.",
    ctaBody:
      "Cada territorio, organización o comunidad enfrenta desafíos distintos. El Modelo de Intervención MilpaChef® nos permite adaptar nuestra metodología a la realidad de cada proyecto, construyendo soluciones que integran gastronomía, patrimonio biocultural y desarrollo territorial.",
    ctaButton: "Iniciar una conversación",
  },
  en: {
    eyebrow: "MilpaChef® Consulting",
    title: "We support projects that strengthen the link between gastronomy, territory, communities and food systems.",
    intro:
      "MilpaChef® consulting brings together gastronomy, anthropology, biocultural heritage and sustainability to develop projects with territorial identity and social, cultural, environmental and economic impact.",
    statement:
      "From developing a single local ingredient to strengthening entire food systems, the MilpaChef® Intervention Model offers a methodological framework for designing culinary projects with territorial identity, social impact and a long-term vision.",
    modelLabel: "MilpaChef® Intervention Model",
    modelTitle: "A methodology to understand and act on gastronomy at different scales.",
    modelLead: "Every project has its own scale, yet all of them belong to the same food system.",
    modelBody:
      "We adapt our consulting to the level of intervention each initiative needs, without losing sight of its connection to the territory, the communities and biocultural heritage. The model proposes four complementary scales.",
    scales: [
      {
        name: "Product",
        body: "Strengthening, valorising and developing ingredients with territorial identity.",
        items: [
          "Mountain salt from Chiapas",
          "Pulque maguey from Tlaxcala",
          "Heirloom beans from Chiapas",
          "Native corn distillate (pox) from Chiapas",
          "Chicatana ants from Chiapas",
        ],
        objective: "Create added value from the biocultural heritage of a product.",
      },
      {
        name: "Organisation",
        body: "Consulting for restaurants, hotels, companies, cooperatives and food ventures.",
        items: [
          "Sustainable gastronomy concept design",
          "Eco-gastronomic menu development",
          "Local sourcing with impact measurement",
          "Eco-gastronomy training",
          "Eco-gastronomic experiences and taste workshops",
        ],
        objective: "Build eco-gastronomic organisations with identity and purpose.",
      },
      {
        name: "Territory",
        body: "Strategy design for culinary destinations and producing regions.",
        items: [
          "Food tourism",
          "Food heritage",
          "Gastronomic routes",
          "Territorial diagnostics",
          "Local development",
        ],
        objective: "Strengthen the culinary identity of a territory.",
      },
      {
        name: "Food system",
        body: "The broadest scale of the model.",
        items: [
          "Food security",
          "Food sovereignty",
          "Biodiversity",
          "Short agri-food chains",
          "Public policy",
          "Territorial development",
        ],
        objective: "Contribute to more resilient, sustainable and inclusive food systems.",
      },
    ],
    collabLabel: "Where we can work together",
    collabTitle: "We work with those who make gastronomy possible.",
    collabs: [
      { title: "Restaurants", body: "Concept design, culinary identity, local sourcing, sustainability and training." },
      { title: "Hotels", body: "Culinary experience development, local product integration and sustainability programmes." },
      { title: "Tourism", body: "Gastronomic routes, food-heritage interpretation and experience design." },
      { title: "Institutions", body: "Universities, governments, civil society organisations and international bodies." },
      { title: "Producers & communities", body: "Product valorisation, short supply chains and territorial development." },
    ],
    popupTitle: "Temporary culinary experiences",
    popupBody:
      "Design, production and delivery of ephemeral culinary experiences that connect territory, producers and diners.",
    popupItems: [
      "Pairing dinners",
      "Food pop-ups",
      "Chef's Table",
      "Culinary residencies",
      "Seasonal menus",
      "Private events",
      "Activations for hotels, breweries and brands",
      "Workshops and tastings",
    ],
    popupNote:
      "These experiences work as spaces of innovation, outreach and experimentation, where sustainable gastronomy is lived first-hand.",
    trackLabel: "The experience behind the model",
    trackTitle: "More than a decade of projects in the field.",
    trackLead:
      "MilpaChef®'s methodology is grounded in over a decade of work on gastronomy, biocultural heritage and food systems.",
    slowFoodTitle: "Slow Food Mexico & Central America (2012–2022)",
    slowFoodBody:
      "As International Councillor for Slow Food Mexico and Central America, Alfonso Rocha coordinated and took part in eco-gastronomic sustainable development, food sovereignty and biocultural heritage projects funded by international bodies.",
    funders: ["European Union", "W. K. Kellogg Foundation", "Ford Foundation", "FAO"],
    regions: [
      "Puebla and Tlaxcala — pulque maguey",
      "Yucatán Peninsula — melipona honey and pelón pig",
      "Sian Ka'an Biosphere Reserve, Quintana Roo — spiny lobster",
      "Chiapas — milpa system and artisanal tostadas",
    ],
    orgsTitle: "International organisations",
    orgsBody:
      "In 2021 he took part in projects with Conservation International and WWF on value chains, corn, honey, tourism and food-system diagnostics on the coast of Oaxaca.",
    orgs: ["Conservation International", "World Wide Fund for Nature (WWF)"],
    projectsTitle: "Restaurants, hospitality and culinary projects",
    projects: [
      {
        title: "Sustainable gastronomy cultural centre — Oaxaca coast (2022)",
        body: "Co-creation of a space dedicated to sustainable gastronomy, conceived as a meeting point between producers, visitors and the local community.",
        items: [
          "Bistro cooking with local ingredients",
          "Demonstration garden",
          "Regional product shop",
          "Producers' market",
          "Workshops and culinary experiences",
          "Tastings and cooking classes",
        ],
        href: "https://www.instagram.com/milpahuertomx/",
      },
      {
        title: "Atzam restaurant — San Cristóbal de las Casas (2023)",
        body: "Development and operation of an Italo-Mexican restaurant using ingredients from Indigenous communities in Chiapas: local sourcing, traceability, innovation and food-heritage valorisation.",
        href: "https://www.instagram.com/atzam.milpachef/",
      },
    ],
    processLabel: "How we work",
    processTitle: "Five steps, one method.",
    process: [
      { title: "Understand", body: "We research the territory, its actors and its context." },
      { title: "Diagnose", body: "We identify opportunities and challenges." },
      { title: "Design", body: "We build strategies tailored to each project." },
      { title: "Implement", body: "We accompany execution and development." },
      { title: "Evaluate", body: "We measure results and propose improvements to ensure continuity." },
    ],
    ctaTitle: "Let's talk about your project.",
    ctaBody:
      "Every territory, organisation and community faces different challenges. The MilpaChef® Intervention Model lets us adapt our methodology to the reality of each project, building solutions that integrate gastronomy, biocultural heritage and territorial development.",
    ctaButton: "Start a conversation",
  },
  fr: {
    eyebrow: "Conseil MilpaChef®",
    title: "Nous accompagnons les projets qui renforcent le lien entre gastronomie, territoire, communautés et systèmes alimentaires.",
    intro:
      "Le conseil MilpaChef® associe gastronomie, anthropologie, patrimoine bioculturel et durabilité pour développer des projets à identité territoriale et à impact social, culturel, environnemental et économique.",
    statement:
      "Du développement d'un ingrédient local au renforcement de systèmes alimentaires entiers, le Modèle d'Intervention MilpaChef® offre un cadre méthodologique pour concevoir des projets gastronomiques ancrés dans leur territoire, à impact social et vision de long terme.",
    modelLabel: "Modèle d'Intervention MilpaChef®",
    modelTitle: "Une méthodologie pour comprendre et intervenir sur la gastronomie à différentes échelles.",
    modelLead: "Chaque projet a son échelle, mais tous appartiennent à un même système alimentaire.",
    modelBody:
      "Nous adaptons notre conseil au niveau d'intervention dont chaque initiative a besoin, sans perdre de vue son lien au territoire, aux communautés et au patrimoine bioculturel. Le modèle propose quatre échelles complémentaires.",
    scales: [
      {
        name: "Produit",
        body: "Renforcement, valorisation et développement d'ingrédients à identité territoriale.",
        items: [
          "Sel de montagne du Chiapas",
          "Maguey à pulque de Tlaxcala",
          "Haricots natifs du Chiapas",
          "Distillat de maïs (pox) du Chiapas",
          "Fourmi chicatana du Chiapas",
        ],
        objective: "Créer de la valeur à partir du patrimoine bioculturel d'un produit.",
      },
      {
        name: "Organisation",
        body: "Conseil pour restaurants, hôtels, entreprises, coopératives et projets gastronomiques.",
        items: [
          "Conceptualisation en gastronomie durable",
          "Développement de menus éco-gastronomiques",
          "Achats locaux avec mesure d'impact",
          "Formation en éco-gastronomie",
          "Expériences éco-gastronomiques et laboratoires du goût",
        ],
        objective: "Construire des organisations éco-gastronomiques avec identité et sens.",
      },
      {
        name: "Territoire",
        body: "Conception de stratégies pour destinations gastronomiques et régions productrices.",
        items: [
          "Tourisme gastronomique",
          "Patrimoine alimentaire",
          "Routes gastronomiques",
          "Diagnostics territoriaux",
          "Développement local",
        ],
        objective: "Renforcer l'identité gastronomique d'un territoire.",
      },
      {
        name: "Système alimentaire",
        body: "L'échelle la plus large du modèle.",
        items: [
          "Sécurité alimentaire",
          "Souveraineté alimentaire",
          "Biodiversité",
          "Circuits courts agroalimentaires",
          "Politiques publiques",
          "Développement territorial",
        ],
        objective: "Contribuer à des systèmes alimentaires plus résilients, durables et inclusifs.",
      },
    ],
    collabLabel: "Où collaborer",
    collabTitle: "Nous travaillons avec celles et ceux qui font la gastronomie.",
    collabs: [
      { title: "Restaurants", body: "Conception, identité gastronomique, approvisionnement local, durabilité et formation." },
      { title: "Hôtels", body: "Développement d'expériences gastronomiques, intégration de produits locaux et programmes de durabilité." },
      { title: "Tourisme", body: "Routes gastronomiques, interprétation du patrimoine alimentaire et design d'expériences." },
      { title: "Institutions", body: "Universités, gouvernements, organisations civiles et organismes internationaux." },
      { title: "Producteurs et communautés", body: "Valorisation des produits, circuits courts et développement territorial." },
    ],
    popupTitle: "Expériences gastronomiques éphémères",
    popupBody:
      "Conception, production et exécution d'expériences gastronomiques éphémères qui relient territoire, producteurs et convives.",
    popupItems: [
      "Dîners accords mets-boissons",
      "Pop-ups gastronomiques",
      "Chef's Table",
      "Résidences gastronomiques",
      "Menus de saison",
      "Événements privés",
      "Activations pour hôtels, brasseries et marques",
      "Ateliers et dégustations",
    ],
    popupNote:
      "Ces expériences sont des espaces d'innovation, de diffusion et d'expérimentation où la gastronomie durable se vit directement.",
    trackLabel: "L'expérience derrière le modèle",
    trackTitle: "Plus d'une décennie de projets sur le terrain.",
    trackLead:
      "La méthodologie de MilpaChef® s'appuie sur plus de dix ans de projets en gastronomie, patrimoine bioculturel et systèmes alimentaires.",
    slowFoodTitle: "Slow Food Mexique et Amérique centrale (2012–2022)",
    slowFoodBody:
      "Conseiller international de Slow Food Mexique et Amérique centrale, Alfonso Rocha a coordonné et participé à des projets de développement durable éco-gastronomique, de souveraineté alimentaire et de patrimoine bioculturel financés par des organismes internationaux.",
    funders: ["Union européenne", "Fondation W. K. Kellogg", "Fondation Ford", "FAO"],
    regions: [
      "Puebla et Tlaxcala — maguey à pulque",
      "Péninsule du Yucatán — miel mélipone et cochon pelón",
      "Réserve de biosphère de Sian Ka'an, Quintana Roo — langouste",
      "Chiapas — système milpa et tostadas artisanales",
    ],
    orgsTitle: "Organismes internationaux",
    orgsBody:
      "En 2021, il a participé à des projets avec Conservation International et le WWF sur les chaînes de valeur, le maïs, le miel, le tourisme et les diagnostics de systèmes alimentaires sur la côte d'Oaxaca.",
    orgs: ["Conservation International", "World Wide Fund for Nature (WWF)"],
    projectsTitle: "Restaurants, hospitalité et projets gastronomiques",
    projects: [
      {
        title: "Centre culturel de gastronomie durable — côte d'Oaxaca (2022)",
        body: "Participation à la création d'un espace dédié à la gastronomie durable, conçu comme un lieu de rencontre entre producteurs, visiteurs et communauté locale.",
        items: [
          "Bistro aux ingrédients locaux",
          "Potager de démonstration",
          "Boutique de produits régionaux",
          "Marché de producteurs",
          "Ateliers et expériences gastronomiques",
          "Dégustations et cours de cuisine",
        ],
        href: "https://www.instagram.com/milpahuertomx/",
      },
      {
        title: "Restaurant Atzam — San Cristóbal de las Casas (2023)",
        body: "Développement et exploitation d'un restaurant italo-mexicain avec des ingrédients issus de communautés autochtones du Chiapas : approvisionnement local, traçabilité, innovation et valorisation du patrimoine alimentaire.",
        href: "https://www.instagram.com/atzam.milpachef/",
      },
    ],
    processLabel: "Notre processus",
    processTitle: "Cinq étapes, une méthode.",
    process: [
      { title: "Comprendre", body: "Nous étudions le territoire, ses acteurs et son contexte." },
      { title: "Diagnostiquer", body: "Nous identifions opportunités et défis." },
      { title: "Concevoir", body: "Nous construisons des stratégies adaptées à chaque projet." },
      { title: "Mettre en œuvre", body: "Nous accompagnons l'exécution et le développement." },
      { title: "Évaluer", body: "Nous mesurons les résultats et proposons des améliorations." },
    ],
    ctaTitle: "Parlons de votre projet.",
    ctaBody:
      "Chaque territoire, organisation ou communauté fait face à des défis différents. Le Modèle d'Intervention MilpaChef® nous permet d'adapter notre méthodologie à la réalité de chaque projet.",
    ctaButton: "Démarrer une conversation",
  },
};

/* ------------------------------------------------------------------ */
/* Productos — Selección MilpaChef®                                    */
/* ------------------------------------------------------------------ */

export type ProductsCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  whatTitle: string;
  whatBody: string[];
  criteriaLabel: string;
  criteria: { title: string; body: string }[];
  catalogLabel: string;
  catalogTitle: string;
  storyTitle: string;
  storyBody: string;
  buyersTitle: string;
  buyers: string[];
  shippingTitle: string;
  shippingBody: string;
  impactTitle: string;
  impactBody: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
};

export const productsPage: Record<Lang, ProductsCopy> = {
  es: {
    eyebrow: "Selección MilpaChef®",
    title: "Selección MilpaChef®",
    subtitle:
      "Alimentos con identidad territorial que preservan el patrimonio biocultural de México.",
    intro: [
      "Cada alimento ancestral del catálogo MilpaChef® representa mucho más que un ingrediente: es el resultado de una historia, un territorio, una comunidad y una forma de entender la gastronomía como patrimonio biocultural.",
      "Trabajamos directamente con pequeños productores y proyectos comunitarios para acercar ingredientes únicos a cocineros, restaurantes, universidades y amantes de la gastronomía en todo México.",
    ],
    whatTitle: "¿Qué es la Selección MilpaChef®?",
    whatBody: [
      "Es un catálogo curado de ingredientes mexicanos elegidos por su valor gastronómico, cultural, ambiental y social.",
      "Cada producto ha sido seleccionado porque representa una parte del patrimonio alimentario de México y contribuye al fortalecimiento de pequeños productores y sistemas alimentarios locales.",
    ],
    criteriaLabel: "Nuestros cinco criterios de selección",
    criteria: [
      { title: "Patrimonio biocultural", body: "Ingredientes ligados a la historia, cultura y biodiversidad de México." },
      { title: "Valor gastronómico", body: "Productos con características culinarias excepcionales." },
      { title: "Origen y trazabilidad", body: "Sabemos quién produce cada ingrediente, dónde se produce y cómo llega hasta la cocina." },
      { title: "Impacto social y ambiental", body: "Fortalecemos economías locales, comercio justo y prácticas sostenibles." },
      { title: "Autenticidad", body: "Ingredientes difíciles de encontrar en cadenas comerciales convencionales." },
    ],
    catalogLabel: "Explora la Selección MilpaChef®",
    catalogTitle: "Ingredientes ancestrales",
    storyTitle: "Más que un ingrediente, una historia.",
    storyBody:
      "Cada producto del catálogo incluye información sobre su origen, comunidad productora, historia, usos culinarios y recomendaciones de preparación. El objetivo es que el catálogo funcione también como una herramienta de divulgación del patrimonio gastronómico mexicano.",
    buyersTitle: "¿Quién compra en MilpaChef?",
    buyers: [
      "Restaurantes",
      "Hoteles",
      "Chefs",
      "Escuelas de gastronomía",
      "Empresas",
      "Amantes de la cocina",
      "Personas interesadas en la gastronomía mexicana",
    ],
    shippingTitle: "Envíos a todo México",
    shippingBody:
      "Realizamos envíos nacionales para que ingredientes provenientes de distintas regiones del país puedan llegar a cualquier cocina.",
    impactTitle: "Cada compra fortalece una red de productores.",
    impactBody:
      "Al adquirir productos de la Selección MilpaChef® contribuyes a conservar conocimientos tradicionales, fortalecer economías locales y mantener vivo el patrimonio biocultural de México.",
    ctaTitle: "Lleva el patrimonio gastronómico de México a tu cocina.",
    ctaBody:
      "Descubre ingredientes únicos seleccionados por MilpaChef® y forma parte de una red que conecta gastronomía, territorio y comunidades.",
    ctaPrimary: "Explorar catálogo",
  },
  en: {
    eyebrow: "MilpaChef® Selection",
    title: "MilpaChef® Selection",
    subtitle: "Foods with territorial identity that preserve Mexico's biocultural heritage.",
    intro: [
      "Every ancestral food in the MilpaChef® catalog is far more than an ingredient: it is the result of a history, a territory, a community and a way of understanding gastronomy as biocultural heritage.",
      "We work directly with small producers and community projects to bring unique ingredients to cooks, restaurants, universities and food lovers across Mexico.",
    ],
    whatTitle: "What is the MilpaChef® Selection?",
    whatBody: [
      "A curated catalog of Mexican ingredients chosen for their culinary, cultural, environmental and social value.",
      "Each product was selected because it represents part of Mexico's food heritage and helps strengthen small producers and local food systems.",
    ],
    criteriaLabel: "Our five selection criteria",
    criteria: [
      { title: "Biocultural heritage", body: "Ingredients tied to Mexico's history, culture and biodiversity." },
      { title: "Culinary value", body: "Products with exceptional cooking qualities." },
      { title: "Origin & traceability", body: "We know who produces each ingredient, where, and how it reaches the kitchen." },
      { title: "Social & environmental impact", body: "We strengthen local economies, fair trade and sustainable practices." },
      { title: "Authenticity", body: "Ingredients hard to find through conventional commercial chains." },
    ],
    catalogLabel: "Explore the MilpaChef® Selection",
    catalogTitle: "Ancestral ingredients",
    storyTitle: "More than an ingredient — a story.",
    storyBody:
      "Every product includes information about its origin, producer community, history, culinary uses and preparation tips. The catalog is also meant to be a tool for sharing Mexican food heritage.",
    buyersTitle: "Who buys from MilpaChef?",
    buyers: [
      "Restaurants",
      "Hotels",
      "Chefs",
      "Culinary schools",
      "Companies",
      "Home cooks",
      "Anyone curious about Mexican gastronomy",
    ],
    shippingTitle: "Shipping across Mexico",
    shippingBody:
      "We ship nationwide so that ingredients from different regions of the country can reach any kitchen.",
    impactTitle: "Every purchase strengthens a network of producers.",
    impactBody:
      "By buying from the MilpaChef® Selection you help preserve traditional knowledge, strengthen local economies and keep Mexico's biocultural heritage alive.",
    ctaTitle: "Bring Mexico's food heritage into your kitchen.",
    ctaBody:
      "Discover unique ingredients selected by MilpaChef® and join a network connecting gastronomy, territory and communities.",
    ctaPrimary: "Explore the catalog",
  },
  fr: {
    eyebrow: "Sélection MilpaChef®",
    title: "Sélection MilpaChef®",
    subtitle:
      "Des aliments à identité territoriale qui préservent le patrimoine bioculturel du Mexique.",
    intro: [
      "Chaque aliment ancestral du catalogue MilpaChef® est bien plus qu'un ingrédient : c'est le fruit d'une histoire, d'un territoire, d'une communauté et d'une façon de comprendre la gastronomie comme patrimoine bioculturel.",
      "Nous travaillons directement avec de petits producteurs et des projets communautaires pour rendre ces ingrédients accessibles aux cuisiniers, restaurants, universités et passionnés partout au Mexique.",
    ],
    whatTitle: "Qu'est-ce que la Sélection MilpaChef® ?",
    whatBody: [
      "Un catalogue d'ingrédients mexicains choisis pour leur valeur gastronomique, culturelle, environnementale et sociale.",
      "Chaque produit a été retenu parce qu'il représente une part du patrimoine alimentaire du Mexique et soutient les petits producteurs et les systèmes alimentaires locaux.",
    ],
    criteriaLabel: "Nos cinq critères de sélection",
    criteria: [
      { title: "Patrimoine bioculturel", body: "Des ingrédients liés à l'histoire, la culture et la biodiversité du Mexique." },
      { title: "Valeur gastronomique", body: "Des produits aux qualités culinaires exceptionnelles." },
      { title: "Origine et traçabilité", body: "Nous savons qui produit chaque ingrédient, où et comment il arrive en cuisine." },
      { title: "Impact social et environnemental", body: "Nous renforçons les économies locales, le commerce équitable et les pratiques durables." },
      { title: "Authenticité", body: "Des ingrédients difficiles à trouver dans les circuits commerciaux classiques." },
    ],
    catalogLabel: "Explorez la Sélection MilpaChef®",
    catalogTitle: "Ingrédients ancestraux",
    storyTitle: "Plus qu'un ingrédient, une histoire.",
    storyBody:
      "Chaque produit du catalogue présente son origine, sa communauté productrice, son histoire, ses usages culinaires et des conseils de préparation. Le catalogue est aussi un outil de diffusion du patrimoine gastronomique mexicain.",
    buyersTitle: "Qui achète chez MilpaChef ?",
    buyers: [
      "Restaurants",
      "Hôtels",
      "Chefs",
      "Écoles de gastronomie",
      "Entreprises",
      "Amoureux de la cuisine",
      "Curieux de la gastronomie mexicaine",
    ],
    shippingTitle: "Livraison dans tout le Mexique",
    shippingBody:
      "Nous expédions partout au Mexique afin que des ingrédients de différentes régions puissent arriver dans toutes les cuisines.",
    impactTitle: "Chaque achat renforce un réseau de producteurs.",
    impactBody:
      "En achetant la Sélection MilpaChef®, vous contribuez à préserver des savoirs traditionnels, à renforcer les économies locales et à maintenir vivant le patrimoine bioculturel du Mexique.",
    ctaTitle: "Faites entrer le patrimoine gastronomique du Mexique dans votre cuisine.",
    ctaBody:
      "Découvrez des ingrédients uniques sélectionnés par MilpaChef® et rejoignez un réseau qui relie gastronomie, territoire et communautés.",
    ctaPrimary: "Explorer le catalogue",
  },
};

/* ------------------------------------------------------------------ */
/* Recursos                                                            */
/* ------------------------------------------------------------------ */

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@Milpachef";

export type ResourcesSectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  recipesTitle: string;
  recipesBody: string;
  recipesIncludes: string[];
  recipesCta: string;
  videosTitle: string;
  videosBody: string;
  videosCta: string;
  moreLabel: string;
  more: { title: string; body: string; to: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

export const resourcesSection: Record<Lang, ResourcesSectionCopy> = {
  es: {
    eyebrow: "Recursos MilpaChef®",
    title: "Recursos MilpaChef®",
    subtitle:
      "Conocimiento, recetas y contenidos para seguir explorando la gastronomía sustentable.",
    intro:
      "En esta sección encontrarás materiales gratuitos desarrollados por MilpaChef®, incluyendo recetarios, videos, artículos y otros recursos diseñados para acercarte a la riqueza gastronómica y biocultural de México.",
    recipesTitle: "Recetas",
    recipesBody:
      "Recetarios digitales desarrollados por MilpaChef® con ingredientes de la Selección MilpaChef® y productos de temporada.",
    recipesIncludes: [
      "Introducción",
      "Paso a paso",
      "Fotografías",
      "Recomendaciones del chef",
      "Ingredientes relacionados",
      "Enlace a productos del catálogo",
    ],
    recipesCta: "Solicitar recetario",
    videosTitle: "Videos",
    videosBody:
      "Videos educativos y demostraciones culinarias publicados en el canal de YouTube y las redes sociales de MilpaChef®.",
    videosCta: "Ver canal de YouTube",
    moreLabel: "Más conocimiento",
    more: [
      { title: "Investigación", body: "Publicaciones, artículos, estudios y ponencias sobre sistemas alimentarios mexicanos.", to: "/research" },
      { title: "Impacto", body: "Proyectos con productores, comunidades y organizaciones aliadas.", to: "/impact" },
      { title: "Academia", body: "Docencia, producción académica y modalidades de formación.", to: "/academy" },
      { title: "Selección MilpaChef®", body: "Ingredientes ancestrales con origen y trazabilidad.", to: "/products" },
    ],
    ctaTitle: "Sigue aprendiendo con MilpaChef®",
    ctaBody:
      "Explora nuevos contenidos y acompáñanos en la difusión del patrimonio gastronómico y biocultural de México.",
    ctaButton: "Suscribirme al canal",
  },
  en: {
    eyebrow: "MilpaChef® Resources",
    title: "MilpaChef® Resources",
    subtitle: "Knowledge, recipes and content to keep exploring sustainable gastronomy.",
    intro:
      "Here you'll find free materials developed by MilpaChef® — recipe books, videos, articles and other resources designed to bring you closer to Mexico's culinary and biocultural richness.",
    recipesTitle: "Recipes",
    recipesBody:
      "Digital recipe books developed by MilpaChef® using ingredients from the MilpaChef® Selection and seasonal produce.",
    recipesIncludes: [
      "Introduction",
      "Step by step",
      "Photography",
      "Chef's recommendations",
      "Related ingredients",
      "Links to catalog products",
    ],
    recipesCta: "Request the recipe book",
    videosTitle: "Videos",
    videosBody:
      "Educational videos and cooking demonstrations published on MilpaChef®'s YouTube channel and social media.",
    videosCta: "Watch the YouTube channel",
    moreLabel: "More knowledge",
    more: [
      { title: "Research", body: "Publications, articles, studies and conference papers on Mexican food systems.", to: "/research" },
      { title: "Impact", body: "Projects with producers, communities and allied organisations.", to: "/impact" },
      { title: "Academy", body: "Teaching, academic output and available training formats.", to: "/academy" },
      { title: "MilpaChef® Selection", body: "Ancestral ingredients with origin and traceability.", to: "/products" },
    ],
    ctaTitle: "Keep learning with MilpaChef®",
    ctaBody:
      "Explore new content and join us in sharing Mexico's culinary and biocultural heritage.",
    ctaButton: "Subscribe to the channel",
  },
  fr: {
    eyebrow: "Ressources MilpaChef®",
    title: "Ressources MilpaChef®",
    subtitle: "Savoirs, recettes et contenus pour continuer d'explorer la gastronomie durable.",
    intro:
      "Vous trouverez ici des ressources gratuites développées par MilpaChef® : recettaires, vidéos, articles et autres contenus conçus pour vous rapprocher de la richesse gastronomique et bioculturelle du Mexique.",
    recipesTitle: "Recettes",
    recipesBody:
      "Recettaires numériques développés par MilpaChef® avec les ingrédients de la Sélection MilpaChef® et des produits de saison.",
    recipesIncludes: [
      "Introduction",
      "Pas à pas",
      "Photographies",
      "Recommandations du chef",
      "Ingrédients associés",
      "Liens vers les produits du catalogue",
    ],
    recipesCta: "Demander le recettaire",
    videosTitle: "Vidéos",
    videosBody:
      "Vidéos éducatives et démonstrations culinaires publiées sur la chaîne YouTube et les réseaux de MilpaChef®.",
    videosCta: "Voir la chaîne YouTube",
    moreLabel: "Plus de savoirs",
    more: [
      { title: "Recherche", body: "Publications, articles, études et communications sur les systèmes alimentaires mexicains.", to: "/research" },
      { title: "Impact", body: "Projets avec producteurs, communautés et organisations partenaires.", to: "/impact" },
      { title: "Académie", body: "Enseignement, production académique et formats de formation.", to: "/academy" },
      { title: "Sélection MilpaChef®", body: "Ingrédients ancestraux, origine et traçabilité.", to: "/products" },
    ],
    ctaTitle: "Continuez d'apprendre avec MilpaChef®",
    ctaBody:
      "Explorez de nouveaux contenus et accompagnez-nous dans la diffusion du patrimoine gastronomique et bioculturel du Mexique.",
    ctaButton: "S'abonner à la chaîne",
  },
};
