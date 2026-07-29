UPDATE public.tours
SET tour_date = (date_trunc('day', tour_date AT TIME ZONE 'America/Mexico_City') + interval '14 hours') AT TIME ZONE 'America/Mexico_City'
WHERE EXTRACT(hour FROM tour_date AT TIME ZONE 'America/Mexico_City') IN (4,5);