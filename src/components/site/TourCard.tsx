import { useI18n } from "@/lib/i18n";
import { formatTourDate, pickDescription, type Tour } from "@/lib/tours";
import { tourImages } from "@/lib/tour-images";

export function TourCard({ tour, onBook }: { tour: Tour; onBook: (t: Tour) => void }) {
  const { t, lang } = useI18n();
  const img = tourImages[tour.image_key] ?? tourImages.hero;
  const soldOut = tour.spots_left <= 0;
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-border bg-card">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={img}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
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
            <dd className="text-primary mt-0.5">{t("agenda.durationValue")}</dd>
          </div>
        </dl>
        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="font-serif text-2xl text-primary leading-none">MXN ${tour.price_mxn}</div>
            <div className="text-xs text-muted-foreground mt-1">
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