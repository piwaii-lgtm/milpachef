import { createFileRoute } from "@tanstack/react-router";
import { AreaPage } from "@/components/site/AreaPage";
import { marketImage } from "@/lib/tour-images";

export const Route = createFileRoute("/consulting")({
  head: () => ({
    meta: [
      { title: "Consulting — sustainable gastronomy projects | MilpaChef" },
      {
        name: "description",
        content:
          "MilpaChef consulting for restaurants, hotels and tourism destinations: sustainable menus, supplier development, territorial identity and traceability, led by chef-anthropologist Alfonso Rocha.",
      },
      { property: "og:title", content: "MilpaChef Consulting — food projects with roots" },
      {
        property: "og:description",
        content: "Sustainable menus, supplier development and experience design in Puebla and beyond.",
      },
      { property: "og:url", content: "/consulting" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/consulting" }],
  }),
  component: () => (
    <AreaPage
      slug="consulting"
      image={marketImage}
      imageAlt="Alfonso Rocha sourcing ingredients with producers at a Puebla market"
    />
  ),
});
