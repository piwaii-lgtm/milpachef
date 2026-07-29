// Server-only: generate a branded PDF ticket for a confirmed booking.
import { PDFDocument, StandardFonts, rgb, PageSizes } from "pdf-lib";

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

// Sanitize to characters WinAnsi (Helvetica) supports.
function safe(s: string) {
  return s.replace(/[^\x20-\x7EÀ-ÿ]/g, "");
}

export async function generateTicketPdf(input: {
  guestName: string;
  tourTitle: string;
  tourDate: string;
  meetingPoint: string;
  partySize: number;
  bookingId: string;
  lang: Lang;
}): Promise<Uint8Array> {
  const L = labels[input.lang];
  const pdf = await PDFDocument.create();
  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const helvOblique = await pdf.embedFont(StandardFonts.HelveticaOblique);

  const green = rgb(0.184, 0.29, 0.165); // #2f4a2a
  const cream = rgb(0.98, 0.965, 0.925);
  const ink = rgb(0.16, 0.16, 0.16);
  const muted = rgb(0.42, 0.42, 0.42);
  const gold = rgb(0.78, 0.6, 0.25);

  const n = Math.max(1, Math.floor(input.partySize));
  for (let i = 1; i <= n; i++) {
    const page = pdf.addPage([600, 320]);

    // Background
    page.drawRectangle({ x: 0, y: 0, width: 600, height: 320, color: cream });
    // Left green band
    page.drawRectangle({ x: 0, y: 0, width: 170, height: 320, color: green });
    // Perforation
    for (let y = 10; y < 310; y += 8) {
      page.drawRectangle({ x: 178, y, width: 2, height: 4, color: muted });
    }

    // Left band
    page.drawText(L.header, { x: 22, y: 270, size: 20, font: helvBold, color: cream });
    page.drawRectangle({ x: 22, y: 260, width: 40, height: 2, color: gold });
    page.drawText(L.ticket, { x: 22, y: 232, size: 11, font: helvOblique, color: cream });

    // Seat indicator (e.g. "Guest 2 of 4")
    page.drawText(safe(L.seat(i, n)), { x: 22, y: 200, size: 11, font: helvBold, color: gold });

    page.drawText(L.reference, { x: 22, y: 60, size: 8, font: helv, color: cream });
    page.drawText(safe(`${input.bookingId.slice(0, 8).toUpperCase()}-${i}`), {
      x: 22, y: 44, size: 12, font: helvBold, color: cream,
    });

    // Right content
    const rx = 200;
    page.drawText(safe(input.tourTitle), { x: rx, y: 275, size: 15, font: helvBold, color: green, maxWidth: 380 });

    const rows: [string, string][] = [
      [L.guest, `${input.guestName} — ${L.seat(i, n)}`],
      [L.when, formatDate(input.tourDate, input.lang)],
      [L.where, input.meetingPoint],
      [L.guests, String(n)],
    ];
    let y = 235;
    for (const [k, v] of rows) {
      page.drawText(safe(k.toUpperCase()), { x: rx, y, size: 8, font: helv, color: muted });
      page.drawText(safe(v), { x: rx, y: y - 14, size: 12, font: helvBold, color: ink, maxWidth: 380 });
      y -= 40;
    }

    page.drawText(safe(L.presentThis), { x: rx, y: 55, size: 9, font: helvOblique, color: muted });
    page.drawText(safe(L.footer), { x: rx, y: 30, size: 8, font: helv, color: muted });
  }

  return await pdf.save();
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  // btoa is available in the Worker runtime.
  return btoa(binary);
}