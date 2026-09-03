-- 1. Dates table
CREATE TABLE public.tour_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id uuid NOT NULL REFERENCES public.tours(id) ON DELETE CASCADE,
  starts_at timestamptz NOT NULL,
  capacity integer NOT NULL DEFAULT 10,
  spots_left integer NOT NULL DEFAULT 10,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tour_id, starts_at)
);

GRANT SELECT ON public.tour_dates TO anon;
GRANT SELECT ON public.tour_dates TO authenticated;
GRANT ALL ON public.tour_dates TO service_role;

ALTER TABLE public.tour_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tour_dates_public_read" ON public.tour_dates
  FOR SELECT TO anon, authenticated USING (active = true);

CREATE TRIGGER update_tour_dates_updated_at
  BEFORE UPDATE ON public.tour_dates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX tour_dates_tour_starts_idx ON public.tour_dates (tour_id, starts_at);

-- 2. Tours: on-demand flag, date becomes optional
ALTER TABLE public.tours ADD COLUMN IF NOT EXISTS on_demand boolean NOT NULL DEFAULT false;
ALTER TABLE public.tours ALTER COLUMN tour_date DROP NOT NULL;

-- 3. Backfill existing single dates
INSERT INTO public.tour_dates (tour_id, starts_at, capacity, spots_left)
SELECT id, tour_date, capacity, spots_left FROM public.tours WHERE tour_date IS NOT NULL
ON CONFLICT DO NOTHING;

-- 4. Bookings reference a specific date
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS tour_date_id uuid REFERENCES public.tour_dates(id) ON DELETE SET NULL;

UPDATE public.bookings b
SET tour_date_id = d.id
FROM public.tour_dates d
WHERE b.tour_date_id IS NULL AND d.tour_id = b.tour_id;

-- 5. Capacity validation now per date
CREATE OR REPLACE FUNCTION public.bookings_validate_capacity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  d public.tour_dates%ROWTYPE;
BEGIN
  IF NEW.party_size IS NULL OR NEW.party_size < 1 THEN
    RAISE EXCEPTION 'party_size must be >= 1';
  END IF;

  IF NEW.tour_date_id IS NULL THEN
    RAISE EXCEPTION 'a date must be selected for this booking';
  END IF;

  SELECT * INTO d FROM public.tour_dates WHERE id = NEW.tour_date_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'selected date does not exist' USING ERRCODE = 'foreign_key_violation';
  END IF;
  IF d.tour_id <> NEW.tour_id THEN
    RAISE EXCEPTION 'selected date does not belong to this experience';
  END IF;
  IF NOT d.active THEN
    RAISE EXCEPTION 'selected date is not available';
  END IF;
  IF NEW.party_size > d.capacity THEN
    RAISE EXCEPTION 'party_size exceeds capacity for this date';
  END IF;
  IF NEW.party_size > d.spots_left THEN
    RAISE EXCEPTION 'not enough spots left for this date';
  END IF;
  RETURN NEW;
END;
$function$;

-- 6. Confirmation decrements the chosen date
CREATE OR REPLACE FUNCTION public.confirm_booking_and_decrement(_booking_id uuid, _session_id text, _payment_intent text)
RETURNS TABLE(booking_id uuid, tour_id uuid, guest_email text, guest_name text, party_size integer, amount_mxn integer, tour_title text, tour_date timestamp with time zone, meeting_point text, already_paid boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  b public.bookings%ROWTYPE;
  t public.tours%ROWTYPE;
  d public.tour_dates%ROWTYPE;
BEGIN
  SELECT * INTO b FROM public.bookings WHERE id = _booking_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'booking not found'; END IF;

  SELECT * INTO t FROM public.tours WHERE id = b.tour_id;

  IF b.status = 'paid' THEN
    SELECT * INTO d FROM public.tour_dates WHERE id = b.tour_date_id;
    RETURN QUERY SELECT b.id, b.tour_id, b.guest_email, b.guest_name,
      b.party_size, b.amount_mxn, t.title, COALESCE(d.starts_at, t.tour_date), t.meeting_point, TRUE;
    RETURN;
  END IF;

  SELECT * INTO d FROM public.tour_dates WHERE id = b.tour_date_id FOR UPDATE;
  IF FOUND THEN
    UPDATE public.tour_dates
      SET spots_left = GREATEST(0, d.spots_left - b.party_size)
      WHERE id = d.id;
  END IF;

  UPDATE public.bookings
    SET status = 'paid',
        paid_at = now(),
        stripe_session_id = COALESCE(stripe_session_id, _session_id),
        stripe_payment_intent = COALESCE(stripe_payment_intent, _payment_intent)
    WHERE id = b.id;

  RETURN QUERY SELECT b.id, b.tour_id, b.guest_email, b.guest_name,
    b.party_size, b.amount_mxn, t.title, COALESCE(d.starts_at, t.tour_date), t.meeting_point, FALSE;
END;
$function$;

-- 7. Refund restores spots on the chosen date
CREATE OR REPLACE FUNCTION public.refund_booking_and_restore(_booking_id uuid)
RETURNS TABLE(booking_id uuid, tour_id uuid, party_size integer, was_paid boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  b public.bookings%ROWTYPE;
BEGIN
  SELECT * INTO b FROM public.bookings WHERE id = _booking_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'booking not found'; END IF;

  IF b.status = 'refunded' THEN
    RETURN QUERY SELECT b.id, b.tour_id, b.party_size, FALSE;
    RETURN;
  END IF;

  IF b.status = 'paid' THEN
    UPDATE public.tour_dates
      SET spots_left = LEAST(capacity, spots_left + b.party_size)
      WHERE id = b.tour_date_id;
    UPDATE public.bookings SET status = 'refunded' WHERE id = b.id;
    RETURN QUERY SELECT b.id, b.tour_id, b.party_size, TRUE;
  ELSE
    UPDATE public.bookings SET status = 'canceled' WHERE id = b.id;
    RETURN QUERY SELECT b.id, b.tour_id, b.party_size, FALSE;
  END IF;
END;
$function$;