CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'salt',
  origin text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  scientific text,
  name_en text NOT NULL,
  name_es text NOT NULL,
  name_fr text NOT NULL,
  description_en text NOT NULL DEFAULT '',
  description_es text NOT NULL DEFAULT '',
  description_fr text NOT NULL DEFAULT '',
  prices jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY products_public_read ON public.products
  FOR SELECT TO anon, authenticated
  USING (published = true);

CREATE POLICY products_admin_read ON public.products
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.tours ADD COLUMN IF NOT EXISTS image_url text;

INSERT INTO public.products (slug, category, origin, image_url, scientific, name_en, name_es, name_fr, description_en, description_es, description_fr, prices, sort_order) VALUES
('sal-maya-zinacantan', 'salt', 'Zinacantán, Chiapas', '/__l5e/assets-v1/136ff1e8-b676-4c2a-ba32-71592dcd6d8e/product-sal-130g.jpg', null, 'Ancestral Maya Salt of Zinacantán', 'Sal Ancestral Maya de Zinacantán', 'Sel Maya ancestral de Zinacantán', 'Maya salt from the millennia-old Tsotsil community of Atz''am in Zinacantán, Chiapas. Obtained by evaporating well water — a technique documented in the region for over 1,500 years.', 'Sal maya de la comunidad tsotsil milenaria de Atz''am, en Zinacantán, Chiapas. Se obtiene por evaporación del agua del pozo, técnica documentada en la región desde hace más de 1,500 años.', 'Sel maya de la communauté tsotsil millénaire d''Atz''am, à Zinacantán, Chiapas. Obtenu par évaporation de l''eau du puits — une technique documentée dans la région depuis plus de 1 500 ans.', '[{"label":"130 g jar","price":"$90"},{"label":"Box of 12 jars","price":"$80 / jar"},{"label":"1–10 kg","price":"$450 / kg"},{"label":"10 kg +","price":"$400 / kg"}]'::jsonb, 0),
('frijol-ibes', 'beans', 'Los Altos de Chiapas', '/__l5e/assets-v1/2a19e99f-e04d-428a-8b44-e0cc232f018d/product-frijol-ibes.jpg', 'Phaseolus dumosus', 'Red-Yellow Ibes Beans', 'Frijol Ibes Rojos-Amarillos', 'Haricots Ibes rouges-jaunes', 'Endemic Chiapas bean grown in Tsotsil communities of the Highlands.', 'Frijol endémico de Chiapas, cultivado en comunidades tsotsiles de Los Altos.', 'Haricot endémique du Chiapas, cultivé dans les communautés tsotsiles des Hauts-Plateaux.', '[{"label":"1 kg","price":"$130"}]'::jsonb, 10),
('frijol-rojo-mata', 'beans', 'Teopisca, Chiapas', '/__l5e/assets-v1/a9b694d5-0d71-476d-881a-89b8de45711b/product-frijol-rojo.jpg', 'Phaseolus dumosus', 'Red Bush Bean', 'Frijol rojo de mata', 'Haricot rouge de brousse', 'Endemic red bean cultivated in Teopisca, Chiapas.', 'Frijol rojo endémico cultivado en Teopisca, Chiapas.', 'Haricot rouge endémique cultivé à Teopisca, Chiapas.', '[{"label":"1 kg","price":"$90"}]'::jsonb, 20),
('patashete', 'beans', 'Motozintla, Chiapas', '/__l5e/assets-v1/7f6eac3d-d9a0-4225-afbe-5ec137d6d4c1/product-patashete.jpg', 'Phaseolus lunatus', 'Patashete Bean', 'Patashete', 'Haricot Patashete', 'Endemic lima bean cultivated in the communities of Motozintla, Chiapas.', 'Frijol endémico cultivado en comunidades de Motozintla, Chiapas.', 'Haricot endémique cultivé dans les communautés de Motozintla, Chiapas.', '[{"label":"1 kg","price":"$130"}]'::jsonb, 30),
('chile-simojovel', 'chile', 'Simojovel, Chiapas', '/__l5e/assets-v1/9ec345a4-2c91-4059-834e-dde3f2dfb3c2/product-chile.jpg', null, 'Simojovel Chile', 'Chile Simojovel', 'Piment Simojovel', 'Small, very hot red chile — 2 cm long, conical. Used regionally in Simojovel, Chiapas, for ciguamonte, tamal de bola and hot salsas.', 'Chile fresco pequeño muy picante, rojo y cónico. Mide 2 cm de largo. Se usa en Simojovel, Chiapas, para el ciguamonte, tamal de bola y salsas picantes.', 'Petit piment rouge très fort, de forme conique, 2 cm de long. Utilisé à Simojovel, Chiapas, dans le ciguamonte, le tamal de bola et diverses sauces piquantes.', '[{"label":"250 g bag","price":"$450"},{"label":"25 g jar","price":"$80"},{"label":"Box of 12 jars","price":"$110 / jar"}]'::jsonb, 40),
('achiote-tenejapa', 'seed', 'Tenejapa, Chiapas', '/__l5e/assets-v1/fe7681f1-ce08-4f8e-9edb-24fb4d50760e/product-achiote.jpg', 'Bixa orellana', 'Agroecological Achiote Seed', 'Semilla de achiote agroecológica', 'Graine de rocou agroécologique', 'Achiote seed grown by Tzeltal communities of Tenejapa, Chiapas, under agroecological practices.', 'Semilla de achiote cultivada por comunidades tzeltales de Tenejapa, Chiapas, con prácticas agroecológicas.', 'Graine de rocou cultivée par les communautés tzeltales de Tenejapa, Chiapas, en agroécologie.', '[{"label":"1 kg","price":"$280"}]'::jsonb, 50),
('cacao-soconusco', 'cacao', 'Soconusco, Chiapas', '/__l5e/assets-v1/081b1b6f-05ee-4025-b7e8-a4e1d9036e32/product-cacao.jpg', null, 'Washed Agroecological Cacao', 'Cacao lavado agroecológico', 'Cacao lavé agroécologique', 'Washed cacao grown in the Soconusco region of Chiapas.', 'Cacao lavado cultivado en la región del Soconusco, Chiapas.', 'Cacao lavé cultivé dans la région du Soconusco, au Chiapas.', '[{"label":"1 kg","price":"$650"}]'::jsonb, 60),
('hormiga-chicatana', 'insect', 'Chiapas', '/__l5e/assets-v1/e4f443d3-0cc0-49f6-bd00-5975da912864/product-chicatana.jpg', null, 'Chicatana Ant', 'Hormiga chicatana', 'Fourmi chicatana', 'Large dark-brown or reddish ant (Atta mexicana / cephalotes), harvested in May–July across Veracruz, Oaxaca, Chiapas, Guerrero, Guanajuato, Puebla, Morelos and Estado de México.', 'Hormiga grande de color café oscuro o rojizo (Atta mexicana / cephalotes). Abunda en mayo, junio y julio en Veracruz, Oaxaca, Chiapas, Guerrero, Guanajuato, Puebla, Morelos y Estado de México.', 'Grande fourmi brun foncé ou rougeâtre (Atta mexicana / cephalotes). Abondante en mai, juin et juillet dans Veracruz, Oaxaca, Chiapas, Guerrero, Guanajuato, Puebla, Morelos et l''État de Mexico.', '[{"label":"1 kg","price":"$4,500"}]'::jsonb, 70),
('pulcatta', 'spirit', 'Zacatlán de las Manzanas, Puebla', '/__l5e/assets-v1/081d816a-7ec4-4178-9fab-4b01c7f97685/product-pulcatta-label.jpg', null, 'Pulcatta — Distilled Pulque', 'Pulcatta — Destilado de pulque', 'Pulcatta — Pulque distillé', 'Mexican spirit distilled from pulque of Zacatlán de las Manzanas. Pleasant pulque flavor with a complex fruity aroma of herbs and highland woods. 38% ABV.', 'Bebida espirituosa mexicana destilada de pulque de Zacatlán de las Manzanas. Sabor agradable a pulque y aroma complejo afrutado a hierbas y maderas del Altiplano. 38% de alcohol.', 'Spiritueux mexicain distillé à partir de pulque de Zacatlán de las Manzanas. Saveur agréable de pulque et arôme complexe fruité aux herbes et bois de l''Altiplano. 38 % d''alcool.', '[{"label":"750 ml bottle","price":"$500"},{"label":"5 bottles","price":"$400 / bottle"}]'::jsonb, 80),
('concentrado-aguamiel', 'sweetener', 'Altiplano, México', '/__l5e/assets-v1/2d60c9df-ddea-4fcc-9d54-935e2df914bb/product-aguamiel.jpg', null, 'Aguamiel Concentrate (Nekumetl)', 'Concentrado de aguamiel (Nekumetl)', 'Concentré d''aguamiel (Nekumetl)', 'Nekumetl — Mesoamerican maguey sugar. One of the oldest sweeteners of pre-Hispanic peoples, predating European sugar and stingless-bee honey. Over 10 liters of fresh aguamiel yield one liter of concentrate. Use as honey, or to marinate meats, in cocktails, dressings and salsas.', 'Nekumetl (azúcar de maguey) en náhuatl — uno de los endulzantes más antiguos de Mesoamérica, previo al azúcar europea y a la miel de abejas sin aguijón. Se requieren más de 10 litros de aguamiel fresca para un litro de concentrado. Se usa como miel, para marinar carnes, en coctelería, aderezos y salsas.', 'Nekumetl (sucre de maguey) en náhuatl — l''un des plus anciens édulcorants de Mésoamérique, antérieur au sucre européen et au miel d''abeilles sans dard. Plus de 10 litres d''aguamiel frais donnent un litre de concentré. S''utilise comme du miel, pour mariner les viandes, en cocktails, vinaigrettes et salsas.', '[{"label":"250 ml glass jar","price":"$145"},{"label":"Box of 12 jars","price":"$125 / jar"}]'::jsonb, 90),
('miel-multifloral', 'sweetener', 'México', '/__l5e/assets-v1/6f440626-89bb-4f09-8d9f-b38b03f90878/product-miel.jpg', null, 'Multifloral Bee Honey', 'Miel de abeja multifloral', 'Miel d''abeille multifloral', 'Raw multifloral honey, harvested from hives foraging a diversity of wild and cultivated blossoms. Unfiltered and unpasteurized.', 'Miel cruda multifloral, cosechada de colmenas que liban una diversidad de flores silvestres y cultivadas. Sin filtrar ni pasteurizar.', 'Miel brut multifloral, récolté de ruches butinant une diversité de fleurs sauvages et cultivées. Ni filtré ni pasteurisé.', '[{"label":"250 g jar","price":"$145"}]'::jsonb, 100);