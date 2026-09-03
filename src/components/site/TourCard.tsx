import { useI18n } from "@/lib/i18n";
import { formatTourDate, pickDescription, type Tour } from "@/lib/tours";
import { tourImageSrc } from "@/lib/tour-images";

export function TourCard({ tour, onBook }: { tour: Tour; onBook: (t: Tour) => void }) {
  const { t, lang } = useI18n();
  const img = tourImageSrc(tour);
  const soldOut = tour.spots_left <= 0;
  const isClass = tour.category === "class";
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
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-xs uppercase tracking-widest text-accent">
          {formatTourDate(tour.tour_date, lang)}
        </div>
        <h3 className="font-serif text-2xl text-primary mt-2 mb-3">{tour.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {pickDescription(tour, lang)}
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="uppercase tracking-widest text-muted-foreground">{t("agenda.meetingPoint")}</dt>
            <dd className="text-primary mt-0.5">{tour.meeting_point}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-muted-foreground">{t("agenda.duration")}</dt>
            <dd className="text-primary mt-0.5">
              {Math.round(tour.duration_minutes / 60 * 10) / 10} h
            </dd>
          </div>
        </dl>
        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">
              {soldOut ? t("agenda.soldOut") : `${tour.spots_left} ${t("agenda.spotsLeft")}`}
            </div>
          </div>
          <button
            onClick={() => onBook(tour)}
            disabled={soldOut}
            className="rounded-sm bg-primary text-primary-foreground px-5 py-2.5 text-sm hover:bg-[color:var(--milpa-deep)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("agenda.book")}
          </button>
        </div>
      </div>
    </article>
  );
}