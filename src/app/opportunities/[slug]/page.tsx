import {notFound} from "next/navigation";
import {ContentPageDetail} from "@/components/content-page";
import {createPageMetadata} from "@/lib/metadata";
import {getContentPage} from "@/sanity/content-pages";

export const revalidate = 60;
type OpportunityDetailProps = {params: Promise<{slug: string}>};

const sourceSlugs: Record<string, string> = {consultancy: "consultancy", vacancies: "vvacancies"};

export async function generateMetadata({params}: OpportunityDetailProps) {
  const {slug} = await params;
  const sourceSlug = sourceSlugs[slug];
  if (!sourceSlug) return {};
  const page = await getContentPage("procurement", sourceSlug);
  return page ? createPageMetadata({title: page.title, description: page.summary, path: `/opportunities/${slug}`, image: "/images/tenders-hero.png"}) : {};
}

export default async function OpportunityDetailPage({params}: OpportunityDetailProps) {
  const {slug} = await params;
  const sourceSlug = sourceSlugs[slug];
  if (!sourceSlug) notFound();
  const page = await getContentPage("procurement", sourceSlug);
  if (!page) notFound();
  return <ContentPageDetail page={page} eyebrow={page.title === "Vacancies" ? "Careers" : "Opportunities"} backHref="/opportunities" backLabel="All opportunities" />;
}
