import { PageHero, SidebarNav } from "@/components/ui";
import { ProjectExplorer } from "@/components/project-explorer";
import { projects } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Regional Projects", description: "Explore current and planned regional infrastructure projects across the Central Corridor partner states.", path: "/projects", image: "/images/projects-hero.png" });

export default function ProjectsPage() {
  const navigation = ["Key Project Spotlight", "Filter & Search", "Project Directory", "Project Pipeline", "Submit Proposal"].map((label) => ({ label, href: `#${label.toLowerCase().replaceAll(" ", "-")}` }));

  return <>
    <PageHero eyebrow="CCTTFA Portfolio" title="Transforming Regional Connectivity" description="Managing regional infrastructure capital investments across partner states." image="/images/projects-hero.png" position="center 55%" />
    <section className="section"><div className="site-container sidebar-layout"><SidebarNav items={navigation} /><div className="content-stack"><ProjectExplorer projects={projects} /></div></div></section>
  </>;
}
