
# Fixing the booking & payment flow

Goal: make every reservation trustworthy end-to-end — Stripe is the source of truth for "paid", spots can't be oversold, prices can't be tampered with, you can see paid bookings in an admin page, and guests get a real confirmation email. No subscriptions.

## What's broken today

1. Bookings insert from the browser with a client-supplied price — a user can pay MXN $1.
2. Nothing ever marks a booking `paid` (no webhook, no return-page verification).
3. `spots_left` is never decremented — same tour can be booked into infinity.
4. Anon can INSERT any row into `bookings` (`WITH CHECK (true)`) with arbitrary status.
5. `/booking/return` shows "confirmed" for any string in the URL.
6. No admin surface, no auth, no guest confirmation email.

## Fix plan

### 1. Lock down and extend the schema (migration)

- Add columns to `bookings`: `paid_at timestamptz`, `stripe_payment_intent TEXT`, `currency TEXT DEFAULT 'mxn'`, `unit_price_mxn INT`, plus a CHECK that `status IN ('pending','paid','failed','canceled')`.
- Drop the permissive `bookings_public_insert` policy. Bookings are created only by a server function using the service role — no direct anon INSERT, no anon SELECT.
- Add `app_role` enum + `public.user_roles` + `public.has_role(uuid, app_role)` security-definer function (standard pattern). Grants: `SELECT` to authenticated on `user_roles`, `ALL` to service_role.
- Add `bookings_admin_read` policy: `has_role(auth.uid(),'admin')` for SELECT.
- Add SQL function `public.confirm_booking_and_decrement(booking_id uuid, session_id text, payment_intent text)` — inside a single transaction: mark booking `paid`, decrement `tours.spots_left` by `party_size`, refuse if already paid or if `spots_left < party_size`. Called only from the webhook.
- Seed one admin role row after you sign up (I'll leave a `supabase--insert` step for this).

### 2. Server-side price and capacity enforcement

Rewrite `createTourCheckout` in `src/lib/payments.functions.ts`:
- Take only `tourId`, `partySize`, `guestName`, `guestEmail`, `notes`, `returnUrl`, `environment`.
- Use `supabaseAdmin` (loaded inside handler) to read the tour, verify `spots_left >= partySize`, compute `amount = tour.price_mxn * partySize`.
- Insert the booking server-side with `status='pending'` and the trusted amount.
- Create Stripe session; store `stripe_session_id` on the booking; pass `metadata.booking_id`.
- Return `{ clientSecret }` — the browser never touches prices or booking IDs from a form.

`BookingDialog` becomes a thin form that only calls `createTourCheckout` and navigates to `/booking/checkout` with the returned client secret / booking id.

### 3. Register a Stripe product

Use the payments tool once to create a `gastro_tour` product with a placeholder MXN price (`gastro_tour_mxn`, 45000 cents) so the payments dashboard has a real line item. Continue passing dynamic amounts via `price_data` (since `partySize` varies) but tag `product_data.metadata.product_id = 'gastro_tour'` for reporting.

### 4. Stripe webhook: source of truth

Create `src/routes/api/public/stripe-webhook.ts` (public prefix bypasses site auth; handler verifies signature):
- Read raw body, verify `Stripe-Signature` with `STRIPE_WEBHOOK_SECRET` (I'll add via the secret tool).
- On `checkout.session.completed` and `payment_intent.succeeded`: call `confirm_booking_and_decrement(booking_id, session_id, payment_intent)` with `supabaseAdmin`. Idempotent — safe on retries.
- On `checkout.session.expired` / `payment_intent.payment_failed`: mark booking `failed`.
- After confirming: enqueue Resend email (below).

Webhook URL to paste in Stripe dashboard: `https://project--42aa6192-86ea-4ebb-9f9d-027e2c68532f.lovable.app/api/public/stripe-webhook` (and the `-dev` variant for preview).

### 5. Return page actually verifies

`/booking/return` calls a new `getBookingStatus` server fn (uses admin client) with `bookingId` + `sessionId`. Shows: pending / paid + tour details + "confirmation email sent to X". Polls every 2s up to 20s to cover webhook latency.

### 6. Resend confirmation email

- Ask you to paste `RESEND_API_KEY` via the secret tool.
- Add `src/lib/email.server.ts` with `sendBookingConfirmation({ email, name, tour, partySize, amount, lang })` — one HTML template with EN/ES/FR strings picked by `lang` (guessed from the current tour description or defaulted to EN; simple).
- Called from the webhook handler after `confirm_booking_and_decrement` succeeds.
- Sends from `bookings@updates.milpachef.com` placeholder — you'll need to verify a sender domain in Resend; until then it falls back to Resend's onboarding domain in preview.

### 7. Admin login + admin page

- Run `supabase--configure_auth` to enable email/password, disable auto-confirm.
- Add `/auth` public route (email + password sign-in only, no signup UI — you'll create the admin via a one-off SQL insert or Cloud Users panel).
- Add `src/routes/_authenticated/route.tsx` (integration-managed gate).
- Add `src/routes/_authenticated/admin.tsx`: lists all bookings (paid first) with tour, guest, party, amount, status, session id, created_at. Uses a `listBookings` server fn with `requireSupabaseAuth` that additionally checks `has_role(userId,'admin')` and returns 403 otherwise.
- Sign-out button in header only when signed in.

### 8. Cleanup

- Remove client-side `createBooking` in `src/lib/tours.ts`.
- Add `errorComponent` / `notFoundComponent` on new routes.

## Testing in the preview

1. **Set up** (one-time, in this order):
   - Approve the migration when it appears.
   - When I ask, paste your **Resend API key** and confirm/generate the **Stripe webhook signing secret** in the Stripe dashboard → Developers → Webhooks (endpoint pointing at the `-dev.lovable.app` URL above, events: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.succeeded`, `payment_intent.payment_failed`).
   - Sign up once at `/auth` with your email, then I'll run a SQL insert to give you the `admin` role.

2. **Happy path**:
   - Go to `/tours`, click "Reserve", fill in name/email/party=2, submit.
   - Stripe embedded form loads. Card: `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP.
   - Land on `/booking/return`. Within ~2 seconds it flips to "Confirmed". Confirmation email arrives.
   - Go to `/admin` → the row shows `paid`. Refresh `/tours` → `spots_left` dropped by 2.

3. **Failure paths**:
   - Card `4000 0000 0000 0002` (declined): return page shows `failed`, booking stays unpaid, spots not decremented.
   - Card `4000 0025 0000 3155` (3DS): you'll see the auth challenge; approve to complete.
   - Try to book more guests than `spots_left`: server fn refuses before Stripe is called.

4. **Tamper check**: open devtools, resubmit the form with a modified party size — server recomputes amount from the tour row; Stripe charges the correct total.

## Files touched

- New migration (schema tighten + user_roles + `confirm_booking_and_decrement`)
- `src/lib/payments.functions.ts` — rewrite
- `src/lib/email.server.ts` — new
- `src/lib/admin.functions.ts` — new (listBookings, getBookingStatus)
- `src/routes/api/public/stripe-webhook.ts` — new
- `src/routes/auth.tsx` — new
- `src/routes/_authenticated/route.tsx` + `admin.tsx` — new
- `src/routes/booking.return.tsx` — verify with server fn
- `src/components/site/BookingDialog.tsx` — simplify
- `src/lib/tours.ts` — remove `createBooking`
- `src/components/site/SiteHeader.tsx` — sign-out when logged in
- Stripe product `gastro_tour` created once via tool
- Secrets requested: `RESEND_API_KEY`, `STRIPE_WEBHOOK_SECRET`
