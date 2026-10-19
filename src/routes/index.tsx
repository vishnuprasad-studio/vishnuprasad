import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishnu Prasad — Senior UI/UX Designer" },
      { name: "description", content: "Selected work, experience, and product design practice of Vishnu Prasad, a Senior UI/UX Designer in Kochi, Kerala." },
      { property: "og:title", content: "Vishnu Prasad — Senior UI/UX Designer" },
      { property: "og:description", content: "Selected work and product design practice by Vishnu Prasad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
