import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  listAllTours,
  createTour,
  updateTour,
  deleteTour,
  IMAGE_KEYS,
  CATEGORIES,
  type AdminTour,
  type TourInput,
} from "@/lib/tours.functions";
import { TOUR_DEFAULTS, defaultSlug } from "@/lib/tour-defaults";
import { AdminTabs } from "@/components/site/AdminTabs";
import { tourImages } from "@/lib/tour-images";

export const Route = createFileRoute("/_authenticated/admin/tours")({
  head: () => ({
    meta: [
      { title: "Manage experiences — Milpa Chef" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ManageToursPage,
});

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function blankForm(category: "tour" | "class"): TourInput {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(14, 0, 0, 0);
  return {
    ...TOUR_DEFAULTS[category],
    slug: defaultSlug(category, d),
    tour_date: toLocalInput(d.toISOString()),
  };
}

function ManageToursPage() {
  const list = useServerFn(listAllTours);
  const create = useServerFn(createTour);
  const update = useServerFn(updateTour);
  const remove = useServerFn(deleteTour);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-tours"],
    queryFn: () => list(),
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TourInput | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "upcoming" | "tour" | "class">("upcoming");

  const openEdit = (t: AdminTour) => {
    setEditingId(t.id);
    setForm({
      title: t.title,
      slug: t.slug,
      tour_date: toLocalInput(t.tour_date),
      duration_minutes: t.duration_minutes,
      meeting_point: t.meeting_point,
      capacity: t.capacity,
      spots_left: t.spots_left,
      price_mxn: t.price_mxn,
      description_en: t.description_en,
      description_es: t.description_es,
      description_fr: t.description_fr,
      image_key: t.image_key,
      category: t.category ?? "tour",
    });
  };

  const openNew = (category: "tour" | "class") => {
    setEditingId(null);
    setForm(blankForm(category));
  };

  const close = () => {
    setEditingId(null);
    setForm(null);
  };

  const set = <K extends keyof TourInput>(k: K, v: TourInput[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const switchCategory = (category: "tour" | "class") =>
    setForm((f) => {
      if (!f) return f;
      const d = TOUR_DEFAULTS[category];
      // when creating, swap the generic photo/copy to match the new category
      if (editingId) return { ...f, category };
      return { ...f, ...d, slug: f.slug, tour_date: f.tour_date };
    });

  const cards = useMemo(() => {
    const rows = data ?? [];
    const now = Date.now();
    if (filter === "upcoming") return rows.filter((t) => new Date(t.tour_date).getTime() >= now);
    if (filter === "tour" || filter === "class") return rows.filter((t) => (t.category ?? "tour") === filter);
    return rows;
  }, [data, filter]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      const payload: TourInput = {
        ...form,
        tour_date: new Date(form.tour_date).toISOString(),
      };
      if (editingId) {
        await update({ data: { id: editingId, ...payload } });
        toast.success("Experience updated");
      } else {
        await create({ data: payload });
        toast.success("Experience published");
      }
      close();
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (t: AdminTour) => {
    if (!confirm(`Delete "${t.title}" on ${new Date(t.tour_date).toLocaleString()}?`)) return;
    try {
      await remove({ data: { id: t.id } });
      toast.success("Deleted");
      if (editingId === t.id) close();
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <section className="container-editorial py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-4xl text-primary">Manage experiences</h1>
          <p className="text-sm text-muted-foreground">
            Every tour and cooking class as a card — edit the time, price, photo and description, or add and remove dates.
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link to="/tours" className="underline text-muted-foreground">Public agenda</Link>
          <Link to="/" className="underline text-muted-foreground">Site</Link>
        </div>
      </div>

      <AdminTabs />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-1 border border-border rounded-sm p-1 bg-card">
          {(["upcoming", "all", "tour", "class"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "px-3 py-1.5 text-xs uppercase tracking-widest rounded-sm " +
                (filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary")
              }
            >
              {f === "tour" ? "Food tours" : f === "class" ? "Classes" : f}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => openNew("tour")}
            className="px-4 py-2 rounded-sm bg-primary text-primary-foreground text-xs uppercase tracking-widest"
          >
            + Add food tour
          </button>
          <button
            onClick={() => openNew("class")}
            className="px-4 py-2 rounded-sm bg-[color:var(--corn)] text-primary text-xs uppercase tracking-widest"
          >
            + Add cooking class
          </button>
        </div>
      </div>

      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-red-700">{error instanceof Error ? error.message : "Access denied"}</p>}
      {data && cards.length === 0 && (
        <p className="text-muted-foreground">No experiences here yet. Add a food tour or a cooking class.</p>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((t) => {
          const past = new Date(t.tour_date).getTime() < Date.now();
          const isClass = (t.category ?? "tour") === "class";
          return (
            <article
              key={t.id}
              className={
                "flex flex-col overflow-hidden rounded-md border bg-card " +
                (isClass ? "border-[color:var(--corn)]/60 " : "border-border ") +
                (past ? "opacity-60" : "")
              }
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={tourImages[t.image_key] ?? tourImages.hero}
                  alt={t.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span
                  className={
                    "absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm " +
                    (isClass ? "bg-[color:var(--corn)] text-primary" : "bg-primary/85 text-primary-foreground")
                  }
                >
                  {isClass ? "Cooking class" : "Food tour"}
                </span>
                {past && (
                  <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm bg-background/90 text-muted-foreground">
                    Past
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs uppercase tracking-widest text-accent">
                  {new Date(t.tour_date).toLocaleString()} · {t.duration_minutes} min
                </div>
                <h3 className="font-serif text-xl text-primary mt-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">{t.description_es}</p>
                <div className="text-xs text-muted-foreground mt-3">{t.meeting_point}</div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="font-serif text-xl text-primary leading-none">MXN ${t.price_mxn}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t.spots_left}/{t.capacity} spots left · /{t.slug}
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <button onClick={() => openEdit(t)} className="underline text-primary">Edit</button>
                    <button onClick={() => onDelete(t)} className="underline text-red-700">Delete</button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto p-4 flex items-start justify-center">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-2xl my-8 border border-border rounded-md p-6 bg-card space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-primary">
                {editingId ? "Edit experience" : "New experience"}
              </h2>
              <button type="button" onClick={close} className="text-sm underline text-muted-foreground">Close</button>
            </div>
            {!editingId && (
              <p className="text-xs text-muted-foreground">
                Generic photo and description are pre-filled — adjust anything you like.
              </p>
            )}

            <Field label="Category">
              <select
                className={inputCls}
                value={form.category}
                onChange={(e) => switchCategory(e.target.value as "tour" | "class")}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c === "tour" ? "Food tour" : "Cooking class"}</option>
                ))}
              </select>
            </Field>

          <Field label="Title">
            <input required className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Slug">
              <input required className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="gastro-tour-2026-08-15" />
            </Field>
            <Field label="Date & time">
              <input required type="datetime-local" className={inputCls} value={form.tour_date} onChange={(e) => set("tour_date", e.target.value)} />
            </Field>
          </div>

          <Field label="Meeting point">
            <input required className={inputCls} value={form.meeting_point} onChange={(e) => set("meeting_point", e.target.value)} />
          </Field>

          <div className="grid grid-cols-4 gap-3">
            <Field label="Duration (min)">
              <input required type="number" min={30} max={720} className={inputCls} value={form.duration_minutes} onChange={(e) => set("duration_minutes", Number(e.target.value))} />
            </Field>
            <Field label="Capacity">
              <input required type="number" min={1} max={100} className={inputCls} value={form.capacity} onChange={(e) => set("capacity", Number(e.target.value))} />
            </Field>
            <Field label="Spots left">
              <input required type="number" min={0} max={100} className={inputCls} value={form.spots_left} onChange={(e) => set("spots_left", Number(e.target.value))} />
            </Field>
            <Field label="Price (MXN)">
              <input required type="number" min={1} className={inputCls} value={form.price_mxn} onChange={(e) => set("price_mxn", Number(e.target.value))} />
            </Field>
          </div>

          <Field label="Cover image">
            <div className="grid grid-cols-5 gap-2">
              {IMAGE_KEYS.map((k) => (
                <button
                  type="button"
                  key={k}
                  onClick={() => set("image_key", k)}
                  title={k}
                  className={
                    "aspect-[4/3] overflow-hidden rounded-sm border-2 " +
                    (form.image_key === k ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")
                  }
                >
                  <img src={tourImages[k] ?? tourImages.hero} alt={k} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </Field>

          <Field label="Description — English">
            <textarea required rows={3} className={inputCls} value={form.description_en} onChange={(e) => set("description_en", e.target.value)} />
          </Field>
          <Field label="Description — Español">
            <textarea required rows={3} className={inputCls} value={form.description_es} onChange={(e) => set("description_es", e.target.value)} />
          </Field>
          <Field label="Description — Français">
            <textarea required rows={3} className={inputCls} value={form.description_fr} onChange={(e) => set("description_fr", e.target.value)} />
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="px-5 py-2 rounded-sm bg-primary text-primary-foreground text-sm uppercase tracking-widest disabled:opacity-60">
              {saving ? "Saving…" : editingId ? "Save changes" : "Publish"}
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