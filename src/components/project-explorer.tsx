"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, TrainFront } from "lucide-react";
import { Field, ProjectCard, SectionHeading } from "@/components/ui";
import type { Project } from "@/data/site";

const stages = ["Concept & Brief", "Feasibility Study", "Design & Procurement", "Under Construction", "Operational"];

export function ProjectExplorer({ projects, featuredProject }: { projects: Project[]; featuredProject: Project }) {
  const [status, setStatus] = useState("All");
  const [country, setCountry] = useState("All");
  const [type, setType] = useState("All");
  const countries = [...new Set(projects.flatMap((project) => project.countries.split(", ")))].sort();
  const types = [...new Set(projects.map((project) => project.type))];
  const statuses = ["All", ...new Set(projects.map((project) => project.status))];
  const filteredProjects = projects.filter((project) => (
    (status === "All" || project.status === status)
    && (country === "All" || project.countries.split(", ").includes(country))
    && (type === "All" || project.type === type)
  ));

  return <>
    <section id="key-project-spotlight">
      <SectionHeading eyebrow="Featured" title="Key Project Spotlight" />
      <article className="spotlight-card"><div><Image src={featuredProject.image} alt="" fill sizes="35vw" /></div><div><span className="status-inline">{featuredProject.status}</span><h2>{featuredProject.title}</h2><p>{featuredProject.description}</p><dl><div><dt>Countries</dt><dd>{featuredProject.countries}</dd></div><div><dt>Est. cost</dt><dd>{featuredProject.cost}</dd></div><div><dt>Type</dt><dd>{featuredProject.type}</dd></div></dl><Link className="text-link" href={`/projects/${featuredProject.slug}`}>View project</Link></div></article>
    </section>

    <section id="filter-&-search" className="filters">
      <strong>Filter by:</strong>
      <label>Status:
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          {statuses.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
      <label>Country:
        <select value={country} onChange={(event) => setCountry(event.target.value)}>
          <option value="All">All ({countries.length})</option>
          {countries.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
      <label>Type:
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="All">All Infrastructure</option>
          {types.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
      <span className="push" aria-live="polite">{filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found</span>
    </section>

    <section id="project-directory">
      <SectionHeading title="Project Directory" description="* Estimated costs are indicative and subject to verification by the contracting authority." />
      {filteredProjects.length > 0 ? <div className="card-grid">{filteredProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div> : <p className="empty-state">No projects match the selected filters.</p>}
    </section>

    <section id="project-pipeline" className="pipeline-section">
      <SectionHeading title="Projects Pipeline" align="center" />
      <div className="pipeline-head">{stages.map((stage) => <span key={stage}>{stage}</span>)}</div>
      <div className="pipeline-rows">{filteredProjects.map((project, index) => <article key={project.slug} style={{ "--stage": Math.min(index + 1, 5) } as CSSProperties}><span>{project.title}<TrainFront aria-hidden size={13} /></span></article>)}</div>
    </section>

    <section id="submit-proposal" className="proposal-panel"><div><h2>Submit a Project Proposal</h2><p>Have a project idea that could benefit the Central Corridor? Submit your proposal for review by the Secretariat and member states.</p><ul><li><Check aria-hidden size={15} /> Open to member state agencies and development partners</li><li><Check aria-hidden size={15} /> Proposals reviewed quarterly by the Technical Committee</li><li><Check aria-hidden size={15} /> Successful proposals enter the project pipeline</li></ul></div><form aria-label="Project proposal"><Field label="Organisation Name" name="organisation" placeholder="e.g. Ministry of Transport, Tanzania" /><Field label="Contact Email" name="email" type="email" placeholder="email@example.com" /><Field label="Project Title" name="title" placeholder="Brief title for your proposed project" /><label className="field"><span>Infrastructure Type</span><select name="type"><option>Select type...</option><option>Railway</option><option>Road</option><option>Port</option></select></label><button className="button" type="button">Submit Proposal</button></form></section>
  </>;
}
