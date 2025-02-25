import { MetadataRoute } from "next";
import { parseISO } from "date-fns";
import { getAllPosts } from "@/api/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = getAllPosts();

  return [
    {
      url: "https://www.marcveens.nl",
      lastModified: new Date(),
      // changeFrequency: "daily",
      // priority: 1
    },
    ...pages.map((page) => ({
      url: `https://www.marcveens.nl${page.url}`,
      lastModified: parseISO(page.date).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  ];
}
