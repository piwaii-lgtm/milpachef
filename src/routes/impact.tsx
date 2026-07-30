import { createFileRoute } from "@tanstack/react-router";
import { AreaPage } from "@/components/site/AreaPage";
import groupAsset from "@/assets/chef-group-table-aesthetic.jpg.asset.json";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — producers, networks & conservation | MilpaChef" },
      {
        name: "description",
        content:
          "MilpaChef impact: allied producers, networks and associations, social projects and conservation of Mexican gastronomic heritage in Puebla.",
      },
      { property: "og:title", content: "MilpaChef Impact — strengthening local food systems" },
      {
        property: "og:description",
        content: "Allied producers, networks, conservation and social impact in Puebla, Mexico.",
      },
      { property: "og:url", content: "/impact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: groupAsset.url },
      { name: "twitter:image", content: groupAsset.url },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: () => (
    <AreaPage
      slug="impact"
      image={groupAsset.url}
      imageAlt="Alfonso Rocha sharing a long table with guests and producers in Cholula"
    />
  ),
});
