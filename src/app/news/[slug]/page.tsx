import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { articles } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

type NewsPostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) return {};
  return createPageMetadata({ title: article.title, description: article.excerpt, path: `/news/${article.slug}`, image: article.image });
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
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
        <div className="news-post-image"><Image src={article.image} alt="" fill preload sizes="(max-width: 900px) 100vw, 68rem" /></div>
        <div className="news-post-copy">
          <p className="news-post-lead">The Central Corridor continues to bring partner states, institutions and logistics stakeholders together around practical improvements to regional trade and transport.</p>
          <p>{article.excerpt} This update reflects the ongoing work of CCTTFA and its partners to build a more efficient, connected and resilient corridor.</p>
          <h2>Building momentum across the corridor</h2>
          <p>Through coordinated planning and regular technical engagement, the Permanent Secretariat is advancing shared priorities that support trade facilitation, infrastructure development and stronger regional links.</p>
          <p>Further details and related updates will be published through the News & Insights hub as the work progresses.</p>
          <Link className="text-link" href="/news">Explore all news <ArrowLeft aria-hidden size={16} /></Link>
        </div>
      </div>
    </article>
  );
}
