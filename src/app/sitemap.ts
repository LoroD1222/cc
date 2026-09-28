import type { MetadataRoute } from "next";
import { articles, countries, organs, projects } from "@/data/site";
import { getContentPages } from "@/sanity/content-pages";

const infrastructureSlugs = new Set(["maritime-port-of-dar-es-salaam", "road-network", "railway-network", "inland-water-ways-network"]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programmes, infrastructure] = await Promise.all([getContentPages("service"), getContentPages("corridor")]);
  const routes = ["", "/about", "/about/executive-secretary", "/corridor", "/projects", "/news", "/resources", "/tenders", "/programmes", "/infrastructure", "/opportunities", "/portal", "/contact", "/feedback"];
  const detailRoutes = [
    ...articles.map((article) => `/news/${article.slug}`),
    ...countries.map((country) => `/countries/${country.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...organs.map((organ) => `/about/organs/${organ.slug}`),
    ...programmes.map((programme) => `/programmes/${programme.slug}`),
    ...infrastructure.filter((item) => infrastructureSlugs.has(item.slug)).map((item) => `/infrastructure/${item.slug}`),
    "/opportunities/consultancy",
    "/opportunities/vacancies",
  ];

  return [...routes, ...detailRoutes].map((route) => ({
    url: `https://centralcorridor-ttfa.org${route}`,
    lastModified: new Date("2026-08-24"),
    changeFrequency: route.startsWith("/news") ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
