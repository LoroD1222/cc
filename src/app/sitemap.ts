import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/corridor", "/projects", "/news", "/resources", "/tenders", "/portal", "/contact", "/feedback"];
  return routes.map((route) => ({ url: `https://centralcorridor-ttfa.org${route}`, lastModified: new Date("2026-08-24"), changeFrequency: route === "/news" ? "weekly" : "monthly", priority: route === "" ? 1 : 0.8 }));
}
