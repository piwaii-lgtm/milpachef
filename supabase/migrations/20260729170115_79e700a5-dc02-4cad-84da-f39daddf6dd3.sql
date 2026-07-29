
-- Tours
CREATE TABLE public.tours (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tour_date TIMESTAMPTZ NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 180,
  meeting_point TEXT NOT NULL,
  capacity INT NOT NULL DEFAULT 10,
  spots_left INT NOT NULL DEFAULT 10,
  price_mxn INT NOT NULL DEFAULT 450,
  description_en TEXT NOT NULL,
  description_es TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  image_key TEXT NOT NULL DEFAULT 'hero',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tours TO anon, authenticated;
GRANT ALL ON public.tours TO service_role;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tours_public_read" ON public.tours FOR SELECT TO anon, authenticated USING (true);

-- Bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_id UUID NOT NULL REFERENCES public.tours(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  party_size INT NOT NULL DEFAULT 1,
  notes TEXT,
  amount_mxn INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bookings_public_insert" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  origin TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  quote_es TEXT NOT NULL,
  quote_fr TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  featured BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials_public_read" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);

-- Seed upcoming tours (all "Gastro Tour by Milpa Chef", 450 MXN)
INSERT INTO public.tours (title, slug, tour_date, meeting_point, capacity, spots_left, price_mxn, description_en, description_es, description_fr, image_key) VALUES
('Gastro Tour by Milpa Chef', 'gastro-tour-2026-08-01', (now() + interval '4 days')::date + time '10:00', 'Zócalo de Cholula, next to the kiosk', 10, 8, 450,
 'A three-hour walking tour through Cholula''s living food scene. Meet the cooks, farmers and mezcaleros behind the town''s best bites. Along the way we sit at market counters, sip fresh atole, taste heirloom-corn tlacoyos, mole from a family molino, and finish with sipping mezcal — all sourced through the Slow Food principles Milpa Chef champions.',
 'Un recorrido a pie de tres horas por la escena gastronómica viva de Cholula. Conocerás a las cocineras, campesinos y mezcaleros detrás de los mejores bocados del pueblo. Nos sentamos en las barras del mercado, probamos atole fresco, tlacoyos de maíz nativo, mole de un molino familiar y cerramos con mezcal — todo bajo los principios de Slow Food que Milpa Chef defiende.',
 'Une balade gourmande de trois heures dans la scène culinaire vivante de Cholula. Rencontre avec les cuisinières, paysans et mezcaleros qui font la ville. On s''assoit aux comptoirs du marché, on goûte l''atole fraîs, les tlacoyos de maïs ancien, un mole d''un moulin familial, et on termine par un mezcal à siroter — le tout dans l''esprit Slow Food porté par Milpa Chef.',
 'hero'),
('Gastro Tour by Milpa Chef', 'gastro-tour-2026-08-08', (now() + interval '11 days')::date + time '10:00', 'Zócalo de Cholula, next to the kiosk', 10, 10, 450,
 'A three-hour walking tour through Cholula''s living food scene, in the company of chef and Slow Food advocate Milpa Chef. Expect market tastings, native-corn tortillas fresh off the comal, seasonal mole, and stories about the producers who make it all possible.',
 'Recorrido de tres horas por la escena gastronómica de Cholula con la chef y activista Slow Food Milpa Chef. Degustaciones en el mercado, tortillas de maíz nativo recién salidas del comal, mole de temporada y las historias de los productores detrás de todo.',
 'Trois heures de balade gourmande dans Cholula avec Milpa Chef, cheffe et militante Slow Food. Dégustations au marché, tortillas de maïs ancien tout juste sorties du comal, mole de saison et les histoires des producteurs qui rendent tout cela possible.',
 'tortillas'),
('Gastro Tour by Milpa Chef — Sunset Edition', 'gastro-tour-2026-08-15-sunset', (now() + interval '18 days')::date + time '17:30', 'Ex-Convento de San Gabriel, main entrance', 10, 6, 450,
 'A sunset edition of the Gastro Tour. We walk from the ex-convent as the light turns gold, sampling tacos al pastor, esquites and pan de fiesta from vendors Milpa Chef trusts, and end around candles with mezcal, sal de gusano and cacao.',
 'Edición al atardecer del Gastro Tour. Caminamos desde el ex-convento cuando la luz se vuelve dorada, probando tacos al pastor, esquites y pan de fiesta de vendedores de confianza de Milpa Chef, y cerramos con velas, mezcal, sal de gusano y cacao.',
 'Édition coucher de soleil du Gastro Tour. On part de l''ex-couvent quand la lumière devient dorée, on goûte tacos al pastor, esquites et pan de fiesta chez les vendeurs de confiance de Milpa Chef, puis on termine à la bougie autour d''un mezcal, du sel de ver et du cacao.',
 'street'),
('Gastro Tour by Milpa Chef', 'gastro-tour-2026-08-22', (now() + interval '25 days')::date + time '10:00', 'Zócalo de Cholula, next to the kiosk', 10, 10, 450,
 'The classic morning Gastro Tour: three hours, six tasting stops, one town told through its food. Vegetarian-friendly with advance notice.',
 'El clásico Gastro Tour matutino: tres horas, seis paradas de degustación, un pueblo contado a través de su comida. Apto para vegetarianos avisando con anticipación.',
 'Le Gastro Tour classique du matin : trois heures, six arrêts dégustation, une ville racontée par sa cuisine. Option végétarienne sur demande à l''avance.',
 'market');

-- Seed testimonials
INSERT INTO public.testimonials (guest_name, origin, quote_en, quote_es, quote_fr, rating) VALUES
('Sophie & Julien', 'Lyon, France', 'The best three hours of our Mexico trip. We tasted things we would have walked past ten times, and finally understood why Cholula matters.', 'Las mejores tres horas de nuestro viaje por México. Probamos cosas que hubiéramos ignorado diez veces y por fin entendimos por qué Cholula importa.', 'Les trois meilleures heures de notre voyage au Mexique. On a goûté des choses devant lesquelles on serait passé dix fois, et enfin compris pourquoi Cholula compte.', 5),
('Marcus', 'Berlin, Germany', 'Milpa Chef doesn''t just feed you — she introduces you to the people who grow, grind and cook the food. That changes everything.', 'Milpa Chef no sólo te da de comer: te presenta a la gente que cultiva, muele y cocina. Eso lo cambia todo.', 'Milpa Chef ne te nourrit pas seulement — elle te présente les gens qui cultivent, moulent et cuisinent. Ça change tout.', 5),
('Ana y Rafa', 'Ciudad de México', 'Somos chilangos y creíamos conocer la comida poblana. Salimos con una lista de productores nuevos y ganas de regresar el mes que viene.', 'Somos chilangos y creíamos conocer la comida poblana. Salimos con una lista de productores nuevos y ganas de regresar el mes que viene.', 'On est de Mexico et on pensait connaître la cuisine de Puebla. On est repartis avec une liste de nouveaux producteurs et l''envie de revenir le mois prochain.', 5),
('Emma', 'Brooklyn, NY', 'Warm, unhurried, deeply thoughtful about sourcing. This is what a food tour should be.', 'Cálido, sin prisa, con una mirada muy cuidadosa sobre el origen de los ingredientes. Así debería ser un tour gastronómico.', 'Chaleureux, sans hâte, très attentif à la provenance. C''est ce que devrait être une balade gourmande.', 5);
