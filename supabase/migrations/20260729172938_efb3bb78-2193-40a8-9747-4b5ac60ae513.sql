
UPDATE public.tours
SET meeting_point = 'Restaurante Milli cocina de maices (al lado de la estación de tren), Cholula, Puebla';

DELETE FROM public.testimonials;

INSERT INTO public.testimonials (guest_name, origin, rating, featured, quote_en, quote_es, quote_fr) VALUES
('Michelle', 'Singapore', 5, true,
 'We loved this experience. It started with pulque — not just tasting it, but learning its history from Alfonso and trying it at different stages of fermentation. Then came the crickets, explained as a sustainable protein. From there Alfonso led us through Cholula and the mercado, tasting an endless stream of food, desserts, and drinks. We came away full, happy, and knowing far more than when we started. Highly recommend.',
 'Nos encantó la experiencia. Empezamos con pulque — no solo probándolo, también aprendiendo su historia con Alfonso en distintas etapas de fermentación. Luego los chapulines, explicados como proteína sostenible. Alfonso nos llevó por Cholula y el mercado probando comida, postres y bebidas sin parar. Salimos llenos, felices y sabiendo mucho más. Muy recomendable.',
 'Nous avons adoré. On a commencé par le pulque — pas seulement le goûter, mais apprendre son histoire avec Alfonso à différentes étapes de fermentation. Puis les sauterelles, expliquées comme protéine durable. Alfonso nous a guidés dans Cholula et au mercado, à travers plats, desserts et boissons. On est repartis rassasiés, heureux et bien plus savants. Fortement recommandé.'),

('Maude', 'Trois-Rivières, Canada', 5, true,
 'A passionate, warm guide with an impressive knowledge of Mexican culture and cuisine, particularly Puebla. His dual background as an anthropologist and a chef makes the experience truly unique. Each tasting is enriched with the history of the dishes, their origins and techniques. Highly recommended.',
 'Un guía apasionado y cálido con un impresionante conocimiento de la cultura y cocina mexicanas, sobre todo de Puebla. Su doble formación como antropólogo y chef hace la experiencia única. Cada degustación viene con la historia del platillo, sus orígenes y técnicas. Muy recomendable.',
 'Un guide passionné et chaleureux, avec une connaissance impressionnante de la culture et de la cuisine mexicaines, en particulier de Puebla. Sa double formation d''anthropologue et de chef rend l''expérience unique. Chaque dégustation est enrichie de l''histoire du plat, de ses origines et techniques. Vivement recommandé.'),

('Gina', 'Houston, TX', 5, true,
 'We were visiting from Texas and were grateful Alfonso was fluent in both English and Spanish. He lives here and has lots of connections with local vendors, chefs and restaurants. He is warm and approachable and we really enjoyed his company. The tour was so interesting and so much fun — everything we tried was new to us. Highly recommend!',
 'Veníamos de Texas y agradecimos que Alfonso hablara inglés y español con fluidez. Vive aquí y tiene muchos contactos con vendedores, chefs y restaurantes locales. Es cálido y cercano; disfrutamos mucho su compañía. El tour fue interesantísimo y muy divertido — todo lo que probamos fue nuevo para nosotros. ¡Muy recomendable!',
 'Nous venions du Texas et étions ravis qu''Alfonso parle couramment anglais et espagnol. Il vit ici et connaît beaucoup de producteurs, chefs et restaurateurs. Chaleureux et accessible, on a adoré sa compagnie. La visite était passionnante et très amusante — tout était nouveau pour nous. Vivement recommandé !'),

('Rubi', 'Ciudad de México, México', 5, true,
 'Chef Alfonso is an amazing person to share a warm, easy conversation with. An amazing experience to get to know Cholula and its flavors.',
 'El chef Alfonso es una persona increíble con quien conversar de forma cálida y cercana. Una experiencia maravillosa para conocer Cholula y sus sabores.',
 'Le chef Alfonso est une personne formidable avec qui échanger dans une conversation chaleureuse. Une expérience magnifique pour découvrir Cholula et ses saveurs.'),

('Pam', 'Cancún, México', 5, true,
 'Wonderful tour. Alfonso provided excellent service. I definitely recommend it.',
 'Tour maravilloso. Alfonso brindó un servicio excelente. Lo recomiendo totalmente.',
 'Une visite merveilleuse. Alfonso a offert un excellent service. Je la recommande sans hésiter.'),

('Guedalia', 'United States', 5, true,
 'Alfonso is a very good tour guide — you will definitely enjoy the foods and the places he takes you to.',
 'Alfonso es un guía muy bueno — sin duda vas a disfrutar la comida y los lugares a los que te lleva.',
 'Alfonso est un très bon guide — vous apprécierez sans aucun doute les plats et les endroits qu''il vous fera découvrir.');
