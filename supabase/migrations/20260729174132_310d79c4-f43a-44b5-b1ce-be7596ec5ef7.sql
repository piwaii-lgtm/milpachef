
-- 1. Access token for return-page authorization (unguessable, per-booking)
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS access_token uuid NOT NULL DEFAULT gen_random_uuid();

-- 2. Broaden status enum to include refunded + expired
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending','paid','failed','canceled','refunded','expired'));

-- 3. Sweep abandoned pending bookings
CREATE OR REPLACE FUNCTION public.expire_stale_bookings()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  n integer;
BEGIN
  UPDATE public.bookings
    SET status = 'expired'
    WHERE status = 'pending'
      AND created_at < now() - interval '30 minutes';
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.expire_stale_bookings() FROM PUBLIC, anon, authenticated;

-- 4. Atomic refund bookkeeping (Stripe refund is issued by server fn beforehand)
CREATE OR REPLACE FUNCTION public.refund_booking_and_restore(_booking_id uuid)
RETURNS TABLE(booking_id uuid, tour_id uuid, party_size integer, was_paid boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
    UPDATE public.tours
      SET spots_left = LEAST(capacity, spots_left + b.party_size)
      WHERE id = b.tour_id;
    UPDATE public.bookings SET status = 'refunded' WHERE id = b.id;
    RETURN QUERY SELECT b.id, b.tour_id, b.party_size, TRUE;
  ELSE
    -- Not paid: just mark canceled instead of refunded
    UPDATE public.bookings SET status = 'canceled' WHERE id = b.id;
    RETURN QUERY SELECT b.id, b.tour_id, b.party_size, FALSE;
  END IF;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.refund_booking_and_restore(uuid) FROM PUBLIC, anon, authenticated;
