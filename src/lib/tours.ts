import { supabase } from "@/integrations/supabase/client";

export type TourDate = {
  id: string;
  starts_at: string;
  capacity: number;
  spots_left: number;
  active: boolean;
};

export type Tour = {
  id: string;
  title: string;
  slug: string;
  tour_date: string | null;
  duration_minutes: number;
  meeting_point: string;
  capacity: number;
  spots_left: number;
  price_mxn: number;
  description_en: string;
  description_es: string;
  description_fr: string;
  image_key: string;
  image_url: string | null;
  category: "tour" | "class";
  on_demand: boolean;
  dates: TourDate[];
};

export type Testimonial = {
  id: string;
  guest_name: string;
  origin: string;
  quote_en: string;
  quote_es: string;
  quote_fr: string;
  rating: number;
};

/** Upcoming, bookable dates only — sorted soonest first. */
export function upcomingDates(dates: TourDate[] | null | undefined): TourDate[] {
  const now = Date.now();
  return (dates ?? [])
    .filter((d) => d.active && new Date(d.starts_at).getTime() > now)
    .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
}

export async function fetchTours(limit = 12, category?: "tour" | "class"): Promise<Tour[]> {
  let q = supabase
    .from("tours")
    .select("*, tour_dates(id, starts_at, capacity, spots_left, active)")
    .order("created_at", { ascending: true })
    .limit(60);
  if (category) q = q.eq("category", category);
  const { data, error } = await q;
  if (error) throw error;

  const rows = ((data ?? []) as unknown as (Tour & { tour_dates: TourDate[] | null })[]).map((r) => ({
    ...r,
    dates: upcomingDates(r.tour_dates),
  }));

  // Experiences with upcoming dates come first (soonest first), then on-demand ones.
  return rows
    .filter((r) => r.dates.length > 0 || r.on_demand)
    .sort((a, b) => {
      const at = a.dates[0] ? new Date(a.dates[0].starts_at).getTime() : Infinity;
      const bt = b.dates[0] ? new Date(b.dates[0].starts_at).getTime() : Infinity;
      return at - bt;
    })
    .slice(0, limit);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Testimonial[];
}

export function pickDescription(t: Tour, lang: "en" | "es" | "fr") {
  if (lang === "es") return t.description_es;
  if (lang === "fr") return t.description_fr;
  return t.description_en;
}

export function pickQuote(t: Testimonial, lang: "en" | "es" | "fr") {
  if (lang === "es") return t.quote_es;
  if (lang === "fr") return t.quote_fr;
  return t.quote_en;
}

export function localeOf(lang: "en" | "es" | "fr") {
  return lang === "es" ? "es-MX" : lang === "fr" ? "fr-FR" : "en-US";
}

export function formatTourDate(iso: string, lang: "en" | "es" | "fr") {
  const d = new Date(iso);
  return d.toLocaleDateString(localeOf(lang), {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Short chip label, e.g. "Sat 12 Sep · 14:00" */
export function formatDateChip(iso: string, lang: "en" | "es" | "fr") {
  const d = new Date(iso);
  const locale = localeOf(lang);
  const day = d.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short" });
  const time = d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
  return `${day} · ${time}`;
}
