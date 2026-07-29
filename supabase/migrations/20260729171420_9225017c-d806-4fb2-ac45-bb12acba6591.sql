
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.confirm_booking_and_decrement(UUID, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.mark_booking_failed(UUID) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.confirm_booking_and_decrement(UUID, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.mark_booking_failed(UUID) TO service_role;
