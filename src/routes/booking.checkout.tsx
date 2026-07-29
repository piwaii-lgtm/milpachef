import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { useMemo } from "react";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createTourCheckout } from "@/lib/payments.functions";
import { useI18n } from "@/lib/i18n";

type Search = {
  bookingId?: string;
  tour?: string;
  amount?: number;
  party?: number;
  email?: string;
};

export const Route = createFileRoute("/booking/checkout")({
  head: () => ({
    meta: [
      { title: "Complete your reservation — Milpa Chef" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    bookingId: typeof search.bookingId === "string" ? search.bookingId : undefined,
    tour: typeof search.tour === "string" ? search.tour : undefined,
    amount: typeof search.amount === "string" ? Number(search.amount) : undefined,
    party: typeof search.party === "string" ? Number(search.party) : undefined,
    email: typeof search.email === "string" ? search.email : undefined,
  }),
  component: BookingCheckout,
});

function BookingCheckout() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { t } = useI18n();

  const options = useMemo(() => {
    return {
      fetchClientSecret: async () => {
        if (!search.bookingId || !search.tour || !search.amount || !search.email) {
          throw new Error("Missing reservation details");
        }
        const result = await createTourCheckout({
          data: {
            bookingId: search.bookingId,
            tourTitle: search.tour,
            amountMxn: Math.round(search.amount),
            partySize: Math.max(1, Math.round(search.party ?? 1)),
            customerEmail: search.email,
            returnUrl: `${window.location.origin}/booking/return?session_id={CHECKOUT_SESSION_ID}&bookingId=${search.bookingId}`,
            environment: getStripeEnvironment(),
          },
        });
        if ("error" in result) throw new Error(result.error);
        return result.clientSecret;
      },
    };
  }, [search.bookingId, search.tour, search.amount, search.email, search.party]);

  if (!search.bookingId) {
    return (
      <div className="container-editorial py-24 text-center">
        <p className="text-muted-foreground">Missing reservation.</p>
        <button
          onClick={() => navigate({ to: "/tours" })}
          className="mt-4 underline text-primary"
        >
          {t("nav.tours")}
        </button>
      </div>
    );
  }

  return (
    <section className="container-editorial py-12 md:py-16 max-w-3xl">
      <h1 className="font-serif text-3xl md:text-4xl text-primary mb-6">
        {t("book.title")}
      </h1>
      <div id="checkout" className="rounded-md overflow-hidden border border-border bg-card">
        <EmbeddedCheckoutProvider stripe={getStripe()} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </section>
  );
}