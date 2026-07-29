
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- Recreate has_role in private schema
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Update policy to use private function
DROP POLICY IF EXISTS bookings_admin_read ON public.bookings;
CREATE POLICY bookings_admin_read ON public.bookings
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- Drop the public-schema has_role so it's no longer callable via the API
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- Document intent for bookings table (writes only via service_role server functions;
-- guest confirmation reads happen through a server function that verifies access_token)
COMMENT ON TABLE public.bookings IS
  'Writes performed exclusively by trusted server functions using the service role. '
  'Anon and authenticated roles have no table privileges. '
  'Guest confirmation reads go through the getBookingStatus server function which validates access_token.';

-- Document testimonials consent
COMMENT ON COLUMN public.testimonials.guest_name IS
  'First name only, published with guest consent (public marketing content sourced from Airbnb reviews).';
