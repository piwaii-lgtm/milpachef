import { createServerFn } from "@tanstack/react-start";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";

type CheckoutResult = { clientSecret: string } | { error: string };

export const createTourCheckout = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      bookingId: string;
      tourTitle: string;
      amountMxn: number;
      partySize: number;
      customerEmail: string;
      returnUrl: string;
      environment: StripeEnv;
    }) => {
      if (!/^[a-f0-9-]{36}$/i.test(data.bookingId)) throw new Error("Invalid bookingId");
      if (!Number.isInteger(data.amountMxn) || data.amountMxn < 50) {
        throw new Error("Invalid amount");
      }
      if (!data.customerEmail.includes("@")) throw new Error("Invalid email");
      return data;
    },
  )
  .handler(async ({ data }): Promise<CheckoutResult> => {
    try {
      const stripe = createStripeClient(data.environment);
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "mxn",
              product_data: {
                name: `${data.tourTitle} — Milpa Chef`,
                description: `Gastro Tour reservation for ${data.partySize} guest(s)`,
              },
              // Stripe expects amount in the smallest unit; MXN uses centavos (x100)
              unit_amount: data.amountMxn * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        ui_mode: "embedded_page",
        return_url: data.returnUrl,
        customer_email: data.customerEmail,
        payment_intent_data: {
          description: `${data.tourTitle} — Milpa Chef`,
          metadata: { booking_id: data.bookingId },
        },
        metadata: { booking_id: data.bookingId },
      });
      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });