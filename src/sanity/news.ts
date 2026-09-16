import {cache} from "react";
import type {Article} from "@/data/site";
import {client} from "@/sanity/client";
import {latestNewsArticlesQuery, newsArticleBySlugQuery, newsArticlesCountQuery, newsArticlesPageQuery} from "@/sanity/queries";

const fallbackImage = "/images/news-hero.png";
const fetchOptions = {next: {revalidate: 60, tags: ["article"]}};
export const NEWS_PAGE_SIZE = 25;

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

export type NewsPage = {
  articles: Article[];
  page: number;
  totalArticles: number;
  totalPages: number;
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

export const getNewsPage = cache(async (requestedPage: number): Promise<NewsPage> => {
  const totalArticles = await client.fetch<number>(newsArticlesCountQuery, {}, fetchOptions);
  const totalPages = Math.max(1, Math.ceil(totalArticles / NEWS_PAGE_SIZE));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const start = (page - 1) * NEWS_PAGE_SIZE;
  const end = start + NEWS_PAGE_SIZE;
  const articles = await client.fetch<SanityNewsArticle[]>(newsArticlesPageQuery(start, end), {}, fetchOptions);

  return {articles: articles.map(toArticleCard), page, totalArticles, totalPages};
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
