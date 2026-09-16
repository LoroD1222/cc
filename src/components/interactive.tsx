"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
import { NewsCard } from "@/components/ui";
import type { Article } from "@/data/site";

type NewsExplorerProps = {
  articles: Article[];
  page: number;
  totalArticles: number;
  totalPages: number;
};

function newsPageHref(page: number) {
  return page === 1 ? "/news" : `/news?page=${page}`;
}

function paginationItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) return Array.from({length: totalPages}, (_, index) => index + 1);
  const first = Math.max(2, currentPage - 1);
  const last = Math.min(totalPages - 1, currentPage + 1);
  const items: Array<number | "ellipsis"> = [1];
  if (first > 2) items.push("ellipsis");
  for (let page = first; page <= last; page += 1) items.push(page);
  if (last < totalPages - 1) items.push("ellipsis");
  items.push(totalPages);
  return items;
}

export function NewsExplorer({ articles, page, totalArticles, totalPages }: NewsExplorerProps) {
  const [category, setCategory] = useState("All News");
  const [query, setQuery] = useState("");
  const categories = ["All News", ...Array.from(new Set(articles.map((article) => article.category)))];
  const filtered = useMemo(() => articles.filter((article) => (category === "All News" || article.category === category) && article.title.toLowerCase().includes(query.toLowerCase())), [articles, category, query]);
  const pageItems = paginationItems(page, totalPages);

  return <div><div className="news-tools"><div className="category-tabs" role="group" aria-label="Filter news by category">{categories.map((item) => <button className={category === item ? "active" : ""} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><label className="search-box"><span className="sr-only">Search news on this page</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this page..." /><Search aria-hidden size={17} /></label></div><div className="card-grid news-results">{filtered.map((article) => <NewsCard article={article} key={article.slug} />)}</div>{filtered.length === 0 && <p className="empty-state">No articles on this page match those filters.</p>}<p className="text-center">Page {page} of {totalPages} · {totalArticles} articles</p>{totalPages > 1 && <nav className="hero-actions" aria-label="News pagination">{page > 1 ? <Link className="button button-small button-dark" href={newsPageHref(page - 1)}><ChevronLeft aria-hidden size={15} /> Previous</Link> : <span className="button button-small button-dark" aria-disabled="true">Previous</span>}{pageItems.map((item, index) => item === "ellipsis" ? <span key={`ellipsis-${index}`} aria-hidden>…</span> : item === page ? <span className="button button-small" aria-current="page" key={item}>{item}</span> : <Link className="button button-small button-dark" href={newsPageHref(item)} key={item}>{item}</Link>)}{page < totalPages ? <Link className="button button-small button-dark" href={newsPageHref(page + 1)}>Next <ChevronRight aria-hidden size={15} /></Link> : <span className="button button-small button-dark" aria-disabled="true">Next</span>}</nav>}</div>;
}

export function RatingInput() {
  const [rating, setRating] = useState(4);
  return <fieldset className="rating-field"><legend>Rate Corridor Service Quality</legend><div>{[1, 2, 3, 4, 5].map((value) => <button type="button" aria-label={`${value} star${value > 1 ? "s" : ""}`} aria-pressed={rating === value} onClick={() => setRating(value)} key={value}><Star aria-hidden fill={value <= rating ? "currentColor" : "none"} /></button>)}</div><input type="hidden" name="rating" value={rating} aria-label="Selected service quality rating" /></fieldset>;
}

export function DemoSubmitButton({ children }: { children: ReactNode }) {
  const [sent, setSent] = useState(false);
  return <div className="demo-submit"><button className="button" type="button" onClick={() => setSent(true)}>{sent ? "Submitted for review" : children}</button>{sent && <p role="status">Thank you. This static demo has recorded the interface state only; no data was sent.</p>}</div>;
}
