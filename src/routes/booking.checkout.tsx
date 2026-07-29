import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { useMemo } from "react";
import { getStripe } from "@/lib/stripe";
import { useI18n } from "@/lib/i18n";

type Search = { bookingId?: string };

export const Route = createFileRoute("/booking/checkout")({
  head: () => ({
    meta: [
      { title: "Complete your reservation — Milpa Chef" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    bookingId: typeof search.bookingId === "string" ? search.bookingId : undefined,
  }),
  component: BookingCheckout,
});

function BookingCheckout() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { t } = useI18n();

  const options = useMemo(() => {
    if (!search.bookingId) return null;
    const stashed =
      typeof window !== "undefined"
        ? sessionStorage.getItem(`stripe-cs:${search.bookingId}`)
        : null;
    if (!stashed) return null;
    try {
      const { clientSecret } = JSON.parse(stashed) as { clientSecret: string };
      return { clientSecret };
    } catch {
      return null;
    }
  }, [search.bookingId]);

  if (!search.bookingId || !options) {
    return (
      <div className="container-editorial py-24 text-center">
        <p className="text-muted-foreground">
          Your checkout session has expired. Please start a new reservation.
        </p>
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