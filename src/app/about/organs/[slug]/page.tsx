import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { countries, organs } from "@/data/site";
import { SecretariatDirectory, type SecretariatStaffProfile } from "@/components/secretariat-directory";
import { createPageMetadata } from "@/lib/metadata";

const organDetails: Record<string, { role: string; mandate: string; membership: string; meeting: string }> = {
  "interstate-council-of-ministers": { role: "The highest policy-making organ of the Agreement.", mandate: "Sets strategic direction, approves major policy and provides ministerial leadership for the Central Corridor partnership.", membership: "Ministers responsible for transport from each of the seven Member States.", meeting: "Meets once a year; chairmanship rotates annually among Member States." },
  "executive-board": { role: "The executive policy and oversight body of CCTTFA.", mandate: "Guides implementation of Council decisions, supervises programme delivery and sets general principles and policy.", membership: "Two representatives from each Member State: a government representative and a private-sector representative. The Executive Secretary serves as Secretary to the Board.", meeting: "Meets twice a year, with additional technical coordination as required." },
  stacon: { role: "The formal stakeholder consultation mechanism.", mandate: "Brings feedback from public and private stakeholders into CCTTFA programmes, projects and performance discussions.", membership: "Stakeholder representatives, including the Stakeholders' Representative Group (STAREP).", meeting: "Meets twice a year and contributes to project and activity review." },
  "permanent-secretariat": { role: "The operational arm of CCTTFA, based in Dar es Salaam.", mandate: "Implements decisions, administers daily operations, coordinates regional programmes and maintains institutional partnerships.", membership: "Executive Secretary and seven directorates, supported by Secretariat technical, programme and administrative staff.", meeting: "Works continuously with Member State focal institutions and the governing organs." },
};

type DirectoryProfile = { memberState?: string; name: string; designation: string; unit: string; photo: string };

const icmProfiles: DirectoryProfile[] = countries.map((country) => ({ memberState: country.name, name: "Name pending official confirmation", designation: "Minister responsible for transport", unit: "Current ministerial portfolio to be confirmed", photo: "/images/avatar-placeholder.svg" }));
const executiveBoardProfiles: DirectoryProfile[] = countries.flatMap((country) => [
  { memberState: country.name, name: "Name pending official confirmation", designation: "Government representative", unit: "Permanent Secretary or authorised public-sector representative", photo: "/images/avatar-placeholder.svg" },
  { memberState: country.name, name: "Name pending official confirmation", designation: "Private-sector representative", unit: "Executive Board private-sector appointment", photo: "/images/avatar-placeholder.svg" },
]);
const executiveBoardSecretary: DirectoryProfile = { memberState: "CCTTFA Permanent Secretariat", name: "Adv. Okandju Okonge Flory", designation: "Secretary to the Executive Board", unit: "Executive Secretary", photo: "/images/leader-flory.png" };
const staconProfiles: DirectoryProfile[] = [
  { name: "Government transport institutions", designation: "Public-sector representation", unit: "National transport and infrastructure bodies", photo: "/images/avatar-placeholder.svg" },
  { name: "Border and customs agencies", designation: "Trade facilitation representation", unit: "Customs, immigration and border authorities", photo: "/images/avatar-placeholder.svg" },
  { name: "Private-sector logistics community", designation: "Industry representation", unit: "Freight, shipping, clearing and cargo interests", photo: "/images/avatar-placeholder.svg" },
  { name: "Development and technical partners", designation: "Partner representation", unit: "Programme, investment and technical support", photo: "/images/avatar-placeholder.svg" },
];
const executiveSecretary: SecretariatStaffProfile = { name: "Adv. Okandju Okonge Flory", designation: "Executive Secretary", unit: "Office of the Executive Secretary", photo: "/images/leader-flory.png" };
const secretariatDirectors: SecretariatStaffProfile[] = [
  { name: "Name pending official confirmation", designation: "Director — Programme & Projects", unit: "Programme design, delivery and project coordination", photo: "/images/avatar-placeholder.svg" },
  { name: "Name pending official confirmation", designation: "Director — Trade Facilitation", unit: "Customs, border and logistics facilitation", photo: "/images/avatar-placeholder.svg" },
  { name: "Name pending official confirmation", designation: "Director — Transport & Infrastructure", unit: "Multimodal transport systems and infrastructure", photo: "/images/avatar-placeholder.svg" },
  { name: "Name pending official confirmation", designation: "Director — Monitoring, Evaluation & Data", unit: "Performance monitoring, observatory and reporting", photo: "/images/avatar-placeholder.svg" },
  { name: "Name pending official confirmation", designation: "Director — Finance & Administration", unit: "Finance, procurement, human resources and administration", photo: "/images/avatar-placeholder.svg" },
  { name: "Name pending official confirmation", designation: "Director — Legal, Corporate & Governance", unit: "Legal affairs, institutional governance and compliance", photo: "/images/avatar-placeholder.svg" },
  { name: "Name pending official confirmation", designation: "Director — Communications & Stakeholder Engagement", unit: "Communications, knowledge and Member State liaison", photo: "/images/avatar-placeholder.svg" },
];

function DirectoryCard({ profile }: { profile: DirectoryProfile }) {
  return <article className="directory-card"><div className="directory-photo"><Image src={profile.photo} alt="" fill sizes="8rem" /></div><div>{profile.memberState && <p className="eyebrow">{profile.memberState}</p>}<h3>{profile.name}</h3><strong>{profile.designation}</strong><p>{profile.unit}</p></div></article>;
}

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

  const isIcm = organ.slug === "interstate-council-of-ministers";
  const isExecutiveBoard = organ.slug === "executive-board";
  const isStacon = organ.slug === "stacon";
  const isSecretariat = organ.slug === "permanent-secretariat";

  return <><header className="detail-hero"><div className="site-container"><Link className="detail-back" href="/about#governance-organs"><ArrowLeft aria-hidden size={16} /> Institutional structure</Link><p className="eyebrow">CCTTFA Governing Organ</p><h1>{organ.title}</h1><p>{detail.role}</p></div></header><main className="section"><div className="site-container organ-detail"><section className="detail-copy"><h2>Mandate</h2><p>{detail.mandate}</p><h2>Membership</h2><p>{detail.membership}</p><h2>How it works</h2><p>{detail.meeting}</p></section>{isIcm && <section className="directory-section"><div className="directory-heading"><Users aria-hidden size={26} /><div><p className="eyebrow">Member State presentation</p><h2>Interstate Council of Ministers</h2><p>Current minister profiles for each Member State. Names and photographs are ready to be completed from the latest official appointment list.</p></div></div><div className="directory-grid">{icmProfiles.map((profile) => <DirectoryCard key={profile.memberState} profile={profile} />)}</div></section>}{isExecutiveBoard && <section className="directory-section"><div className="directory-heading"><Users aria-hidden size={26} /><div><p className="eyebrow">Member State presentation</p><h2>Executive Board representatives</h2><p>Each Member State has two Board representatives: one from government and one from the private sector. The Executive Secretary serves as Secretary to the Board.</p></div></div><div className="board-secretary"><p className="eyebrow">Secretary to the Board</p><DirectoryCard profile={executiveBoardSecretary} /></div><div className="directory-grid board-directory-grid">{executiveBoardProfiles.map((profile, index) => <DirectoryCard key={`${profile.memberState}-${index}`} profile={profile} />)}</div></section>}{isStacon && <section className="directory-section"><div className="directory-heading"><Building2 aria-hidden size={26} /><div><p className="eyebrow">Stakeholder composition</p><h2>STACON representatives</h2><p>STACON brings the operational experience of public institutions, private operators and development partners into the Central Corridor&apos;s decisions and performance reviews.</p></div></div><div className="directory-grid stacon-directory-grid">{staconProfiles.map((profile) => <DirectoryCard key={profile.name} profile={profile} />)}</div></section>}{isSecretariat && <SecretariatDirectory executiveSecretary={executiveSecretary} directors={secretariatDirectors} />}</div></main></>;
}
