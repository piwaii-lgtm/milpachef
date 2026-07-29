import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminTour = {
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
  category: "tour" | "class";
  created_at: string;
};

export type TourInput = {
  title: string;
  slug: string;
  tour_date: string; // ISO
  duration_minutes: number;
  meeting_point: string;
  capacity: number;
  spots_left: number;
  price_mxn: number;
  description_en: string;
  description_es: string;
  description_fr: string;
  image_key: string;
  category: "tour" | "class";
};

const ALLOWED_IMAGE_KEYS = ["hero", "tortillas", "street", "mezcal", "market", "class", "class-cooking", "class-market", "class-dish", "class-coaster", "chef-milpa"];
const ALLOWED_CATEGORIES = ["tour", "class"] as const;

function validate(input: TourInput): TourInput {
  const clean = {
    title: String(input.title ?? "").trim(),
    slug: String(input.slug ?? "").trim().toLowerCase(),
    tour_date: String(input.tour_date ?? "").trim(),
    duration_minutes: Number(input.duration_minutes),
    meeting_point: String(input.meeting_point ?? "").trim(),
    capacity: Number(input.capacity),
    spots_left: Number(input.spots_left),
    price_mxn: Number(input.price_mxn),
    description_en: String(input.description_en ?? "").trim(),
    description_es: String(input.description_es ?? "").trim(),
    description_fr: String(input.description_fr ?? "").trim(),
    image_key: String(input.image_key ?? "hero").trim(),
    category: String(input.category ?? "tour").trim() as "tour" | "class",
  };
  if (clean.title.length < 3 || clean.title.length > 160) throw new Error("Title must be 3-160 chars");
  if (!/^[a-z0-9-]{3,80}$/.test(clean.slug)) throw new Error("Slug must be lowercase letters, numbers, dashes (3-80)");
  if (Number.isNaN(Date.parse(clean.tour_date))) throw new Error("Invalid tour date");
  if (!Number.isInteger(clean.duration_minutes) || clean.duration_minutes < 30 || clean.duration_minutes > 720)
    throw new Error("Duration must be 30-720 minutes");
  if (clean.meeting_point.length < 3 || clean.meeting_point.length > 240) throw new Error("Meeting point required");
  if (!Number.isInteger(clean.capacity) || clean.capacity < 1 || clean.capacity > 100) throw new Error("Capacity 1-100");
  if (!Number.isInteger(clean.spots_left) || clean.spots_left < 0 || clean.spots_left > clean.capacity)
    throw new Error("Spots left must be between 0 and capacity");
  if (!Number.isInteger(clean.price_mxn) || clean.price_mxn < 1 || clean.price_mxn > 100000) throw new Error("Price 1-100000 MXN");
  for (const [k, v] of [["EN", clean.description_en], ["ES", clean.description_es], ["FR", clean.description_fr]] as const) {
    if (v.length < 10 || v.length > 2000) throw new Error(`Description ${k} must be 10-2000 chars`);
  }
  if (!ALLOWED_IMAGE_KEYS.includes(clean.image_key)) throw new Error("Unknown image key");
  if (!ALLOWED_CATEGORIES.includes(clean.category)) throw new Error("Unknown category");
  return clean;
}

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("user_id")
    .eq("user_id", context.userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Response("Forbidden", { status: 403 });
}

export const listAllTours = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminTour[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("tours")
      .select("*")
      .order("tour_date", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminTour[];
  });

export const createTour = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: TourInput) => validate(data))
  .handler(async ({ data, context }): Promise<AdminTour> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("tours")
      .insert(data)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as AdminTour;
  });

export const updateTour = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: TourInput & { id: string }) => {
    if (!/^[a-f0-9-]{36}$/i.test(data.id)) throw new Error("Invalid id");
    return { id: data.id, ...validate(data) };
  })
  .handler(async ({ data, context }): Promise<AdminTour> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...patch } = data;
    const { data: row, error } = await supabaseAdmin
      .from("tours")
      .update(patch)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as AdminTour;
  });

export const deleteTour = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!/^[a-f0-9-]{36}$/i.test(data.id)) throw new Error("Invalid id");
    return data;
  })
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("tours").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const IMAGE_KEYS = ALLOWED_IMAGE_KEYS;
export const CATEGORIES = ALLOWED_CATEGORIES;