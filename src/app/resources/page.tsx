import { Search } from "lucide-react";
import { PageHero, PerformancePanel, ResourceCard } from "@/components/ui";
import { resources } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Resources & Observatory", description: "Access Central Corridor reports, protocols, Transport Observatory data and corridor performance dashboards.", path: "/resources", image: "/images/resources-hero.png" });

export default function ResourcesPage() {
  const chart = [["Q1-25", "3.2M", 46], ["Q2-25", "3.8M", 61], ["Q3-25", "4.1M", 72], ["Q4-25", "4.5M", 84], ["Q1-26 (est)", "4.9M", 96]];
  return <>
    <PageHero eyebrow="Resource Directory" title="Observatory & Knowledge Hub" description="Access reports, protocols, Transport Observatory data, and corridor performance dashboards tracked by CCTTFA since 2012." image="/images/resources-hero.png" />
    <section className="section"><div className="site-container"><div className="resource-filters"><label><span className="sr-only">Search documents</span><input placeholder="Search documents..." /><Search aria-hidden size={17} /></label><select aria-label="Resource type"><option>Type: Reports</option><option>Protocols</option></select><select aria-label="Year"><option>Year: 2025</option><option>2026</option></select><select aria-label="Country"><option>Country: Tanzania</option><option>All Countries</option></select></div><div className="resource-grid">{resources.map((item) => <ResourceCard item={item} key={item.title} />)}</div></div></section>
    <section className="section"><div className="site-container"><PerformancePanel four /><div className="cargo-chart"><h3>Cargo Volume Growth (In Millions of Tons per Quarter)</h3><div className="bars">{chart.map(([label, value, height]) => <div className="bar-column" key={label}><strong>{value}</strong><i style={{ height: `${height}%` }} /><span>{label}</span></div>)}</div></div></div></section>
  </>;
}
