import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, MapPinned } from "lucide-react";
import { notFound } from "next/navigation";
import { projects } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
type ProjectDetailProps = { params: Promise<{ slug: string }> };

const projectDetails: Record<string, { funding: string; agencies: string; partners: string; importance: string; progress: string; completion: string; location: string }> = {
  "kalundu-port-uvira-kamanyola-bukavu-road": { funding: "Funding secured / financing gap — client input pending", agencies: "Relevant national road and port agencies in D.R. Congo *", partners: "Development partners — client input pending", importance: "Connects Lake Tanganyika access points with key eastern DRC trade and population centres.", progress: "Planned; technical and financing details to be confirmed.", completion: "To be confirmed", location: "Kalundu – Uvira – Kamanyola – Bukavu, D.R. Congo" },
  "kigoma-port-modernisation": { funding: "Funding secured / financing gap — client input pending", agencies: "Tanzania Ports Authority and relevant agencies *", partners: "Development partners — client input pending", importance: "Strengthens the lake-port interface that links Tanzania, Burundi and D.R. Congo.", progress: "In progress; modernisation priorities are being advanced.", completion: "To be confirmed", location: "Kigoma, Tanzania" },
  "isaka-kigali-standard-gauge-railway": { funding: "Funding secured / financing gap — client input pending", agencies: "Tanzania and Rwanda railway implementing agencies *", partners: "Development partners — client input pending", importance: "Creates a strategic rail connection between Rwanda and the Port of Dar es Salaam.", progress: "Planned; implementation sequencing under review.", completion: "To be confirmed", location: "Isaka, Tanzania – Kigali, Rwanda" },
  "central-corridor-road-upgrade": { funding: "Funding secured / financing gap — client input pending", agencies: "Partner State road agencies and CCTTFA coordination *", partners: "Development partners — client input pending", importance: "Targets priority road bottlenecks across the multimodal Central Corridor network.", progress: "In progress across priority segments.", completion: "To be confirmed", location: "Multi-country Central Corridor network" },
  "rumonge-gitaza-kabingo-road": { funding: "Funding secured / financing gap — client input pending", agencies: "Burundi road authorities *", partners: "Development partners — client input pending", importance: "Improves southern Burundi's access to the regional road and lake network.", progress: "Awaiting project brief and implementation confirmation.", completion: "To be confirmed", location: "Rumonge – Gitaza / Kabingo, Burundi" },
  "kalemie-port-rehabilitation": { funding: "Funding secured / financing gap — client input pending", agencies: "D.R. Congo port authorities *", partners: "Development partners — client input pending", importance: "Reinforces Lake Tanganyika maritime connectivity and access to eastern D.R. Congo.", progress: "Awaiting project brief and implementation confirmation.", completion: "To be confirmed", location: "Kalemie, D.R. Congo" },
};

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? createPageMetadata({ title: project.title, description: project.description, path: `/projects/${project.slug}`, image: project.image }) : {};
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const detail = project && projectDetails[project.slug];
  if (!project || !detail) notFound();
  const facts = [["Countries involved", project.countries], ["Transport mode", project.type], ["Project status", project.status], ["Project cost", project.cost], ["Funding & financing gap", detail.funding], ["Implementing agencies", detail.agencies], ["Development partners", detail.partners], ["Expected completion", detail.completion], ["Last update", "Client input pending"]];

  return <>
    <header className="detail-hero"><div className="site-container"><Link className="detail-back" href="/projects"><ArrowLeft aria-hidden size={16} /> All projects</Link><p className="eyebrow">CCTTFA Project Portfolio</p><h1>{project.title}</h1><p>{project.description}</p></div></header>
    <main className="section"><div className="site-container project-detail"><div className="project-detail-image"><Image src={project.image} alt="" fill preload sizes="(max-width: 900px) 100vw, 70rem" /></div><div className="detail-facts">{facts.map(([label, value]) => <article key={label}><strong>{label}</strong><span>{value}</span></article>)}</div><section className="detail-copy"><h2>Project description</h2><p>{project.description} This profile consolidates the available programme information for corridor stakeholders and will be updated as implementation data is confirmed.</p><h2>Strategic importance</h2><p>{detail.importance}</p><h2>Current progress</h2><p>{detail.progress}</p></section><section className="profile-resources"><div><MapPinned aria-hidden size={24} /><h2>Map & location</h2><p>{detail.location}</p><Link className="text-link" href="/corridor">Open corridor map <ArrowRight aria-hidden size={16} /></Link></div><div><FileText aria-hidden size={24} /><h2>Photos & documents</h2><p>Project images, procurement records and technical documents will be published here as available.</p><Link className="text-link" href="/resources">Browse resources <ArrowRight aria-hidden size={16} /></Link></div></section></div></main>
  </>;
}
