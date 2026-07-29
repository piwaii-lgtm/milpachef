// Server-only email helpers. Never import from client code.
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

type Lang = "en" | "es" | "fr";

const strings: Record<Lang, {
  subject: (t: string) => string;
  hi: (n: string) => string;
  intro: string;
  when: string;
  where: string;
  guests: string;
  paid: string;
  refPrefix: string;
  outro: string;
  signoff: string;
}> = {
  en: {
    subject: (t) => `Your Milpa Chef reservation — ${t}`,
    hi: (n) => `Hola ${n},`,
    intro: "Your Gastro Tour reservation is confirmed. We can't wait to walk Cholula with you.",
    when: "When",
    where: "Meeting point",
    guests: "Guests",
    paid: "Paid",
    refPrefix: "Reference",
    outro: "If plans change, reply to this email and we'll help you sort it.",
    signoff: "— Milpa Chef",
  },
  es: {
    subject: (t) => `Tu reserva con Milpa Chef — ${t}`,
    hi: (n) => `Hola ${n},`,
    intro: "Tu reserva del Gastro Tour está confirmada. ¡Nos vemos pronto en Cholula!",
    when: "Cuándo",
    where: "Punto de encuentro",
    guests: "Personas",
    paid: "Pagado",
    refPrefix: "Referencia",
    outro: "Si cambian los planes, responde a este correo y lo resolvemos.",
    signoff: "— Milpa Chef",
  },
  fr: {
    subject: (t) => `Ta réservation Milpa Chef — ${t}`,
    hi: (n) => `Bonjour ${n},`,
    intro: "Ta réservation du Gastro Tour est confirmée. À très vite à Cholula !",
    when: "Quand",
    where: "Point de rendez-vous",
    guests: "Personnes",
    paid: "Payé",
    refPrefix: "Référence",
    outro: "Si tes plans changent, réponds à ce mail et on s'arrange.",
    signoff: "— Milpa Chef",
  },
};

function formatDate(iso: string, lang: Lang) {
  const locale = lang === "es" ? "es-MX" : lang === "fr" ? "fr-FR" : "en-US";
  return new Date(iso).toLocaleString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendBookingConfirmation(input: {
  email: string;
  name: string;
  tourTitle: string;
  tourDate: string;
  meetingPoint: string;
  partySize: number;
  amountMxn: number;
  bookingId: string;
  lang: Lang;
}) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!lovableKey || !resendKey) {
    console.warn("[email] LOVABLE_API_KEY or RESEND_API_KEY missing; skipping email");
    return;
  }
  const s = strings[input.lang];
  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: auto; color: #2a2a2a;">
      <h1 style="color: #2f4a2a; font-size: 22px;">${escapeHtml(input.tourTitle)}</h1>
      <p>${escapeHtml(s.hi(input.name))}</p>
      <p>${s.intro}</p>
      <table style="width:100%; margin: 20px 0; border-collapse: collapse;">
        <tr><td style="padding: 6px 0; color: #6b6b6b;">${s.when}</td><td style="padding: 6px 0;">${escapeHtml(formatDate(input.tourDate, input.lang))}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b6b6b;">${s.where}</td><td style="padding: 6px 0;">${escapeHtml(input.meetingPoint)}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b6b6b;">${s.guests}</td><td style="padding: 6px 0;">${input.partySize}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b6b6b;">${s.paid}</td><td style="padding: 6px 0;">MXN $${input.amountMxn}</td></tr>
      </table>
      <p style="font-size: 12px; color: #6b6b6b;">${s.refPrefix}: ${escapeHtml(input.bookingId)}</p>
      <p>${s.outro}</p>
      <p style="margin-top: 24px;">${s.signoff}</p>
    </div>
  `;
  const response = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      // TODO: swap to bookings@milpachef.com after verifying a domain in Resend.
      from: "Milpa Chef <onboarding@resend.dev>",
      to: [input.email],
      subject: s.subject(input.tourTitle),
      html,
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    console.error(`[email] Resend send failed [${response.status}]: ${text}`);
  }
}