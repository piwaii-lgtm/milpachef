
-- Defense-in-depth for bookings: validate tour + capacity at DB layer, and
-- ensure no public role can insert/select rows (only service_role via server fns
-- and admins via existing SELECT policy).

REVOKE INSERT, SELECT, UPDATE, DELETE ON public.bookings FROM anon;
REVOKE INSERT, SELECT, UPDATE, DELETE ON public.bookings FROM authenticated;
GRANT ALL ON public.bookings TO service_role;

CREATE OR REPLACE FUNCTION public.bookings_validate_capacity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  t public.tours%ROWTYPE;
BEGIN
  SELECT * INTO t FROM public.tours WHERE id = NEW.tour_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'tour % does not exist', NEW.tour_id USING ERRCODE = 'foreign_key_violation';
  END IF;
  IF NEW.party_size IS NULL OR NEW.party_size < 1 THEN
    RAISE EXCEPTION 'party_size must be >= 1';
  END IF;
  IF NEW.party_size > t.capacity THEN
    RAISE EXCEPTION 'party_size exceeds tour capacity';
  END IF;
  IF NEW.party_size > t.spots_left THEN
    RAISE EXCEPTION 'not enough spots left for this tour';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS bookings_validate_capacity_trg ON public.bookings;
CREATE TRIGGER bookings_validate_capacity_trg
BEFORE INSERT ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.bookings_validate_capacity();
