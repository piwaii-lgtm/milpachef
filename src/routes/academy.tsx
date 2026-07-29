import { createFileRoute } from "@tanstack/react-router";
import { AreaPage } from "@/components/site/AreaPage";
import { classImage } from "@/lib/tour-images";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Academy — courses & workshops in Mexican food culture | MilpaChef" },
      {
        name: "description",
        content:
          "MilpaChef Academy: courses, diploma programmes, workshops and lectures on sustainable gastronomy, milpa ingredients and Mexican food heritage for the public, universities and professionals.",
      },
      { property: "og:title", content: "MilpaChef Academy — learn before you consume" },
      {
        property: "og:description",
        content: "Courses, workshops and lectures on Mexican food heritage and sustainable gastronomy.",
      },
      { property: "og:url", content: "/academy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/academy" }],
  }),
  component: () => (
    <AreaPage
      slug="academy"
      image={classImage}
      imageAlt="Hands-on cooking workshop with heirloom corn masa in Cholula"
    />
  ),
});
