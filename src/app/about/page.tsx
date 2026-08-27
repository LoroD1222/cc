import Image from "next/image";
import { Download, FileText } from "lucide-react";
import { PageHero, SectionHeading, SidebarNav } from "@/components/ui";
import { countries, organs } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "About CCTTFA", description: "Learn about CCTTFA's history, mandate, governance organs, seven partner states and Permanent Secretariat.", path: "/about", image: "/images/about-hero.png" });

export default function AboutPage() {
  const navigation = [
    { label: "Our History", href: "#our-history" },
    { label: "The Mandate", href: "#our-history" },
    { label: "Governance Organs", href: "#governance-organs" },
    { label: "Partner States", href: "#partner-states" },
    { label: "Secretariat Leadership", href: "#secretariat-leadership" },
    { label: "Strategic Protocols", href: "#strategic-protocols" },
  ];
  return <>
    <PageHero eyebrow="Who we are" title="About CCTTFA" description="Connecting Seven Sovereign Nations to Global Maritime Pathways" image="/images/about-hero.png" position="center 38%" />
    <section className="section"><div className="site-container sidebar-layout"><SidebarNav items={navigation} /><div className="content-stack">
      <section id="our-history"><SectionHeading title="History & Mandate" description="The Central Corridor Transit Transport Facilitation Agreement (CCTTFA) was established on 2nd September 2006. Initially signed by five founding states, it is built on a shared mission to eliminate non-tariff trade barriers, upgrade critical rail, road, and port networks, and establish an uninterrupted flow of commodities." /><div className="timeline-cards"><article className="timeline-card"><strong>2006</strong><h3>The Founding Treaty</h3><p>Signed by five states to secure Dar es Salaam Port transit pathways.</p></article><article className="timeline-card"><strong>2010</strong><h3>Permanent Secretariat</h3><p>Operationalized in Dar es Salaam, coordinating meetings and facilitation.</p></article><article className="timeline-card"><strong>2023</strong><h3>Historic Accession</h3><p>Malawi acceded and Zambia entered the final accession process.</p></article></div></section>
      <section id="governance-organs"><SectionHeading title="Organs of the Agreement" description="CCTTFA operates under a robust, legally-binding intergovernmental framework composed of four distinct policy-making organs." /><div className="number-list">{organs.map((organ) => <article key={organ.title}><div><h3>{organ.title}</h3><p>{organ.text}</p></div></article>)}</div></section>
      <section id="partner-states"><SectionHeading title="Partner States" /><div className="country-card-grid">{countries.map((country) => <article className="country-card" key={country.name}><h3><span><Image src={country.flag} alt="" fill sizes="2rem" /></span>{country.name}</h3><p>{country.description}</p></article>)}</div></section>
      <section id="secretariat-leadership"><SectionHeading title="Secretariat Leadership" /><div className="leadership-grid"><article className="leader-card"><div><Image src="/images/leader-flory.png" alt="Adv. Okandju Okonge Flory" fill sizes="20rem" /></div><h3>Adv. OKANDJU OKONGE Flory</h3><strong>Executive Secretary</strong><p>Leading treaty execution, international partnerships, and high-level regional state liaison.</p></article>{["Director — Name pending", "Director — Name pending"].map((title) => <article className="leader-card" key={title}><div><Image src="/images/avatar-placeholder.svg" alt="" fill sizes="20rem" /></div><h3>Awaiting Client Input</h3><strong>{title}</strong><p>Position to be confirmed by CCTTFA. Contact details not yet cleared for publication.</p></article>)}</div></section>
      <section id="strategic-protocols"><SectionHeading title="Strategic Documents" /><div className="document-list">{["CCTTFA Agreement (Amended December 2023)", "CCTTFA Protocols", "Awaiting client input — additional documents TBC"].map((title) => <article key={title}><FileText aria-hidden size={18} /><span>{title}</span><button type="button"><Download aria-hidden size={15} /> Download</button></article>)}</div></section>
    </div></div></section>
  </>;
}
