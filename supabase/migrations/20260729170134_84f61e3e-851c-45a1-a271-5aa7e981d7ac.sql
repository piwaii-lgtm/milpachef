
DROP POLICY IF EXISTS "bookings_public_insert" ON public.bookings;
CREATE POLICY "bookings_public_insert" ON public.bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    party_size BETWEEN 1 AND 10
    AND char_length(guest_name) BETWEEN 1 AND 120
    AND char_length(guest_email) BETWEEN 3 AND 200
    AND guest_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND status = 'pending'
    AND stripe_session_id IS NULL
  );
