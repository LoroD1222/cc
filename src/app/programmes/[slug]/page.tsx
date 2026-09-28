import {notFound} from "next/navigation";
import {ContentPageDetail} from "@/components/content-page";
import {createPageMetadata} from "@/lib/metadata";
import {getContentPage} from "@/sanity/content-pages";

export const revalidate = 60;
type ProgrammeDetailProps = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: ProgrammeDetailProps) {
  const {slug} = await params;
  const page = await getContentPage("service", slug);
  return page ? createPageMetadata({title: page.title, description: page.summary, path: `/programmes/${slug}`, image: "/images/portal-hero.png"}) : {};
}

export default async function ProgrammeDetailPage({params}: ProgrammeDetailProps) {
  const {slug} = await params;
  const page = await getContentPage("service", slug);
  if (!page) notFound();
  return <ContentPageDetail page={page} eyebrow="CCTTFA Programme" backHref="/programmes" backLabel="All programmes" />;
}
