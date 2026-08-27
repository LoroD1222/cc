import type { MetadataRoute } from "next";
import { articles } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/corridor", "/projects", "/news", "/resources", "/tenders", "/portal", "/contact", "/feedback"];
  const newsRoutes = articles.map((article) => `/news/${article.slug}`);

  return [...routes, ...newsRoutes].map((route) => ({
    url: `https://centralcorridor-ttfa.org${route}`,
    lastModified: new Date("2026-08-24"),
    changeFrequency: route.startsWith("/news") ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
