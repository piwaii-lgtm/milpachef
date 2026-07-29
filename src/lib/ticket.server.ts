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
    ticket: "Experience Ticket",
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
    ticket: "Boleto de experiencia",
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
    ticket: "Billet d'expérience",
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
    timeZone: "America/Mexico_City",
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

const SERIF = "Lora, Georgia, serif";
const SANS = "Open Sans, Arial, sans-serif";

function buildTicketSvg(input: {
  guestName: string;
  tourTitle: string;
  tourDate: string;
  meetingPoint: string;
  partySize: number;
  reference: string;
  index: number;
  lang: Lang;
}) {
  const L = labels[input.lang];
  const n = Math.max(1, Math.floor(input.partySize));
  const titleLines = wrapText(input.tourTitle, 30, 2);
  const meetingLines = wrapText(input.meetingPoint, 30, 2);
  const guestLines = wrapText(input.guestName, 26, 1);
  const dateLines = wrapText(formatDate(input.tourDate, input.lang), 38, 2);
  const perfDots = Array.from(
    { length: 24 },
    (_, dot) => `<circle cx="380" cy="${28 + dot * 25}" r="4.5"/>`,
  ).join("");

  // Grid: dark stub 0-380, content column starts at x=440, side column at x=980.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Milpa Chef ticket">
  <rect width="1200" height="630" fill="#fbf4df"/>
  <rect x="0" y="0" width="380" height="630" fill="#2f4a2a"/>
  <path d="M300 0 C346 92 268 150 318 236 C362 316 284 380 330 476 C368 560 306 590 336 630 L380 630 L380 0 Z" fill="#d5a83f" opacity="0.18"/>
  <g fill="#fbf4df" opacity="0.5">${perfDots}</g>
  <g font-family="${SERIF}" fill="#fbf4df">
    <text x="56" y="104" font-size="40" font-weight="700" letter-spacing="3">${escapeXml(L.header)}</text>
    <text x="56" y="168" font-size="24">${escapeXml(L.ticket)}</text>
  </g>
  <rect x="56" y="124" width="88" height="5" fill="#d5a83f"/>
  <g font-family="${SANS}" fill="#fbf4df">
    <text x="56" y="252" font-size="22" font-weight="700" fill="#d5a83f" letter-spacing="1">${escapeXml(L.seat(input.index, n))}</text>
    <text x="56" y="486" font-size="15" opacity="0.75" letter-spacing="2">${escapeXml(L.reference.toUpperCase())}</text>
    <text x="56" y="526" font-size="28" font-weight="700">${escapeXml(input.reference)}</text>
  </g>
  <g font-family="${SERIF}" fill="#2f4a2a">
    <text x="440" y="102" font-size="34" font-weight="700">${escapeXml(titleLines[0] ?? input.tourTitle)}</text>
    ${titleLines[1] ? `<text x="440" y="146" font-size="34" font-weight="700">${escapeXml(titleLines[1])}</text>` : ""}
  </g>
  <rect x="440" y="${titleLines[1] ? 176 : 132}" width="672" height="2" fill="#d5a83f" opacity="0.7"/>
  <g font-family="${SANS}">
    <text x="440" y="238" font-size="14" fill="#6f6a5a" letter-spacing="2">${escapeXml(L.guest.toUpperCase())}</text>
    <text x="440" y="274" font-size="26" font-weight="700" fill="#292722">${escapeXml(guestLines[0] ?? input.guestName)}</text>

    <text x="440" y="342" font-size="14" fill="#6f6a5a" letter-spacing="2">${escapeXml(L.when.toUpperCase())}</text>
    <text x="440" y="378" font-size="22" font-weight="700" fill="#292722">${escapeXml(dateLines[0] ?? "")}</text>
    ${dateLines[1] ? `<text x="440" y="408" font-size="22" font-weight="700" fill="#292722">${escapeXml(dateLines[1])}</text>` : ""}

    <text x="440" y="470" font-size="14" fill="#6f6a5a" letter-spacing="2">${escapeXml(L.where.toUpperCase())}</text>
    <text x="440" y="506" font-size="22" font-weight="700" fill="#292722">${escapeXml(meetingLines[0] ?? input.meetingPoint)}</text>
    ${meetingLines[1] ? `<text x="440" y="536" font-size="22" font-weight="700" fill="#292722">${escapeXml(meetingLines[1])}</text>` : ""}

    <text x="980" y="238" font-size="14" fill="#6f6a5a" letter-spacing="2">${escapeXml(L.guests.toUpperCase())}</text>
    <text x="980" y="292" font-size="46" font-weight="700" fill="#2f4a2a">${n}</text>
  </g>
  <rect x="440" y="566" width="672" height="1" fill="#d5a83f" opacity="0.6"/>
  <g font-family="${SANS}" fill="#6f6a5a" font-size="15">
    <text x="440" y="600">${escapeXml(L.presentThis)}</text>
    <text x="1112" y="600" text-anchor="end">${escapeXml(L.footer)}</text>
  </g>
</svg>`;
}

export async function generateTicketAttachments(input: {
  guestName: string;
  tourTitle: string;
  tourDate: string;
  meetingPoint: string;
  partySize: number;
  bookingId: string;
  lang: Lang;
}): Promise<Array<{ filename: string; content: string }>> {
  const n = Math.max(1, Math.floor(input.partySize));
  const stub = input.bookingId.slice(0, 8);
  const svgs = Array.from({ length: n }, (_, index) => {
    const i = index + 1;
    return {
      i,
      svg: buildTicketSvg({
        ...input,
        index: i,
        reference: `${stub.toUpperCase()}-${i}`,
      }),
    };
  });

  try {
    const { renderSvgToPngBase64 } = await import("./ticket-render.server");
    return await Promise.all(
      svgs.map(async ({ i, svg }) => ({
        filename: `milpachef-ticket-${stub}-${i}.png`,
        content: await renderSvgToPngBase64(svg),
      })),
    );
  } catch (e) {
    console.error("[ticket] PNG rendering failed, falling back to SVG", e);
    return svgs.map(({ i, svg }) => ({
      filename: `milpachef-ticket-${stub}-${i}.svg`,
      content: svgToBase64(svg),
    }));
  }
}