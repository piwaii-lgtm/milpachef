import { supabase } from "@/integrations/supabase/client";

export type Tour = {
  id: string;
  title: string;
  slug: string;
  tour_date: string;
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

export async function fetchTours(limit = 12, category?: "tour" | "class"): Promise<Tour[]> {
  const nowIso = new Date().toISOString();
  let q = supabase
    .from("tours")
    .select("*")
    .gte("tour_date", nowIso)
    .order("tour_date", { ascending: true })
    .limit(limit);
  if (category) q = q.eq("category", category);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Tour[];
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

export function formatTourDate(iso: string, lang: "en" | "es" | "fr") {
  const d = new Date(iso);
  const locale = lang === "es" ? "es-MX" : lang === "fr" ? "fr-FR" : "en-US";
  return d.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}