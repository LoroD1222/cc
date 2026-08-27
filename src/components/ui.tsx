import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Anchor, ArrowRight, Download, FileText, MapPin, Ship, TrainFront, Truck } from "lucide-react";
import type { Article, Project } from "@/data/site";

export function PageHero({ eyebrow, title, description, image, position = "center" }: { eyebrow: string; title: string; description: string; image: string; position?: string }) {
  return (
    <section className="page-hero">
      <Image src={image} alt="" fill preload sizes="100vw" style={{ objectPosition: position }} />
      <div className="hero-overlay" />
      <div className="site-container page-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return <div className={`section-heading ${align === "center" ? "text-center" : ""}`}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export function SidebarNav({ label = "Navigation", items }: { label?: string; items: { label: string; href: string }[] }) {
  return <aside className="sidebar-nav" aria-label={`${label} in-page navigation`}><p>{label}</p><nav>{items.map((item, index) => <a className={index === 0 ? "active" : ""} href={item.href} key={item.href}>{item.label}</a>)}</nav></aside>;
}

export function NewsCard({ article }: { article: Article }) {
  return <article className="news-card"><div className="card-image"><Image src={article.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="card-body"><div className="card-meta"><span className="badge badge-dark">{article.category}</span><time>{article.date}</time></div><h3>{article.title}</h3><p>{article.excerpt}</p><Link className="text-link" href="/news">Read article <ArrowRight aria-hidden size={16} /></Link></div></article>;
}

const icons = { Railway: TrainFront, Road: Truck, Port: Anchor };

export function ProjectCard({ project }: { project: Project }) {
  const Icon = icons[project.type];
  return <article className="project-card"><div className="card-image"><Image src={project.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" /><span className={`status status-${project.status.toLowerCase().replaceAll(" ", "-")}`}>{project.status}</span><span className="project-icon"><Icon aria-hidden size={22} /></span></div><div className="card-body"><h3>{project.title}</h3><p>{project.description}</p><dl className="project-meta"><div><dt>Countries</dt><dd>{project.countries}</dd></div><div><dt>Est. cost</dt><dd>{project.cost}</dd></div></dl></div></article>;
}

export function PerformancePanel({ four = false }: { four?: boolean }) {
  const metrics = [
    ["Dar Port Container Dwell", "4.2 Days", "↓ 12% improvement vs 2025"],
    ["Mutukula Border Delay", "1.8 Hours", "↓ 25 min clearance reduction"],
    ["Corridor Cargo Vol. (YTD)", "14.2M Tons", "↑ 8.5% YoY growth"],
    ["Transit Train Avg. Speed", "62 km/h", "Optimal rail scheduling active"],
  ];
  return <section className="performance-panel"><p className="eyebrow">REAL-TIME REGIONAL PERFORMANCE</p><h2>Transport Observatory Dashboard</h2><p>Live transit statistics track cargo volume, transit time, efficiency and productivity indicators across the Central Corridor.</p><div className={`metric-grid ${four ? "four" : ""}`}>{metrics.slice(0, four ? 4 : 3).map(([label, value, trend]) => <article className="metric-card" key={label}><p>{label}</p><strong>{value}</strong><small>{trend}</small></article>)}</div></section>;
}

export function Field({ label, name, placeholder, type = "text", required = false }: { label: string; name: string; placeholder?: string; type?: string; required?: boolean }) {
  return <label className="field"><span>{label}</span><input name={name} type={type} placeholder={placeholder} required={required} /></label>;
}

export function TextAreaField({ label, name, placeholder, required = false }: { label: string; name: string; placeholder?: string; required?: boolean }) {
  return <label className="field"><span>{label}</span><textarea name={name} placeholder={placeholder} required={required} /></label>;
}

export function ResourceCard({ item }: { item: { type: string; year: string; title: string; size: string } }) {
  return <article className="resource-card"><div className="resource-meta"><span>{item.type}</span><time>{item.year}</time></div><h3>{item.title}</h3><p><FileText aria-hidden size={17} /> PDF, {item.size}</p><button className="button button-dark" type="button"><Download aria-hidden size={16} /> Download PDF</button></article>;
}

export function RouteIcon({ type }: { type: "rail" | "road" | "lake" | "port" }) {
  const Icon = type === "rail" ? TrainFront : type === "road" ? Truck : type === "lake" ? Ship : Anchor;
  return <span className="route-icon"><Icon aria-hidden size={23} /></span>;
}

export function LocationLine({ children }: { children: ReactNode }) {
  return <span className="location-line"><MapPin aria-hidden size={15} />{children}</span>;
}
