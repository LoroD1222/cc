import Link from "next/link";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { countries, organs } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

const organDetails: Record<string, { role: string; mandate: string; membership: string; meeting: string }> = {
  "interstate-council-of-ministers": { role: "The highest policy-making organ of the Agreement.", mandate: "Sets strategic direction, approves major policy and provides ministerial leadership for the Central Corridor partnership.", membership: "Ministers responsible for transport from each of the seven Member States.", meeting: "Meets once a year; chairmanship rotates annually among Member States." },
  "executive-board": { role: "The executive policy and oversight body of CCTTFA.", mandate: "Guides implementation of Council decisions, supervises programme delivery and sets general principles and policy.", membership: "Permanent Secretaries and private-sector representatives from Member States.", meeting: "Meets twice a year, with additional technical coordination as required." },
  stacon: { role: "The formal stakeholder consultation mechanism.", mandate: "Brings feedback from public and private stakeholders into CCTTFA programmes, projects and performance discussions.", membership: "Stakeholder representatives, including the Stakeholders' Representative Group (STAREP).", meeting: "Meets twice a year and contributes to project and activity review." },
  "permanent-secretariat": { role: "The operational arm of CCTTFA, based in Dar es Salaam.", mandate: "Implements decisions, administers daily operations, coordinates regional programmes and maintains institutional partnerships.", membership: "Executive Secretary and Secretariat technical, programme and administrative staff.", meeting: "Works continuously with Member State focal institutions and the governing organs." },
};

export const dynamicParams = false;
type OrganDetailProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return organs.map((organ) => ({ slug: organ.slug })); }

export async function generateMetadata({ params }: OrganDetailProps) {
  const { slug } = await params;
  const organ = organs.find((item) => item.slug === slug);
  return organ ? createPageMetadata({ title: organ.title, description: organ.text, path: `/about/organs/${organ.slug}`, image: "/images/governance-bg.png" }) : {};
}

export default async function OrganDetailPage({ params }: OrganDetailProps) {
  const { slug } = await params;
  const organ = organs.find((item) => item.slug === slug);
  const detail = organ && organDetails[organ.slug];
  if (!organ || !detail) notFound();

  return <><header className="detail-hero"><div className="site-container"><Link className="detail-back" href="/about#governance-organs"><ArrowLeft aria-hidden size={16} /> Institutional structure</Link><p className="eyebrow">CCTTFA Governing Organ</p><h1>{organ.title}</h1><p>{detail.role}</p></div></header><main className="section"><div className="site-container organ-detail"><section className="detail-copy"><h2>Mandate</h2><p>{detail.mandate}</p><h2>Membership</h2><p>{detail.membership}</p><h2>How it works</h2><p>{detail.meeting}</p></section><section className="member-state-panel"><Users aria-hidden size={26} /><div><p className="eyebrow">Member State representation</p><h2>Seven partner states</h2><p>Each Member State appoints representatives through the institution&apos;s established national process.</p></div><div className="member-state-list">{countries.map((country) => <Link href={`/countries/${country.slug}`} key={country.slug}>{country.name}<ArrowRight aria-hidden size={15} /></Link>)}</div></section></div></main></>;
}
