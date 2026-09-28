import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {ContentPageCard} from "@/components/content-page";
import {PageHero, SectionHeading} from "@/components/ui";
import {createPageMetadata} from "@/lib/metadata";
import {getContentPages} from "@/sanity/content-pages";

export const revalidate = 60;
export const metadata = createPageMetadata({title: "Opportunities", description: "Find CCTTFA procurement notices, consultancy opportunities, and vacancies.", path: "/opportunities", image: "/images/tenders-hero.png"});

export default async function OpportunitiesPage() {
  const pages = await getContentPages("procurement");
  const vacancies = pages.find((page) => page.slug === "vvacancies");
  const consultancy = pages.find((page) => page.slug === "consultancy");

  return <><PageHero eyebrow="Opportunities" title="Work with CCTTFA" description="Find public procurement notices, consultancy opportunities, and vacancies issued by the Central Corridor Transit Transport Facilitation Agency." image="/images/tenders-hero.png" /><section className="section"><div className="site-container"><SectionHeading eyebrow="Current notices" title="Procurement, consultancy, and careers" description="Choose a section to view the latest available information and supporting documents." /><div className="content-card-grid"><article className="content-page-card"><p className="eyebrow">Procurement</p><h2>Tenders</h2><p>View current procurement notices, tender documents, and submission information.</p><Link className="text-link" href="/tenders">Explore Tenders <ArrowRight aria-hidden size={16} /></Link></article>{consultancy ? <ContentPageCard page={consultancy} href="/opportunities/consultancy" eyebrow="Opportunities" /> : null}{vacancies ? <ContentPageCard page={vacancies} href="/opportunities/vacancies" eyebrow="Careers" /> : null}</div></div></section></>;
}
