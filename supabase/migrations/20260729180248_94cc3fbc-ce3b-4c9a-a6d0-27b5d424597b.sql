
INSERT INTO public.tours (
  slug, title, tour_date, meeting_point, price_mxn, capacity, spots_left,
  duration_minutes, image_key, description_en, description_es, description_fr
) VALUES (
  'test-1mxn',
  'TEST — Live Payment Check (1 MXN)',
  (now() + interval '365 days'),
  'Restaurante Milli, Cholula',
  1,
  10,
  10,
  30,
  'chef-milpa',
  'Internal test tour used to validate the live payment flow. Do not book unless you are the site owner.',
  'Tour de prueba interno para validar el flujo de pago en producción. No reservar salvo el propietario del sitio.',
  'Tour de test interne pour valider le flux de paiement en production. Ne pas réserver sauf le propriétaire du site.'
);
