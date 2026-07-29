import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
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

export const Route = createFileRoute("/_authenticated/admin/tours")({
  head: () => ({
    meta: [
      { title: "Manage tours — Milpa Chef" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ManageToursPage,
});

const empty: TourInput = {
  title: "Gastro Tour by Milpa Chef",
  slug: "",
  tour_date: "",
  duration_minutes: 150,
  meeting_point: "Restaurante Milli cocina de maíces",
  capacity: 10,
  spots_left: 10,
  price_mxn: 595,
  description_en: "",
  description_es: "",
  description_fr: "",
  image_key: "hero",
  category: "tour",
};

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
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

  const [editing, setEditing] = useState<AdminTour | null>(null);
  const [form, setForm] = useState<TourInput>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        slug: editing.slug,
        tour_date: toLocalInput(editing.tour_date),
        duration_minutes: editing.duration_minutes,
        meeting_point: editing.meeting_point,
        capacity: editing.capacity,
        spots_left: editing.spots_left,
        price_mxn: editing.price_mxn,
        description_en: editing.description_en,
        description_es: editing.description_es,
        description_fr: editing.description_fr,
        image_key: editing.image_key,
        category: editing.category ?? "tour",
      });
    } else {
      setForm(empty);
    }
  }, [editing]);

  const set = <K extends keyof TourInput>(k: K, v: TourInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: TourInput = {
        ...form,
        tour_date: new Date(form.tour_date).toISOString(),
      };
      if (editing) {
        await update({ data: { id: editing.id, ...payload } });
        toast.success("Tour updated");
      } else {
        await create({ data: payload });
        toast.success("Tour published");
      }
      setEditing(null);
      setForm(empty);
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
      toast.success("Tour deleted");
      if (editing?.id === t.id) setEditing(null);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <section className="container-editorial py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-4xl text-primary">Manage tours</h1>
          <p className="text-sm text-muted-foreground">Publish new dates on the calendar and adjust details per tour.</p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link to="/_authenticated/admin" className="underline text-primary">Bookings</Link>
          <Link to="/tours" className="underline text-muted-foreground">Public agenda</Link>
          <Link to="/" className="underline text-muted-foreground">Site</Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10">
        <form onSubmit={onSubmit} className="border border-border rounded-md p-6 bg-card space-y-4 h-fit">
          <h2 className="font-serif text-2xl text-primary">
            {editing ? "Edit tour" : "New tour"}
          </h2>

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
            <select className={inputCls} value={form.image_key} onChange={(e) => set("image_key", e.target.value)}>
              {IMAGE_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </Field>

          <Field label="Category">
            <select
              className={inputCls}
              value={form.category}
              onChange={(e) => set("category", e.target.value as "tour" | "class")}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c === "tour" ? "Food tour" : "Cooking class"}</option>
              ))}
            </select>
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
              {saving ? "Saving…" : editing ? "Save changes" : "Publish tour"}
            </button>
            {editing && (
              <button type="button" onClick={() => setEditing(null)} className="text-sm underline text-muted-foreground">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div>
          <h2 className="font-serif text-2xl text-primary mb-4">Calendar</h2>
          {isLoading && <p className="text-muted-foreground">Loading…</p>}
          {error && <p className="text-red-700">{error instanceof Error ? error.message : "Access denied"}</p>}
          {data && data.length === 0 && <p className="text-muted-foreground">No tours yet. Publish the first one.</p>}
          <ul className="space-y-3">
            {data?.map((t) => {
              const past = new Date(t.tour_date).getTime() < Date.now();
              return (
                <li key={t.id} className={`border border-border rounded-md p-4 bg-card ${past ? "opacity-60" : ""}`}>
                  <div className="flex justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {new Date(t.tour_date).toLocaleString()} · {t.duration_minutes} min
                      </div>
                      <div className="font-serif text-xl text-primary">{t.title}</div>
                      <div className="text-sm text-muted-foreground">{t.meeting_point}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        MXN ${t.price_mxn} · {t.spots_left}/{t.capacity} spots left · /{t.slug}
                      </div>
                    </div>
                    <div className="flex gap-3 items-start text-sm">
                      <button onClick={() => setEditing(t)} className="underline text-primary">Edit</button>
                      <button onClick={() => onDelete(t)} className="underline text-red-700">Delete</button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
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