
# Fixing the booking & payment flow

Goal: Stripe is the source of truth for "paid", spots can't be oversold, prices can't be tampered with, you can see paid bookings in an admin page, and guests get a real confirmation email. No subscriptions.

## What's broken today

1. Bookings insert from the browser with a client-supplied price — a user can pay MXN $1.
2. Nothing marks a booking `paid` (no webhook handler, no return-page verification).
3. `spots_left` is never decremented — same tour can be booked into infinity.
4. Anon can INSERT any row into `bookings` (`WITH CHECK (true)`) with arbitrary status.
5. `/booking/return` shows "confirmed" for any string in the URL.
6. No admin surface, no auth, no guest confirmation email.

## Fix plan

### 1. Schema tighten + roles + atomic confirm  *(already applied)*

The migration for this ran in a prior turn:
- `bookings` gained `paid_at`, `stripe_payment_intent`, `currency`, `unit_price_mxn` + status CHECK.
- Removed the permissive anon INSERT policy.
- Added `app_role` enum, `public.user_roles`, `public.has_role()`.
- Admins can SELECT bookings; the webhook decrements spots atomically via `confirm_booking_and_decrement()`.

### 2. Server-side price and capacity enforcement

Rewrite `createTourCheckout` in `src/lib/payments.functions.ts`:
- Inputs: `tourId`, `partySize`, `guestName`, `guestEmail`, `notes`, `returnUrl`, `environment`.
- Load `supabaseAdmin` inside the handler; read the tour, verify `spots_left >= partySize`, compute `amount = tour.price_mxn * partySize`.
- Insert the booking with server-trusted amount + `status='pending'`.
- Create Stripe embedded session with `line_items[price_data]` (variable amount), `metadata.booking_id`, `payment_intent_data.metadata.booking_id`, and `product_data.metadata.lovable_external_id = 'gastro_tour'` so it links back to the registered product.
- Store `stripe_session_id` on the booking, return `{ clientSecret, bookingId }`.

`BookingDialog` becomes a thin form — no direct Supabase writes.

### 3. Stripe webhook handler (Lovable-managed)

Create the file at exactly `src/routes/api/public/payments/webhook.ts` (Lovable already registered this URL with Stripe and stored `PAYMENTS_SANDBOX_WEBHOOK_SECRET`). No dashboard configuration needed.

- Read raw body, verify signature via `verifyWebhook(req, env)` — `env` comes from `?env=sandbox|live` query param.
- On `checkout.session.completed` (and `payment_intent.succeeded` as backup): pull `booking_id` from metadata, call `confirm_booking_and_decrement(...)` via `supabaseAdmin`. Idempotent.
- On `checkout.session.expired` / `payment_intent.payment_failed`: call `mark_booking_failed(...)`.
- After a successful confirm: send Resend email.
- Always return 200 quickly; log-and-swallow email failures so Stripe doesn't retry.

Also add `verifyWebhook` to `src/lib/stripe.server.ts` (HMAC-SHA256, no SDK dep).

### 4. Return page actually verifies

`/booking/return` calls a new public server fn `getBookingStatus({ bookingId })` that uses `supabaseAdmin` to read status. UI shows pending / paid / failed + tour details, polling every 2s up to 20s to cover webhook latency.

### 5. Resend confirmation email

- Request `RESEND_API_KEY` via `add_secret` (only secret you need to paste).
- New `src/lib/email.server.ts`: `sendBookingConfirmation({ email, name, tourTitle, tourDate, meetingPoint, partySize, amount })`. One EN/ES/FR HTML template picked from guest email TLD as a rough hint, defaulting to EN.
- Called from the webhook after `confirm_booking_and_decrement` returns `already_paid = false`.
- From address: `Milpa Chef <onboarding@resend.dev>` until you verify a real sender domain in Resend (then swap to `bookings@milpachef.com`).

### 6. Admin login + admin page

- Run `supabase--configure_auth`: email/password on, signup enabled, auto-confirm on (so you can create your admin without SMTP), HIBP on.
- `/auth` public route — email + password sign-in and one-time sign-up.
- `src/routes/_authenticated/route.tsx` (integration-managed gate).
- `src/routes/_authenticated/admin.tsx` — bookings table (paid first) via `listBookings` server fn using `requireSupabaseAuth`, which additionally checks `has_role(userId,'admin')` and 403s otherwise.
- After you sign up, I'll run a one-off `supabase--insert` to grant your user the `admin` role (I'll ask for your email at that step).
- Sign-out button in the header when a session exists.

### 7. Cleanup

- Remove client-side `createBooking` from `src/lib/tours.ts`.
- `errorComponent` / `notFoundComponent` on new routes.

## Testing in the preview

1. **Setup**:
   - Paste your **Resend API key** when the secure form appears.
   - Go to `/auth`, sign up with your email. Tell me the email; I run one SQL insert to make you admin.

2. **Happy path**:
   - `/tours` → Reserve → fill form (party=2) → submit.
   - Stripe embedded form loads. Card: `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP.
   - Lands on `/booking/return`. Within ~2s it flips to "Confirmed". Confirmation email arrives.
   - `/admin` → row shows `paid`. `/tours` → `spots_left` dropped by 2.

3. **Failure paths**:
   - `4000 0000 0000 0002` (declined): return page shows `failed`; spots not decremented.
   - `4000 0025 0000 3155` (3DS): approve the challenge to complete.
   - Try to book more guests than `spots_left`: server fn refuses before Stripe is invoked.

4. **Tamper check**: intercept the checkout server-fn call and modify `partySize` — server recomputes amount from the tour row; Stripe charges the correct total.

## Files touched

- `src/lib/stripe.server.ts` — add `verifyWebhook`
- `src/lib/payments.functions.ts` — rewrite
- `src/lib/email.server.ts` — new
- `src/lib/admin.functions.ts` — new (`listBookings`, `getBookingStatus`, `grantAdminRole` helper unused by UI)
- `src/routes/api/public/payments/webhook.ts` — new
- `src/routes/auth.tsx` — new
- `src/routes/_authenticated/route.tsx` + `_authenticated/admin.tsx` — new
- `src/routes/booking.return.tsx` — verify via server fn
- `src/components/site/BookingDialog.tsx` — simplify
- `src/lib/tours.ts` — remove `createBooking`
- `src/components/site/SiteHeader.tsx` — sign-out when signed in
- Secrets requested: `RESEND_API_KEY` only (Stripe webhook secret is auto-managed)
