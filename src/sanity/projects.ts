import {cache} from "react";
import type {Project} from "@/data/site";
import {client} from "@/sanity/client";
import {featuredProjectQuery, projectBySlugQuery, projectDirectoryQuery} from "@/sanity/queries";

type Money = {amount?: number | null; currency?: string | null; note?: string | null};
type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  countries: string[];
  transportModes: string[];
  status: string;
  summary: string;
  estimatedCost?: Money | null;
  image?: string | null;
  imageAlt?: string | null;
  locationLabel?: string | null;
  expectedCompletion?: string | null;
  lastUpdated?: string | null;
  fundingSecured?: Money | null;
  financingGap?: Money | null;
  implementingAgencies?: Array<string | null> | null;
  developmentPartners?: Array<string | null> | null;
  documents?: Array<{_id: string; title: string; url?: string | null}> | null;
  description?: unknown[];
  strategicImportance?: unknown[];
  currentProgress?: unknown[];
};

export type CmsProject = Project & {
  imageAlt: string;
  locationLabel: string;
  expectedCompletion: string;
  lastUpdated: string;
  funding: string;
  implementingAgencies: string;
  developmentPartners: string;
  body: unknown[];
  strategicImportance: unknown[];
  currentProgress: unknown[];
  documents: Array<{_id: string; title: string; url?: string | null}>;
};

const fallbackImage = "/images/project-road.png";
const countryLabels: Record<string, string> = {
  burundi: "Burundi",
  drc: "DR Congo",
  malawi: "Malawi",
  rwanda: "Rwanda",
  tanzania: "Tanzania",
  uganda: "Uganda",
  zambia: "Zambia",
};
const statusLabels: Record<string, Project["status"]> = {
  planned: "Planned",
  inProgress: "In Progress",
  awaitingBrief: "Awaiting Brief",
  completed: "Ongoing",
  onHold: "Awaiting Brief",
};

function countryList(countries: string[] = []) {
  return countries.map((country) => countryLabels[country] || country).join(", ");
}

function primaryType(modes: string[] = []): Project["type"] {
  if (modes.includes("Railway")) return "Railway";
  if (modes.includes("Port") || modes.includes("Inland waterway")) return "Port";
  return "Road";
}

function moneyLabel(value?: Money | null) {
  if (!value) return "TBC";
  const amount = typeof value.amount === "number" ? `${value.currency || "USD"} ${value.amount.toLocaleString("en-US")}` : "";
  return [amount, value.note].filter(Boolean).join(" ") || "TBC";
}

function formatDate(value?: string | null) {
  if (!value) return "Not supplied";
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en-US", {day: "numeric", month: "short", timeZone: "UTC", year: "numeric"}).format(date);
}

function names(values?: Array<string | null> | null) {
  return values?.filter((value): value is string => Boolean(value)).join(", ") || "Not supplied";
}

function toProjectCard(project: SanityProject): Project {
  return {
    slug: project.slug,
    title: project.title,
    description: project.summary,
    image: project.image || fallbackImage,
    status: statusLabels[project.status] || "Awaiting Brief",
    countries: countryList(project.countries),
    cost: moneyLabel(project.estimatedCost),
    type: primaryType(project.transportModes),
  };
}

function toCmsProject(project: SanityProject): CmsProject {
  return {
    ...toProjectCard(project),
    imageAlt: project.imageAlt || project.title,
    locationLabel: project.locationLabel || "Not supplied",
    expectedCompletion: formatDate(project.expectedCompletion),
    lastUpdated: formatDate(project.lastUpdated),
    funding: `Funding secured: ${moneyLabel(project.fundingSecured)}. Financing gap: ${moneyLabel(project.financingGap)}.`,
    implementingAgencies: names(project.implementingAgencies),
    developmentPartners: names(project.developmentPartners),
    body: project.description || [],
    strategicImportance: project.strategicImportance || [],
    currentProgress: project.currentProgress || [],
    documents: project.documents || [],
  };
}

const fetchOptions = {next: {revalidate: 60, tags: ["project"]}};

export const getProjects = cache(async (): Promise<Project[]> => {
  const projects = await client.fetch<SanityProject[]>(projectDirectoryQuery, {}, fetchOptions);
  return projects.map(toProjectCard);
});

export const getFeaturedProject = cache(async (): Promise<Project | null> => {
  const project = await client.fetch<SanityProject | null>(featuredProjectQuery, {}, fetchOptions);
  return project ? toProjectCard(project) : null;
});

export const getProject = cache(async (slug: string): Promise<CmsProject | null> => {
  const project = await client.fetch<SanityProject | null>(projectBySlugQuery, {slug}, fetchOptions);
  return project ? toCmsProject(project) : null;
});

export const fallbackFeaturedProject: Project = {
  slug: "dar-es-salaam-isaka-kigali-railway-sgr",
  title: "Dar es Salaam – Isaka – Kigali Railway (SGR)",
  description: "A flagship railway project spanning Tanzania and Rwanda, designed to transform freight and passenger connectivity along the Central Corridor.",
  image: "/images/project-spotlight.png",
  status: "In Progress",
  countries: "Tanzania, Rwanda",
  cost: "USD 120,000 *",
  type: "Railway",
};
