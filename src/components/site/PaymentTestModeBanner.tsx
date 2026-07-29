const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken) {
    return (
      <div className="w-full bg-red-100 border-b border-red-300 px-4 py-2 text-center text-sm text-red-800">
        Production checkout is not configured yet — complete payments go-live in your Lovable project.
      </div>
    );
  }
  if (clientToken.startsWith("pk_test_")) {
    return (
      <div className="w-full bg-orange-100 border-b border-orange-300 px-3 py-2 text-center text-xs text-orange-900">
        Preview mode: all payments here are test transactions. Use card 4242 4242 4242 4242.
      </div>
    );
  }
  return null;
}