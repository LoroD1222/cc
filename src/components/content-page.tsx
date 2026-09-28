import Link from "next/link";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {NewsArticleBody} from "@/sanity/portable-text";
import type {CmsContentPage} from "@/sanity/content-pages";

export function ContentPageCard({page, href, eyebrow}: {page: Pick<CmsContentPage, "title" | "summary">; href: string; eyebrow: string}) {
  return <article className="content-page-card"><p className="eyebrow">{eyebrow}</p><h2>{page.title}</h2><p>{page.summary}</p><Link className="text-link" href={href}>Explore {page.title} <ArrowRight aria-hidden size={16} /></Link></article>;
}

export function ContentPageDetail({page, eyebrow, backHref, backLabel}: {page: CmsContentPage; eyebrow: string; backHref: string; backLabel: string}) {
  return <><header className="detail-hero"><div className="site-container"><Link className="detail-back" href={backHref}><ArrowLeft aria-hidden size={16} /> {backLabel}</Link><p className="eyebrow">{eyebrow}</p><h1>{page.title}</h1><p>{page.summary}</p></div></header><section className="section"><div className="site-container"><article className="content-page-copy">{page.body.length ? <NewsArticleBody value={page.body} /> : <p className="content-page-empty">This information is being prepared for publication.</p>}</article></div></section></>;
}
