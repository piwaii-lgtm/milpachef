
ALTER TABLE public.tours ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'tour';
ALTER TABLE public.tours ADD CONSTRAINT tours_category_check CHECK (category IN ('tour','class'));
CREATE INDEX IF NOT EXISTS tours_category_date_idx ON public.tours (category, tour_date);

INSERT INTO public.tours (title, slug, tour_date, duration_minutes, meeting_point, capacity, spots_left, price_mxn, description_en, description_es, description_fr, image_key, category)
VALUES
  (
    'Cholula Cooking Class — Mole Poblano & Heirloom Corn',
    'cooking-class-mole-2026-08-10',
    '2026-08-10 11:00:00+00',
    240,
    'Milpa Chef private kitchen, San Andrés Cholula',
    8, 8, 985,
    'A hands-on 4-hour cooking class in Cholula: grind heirloom corn on the metate, shape tortillas on the comal, and cook a full mole poblano from scratch with Alfonso. You take home the recipes and sit down together to a long lunch.',
    'Clase de cocina práctica de 4 horas en Cholula: muele maíz nativo en el metate, echa tortillas al comal y prepara un mole poblano completo desde cero con Alfonso. Te llevas las recetas y compartimos una comida larga al final.',
    'Cours de cuisine de 4 heures à Cholula : moudre le maïs ancien sur le metate, façonner les tortillas sur le comal et cuisiner un mole poblano complet avec Alfonso. Vous repartez avec les recettes et partagez un long déjeuner à la fin.',
    'class', 'class'
  ),
  (
    'Cholula Cooking Class — Antojitos & Salsas',
    'cooking-class-antojitos-2026-08-24',
    '2026-08-24 11:00:00+00',
    240,
    'Milpa Chef private kitchen, San Andrés Cholula',
    8, 8, 985,
    'Learn the antojitos of Puebla in a small-group class: tlacoyos, memelas, sopes and three salsas ground on the molcajete. Everything cooked on a wood-fired comal and eaten together.',
    'Aprende los antojitos de Puebla en una clase de grupo pequeño: tlacoyos, memelas, sopes y tres salsas molidas en el molcajete. Todo cocinado en comal de leña y compartido en la mesa.',
    'Apprenez les antojitos de Puebla en petit groupe : tlacoyos, memelas, sopes et trois salsas broyées au molcajete. Tout est cuit sur un comal au feu de bois et partagé à table.',
    'class', 'class'
  ),
  (
    'Cholula Cooking Class — Tamales & Atole',
    'cooking-class-tamales-2026-09-07',
    '2026-09-07 11:00:00+00',
    240,
    'Milpa Chef private kitchen, San Andrés Cholula',
    8, 8, 985,
    'A traditional tamalada in Cholula: prepare the masa, fold banana leaves and corn husks, steam tamales of mole, rajas and sweet pineapple, and finish with a warm atole de maíz azul.',
    'Una tamalada tradicional en Cholula: preparamos la masa, doblamos hojas de plátano y totomoxtle, cocemos tamales de mole, rajas y piña dulce, y cerramos con un atole de maíz azul.',
    'Une tamalada traditionnelle à Cholula : préparer la masa, plier feuilles de bananier et de maïs, cuire à la vapeur des tamales au mole, rajas et ananas sucré, puis clôturer avec un atole de maïs bleu.',
    'class', 'class'
  );
