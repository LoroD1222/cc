import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, MapPinned } from "lucide-react";
import { notFound } from "next/navigation";
import { countries } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

const countryDetails: Record<string, { routes: string[]; infrastructure: string[]; borders: string[]; projects: string[]; cargo: string; institution: string }> = {
  burundi: { routes: ["Bujumbura – Rumonge – Dar es Salaam", "Lake Tanganyika maritime link"], infrastructure: ["Port of Bujumbura", "Rumonge–Gitaza road corridor"], borders: ["Kobero / Kabanga"], projects: ["Rumonge – Gitaza / Kabingo Road"], cargo: "Lake-linked trade and regional imports serving Burundi and eastern DRC.", institution: "Burundi national transport and trade facilitation focal institution *" },
  drc: { routes: ["Kalundu – Uvira – Bukavu – Dar es Salaam", "Lake Tanganyika access route"], infrastructure: ["Kalundu Port", "Kalemie Port", "Uvira–Bukavu road network"], borders: ["Kavimvira / Gatumba"], projects: ["Kalundu Port – Uvira – Kamanyola – Bukavu Road", "Kalemie Port Rehabilitation"], cargo: "Minerals, agricultural products and strategic imports through lake and road networks.", institution: "DRC national transport and trade facilitation focal institution *" },
  malawi: { routes: ["Southern extension to Dar es Salaam", "Rail and road connections through Tanzania"], infrastructure: ["Cross-border rail interfaces", "Regional road links"], borders: ["Songwe / Kasumulu"], projects: ["Southern rail and multimodal links — client input pending"], cargo: "Regional agricultural exports and essential imports moving through southern corridor connections.", institution: "Malawi national transport and trade facilitation focal institution *" },
  rwanda: { routes: ["Kigali – Isaka – Dar es Salaam", "Kigali logistics platform connections"], infrastructure: ["Kigali Logistics Platform", "Isaka–Kigali SGR interface"], borders: ["Rusumo / Rusumo"], projects: ["Isaka – Kigali Standard Gauge Railway", "Central Corridor Road Upgrade"], cargo: "High-value imports, consumer goods and export cargo supported by integrated customs processes.", institution: "Rwanda national transport and trade facilitation focal institution *" },
  tanzania: { routes: ["Dar es Salaam – Isaka – Kigali", "Central railway, road and lake networks"], infrastructure: ["Port of Dar es Salaam", "Isaka dry port", "Kigoma Port"], borders: ["Kabanga / Kobero", "Rusumo / Rusumo", "Mutukula / Mutukula"], projects: ["Kigoma Port Modernisation", "Isaka – Kigali Standard Gauge Railway", "Central Corridor Road Upgrade"], cargo: "Maritime gateway cargo, containers, bulk commodities and regional transit freight.", institution: "Tanzania Ports Authority and national corridor institutions" },
  uganda: { routes: ["Lake Victoria northern loop", "Mutukula – Dar es Salaam access"], infrastructure: ["Lake Victoria terminals", "Mutukula trade gateway"], borders: ["Mutukula / Mutukula"], projects: ["Central Corridor Road Upgrade"], cargo: "Regional consumer goods, agricultural products and transit cargo via lake and road corridors.", institution: "Uganda Customs Office and national corridor institutions *" },
  zambia: { routes: ["Southern copper-belt connections", "TAZARA and road access to Dar es Salaam"], infrastructure: ["TAZARA rail interface", "Southern road links"], borders: ["Tunduma / Nakonde"], projects: ["Southern logistics integration — client input pending"], cargo: "Copper-belt and agricultural exports alongside regional imports through Tanzania.", institution: "Zambia national transport and trade facilitation focal institution *" },
};

export const dynamicParams = false;
type CountryPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return countries.map((country) => ({ slug: country.slug })); }

export async function generateMetadata({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  return country ? createPageMetadata({ title: `${country.name} Profile`, description: country.description, path: `/countries/${country.slug}`, image: country.flag }) : {};
}

export default async function CountryProfilePage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  const detail = country && countryDetails[country.slug];
  if (!country || !detail) notFound();

  return <>
    <header className="detail-hero"><div className="site-container"><Link className="detail-back" href="/about#partner-states"><ArrowLeft aria-hidden size={16} /> All Member States</Link><div className="country-hero-title"><span><Image src={country.flag} alt="" fill sizes="5rem" /></span><div><p className="eyebrow">Member State Profile</p><h1>{country.name}</h1><p>{country.description}</p></div></div></div></header>
    <main className="section"><div className="site-container profile-layout"><section className="profile-intro"><p className="eyebrow">Central Corridor Partnership</p><h2>{country.name} on the Central Corridor</h2><p>{country.description} The profile brings together the country&apos;s corridor connections, infrastructure priorities, trade information and institutional focal points.</p></section><div className="profile-grid"><section><h2>Central Corridor routes</h2><ul>{detail.routes.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Major infrastructure</h2><ul>{detail.infrastructure.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Border posts</h2><ul>{detail.borders.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Current projects</h2><ul>{detail.projects.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Trade & cargo</h2><p>{detail.cargo}</p></section><section><h2>National focal institution</h2><p>{detail.institution}</p></section></div><section className="profile-resources"><div><MapPinned aria-hidden size={24} /><h2>Map & location</h2><p>View this Member State&apos;s place in the integrated Central Corridor network.</p><Link className="text-link" href="/corridor">Explore corridor routes <ArrowRight aria-hidden size={16} /></Link></div><div><FileText aria-hidden size={24} /><h2>Related documents & news</h2><p>Country-specific documents and news will be published here as they are cleared for release.</p><Link className="text-link" href="/news">View latest updates <ArrowRight aria-hidden size={16} /></Link></div></section></div></main>
  </>;
}
