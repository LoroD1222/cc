import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { NewsArticleBody } from "@/sanity/portable-text";
import { getNewsArticle } from "@/sanity/news";

export const revalidate = 60;

type NewsPostPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) return {};
  return createPageMetadata({ title: article.title, description: article.excerpt, path: `/news/${article.slug}`, image: article.image });
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();

  return (
    <article className="news-post">
      <header className="news-post-header">
        <div className="site-container news-post-heading">
          <Link className="news-post-back" href="/news"><ArrowLeft aria-hidden size={17} /> Back to News & Insights</Link>
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <time><CalendarDays aria-hidden size={17} /> {article.date}</time>
        </div>
      </header>
      <div className="site-container news-post-body">
        <div className="news-post-image"><Image src={article.image} alt={article.imageAlt} fill preload sizes="(max-width: 900px) 100vw, 68rem" /></div>
        <div className="news-post-copy">
          <NewsArticleBody value={article.body} />
          {!article.body.length ? <p>{article.excerpt}</p> : null}
          <Link className="text-link" href="/news">Explore all news <ArrowLeft aria-hidden size={16} /></Link>
        </div>
      </div>
    </article>
  );
}
