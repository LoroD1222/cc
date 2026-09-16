import { PageHero, SidebarNav } from "@/components/ui";
import { ProjectExplorer } from "@/components/project-explorer";
import { projects as fallbackProjects } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import { fallbackFeaturedProject, getFeaturedProject, getProjects } from "@/sanity/projects";

export const metadata = createPageMetadata({ title: "Regional Projects", description: "Explore current and planned regional infrastructure projects across the Central Corridor partner states.", path: "/projects", image: "/images/projects-hero.png" });
export const revalidate = 60;

export default async function ProjectsPage() {
  const navigation = ["Key Project Spotlight", "Filter & Search", "Project Directory", "Project Pipeline", "Submit Proposal"].map((label) => ({ label, href: `#${label.toLowerCase().replaceAll(" ", "-")}` }));
  const [cmsProjects, cmsFeaturedProject] = await Promise.all([getProjects(), getFeaturedProject()]);
  const projects = cmsProjects.length ? cmsProjects : fallbackProjects;
  const featuredProject = cmsFeaturedProject || fallbackFeaturedProject;

  return <>
    <PageHero eyebrow="CCTTFA Portfolio" title="Transforming Regional Connectivity" description="Managing regional infrastructure capital investments across partner states." image="/images/projects-hero.png" position="center 55%" />
    <section className="section"><div className="site-container sidebar-layout"><SidebarNav items={navigation} /><div className="content-stack"><ProjectExplorer projects={projects} featuredProject={featuredProject} /></div></div></section>
  </>;
}
