
-- Extend bookings
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'mxn',
  ADD COLUMN IF NOT EXISTS unit_price_mxn INT;

ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending','paid','failed','canceled'));

-- Remove permissive anon insert; server (service_role) handles all writes
DROP POLICY IF EXISTS "bookings_public_insert" ON public.bookings;
REVOKE INSERT ON public.bookings FROM anon, authenticated;

-- Roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_roles_self_read" ON public.user_roles;
CREATE POLICY "user_roles_self_read" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

-- Admins can read bookings
DROP POLICY IF EXISTS "bookings_admin_read" ON public.bookings;
CREATE POLICY "bookings_admin_read" ON public.bookings
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Atomic confirm + decrement (idempotent)
CREATE OR REPLACE FUNCTION public.confirm_booking_and_decrement(
  _booking_id UUID,
  _session_id TEXT,
  _payment_intent TEXT
)
RETURNS TABLE(booking_id UUID, tour_id UUID, guest_email TEXT, guest_name TEXT,
              party_size INT, amount_mxn INT, tour_title TEXT, tour_date TIMESTAMPTZ,
              meeting_point TEXT, already_paid BOOLEAN)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  b public.bookings%ROWTYPE;
  t public.tours%ROWTYPE;
BEGIN
  SELECT * INTO b FROM public.bookings WHERE id = _booking_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'booking not found'; END IF;

  IF b.status = 'paid' THEN
    SELECT * INTO t FROM public.tours WHERE id = b.tour_id;
    RETURN QUERY SELECT b.id, b.tour_id, b.guest_email, b.guest_name,
      b.party_size, b.amount_mxn, t.title, t.tour_date, t.meeting_point, TRUE;
    RETURN;
  END IF;

  SELECT * INTO t FROM public.tours WHERE id = b.tour_id FOR UPDATE;
  IF t.spots_left < b.party_size THEN
    UPDATE public.tours SET spots_left = 0 WHERE id = t.id;
  ELSE
    UPDATE public.tours SET spots_left = spots_left - b.party_size WHERE id = t.id;
  END IF;

  UPDATE public.bookings
    SET status = 'paid',
        paid_at = now(),
        stripe_session_id = COALESCE(stripe_session_id, _session_id),
        stripe_payment_intent = COALESCE(stripe_payment_intent, _payment_intent)
    WHERE id = b.id;

  RETURN QUERY SELECT b.id, b.tour_id, b.guest_email, b.guest_name,
    b.party_size, b.amount_mxn, t.title, t.tour_date, t.meeting_point, FALSE;
END;
$$;

CREATE OR REPLACE FUNCTION public.mark_booking_failed(_booking_id UUID)
RETURNS VOID
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  UPDATE public.bookings SET status = 'failed'
  WHERE id = _booking_id AND status = 'pending';
$$;
