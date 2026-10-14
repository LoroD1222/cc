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
  const opportunityHref = (slug: string) => `/opportunities/${slug === "vvacancies" ? "vacancies" : slug}`;

  return <><PageHero eyebrow="Opportunities" title="Work with CCTTFA" description="Find public procurement notices, consultancy opportunities, and vacancies issued by the Central Corridor Transit Transport Facilitation Agency." image="/images/tenders-hero.png" /><section className="section"><div className="site-container"><SectionHeading eyebrow="Current notices" title="Procurement, consultancy, and careers" description="Choose a section to view the latest available information and supporting documents." /><div className="content-card-grid"><article className="content-page-card"><p className="eyebrow">Procurement</p><h2>Tender notices</h2><p>View current procurement notices, tender documents, and submission information.</p><Link className="text-link" href="/tenders">Explore Tenders <ArrowRight aria-hidden size={16} /></Link></article>{pages.map((page) => <ContentPageCard page={page} href={opportunityHref(page.slug)} eyebrow={page.title === "Vacancies" ? "Careers" : "Opportunities"} key={page.id} />)}</div></div></section></>;
}
