import {cache} from "react";
import {client} from "@/sanity/client";
import {tendersQuery} from "@/sanity/queries";

type SanityTender = {
  _id: string;
  title: string;
  referenceNumber: string;
  status: string;
  publishedAt?: string | null;
  closingDate?: string | null;
  summary?: string | null;
  contactEmail?: string | null;
  documents?: Array<{_id: string; title: string; url?: string | null}> | null;
  description?: unknown[];
};

export type CmsTender = {
  id: string;
  title: string;
  referenceNumber: string;
  status: string;
  publishedDate?: string;
  closingDate?: string;
  summary?: string;
  contactEmail?: string;
  documents: Array<{id: string; title: string; url?: string}>;
  description: unknown[];
};

const fetchOptions = {next: {revalidate: 60, tags: ["tender"]}};

function formatDate(value?: string | null) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return undefined;
  return new Intl.DateTimeFormat("en-US", {day: "numeric", month: "short", timeZone: "UTC", year: "numeric"}).format(date);
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {open: "Open", closed: "Closed", awarded: "Awarded", cancelled: "Cancelled"};
  return labels[status] || status;
}

function toCmsTender(tender: SanityTender): CmsTender {
  return {
    id: tender._id,
    title: tender.title,
    referenceNumber: tender.referenceNumber,
    status: statusLabel(tender.status),
    publishedDate: formatDate(tender.publishedAt),
    closingDate: formatDate(tender.closingDate),
    summary: tender.summary || undefined,
    contactEmail: tender.contactEmail || undefined,
    documents: (tender.documents || []).map((document) => ({id: document._id, title: document.title, url: document.url || undefined})),
    description: tender.description || [],
  };
}

export const getTenders = cache(async (): Promise<CmsTender[]> => {
  const tenders = await client.fetch<SanityTender[]>(tendersQuery, {}, fetchOptions);
  return tenders.map(toCmsTender);
});
