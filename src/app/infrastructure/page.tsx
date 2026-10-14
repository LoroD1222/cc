import {ContentPageCard} from "@/components/content-page";
import {PageHero, SectionHeading} from "@/components/ui";
import {createPageMetadata} from "@/lib/metadata";
import {getContentPages} from "@/sanity/content-pages";

export const revalidate = 60;
export const metadata = createPageMetadata({title: "Infrastructure", description: "Explore the maritime, road, rail, and inland-waterway systems that support the Central Corridor.", path: "/infrastructure", image: "/images/corridor-gallery-rail.png"});

const infrastructureOrder = ["maritime-port-of-dar-es-salaam", "road-network", "railway-network", "inland-water-ways-network"];

export default async function InfrastructurePage() {
  const infrastructure = await getContentPages("corridor");
  const orderedInfrastructure = [
    ...infrastructureOrder.flatMap((slug) => infrastructure.filter((page) => page.slug === slug)),
    ...infrastructure.filter((page) => !infrastructureOrder.includes(page.slug)),
  ];

  return <><PageHero eyebrow="Central Corridor Infrastructure" title="The networks that connect the region" description="The Central Corridor combines maritime access, roads, railways, and inland waterways to move people and cargo efficiently across Member States." image="/images/corridor-gallery-rail.png" /><section className="section"><div className="site-container"><SectionHeading eyebrow="Infrastructure systems" title="Explore the Corridor networks" description="Open a network page to review the original CCTTFA information on each part of the regional transport system." /><div className="content-card-grid">{orderedInfrastructure.map((item) => <ContentPageCard page={item} href={`/infrastructure/${item.slug}`} eyebrow="Central Corridor" key={item.id} />)}</div></div></section></>;
}
