import { createFileRoute } from "@tanstack/react-router";

const spec = {
  openapi: "3.1.0",
  info: {
    title: "Milpa Chef Booking API",
    version: "1.0.0",
    description:
      "Book Milpa Chef culinary experiences (food tours and cooking classes in Cholula, Puebla, Mexico) on behalf of a user. 1) Call getAvailability to find a tour_date_id. 2) Call createBooking with the guest details. 3) Open the returned checkout_url and pay (Stripe). The booking is confirmed and a digital ticket emailed after payment.",
  },
  servers: [{ url: "https://milpachef.mx" }],
  paths: {
    "/api/public/v1/availability": {
      get: {
        operationId: "getAvailability",
        summary: "List experiences with bookable dates, prices (MXN) and spots left",
        parameters: [
          { name: "date", in: "query", schema: { type: "string", format: "date" }, description: "Filter to one day (YYYY-MM-DD)" },
          { name: "party_size", in: "query", schema: { type: "integer", minimum: 1, maximum: 10 }, description: "Only dates with at least this many spots" },
          { name: "tour", in: "query", schema: { type: "string" }, description: "Experience id or slug" },
          { name: "category", in: "query", schema: { type: "string", enum: ["tour", "class"] } },
        ],
        responses: { "200": { description: "Experiences and their available dates" } },
      },
    },
    "/api/public/v1/book": {
      post: {
        operationId: "createBooking",
        summary: "Hold spots and get a Stripe checkout URL to pay",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["tour_date_id", "party_size", "guest_name", "guest_email"],
                properties: {
                  tour_date_id: { type: "string", format: "uuid" },
                  party_size: { type: "integer", minimum: 1, maximum: 10 },
                  guest_name: { type: "string" },
                  guest_email: { type: "string", format: "email", description: "Ticket is emailed here" },
                  guest_language: { type: "string", enum: ["en", "es", "fr"], description: "Preferred guide language" },
                  notes: { type: "string", description: "Dietary needs etc." },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Pending booking with checkout_url and expires_at" },
          "400": { description: "Invalid input" },
          "409": { description: "Not enough spots or date passed" },
        },
      },
    },
  },
};

export const Route = createFileRoute("/openapi.json")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(spec, { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" } }),
    },
  },
});
