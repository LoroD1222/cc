import { CalendarDays } from "lucide-react";
import { NewsExplorer } from "@/components/interactive";
import { LocationLine, PageHero, SectionHeading } from "@/components/ui";
import { articles } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "News & Events", description: "Regional transit news, corridor insights, upcoming workshops and operational bulletins from CCTTFA.", path: "/news", image: "/images/news-hero.png" });

const events = [
  { day: "12", month: "NOV", title: "Corridor Logistics Infrastructure Financing Roundtable", location: "Kigali, Rwanda", text: "Private developers, development banks and corridor secretariats meet to secure trade-terminal expansions." },
  { day: "24", month: "NOV", title: "Regional SGR Railway Interoperability Technical Workshop", location: "Dar es Salaam, Tanzania", text: "Aligning signalling protocols and locomotive load metrics across the East African network." },
  { day: "05", month: "DEC", title: "Lake Victoria Water Safety and Inland Barges Summit", location: "Mwanza, Tanzania", text: "Reviewing navigation buoy masterplans and emergency satellite communication coverage." },
];

export default function NewsPage() {
  return <>
    <PageHero eyebrow="Communication Hub" title="Regional Transit News & Insights" description="Stay informed with real-time updates, treaty amendments, high-level visits, and operational bulletins across the Central Corridor logistics grid." image="/images/news-hero.png" position="center 36%" />
    <section className="section"><div className="site-container news-layout"><div><NewsExplorer articles={articles} /></div><aside className="news-aside"><section><h2>Popular Highlights</h2>{["Dar es Salaam Port Expansion Masterplan (2026–2035)", "Burundi OSBP Border Post Delay Index Reduced", "Single Window Customs Integration Updates"].map((title) => <article key={title}><span>Highlight</span><h3>{title}</h3></article>)}</section><section className="bulletin-card"><h2>Corridor Bulletin</h2><p>Subscribe to receive monthly regional logistics observatory updates and active tender announcements.</p><label className="field"><span className="sr-only">Email</span><input type="email" placeholder="your.email@domain.com" /></label><button className="button" type="button">Subscribe</button></section></aside></div></section>
    <section className="section"><div className="site-container"><div className="events-panel"><SectionHeading title="Upcoming Events & Workshops" />{events.map((event) => <article className="event-row" key={event.title}><time><strong>{event.day}</strong><span>{event.month}</span></time><div><h3>{event.title}</h3><LocationLine>{event.location}</LocationLine><span className="event-kind">• Public Workshop</span><p>{event.text}</p></div><button className="button" type="button"><CalendarDays aria-hidden size={16} /> Register</button></article>)}</div></div></section>
  </>;
}
