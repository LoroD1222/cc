import {cache} from "react";
import {client} from "@/sanity/client";
import {resourceDocumentsQuery} from "@/sanity/queries";

type SanityResource = {
  _id: string;
  title: string;
  documentType: string;
  publishedAt?: string | null;
  summary?: string | null;
  sourceType?: string | null;
  url?: string | null;
  fileSize?: number | null;
};

export type CmsResource = {
  id: string;
  title: string;
  type: string;
  year: string;
  size: string;
  summary: string;
  url?: string;
  actionLabel: string;
};

const fetchOptions = {next: {revalidate: 60, tags: ["resource"]}};

function formatYear(value?: string | null) {
  if (!value) return "Undated";
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "Undated" : String(date.getUTCFullYear());
}

function formatFileSize(value?: number | null) {
  if (!value || value < 1) return "File size unavailable";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const amount = value / 1024 ** index;
  return `${amount >= 10 || index === 0 ? amount.toFixed(0) : amount.toFixed(1)} ${units[index]}`;
}

function toCmsResource(resource: SanityResource): CmsResource {
  const isExternal = resource.sourceType === "external";
  return {
    id: resource._id,
    title: resource.title,
    type: resource.documentType || "Document",
    year: formatYear(resource.publishedAt),
    size: isExternal ? "External link" : formatFileSize(resource.fileSize),
    summary: resource.summary || "",
    url: resource.url || undefined,
    actionLabel: isExternal ? "Open resource" : "Download document",
  };
}

export const getResources = cache(async (): Promise<CmsResource[]> => {
  const resources = await client.fetch<SanityResource[]>(resourceDocumentsQuery, {}, fetchOptions);
  return resources.map(toCmsResource);
});
