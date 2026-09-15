import {cache} from "react";
import type {Article} from "@/data/site";
import {client} from "@/sanity/client";
import {allNewsArticlesQuery, latestNewsArticlesQuery, newsArticleBySlugQuery} from "@/sanity/queries";

const fallbackImage = "/images/news-hero.png";
const fetchOptions = {next: {revalidate: 60, tags: ["article"]}};

type SanityNewsArticle = {
  _id: string;
  title: string;
  slug: string;
  topic: string;
  publishedAt: string;
  excerpt: string;
  image?: string | null;
  imageAlt?: string | null;
  body?: unknown[];
};

export type CmsNewsArticle = Article & {
  imageAlt: string;
  body: unknown[];
};

function topicLabel(topic: string) {
  const labels: Record<string, string> = {
    meeting: "Meetings",
    infrastructure: "Infrastructure",
    capacityBuilding: "Capacity Building",
    accession: "Accession",
    news: "News",
  };
  return labels[topic] || "News";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(value));
}

function toArticleCard(article: SanityNewsArticle): Article {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image || fallbackImage,
    category: topicLabel(article.topic),
    date: formatDate(article.publishedAt),
  };
}

export const getLatestNewsArticles = cache(async (): Promise<Article[]> => {
  const articles = await client.fetch<SanityNewsArticle[]>(latestNewsArticlesQuery, {}, fetchOptions);
  return articles.map(toArticleCard);
});

export const getNewsArticles = cache(async (): Promise<Article[]> => {
  const articles = await client.fetch<SanityNewsArticle[]>(allNewsArticlesQuery, {}, fetchOptions);
  return articles.map(toArticleCard);
});

export const getNewsArticle = cache(async (slug: string): Promise<CmsNewsArticle | null> => {
  const article = await client.fetch<SanityNewsArticle | null>(newsArticleBySlugQuery, {slug}, fetchOptions);
  if (!article) return null;

  return {
    ...toArticleCard(article),
    imageAlt: article.imageAlt || article.title,
    body: article.body || [],
  };
});
