import Image from "next/image";
import Link from "next/link";
import { PerformancePanel, RouteIcon, SectionHeading, SidebarNav } from "@/components/ui";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "The Corridor", description: "Explore the Central Corridor's integrated rail, road, lake and maritime route network and current performance.", path: "/corridor", image: "/images/corridor-map-home.png" });

export default function CorridorPage() {
  const navigation = [
    { label: "Interactive Network", href: "#transit-corridors" },
    { label: "Multi-modal Paths", href: "#multi-modal-paths" },
    { label: "Obs. Performance Dashboard", href: "#observatory-performance" },
    { label: "Infrastructure Gallery", href: "#infrastructure-assets" },
  ];
  const systems = [
    { type: "rail" as const, title: "Railway (SGR / MGR)", text: "Connecting Dar es Salaam Port to inland terminals via standard and metre gauge rail, serving as the backbone for bulk freight." },
    { type: "road" as const, title: "Road Networks", text: "Tarred, high-carrying regional highways passing through Mutukula, Rusumo, and Kabanga border posts." },
    { type: "lake" as const, title: "Lake Barges & Ports", text: "Deep-water operations on Lake Tanganyika and Lake Victoria shortcut thousands of road kilometres." },
    { type: "port" as const, title: "Maritime Ports", text: "Dar es Salaam anchor port features container handling terminals and bulk grain storage berths." },
  ];
  return <>
    <section className="corridor-hero"><div className="site-container corridor-hero-grid"><div><p className="eyebrow">Logistics Network</p><h1>Multimodal Route Network</h1><p>Connecting East and Central Africa&apos;s landlocked hubs to global oceans through Dar es Salaam Port via integrated rail, road, and inland lake channels.</p><Link className="button" href="#transit-corridors">Explore Routes Map</Link></div><div className="corridor-map-card"><Image src="/images/corridor-map-home.png" alt="Central Corridor route network map" fill preload sizes="50vw" /></div></div></section>
    <section className="section"><div className="site-container sidebar-layout"><SidebarNav items={navigation} /><div className="content-stack">
      <section id="transit-corridors"><SectionHeading title="The Central Corridor Advantage" /><p className="lead-copy">The Central Corridor is widely recognized as the most cost-competitive, structurally integrated trade pathway in East and Central Africa. It uses specialized lake port terminals and maintains more than 95% of connecting roads in good condition.</p></section>
      <section id="multi-modal-paths"><SectionHeading title="Multi-modal Systems" /><div className="route-list">{systems.map((system) => <article className="route-row" key={system.title}><RouteIcon type={system.type} /><div><h3>{system.title}</h3><p>{system.text}</p></div></article>)}</div></section>
      <section id="observatory-performance"><PerformancePanel /></section>
      <section id="infrastructure-assets"><SectionHeading title="Infrastructure Gallery" /><div className="gallery-grid">{[["/images/corridor-gallery-port.png", "Dar Port Berth Expansion"], ["/images/corridor-gallery-rail.png", "Isaka SGR Railway Laying"], ["/images/corridor-gallery-border.png", "Rusumo One Stop Border Post"]].map(([src, title]) => <figure key={src}><div><Image src={src} alt={title} fill sizes="33vw" /></div><figcaption>{title}</figcaption></figure>)}</div></section>
    </div></div></section>
  </>;
}
