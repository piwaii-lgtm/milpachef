import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminTourDate = {
  id: string;
  starts_at: string;
  capacity: number;
  spots_left: number;
  active: boolean;
};

export type AdminTour = {
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
  created_at: string;
  dates: AdminTourDate[];
};

export type TourInput = {
  title: string;
  slug: string;
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
};

const ALLOWED_IMAGE_KEYS = [
  "hero", "tortillas", "street", "mezcal", "market",
  "class", "class-cooking", "class-market", "class-dish", "class-coaster",
  "chef-milpa", "chef-group-table",
  "exp-hero", "exp-table", "exp-classes", "exp-private",
  "exp-territorio", "exp-productores", "exp-cultura", "exp-conocimiento",
  "phil-tour", "phil-mercado", "phil-aprende", "phil-experiencias",
  "acad-hero", "acad-beijing", "acad-slowfood",
  "cons-hero", "cons-modelo", "cons-organizacion", "cons-territorio", "cons-sistema",
  "recursos-hero", "recursos-recetas",
];
const ALLOWED_CATEGORIES = ["tour", "class"] as const;

function validate(input: TourInput): TourInput {
  const clean = {
    title: String(input.title ?? "").trim(),
    slug: String(input.slug ?? "").trim().toLowerCase(),
    duration_minutes: Number(input.duration_minutes),
    meeting_point: String(input.meeting_point ?? "").trim(),
    capacity: Number(input.capacity),
    spots_left: Number(input.spots_left),
    price_mxn: Number(input.price_mxn),
    description_en: String(input.description_en ?? "").trim(),
    description_es: String(input.description_es ?? "").trim(),
    description_fr: String(input.description_fr ?? "").trim(),
    image_key: String(input.image_key ?? "hero").trim(),
    image_url: String(input.image_url ?? "").trim() || null,
    category: String(input.category ?? "tour").trim() as "tour" | "class",
    on_demand: Boolean(input.on_demand),
  };
  if (clean.title.length < 3 || clean.title.length > 160) throw new Error("Title must be 3-160 chars");
  if (!/^[a-z0-9-]{3,80}$/.test(clean.slug)) throw new Error("Slug must be lowercase letters, numbers, dashes (3-80)");
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
  if (clean.image_url && clean.image_url.length > 500) throw new Error("Image URL is too long");
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
      .select("*, tour_dates(id, starts_at, capacity, spots_left, active)")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: any) => ({
      ...r,
      dates: ((r.tour_dates ?? []) as AdminTourDate[]).sort(
        (a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
      ),
    })) as AdminTour[];
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
    return { ...(row as Record<string, unknown>), dates: [] } as unknown as AdminTour;
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
    return { ...(row as Record<string, unknown>), dates: [] } as unknown as AdminTour;
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

/**
 * Replaces the availability calendar of an experience with the given list of
 * dates. Dates that disappear are deleted when nobody booked them, otherwise
 * they are deactivated so existing bookings keep their reference.
 */
export const setTourDates = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: { tourId: string; dates: { starts_at: string; capacity: number }[] }) => {
      if (!/^[a-f0-9-]{36}$/i.test(data.tourId)) throw new Error("Invalid tour id");
      if (!Array.isArray(data.dates) || data.dates.length > 200) throw new Error("Too many dates");
      const dates = data.dates.map((d) => {
        const ts = Date.parse(d.starts_at);
        if (Number.isNaN(ts)) throw new Error("Invalid date");
        const capacity = Number(d.capacity);
        if (!Number.isInteger(capacity) || capacity < 1 || capacity > 100)
          throw new Error("Capacity per date must be 1-100");
        return { starts_at: new Date(ts).toISOString(), capacity };
      });
      return { tourId: data.tourId, dates };
    },
  )
  .handler(async ({ data, context }): Promise<AdminTourDate[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing, error: exErr } = await supabaseAdmin
      .from("tour_dates")
      .select("id, starts_at, capacity, spots_left, active")
      .eq("tour_id", data.tourId);
    if (exErr) throw new Error(exErr.message);

    const wanted = new Map(data.dates.map((d) => [new Date(d.starts_at).getTime(), d]));
    const kept = new Set<number>();

    for (const row of existing ?? []) {
      const key = new Date(row.starts_at).getTime();
      const want = wanted.get(key);
      if (want) {
        kept.add(key);
        const booked = Math.max(0, row.capacity - row.spots_left);
        await supabaseAdmin
          .from("tour_dates")
          .update({
            capacity: want.capacity,
            spots_left: Math.max(0, want.capacity - booked),
            active: true,
          })
          .eq("id", row.id);
      } else {
        const { count } = await supabaseAdmin
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("tour_date_id", row.id);
        if ((count ?? 0) > 0) {
          await supabaseAdmin.from("tour_dates").update({ active: false }).eq("id", row.id);
        } else {
          await supabaseAdmin.from("tour_dates").delete().eq("id", row.id);
        }
      }
    }

    const toInsert = data.dates
      .filter((d) => !kept.has(new Date(d.starts_at).getTime()))
      .map((d) => ({
        tour_id: data.tourId,
        starts_at: d.starts_at,
        capacity: d.capacity,
        spots_left: d.capacity,
      }));
    if (toInsert.length) {
      const { error } = await supabaseAdmin.from("tour_dates").insert(toInsert);
      if (error) throw new Error(error.message);
    }

    const { data: fresh, error: freshErr } = await supabaseAdmin
      .from("tour_dates")
      .select("id, starts_at, capacity, spots_left, active")
      .eq("tour_id", data.tourId)
      .order("starts_at", { ascending: true });
    if (freshErr) throw new Error(freshErr.message);
    return (fresh ?? []) as AdminTourDate[];
  });

export const IMAGE_KEYS = ALLOWED_IMAGE_KEYS;
export const CATEGORIES = ALLOWED_CATEGORIES;