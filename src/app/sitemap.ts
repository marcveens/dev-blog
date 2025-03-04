import { MetadataRoute } from "next";
import { getAllPosts } from "@/api/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = getAllPosts();

  return [
    {
      url: "https://www.marcveens.nl",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...pages.reverse().map((page) => ({
      url: `https://www.marcveens.nl${page.url}`,
      lastModified: page.date.toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
