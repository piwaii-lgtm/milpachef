## Goal
Link your existing Stripe account to this project, reuse its products/prices for the Gastro Tour, and enable full tax/compliance handling once live.

## How linking works (user-driven)
Lovable's built-in Stripe integration is already enabled in test mode. To point it at your existing account:

1. Open the **Payments** panel → click **Go live**.
2. **Step 1 — Claim**: on Stripe's page, choose **Sign in to an existing account** and select your account (do NOT create a new one).
3. **Step 2 — Activate for live**: complete Stripe's activation wizard if not already done.
4. **Step 3 — Install Lovable app on live**: on Stripe's "Choose what to copy" screen, include the **Lovable app** and your existing **products/prices**.
5. **Step 4 — Provision live keys**: automatic. Lovable writes `pk_live_…` into `.env.production` and creates live webhooks.
6. **Step 5 — Readiness check**: run it from the Payments panel.

No code needed for the linking itself.

## Code changes I'll make after Step 5 passes

### 1. Reuse an existing Stripe price (instead of dynamic pricing)
- You'll tell me the **lookup_key** of the tour price in your Stripe account (e.g. `milpa_gastro_tour_595mxn`). If it doesn't have one, you set it once in the Stripe Dashboard → Product → Price → *lookup key*.
- Edit `src/lib/payments.functions.ts` `startCheckout`:
  - Resolve the price via `stripe.prices.list({ lookup_keys: [PRICE_LOOKUP_KEY] })` instead of building `price_data` inline.
  - Trusted server-side amount: read `unit_amount` / `currency` from the resolved Stripe price (not from `tours.price_mxn`) so DB and Stripe stay authoritative-in-Stripe.
  - Keep the pending-booking + `access_token` + webhook flow unchanged.
- Update `bookings.currency` to whatever the Stripe price uses (still `mxn` if that's how the price is configured).
- The `/admin/tours` price field becomes display-only for the site; actual charge always comes from Stripe.

### 2. Enable full compliance handling (+3.5%)
- In the same `startCheckout` handler, add `managed_payments: { enabled: true }` to `stripe.checkout.sessions.create(...)` (cast params to `Stripe.Checkout.SessionCreateParams` — the field is not yet in the SDK types).
- Remove any conflicting fields: no `automatic_tax`, no `tax_id_collection`, no `payment_method_types`, etc.
- Stamp session metadata: `{ managed_payments: "true", customer_country: <detected>, userId? }`.
- Detect buyer country client-side via `https://www.cloudflare.com/cdn-cgi/trace` and pass it to `startCheckout` for metadata/reporting.
- Resolve/create a Stripe **Customer** with `metadata.userId` for logged-in bookings (guest bookings keep `customer_email` only).

### 3. Product tax code
- Your existing product in Stripe needs a **tax code** for compliance handling to work (e.g. `txcd_20030000` "Sightseeing tours / cultural experiences" — I'll confirm the exact best match from Stripe's list before applying).
- Set once in Stripe Dashboard → Product → Tax code. No code change.

### 4. Live webhook wiring
- Step 4 creates the live webhook endpoint pointed at `/api/public/payments/webhook?env=live` automatically.
- Verify the signing secret is present in Cloud env after Step 4; no code change needed — our webhook handler already selects `sandbox` vs `live` from `?env=`.

### 5. Remove the go-live banner
- `PaymentTestModeBanner` already hides itself when a `pk_live_…` token is present. Nothing to do.

## What I need from you (in the next message, once Step 4 completes)
1. The **lookup_key** of the tour price in your Stripe account (or confirmation to set one, and what to set it to).
2. Confirmation your Stripe seller country is one of the 36 supported for full compliance handling (US/CA/UK/AU/HK/EU/CH/NO/IS/LI/GI). If it's Mexico, full handling is **not** available for you — I'll switch that step to `automatic_tax` (+0.5%) instead.
3. Confirmation the tour product in Stripe has (or will have) a tax code set.

## Test plan after switch
1. Preview still runs test mode (`pk_test_…`) — book with `4242 4242 4242 4242`, confirm return page + confirmation email + admin row.
2. On the **published** site, do one small real booking end-to-end with a real card, then immediately **Refund** from `/admin` to verify the Stripe refund + spot restoration works in live.
3. In Stripe Dashboard → Payments, confirm the live charge shows the product name and tax line (compliance handling active).
4. Trigger a webhook test from Stripe Dashboard → Developers → Webhooks (live) → send `checkout.session.completed` → confirm 200 response.
