"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Search, Star } from "lucide-react";
import { NewsCard } from "@/components/ui";
import type { Article } from "@/data/site";

export function NewsExplorer({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState("All News");
  const [query, setQuery] = useState("");
  const categories = ["All News", "Meetings", "Infrastructure", "Capacity Building", "Accession"];
  const filtered = useMemo(() => articles.filter((article) => (category === "All News" || article.category === category) && article.title.toLowerCase().includes(query.toLowerCase())), [articles, category, query]);
  return <div><div className="news-tools"><div className="category-tabs" role="group" aria-label="Filter news by category">{categories.map((item) => <button className={category === item ? "active" : ""} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><label className="search-box"><span className="sr-only">Search news</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search news..." /><Search aria-hidden size={17} /></label></div><div className="card-grid news-results">{filtered.map((article) => <NewsCard article={article} key={article.title} />)}</div>{filtered.length === 0 && <p className="empty-state">No articles match those filters.</p>}</div>;
}

export function RatingInput() {
  const [rating, setRating] = useState(4);
  return <fieldset className="rating-field"><legend>Rate Corridor Service Quality</legend><div>{[1, 2, 3, 4, 5].map((value) => <button type="button" aria-label={`${value} star${value > 1 ? "s" : ""}`} aria-pressed={rating === value} onClick={() => setRating(value)} key={value}><Star aria-hidden fill={value <= rating ? "currentColor" : "none"} /></button>)}</div><input type="hidden" name="rating" value={rating} aria-label="Selected service quality rating" /></fieldset>;
}

export function DemoSubmitButton({ children }: { children: ReactNode }) {
  const [sent, setSent] = useState(false);
  return <div className="demo-submit"><button className="button" type="button" onClick={() => setSent(true)}>{sent ? "Submitted for review" : children}</button>{sent && <p role="status">Thank you. This static demo has recorded the interface state only; no data was sent.</p>}</div>;
}
