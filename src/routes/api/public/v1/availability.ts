import { createFileRoute } from "@tanstack/react-router";
import { fetchTours } from "@/lib/tours";
import { CORS_HEADERS, SITE, json } from "@/lib/agent-booking.server";

export const Route = createFileRoute("/api/public/v1/availability")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS_HEADERS }),
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const date = url.searchParams.get("date"); // YYYY-MM-DD
        const tourFilter = url.searchParams.get("tour"); // id or slug
        const party = Math.max(1, Math.min(10, Number(url.searchParams.get("party_size")) || 1));
        const category = url.searchParams.get("category");
        if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ error: "invalid_date" }, 400);

        const tours = await fetchTours(60, category === "tour" || category === "class" ? category : undefined);
        const experiences = tours
          .filter((t) => !tourFilter || t.id === tourFilter || t.slug === tourFilter)
          .map((t) => {
            const dates = t.dates
              .filter((d) => d.spots_left >= party)
              .filter((d) => !date || d.starts_at.slice(0, 10) === date)
              .map((d) => ({
                tour_date_id: d.id,
                starts_at: d.starts_at,
                spots_left: d.spots_left,
                deep_link: `${SITE}/reserve?tour=${t.slug}&date=${d.id}&guests=${party}`,
              }));
            return {
              tour_id: t.id,
              slug: t.slug,
              title: t.title,
              category: t.category,
              duration_minutes: t.duration_minutes,
              meeting_point: t.meeting_point,
              price_per_person_mxn: t.price_mxn,
              currency: "mxn",
              description: t.description_en,
              bookable_online: dates.length > 0,
              on_request_contact: dates.length === 0 ? "https://wa.me/522221706820" : undefined,
              dates,
            };
          });
        return json({ party_size: party, experiences });
      },
    },
  },
});
