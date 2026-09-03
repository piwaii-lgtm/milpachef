import { useMemo, useState } from "react";

export type DraftDate = { starts_at: string; capacity: number; booked?: number };

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function dayKey(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/** Airbnb-style month grid: click a day to open/close availability for it. */
export function AvailabilityCalendar({
  dates,
  onChange,
  defaultTime,
  onDefaultTimeChange,
  defaultCapacity,
}: {
  dates: DraftDate[];
  onChange: (next: DraftDate[]) => void;
  defaultTime: string;
  onDefaultTimeChange: (t: string) => void;
  defaultCapacity: number;
}) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));

  const byDay = useMemo(() => {
    const m = new Map<string, DraftDate>();
    for (const d of dates) m.set(dayKey(new Date(d.starts_at)), d);
    return m;
  }, [dates]);

  const cells = useMemo(() => {
    const first = startOfMonth(cursor);
    const offset = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const out: (Date | null)[] = Array.from({ length: offset }, () => null);
    for (let i = 1; i <= daysInMonth; i++) out.push(new Date(cursor.getFullYear(), cursor.getMonth(), i));
    return out;
  }, [cursor]);

  const toggle = (day: Date) => {
    const key = dayKey(day);
    const existing = byDay.get(key);
    if (existing) {
      onChange(dates.filter((d) => dayKey(new Date(d.starts_at)) !== key));
      return;
    }
    const [h, m] = defaultTime.split(":").map((n) => Number(n) || 0);
    const dt = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m, 0, 0);
    onChange(
      [...dates, { starts_at: dt.toISOString(), capacity: defaultCapacity }].sort(
        (a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
      ),
    );
  };

  const patch = (starts_at: string, next: Partial<DraftDate>) =>
    onChange(dates.map((d) => (d.starts_at === starts_at ? { ...d, ...next } : d)));

  const setTime = (d: DraftDate, time: string) => {
    const [h, m] = time.split(":").map((n) => Number(n) || 0);
    const dt = new Date(d.starts_at);
    dt.setHours(h, m, 0, 0);
    onChange(
      dates
        .map((x) => (x.starts_at === d.starts_at ? { ...x, starts_at: dt.toISOString() } : x))
        .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()),
    );
  };

  const monthLabel = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const today = dayKey(new Date());

  return (
    <div className="border border-border rounded-sm p-4 bg-background space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="px-2 py-1 text-sm border border-border rounded-sm"
        >
          ‹
        </button>
        <div className="text-sm uppercase tracking-widest text-primary">{monthLabel}</div>
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="px-2 py-1 text-sm border border-border rounded-sm"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[10px] uppercase tracking-widest text-muted-foreground text-center">
        {DAY_LABELS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />;
          const key = dayKey(day);
          const selected = byDay.has(key);
          const past = day.getTime() < new Date(new Date().toDateString()).getTime();
          return (
            <button
              key={key}
              type="button"
              disabled={past}
              onClick={() => toggle(day)}
              className={
                "aspect-square rounded-sm text-sm flex items-center justify-center border transition-colors " +
                (selected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary text-primary") +
                (past ? " opacity-30 cursor-not-allowed" : "") +
                (key === today && !selected ? " ring-1 ring-accent" : "")
              }
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="uppercase tracking-widest">Default start time</span>
        <input
          type="time"
          value={defaultTime}
          onChange={(e) => onDefaultTimeChange(e.target.value)}
          className="border border-border rounded-sm px-2 py-1 text-sm bg-background text-primary"
        />
        <span>· applied to newly selected days</span>
      </div>

      {dates.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Selected dates ({dates.length})
          </div>
          {dates.map((d) => {
            const dt = new Date(d.starts_at);
            const pad = (n: number) => String(n).padStart(2, "0");
            return (
              <div key={d.starts_at} className="flex items-center gap-3 text-sm">
                <span className="flex-1 text-primary">
                  {dt.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                </span>
                <input
                  type="time"
                  value={`${pad(dt.getHours())}:${pad(dt.getMinutes())}`}
                  onChange={(e) => setTime(d, e.target.value)}
                  className="border border-border rounded-sm px-2 py-1 bg-background"
                />
                <label className="flex items-center gap-1 text-xs text-muted-foreground">
                  seats
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={d.capacity}
                    onChange={(e) => patch(d.starts_at, { capacity: Number(e.target.value) || 1 })}
                    className="w-16 border border-border rounded-sm px-2 py-1 bg-background text-primary"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => onChange(dates.filter((x) => x.starts_at !== d.starts_at))}
                  className="text-xs underline text-red-700"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
