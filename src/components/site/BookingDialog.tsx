import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { formatTourDate, type Tour } from "@/lib/tours";
import { startCheckout } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";

export function BookingDialog({
  tour,
  open,
  onClose,
}: {
  tour: Tour | null;
  open: boolean;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [party, setParty] = useState(1);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setSubmitting(false);
  }, [open, tour?.id]);

  if (!open || !tour) return null;

  const total = tour.price_mxn * party;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await startCheckout({
        data: {
          tourId: tour.id,
          partySize: party,
          guestName: name.trim(),
          guestEmail: email.trim(),
          notes: notes.trim() || undefined,
          lang,
          returnUrl: `${window.location.origin}/booking/return?session_id={CHECKOUT_SESSION_ID}&bookingId={BOOKING_ID}`,
          environment: getStripeEnvironment(),
        },
      });
      if ("error" in result) throw new Error(result.error);
      // Stash the fresh client secret for the checkout route; keyed by bookingId.
      const returnUrl = `${window.location.origin}/booking/return?session_id={CHECKOUT_SESSION_ID}&bookingId=${result.bookingId}`;
      sessionStorage.setItem(
        `stripe-cs:${result.bookingId}`,
        JSON.stringify({ clientSecret: result.clientSecret, returnUrl }),
      );
      onClose();
      navigate({ to: "/booking/checkout", search: { bookingId: result.bookingId } });
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : t("book.error"));
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-card w-full max-w-lg rounded-md shadow-2xl overflow-hidden border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 py-6 border-b border-border">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            {formatTourDate(tour.tour_date, lang)}
          </div>
          <h3 className="font-serif text-2xl text-primary">{tour.title}</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <p className="text-sm text-muted-foreground">{t("book.subtitle")}</p>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                {t("book.name")}
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-input bg-background rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                {t("book.email")}
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-input bg-background rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                {t("book.party")}
              </label>
              <input
                required
                type="number"
                min={1}
                max={Math.max(1, tour.spots_left)}
                value={party}
                onChange={(e) => setParty(Math.max(1, Number(e.target.value) || 1))}
                className="w-full border border-input bg-background rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                {t("book.notes")}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full border border-input bg-background rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t("book.total")}
                </div>
                <div className="font-serif text-2xl text-primary">MXN ${total}</div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-sm bg-primary text-primary-foreground px-6 py-3 hover:bg-[color:var(--milpa-deep)] disabled:opacity-60"
              >
                {submitting ? t("book.submitting") : t("book.submit")}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}