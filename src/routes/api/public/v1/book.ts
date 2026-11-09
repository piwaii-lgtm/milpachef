import { createFileRoute } from "@tanstack/react-router";
import { CORS_HEADERS, bookSchema, createAgentBooking, json } from "@/lib/agent-booking.server";

export const Route = createFileRoute("/api/public/v1/book")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS_HEADERS }),
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "invalid_json" }, 400);
        }
        const parsed = bookSchema.safeParse(body);
        if (!parsed.success) return json({ error: "invalid_input", issues: parsed.error.flatten().fieldErrors }, 400);
        const result = await createAgentBooking(parsed.data);
        return json(result.body, result.status);
      },
    },
  },
});
