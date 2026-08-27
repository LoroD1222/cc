import type { MetadataRoute } from "next";
import { articles, countries, organs, projects } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/about/executive-secretary", "/corridor", "/projects", "/news", "/resources", "/tenders", "/portal", "/contact", "/feedback"];
  const detailRoutes = [
    ...articles.map((article) => `/news/${article.slug}`),
    ...countries.map((country) => `/countries/${country.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...organs.map((organ) => `/about/organs/${organ.slug}`),
  ];

  return [...routes, ...detailRoutes].map((route) => ({
    url: `https://centralcorridor-ttfa.org${route}`,
    lastModified: new Date("2026-08-24"),
    changeFrequency: route.startsWith("/news") ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
