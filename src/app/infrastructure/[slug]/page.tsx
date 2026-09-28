import {notFound} from "next/navigation";
import {ContentPageDetail} from "@/components/content-page";
import {createPageMetadata} from "@/lib/metadata";
import {getContentPage} from "@/sanity/content-pages";

export const revalidate = 60;
type InfrastructureDetailProps = {params: Promise<{slug: string}>};

const infrastructureSlugs = new Set(["maritime-port-of-dar-es-salaam", "road-network", "railway-network", "inland-water-ways-network"]);

export async function generateMetadata({params}: InfrastructureDetailProps) {
  const {slug} = await params;
  if (!infrastructureSlugs.has(slug)) return {};
  const page = await getContentPage("corridor", slug);
  return page ? createPageMetadata({title: page.title, description: page.summary, path: `/infrastructure/${slug}`, image: "/images/corridor-gallery-rail.png"}) : {};
}

export default async function InfrastructureDetailPage({params}: InfrastructureDetailProps) {
  const {slug} = await params;
  if (!infrastructureSlugs.has(slug)) notFound();
  const page = await getContentPage("corridor", slug);
  if (!page) notFound();
  return <ContentPageDetail page={page} eyebrow="Central Corridor Infrastructure" backHref="/infrastructure" backLabel="All infrastructure" />;
}
