import {notFound} from "next/navigation";
import {ContentPageDetail} from "@/components/content-page";
import {createPageMetadata} from "@/lib/metadata";
import {getContentPage} from "@/sanity/content-pages";

export const revalidate = 60;
type OpportunityDetailProps = {params: Promise<{slug: string}>};

async function getOpportunity(slug: string) {
  const directMatch = await getContentPage("procurement", slug);
  if (directMatch || slug !== "vacancies") return directMatch;
  return getContentPage("procurement", "vvacancies");
}

export async function generateMetadata({params}: OpportunityDetailProps) {
  const {slug} = await params;
  const page = await getOpportunity(slug);
  return page ? createPageMetadata({title: page.title, description: page.summary, path: `/opportunities/${slug}`, image: "/images/tenders-hero.png"}) : {};
}

export default async function OpportunityDetailPage({params}: OpportunityDetailProps) {
  const {slug} = await params;
  const page = await getOpportunity(slug);
  if (!page) notFound();
  return <ContentPageDetail page={page} eyebrow={page.title === "Vacancies" ? "Careers" : "Opportunities"} backHref="/opportunities" backLabel="All opportunities" />;
}
