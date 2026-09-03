import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import {
  listAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  PRODUCT_CATEGORIES,
  type AdminProduct,
  type ProductInput,
} from "@/lib/products.functions";
import { CATEGORY_LABEL, type ProductCategory } from "@/lib/products";
import { AdminTabs } from "@/components/site/AdminTabs";
import { ImageUploadField } from "@/components/site/ImageUploadField";

export const Route = createFileRoute("/_authenticated/admin/products")({
  head: () => ({
    meta: [
      { title: "Manage products — Milpa Chef" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ManageProductsPage,
});

function blankForm(sortOrder: number): ProductInput {
  return {
    slug: "",
    category: "salt",
    origin: "",
    image_url: "",
    scientific: null,
    name_en: "",
    name_es: "",
    name_fr: "",
    description_en: "",
    description_es: "",
    description_fr: "",
    prices: [{ label: "", price: "" }],
    sort_order: sortOrder,
    published: true,
  };
}

function ManageProductsPage() {
  const list = useServerFn(listAllProducts);
  const create = useServerFn(createProduct);
  const update = useServerFn(updateProduct);
  const remove = useServerFn(deleteProduct);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => list(),
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductInput | null>(null);
  const [saving, setSaving] = useState(false);

  const openEdit = (p: AdminProduct) => {
    setEditingId(p.id);
    const { id: _id, ...rest } = p;
    setForm({ ...rest, prices: p.prices.length ? p.prices : [{ label: "", price: "" }] });
  };

  const openNew = () => {
    setEditingId(null);
    const next = ((data ?? []).reduce((m, p) => Math.max(m, p.sort_order), 0) || 0) + 10;
    setForm(blankForm(next));
  };

  const close = () => {
    setEditingId(null);
    setForm(null);
  };

  const set = <K extends keyof ProductInput>(k: K, v: ProductInput[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const setPrice = (i: number, key: "label" | "price", v: string) =>
    setForm((f) =>
      f ? { ...f, prices: f.prices.map((p, idx) => (idx === i ? { ...p, [key]: v } : p)) } : f,
    );

  const addPrice = () =>
    setForm((f) => (f ? { ...f, prices: [...f.prices, { label: "", price: "" }] } : f));

  const removePrice = (i: number) =>
    setForm((f) => (f ? { ...f, prices: f.prices.filter((_, idx) => idx !== i) } : f));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      if (editingId) {
        await update({ data: { id: editingId, ...form } });
        toast.success("Product updated");
      } else {
        await create({ data: form });
        toast.success("Product added");
      }
      close();
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (p: AdminProduct) => {
    if (!confirm(`Delete "${p.name_es}"?`)) return;
    try {
      await remove({ data: { id: p.id } });
      toast.success("Deleted");
      if (editingId === p.id) close();
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <section className="container-editorial py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-4xl text-primary">Manage products</h1>
          <p className="text-sm text-muted-foreground">
            Every item of the Selección MilpaChef® — edit the photo, names, description, origin and
            formats, or add and remove products.
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link to="/products" className="underline text-muted-foreground">Public catalog</Link>
          <Link to="/" className="underline text-muted-foreground">Site</Link>
        </div>
      </div>

      <AdminTabs />

      <div className="flex justify-end mb-6">
        <button
          onClick={openNew}
          className="px-4 py-2 rounded-sm bg-primary text-primary-foreground text-xs uppercase tracking-widest"
        >
          + Add product
        </button>
      </div>

      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-red-700">{error instanceof Error ? error.message : "Access denied"}</p>}
      {data && data.length === 0 && <p className="text-muted-foreground">No products yet.</p>}

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {(data ?? []).map((p) => (
          <article
            key={p.id}
            className={
              "flex flex-col overflow-hidden rounded-md border border-border bg-card " +
              (p.published ? "" : "opacity-60")
            }
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-muted">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name_es} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-xs text-muted-foreground">
                  No image
                </div>
              )}
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm bg-primary/85 text-primary-foreground">
                {CATEGORY_LABEL[p.category as ProductCategory]?.es ?? p.category}
              </span>
              {!p.published && (
                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm bg-background/90 text-muted-foreground">
                  Hidden
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-serif text-xl text-primary">{p.name_es}</h3>
              <div className="text-xs text-muted-foreground mt-1">{p.origin}</div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">{p.description_es}</p>
              <div className="text-xs text-muted-foreground mt-3">
                {p.prices.map((pr) => pr.label).join(" · ") || "No formats"}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">/{p.slug}</div>
                <div className="flex gap-3 text-sm">
                  <button onClick={() => openEdit(p)} className="underline text-primary">Edit</button>
                  <button onClick={() => onDelete(p)} className="underline text-red-700">Delete</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto p-4 flex items-start justify-center">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-2xl my-8 border border-border rounded-md p-6 bg-card space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-primary">
                {editingId ? "Edit product" : "New product"}
              </h2>
              <button type="button" onClick={close} className="text-sm underline text-muted-foreground">
                Close
              </button>
            </div>

            <Field label="Picture">
              <ImageUploadField value={form.image_url} onChange={(url) => set("image_url", url)} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <select
                  className={inputCls}
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {CATEGORY_LABEL[c].es}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Slug">
                <input
                  required
                  className={inputCls}
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder="miel-multifloral"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Origin">
                <input className={inputCls} value={form.origin} onChange={(e) => set("origin", e.target.value)} />
              </Field>
              <Field label="Scientific name (optional)">
                <input
                  className={inputCls}
                  value={form.scientific ?? ""}
                  onChange={(e) => set("scientific", e.target.value)}
                />
              </Field>
            </div>

            <Field label="Name — English">
              <input required className={inputCls} value={form.name_en} onChange={(e) => set("name_en", e.target.value)} />
            </Field>
            <Field label="Name — Español">
              <input required className={inputCls} value={form.name_es} onChange={(e) => set("name_es", e.target.value)} />
            </Field>
            <Field label="Name — Français">
              <input required className={inputCls} value={form.name_fr} onChange={(e) => set("name_fr", e.target.value)} />
            </Field>

            <Field label="Description — English">
              <textarea rows={3} className={inputCls} value={form.description_en} onChange={(e) => set("description_en", e.target.value)} />
            </Field>
            <Field label="Description — Español">
              <textarea rows={3} className={inputCls} value={form.description_es} onChange={(e) => set("description_es", e.target.value)} />
            </Field>
            <Field label="Description — Français">
              <textarea rows={3} className={inputCls} value={form.description_fr} onChange={(e) => set("description_fr", e.target.value)} />
            </Field>

            <div>
              <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Formats & prices
              </span>
              <p className="text-[11px] text-muted-foreground mb-2">
                Only the format is shown on the site — prices stay in the PDF catalog.
              </p>
              <div className="space-y-2">
                {form.prices.map((pr, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputCls}
                      placeholder="250 g jar"
                      value={pr.label}
                      onChange={(e) => setPrice(i, "label", e.target.value)}
                    />
                    <input
                      className={inputCls + " max-w-[9rem]"}
                      placeholder="$145"
                      value={pr.price}
                      onChange={(e) => setPrice(i, "price", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removePrice(i)}
                      className="text-xs underline text-red-700 shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addPrice} className="mt-2 text-xs underline text-primary">
                + Add format
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 items-end">
              <Field label="Sort order">
                <input
                  type="number"
                  className={inputCls}
                  value={form.sort_order}
                  onChange={(e) => set("sort_order", Number(e.target.value))}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm text-primary pb-2">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => set("published", e.target.checked)}
                />
                Visible on the site
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-sm bg-primary text-primary-foreground text-sm uppercase tracking-widest disabled:opacity-60"
              >
                {saving ? "Saving…" : editingId ? "Save changes" : "Add product"}
              </button>
              <button type="button" onClick={close} className="text-sm underline text-muted-foreground">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

const inputCls =
  "w-full border border-border rounded-sm px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</span>
      {children}
    </label>
  );
}
