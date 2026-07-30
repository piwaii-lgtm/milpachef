import { createFileRoute } from "@tanstack/react-router";
import { AreaPage } from "@/components/site/AreaPage";
import { classMarketImage } from "@/lib/tour-images";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — food heritage & agrifood systems | MilpaChef" },
      {
        name: "description",
        content:
          "MilpaChef research on sustainable gastronomy and Mexican agrifood systems: publications, articles, studies and academic collaborations.",
      },
      { property: "og:title", content: "MilpaChef Research — knowledge about Mexican food systems" },
      {
        property: "og:description",
        content: "Publications, studies and academic projects on Mexican food heritage.",
      },
      { property: "og:url", content: "/research" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: () => (
    <AreaPage
      slug="research"
      image={classMarketImage}
      imageAlt="Native ingredients documented at a Puebla market"
    />
  ),
});
