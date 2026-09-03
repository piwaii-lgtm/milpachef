import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { formatDateChip, pickDescription, type Tour, type TourDate } from "@/lib/tours";
import { tourImageSrc } from "@/lib/tour-images";

export const WHATSAPP_NUMBER = "5222217068200";

function ExperienceDescription({ text, title }: { text: string; title: string }) {
  const withoutRepeatedTitle = text.trim().startsWith(title)
    ? text.trim().slice(title.length).trim()
    : text.trim();
  const normalized = withoutRepeatedTitle
    .replace(/\*\*(What(?:'|’)s included)\*\*/gi, "\n$1\n")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s*•\s*/g, "\n• ")
    .replace(/\s+\*\s+(?=\S)/g, "\n• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const lines = normalized.split("\n").map((line) => line.trim()).filter(Boolean);
  const firstBullet = lines.findIndex((line) => line.startsWith("• "));
  const prose = firstBullet === -1 ? lines : lines.slice(0, firstBullet);
  const bullets = firstBullet === -1 ? [] : lines.slice(firstBullet);

  return (
    <div className="text-sm text-muted-foreground leading-relaxed flex-1 space-y-3">
      {prose.map((line, index) => {
        const isSectionLabel = index === prose.length - 1 && bullets.length > 0;
        return isSectionLabel ? (
          <h4 key={`${line}-${index}`} className="pt-2 font-medium text-primary">
            {line}
          </h4>
        ) : (
          <p key={`${line}-${index}`}>{line}</p>
        );
      })}
      {bullets.length > 0 && (
        <ul className="space-y-2 pl-4 list-disc marker:text-accent">
          {bullets.map((line, index) => (
            <li key={`${line}-${index}`} className="pl-1">
              {line.slice(2).trim()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TourCard({
  tour,
  onBook,
}: {
  tour: Tour;
  onBook: (t: Tour, date: TourDate) => void;
}) {
  const { t, lang } = useI18n();
  const img = tourImageSrc(tour);
  const isClass = tour.category === "class";
  const dates = tour.dates ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(dates[0]?.id ?? null);
  const selected = dates.find((d) => d.id === selectedId) ?? dates[0] ?? null;
  const soldOut = !!selected && selected.spots_left <= 0;
  const onDemand = dates.length === 0;
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `${t("agenda.whatsappMessage")}${tour.title}`,
  )}`;

  return (
    <article
      className={
        "group flex flex-col overflow-hidden rounded-md border bg-card " +
        (isClass ? "border-[color:var(--corn)]/60" : "border-border")
      }
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={img}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={
            "absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm " +
            (isClass
              ? "bg-[color:var(--corn)] text-primary"
              : "bg-primary/85 text-primary-foreground")
          }
        >
          {isClass ? t("category.class") : t("category.tour")}
        </span>
        {onDemand && (
          <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm bg-background/90 text-primary">
            {t("agenda.onDemand")}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-2xl text-primary mb-3">{tour.title}</h3>
        <ExperienceDescription text={pickDescription(tour, lang)} title={tour.title} />
        <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="uppercase tracking-widest text-muted-foreground">{t("agenda.meetingPoint")}</dt>
            <dd className="text-primary mt-0.5">{tour.meeting_point}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-muted-foreground">{t("agenda.duration")}</dt>
            <dd className="text-primary mt-0.5">
              {Math.round((tour.duration_minutes / 60) * 10) / 10} h
            </dd>
          </div>
        </dl>

        {onDemand ? (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">{t("agenda.onDemandBody")}</p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-sm bg-[color:var(--corn)] text-primary px-5 py-2.5 text-sm hover:opacity-90"
            >
              {t("agenda.whatsapp")}
            </a>
          </div>
        ) : (
          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {t("agenda.pickDate")}
            </div>
            <div className="flex flex-wrap gap-2">
              {dates.map((d) => {
                const active = selected?.id === d.id;
                const full = d.spots_left <= 0;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedId(d.id)}
                    className={
                      "text-xs px-3 py-1.5 rounded-sm border transition-colors " +
                      (active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-primary hover:border-primary") +
                      (full ? " line-through opacity-60" : "")
                    }
                  >
                    {formatDateChip(d.starts_at, lang)}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground">
                {selected
                  ? soldOut
                    ? t("agenda.soldOut")
                    : `${selected.spots_left} ${t("agenda.spotsLeft")}`
                  : null}
              </div>
              <button
                onClick={() => selected && onBook(tour, selected)}
                disabled={!selected || soldOut}
                className="rounded-sm bg-primary text-primary-foreground px-5 py-2.5 text-sm hover:bg-[color:var(--milpa-deep)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("agenda.book")}
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
