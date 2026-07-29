// Server-only: generate branded image tickets for a confirmed booking.

type Lang = "en" | "es" | "fr";

const labels: Record<Lang, {
  header: string;
  ticket: string;
  guest: string;
  when: string;
  where: string;
  guests: string;
  reference: string;
  footer: string;
  presentThis: string;
  seat: (i: number, n: number) => string;
}> = {
  en: {
    header: "MILPA CHEF",
    ticket: "Gastro Tour Ticket",
    guest: "Guest",
    when: "When",
    where: "Meeting point",
    guests: "Party size",
    reference: "Reference",
    footer: "Cholula, Puebla · milpachef.com",
    presentThis: "Present this ticket at the meeting point.",
    seat: (i, n) => `Guest ${i} of ${n}`,
  },
  es: {
    header: "MILPA CHEF",
    ticket: "Boleto Gastro Tour",
    guest: "Invitado",
    when: "Cuándo",
    where: "Punto de encuentro",
    guests: "Personas",
    reference: "Referencia",
    footer: "Cholula, Puebla · milpachef.com",
    presentThis: "Presenta este boleto en el punto de encuentro.",
    seat: (i, n) => `Invitado ${i} de ${n}`,
  },
  fr: {
    header: "MILPA CHEF",
    ticket: "Billet Gastro Tour",
    guest: "Invité",
    when: "Quand",
    where: "Point de rendez-vous",
    guests: "Personnes",
    reference: "Référence",
    footer: "Cholula, Puebla · milpachef.com",
    presentThis: "Présente ce billet au point de rendez-vous.",
    seat: (i, n) => `Invité ${i} sur ${n}`,
  },
};

function formatDate(iso: string, lang: Lang) {
  const locale = lang === "es" ? "es-MX" : lang === "fr" ? "fr-FR" : "en-US";
  return new Date(iso).toLocaleString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text: string, maxChars: number, maxLines = 2) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
    if (lines.length === maxLines) break;
  }
  if (lines.length < maxLines && current) lines.push(current);
  return lines.slice(0, maxLines);
}

function svgToBase64(svg: string) {
  const bytes = new TextEncoder().encode(svg);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function generateTicketAttachments(input: {
  guestName: string;
  tourTitle: string;
  tourDate: string;
  meetingPoint: string;
  partySize: number;
  bookingId: string;
  lang: Lang;
}): Array<{ filename: string; content: string }> {
  const L = labels[input.lang];
  const n = Math.max(1, Math.floor(input.partySize));
  return Array.from({ length: n }, (_, index) => {
    const i = index + 1;
    const reference = `${input.bookingId.slice(0, 8).toUpperCase()}-${i}`;
    const titleLines = wrapText(input.tourTitle, 34, 2);
    const meetingLines = wrapText(input.meetingPoint, 44, 2);
    const guestLine = `${input.guestName} — ${L.seat(i, n)}`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="640" viewBox="0 0 1200 640" role="img" aria-label="Milpa Chef ticket">
  <rect width="1200" height="640" fill="#fbf4df"/>
  <rect x="0" y="0" width="340" height="640" fill="#2f4a2a"/>
  <path d="M340 0 C380 80 305 130 350 210 C390 285 315 340 355 430 C390 510 330 565 360 640 L340 640 Z" fill="#d5a83f" opacity="0.35"/>
  <g fill="#fbf4df" opacity="0.65">${Array.from({ length: 26 }, (_, dot) => `<circle cx="360" cy="${18 + dot * 24}" r="5"/>`).join("")}</g>
  <text x="48" y="96" font-family="Georgia, serif" font-size="42" font-weight="700" letter-spacing="2" fill="#fbf4df">${escapeXml(L.header)}</text>
  <rect x="48" y="122" width="92" height="6" fill="#d5a83f"/>
  <text x="48" y="178" font-family="Georgia, serif" font-size="25" font-style="italic" fill="#fbf4df">${escapeXml(L.ticket)}</text>
  <text x="48" y="250" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#d5a83f">${escapeXml(L.seat(i, n))}</text>
  <text x="48" y="480" font-family="Arial, sans-serif" font-size="18" fill="#fbf4df" opacity="0.82">${escapeXml(L.reference)}</text>
  <text x="48" y="520" font-family="Arial, sans-serif" font-size="31" font-weight="700" fill="#fbf4df">${escapeXml(reference)}</text>
  <text x="420" y="100" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#2f4a2a">${escapeXml(titleLines[0] ?? input.tourTitle)}</text>
  ${titleLines[1] ? `<text x="420" y="142" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#2f4a2a">${escapeXml(titleLines[1])}</text>` : ""}
  <g font-family="Arial, sans-serif" fill="#292722">
    <text x="420" y="218" font-size="17" fill="#6f6a5a" letter-spacing="1.5">${escapeXml(L.guest.toUpperCase())}</text>
    <text x="420" y="252" font-size="28" font-weight="700">${escapeXml(guestLine)}</text>
    <text x="420" y="314" font-size="17" fill="#6f6a5a" letter-spacing="1.5">${escapeXml(L.when.toUpperCase())}</text>
    <text x="420" y="348" font-size="25" font-weight="700">${escapeXml(formatDate(input.tourDate, input.lang))}</text>
    <text x="420" y="410" font-size="17" fill="#6f6a5a" letter-spacing="1.5">${escapeXml(L.where.toUpperCase())}</text>
    <text x="420" y="444" font-size="24" font-weight="700">${escapeXml(meetingLines[0] ?? input.meetingPoint)}</text>
    ${meetingLines[1] ? `<text x="420" y="476" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#292722">${escapeXml(meetingLines[1])}</text>` : ""}
    <text x="900" y="410" font-size="17" fill="#6f6a5a" letter-spacing="1.5">${escapeXml(L.guests.toUpperCase())}</text>
    <text x="900" y="454" font-size="54" font-weight="700" fill="#2f4a2a">${n}</text>
  </g>
  <rect x="420" y="548" width="620" height="1" fill="#d5a83f" opacity="0.75"/>
  <text x="420" y="590" font-family="Georgia, serif" font-size="22" font-style="italic" fill="#6f6a5a">${escapeXml(L.presentThis)}</text>
  <text x="900" y="590" font-family="Arial, sans-serif" font-size="16" fill="#6f6a5a">${escapeXml(L.footer)}</text>
</svg>`;
    return {
      filename: `milpachef-ticket-${input.bookingId.slice(0, 8)}-${i}.svg`,
      content: svgToBase64(svg),
    };
  });
}