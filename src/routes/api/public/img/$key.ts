import { createFileRoute } from "@tanstack/react-router";

/**
 * Public, cacheable proxy for images uploaded by the admin into the private
 * `site-images` storage bucket. Only serves that bucket, read-only.
 */
export const Route = createFileRoute("/api/public/img/$key")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const key = String(params.key ?? "");
        if (!/^[a-zA-Z0-9._-]{1,120}$/.test(key)) {
          return new Response("Not found", { status: 404 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("site-images").download(key);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(await data.arrayBuffer(), {
          headers: {
            "Content-Type": data.type || "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
