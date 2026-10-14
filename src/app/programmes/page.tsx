import {ContentPageCard} from "@/components/content-page";
import {PageHero, SectionHeading} from "@/components/ui";
import {createPageMetadata} from "@/lib/metadata";
import {getContentPages} from "@/sanity/content-pages";

export const revalidate = 60;
export const metadata = createPageMetadata({title: "Programmes", description: "Explore the five CCTTFA programmes that guide coordinated policy, infrastructure, logistics, trade facilitation, and advocacy across the Central Corridor.", path: "/programmes", image: "/images/portal-hero.png"});

const programmeOrder = ["transport-policy-planning", "infrastructure-development", "logistics-transport-facilitation", "customs-trade-facilitation", "communication-advocacy"];

export default async function ProgrammesPage() {
  const programmes = await getContentPages("service");
  const orderedProgrammes = [
    ...programmeOrder.flatMap((slug) => programmes.filter((page) => page.slug === slug)),
    ...programmes.filter((page) => !programmeOrder.includes(page.slug)),
  ];

  return <><PageHero eyebrow="CCTTFA Programmes" title="Working together to improve the Corridor" description="The CCTTFA programmes coordinate practical work across policy, infrastructure, logistics, customs, communication, and advocacy in all Member States." image="/images/portal-hero.png" position="center 55%" /><section className="section"><div className="site-container"><SectionHeading eyebrow="Programme areas" title="Five connected areas of work" description="Select a programme to review its mandate, priorities, and responsibilities from the CCTTFA content library." /><div className="content-card-grid">{orderedProgrammes.map((programme) => <ContentPageCard page={programme} href={`/programmes/${programme.slug}`} eyebrow="CCTTFA Programme" key={programme.id} />)}</div></div></section></>;
}
