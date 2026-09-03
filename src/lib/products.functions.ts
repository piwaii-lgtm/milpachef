import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type Price = { label: string; price: string };

export type AdminProduct = {
  id: string;
  slug: string;
  category: string;
  origin: string;
  image_url: string;
  scientific: string | null;
  name_en: string;
  name_es: string;
  name_fr: string;
  description_en: string;
  description_es: string;
  description_fr: string;
  prices: Price[];
  sort_order: number;
  published: boolean;
};

export type ProductInput = Omit<AdminProduct, "id">;

const CATEGORIES = [
  "salt",
  "beans",
  "chile",
  "seed",
  "cacao",
  "insect",
  "spirit",
  "sweetener",
] as const;

function validate(input: ProductInput): ProductInput {
  const str = (v: unknown) => String(v ?? "").trim();
  const clean: ProductInput = {
    slug: str(input.slug).toLowerCase(),
    category: str(input.category),
    origin: str(input.origin),
    image_url: str(input.image_url),
    scientific: str(input.scientific) || null,
    name_en: str(input.name_en),
    name_es: str(input.name_es),
    name_fr: str(input.name_fr),
    description_en: str(input.description_en),
    description_es: str(input.description_es),
    description_fr: str(input.description_fr),
    prices: Array.isArray(input.prices)
      ? input.prices
          .map((p) => ({ label: str(p?.label), price: str(p?.price) }))
          .filter((p) => p.label.length > 0)
          .slice(0, 20)
      : [],
    sort_order: Number.isFinite(Number(input.sort_order)) ? Number(input.sort_order) : 0,
    published: Boolean(input.published),
  };
  if (!/^[a-z0-9-]{3,80}$/.test(clean.slug))
    throw new Error("Slug must be lowercase letters, numbers, dashes (3-80)");
  if (!CATEGORIES.includes(clean.category as (typeof CATEGORIES)[number]))
    throw new Error("Unknown category");
  for (const [k, v] of [
    ["EN", clean.name_en],
    ["ES", clean.name_es],
    ["FR", clean.name_fr],
  ] as const) {
    if (v.length < 2 || v.length > 160) throw new Error(`Name ${k} must be 2-160 chars`);
  }
  for (const [k, v] of [
    ["EN", clean.description_en],
    ["ES", clean.description_es],
    ["FR", clean.description_fr],
  ] as const) {
    if (v.length > 2000) throw new Error(`Description ${k} is too long`);
  }
  if (clean.origin.length > 160) throw new Error("Origin is too long");
  if (clean.image_url.length > 500) throw new Error("Image URL is too long");
  return clean;
}

async function assertAdmin(context: { userId: string }) {
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

/** Public catalog read — no session required. */
export const listPublicProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminProduct[]> => {
    const client = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await client
      .from("products")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as AdminProduct[];
  },
);

export const listAllProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminProduct[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as AdminProduct[];
  });

export const createProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: ProductInput) => validate(data))
  .handler(async ({ data, context }): Promise<AdminProduct> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("products")
      .insert(data as never)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as unknown as AdminProduct;
  });

export const updateProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: ProductInput & { id: string }) => {
    if (!/^[a-f0-9-]{36}$/i.test(data.id)) throw new Error("Invalid id");
    return { id: data.id, ...validate(data) };
  })
  .handler(async ({ data, context }): Promise<AdminProduct> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...patch } = data;
    const { data: row, error } = await supabaseAdmin
      .from("products")
      .update(patch as never)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as unknown as AdminProduct;
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!/^[a-f0-9-]{36}$/i.test(data.id)) throw new Error("Invalid id");
    return data;
  })
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const PRODUCT_CATEGORIES = CATEGORIES;
