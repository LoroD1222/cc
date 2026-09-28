import {cache} from "react";
import {client} from "@/sanity/client";
import {contentPageBySlugQuery, contentPagesByKindQuery} from "@/sanity/queries";

export type ContentPageKind = "service" | "corridor" | "procurement";

type SanityBlock = {
  children?: Array<{text?: string}>;
};

type SanityContentPage = {
  _id: string;
  title: string;
  slug: string;
  pageKind: ContentPageKind;
  summary?: string | null;
  bodyPreview?: SanityBlock[] | null;
  body?: unknown[] | null;
};

export type CmsContentPage = {
  id: string;
  title: string;
  slug: string;
  kind: ContentPageKind;
  summary: string;
  body: unknown[];
};

function blockText(blocks?: SanityBlock[] | null) {
  return (blocks || []).flatMap((block) => block.children || []).map((child) => child.text || "").join(" ");
}

function cleanSummary(value: string) {
  const cleaned = value.replace(/\s+/g, " ").trim();
  const builderStart = cleaned.indexOf(".fusion");
  const withoutBuilderStyles = builderStart >= 0 ? cleaned.slice(0, builderStart).trim() : cleaned;
  if (withoutBuilderStyles.length <= 240) return withoutBuilderStyles;
  return `${withoutBuilderStyles.slice(0, 237).trimEnd()}…`;
}

function toCmsPage(page: SanityContentPage): CmsContentPage {
  const summary = cleanSummary(page.summary || blockText(page.bodyPreview) || "This CCTTFA information is available for corridor stakeholders.");
  return {
    id: page._id,
    title: page.title,
    slug: page.slug,
    kind: page.pageKind,
    summary,
    body: page.body || [],
  };
}

const fetchOptions = {next: {revalidate: 60, tags: ["contentPage"]}};

export const getContentPages = cache(async (pageKind: ContentPageKind): Promise<CmsContentPage[]> => {
  const pages = await client.fetch<SanityContentPage[]>(contentPagesByKindQuery, {pageKind}, fetchOptions);
  return pages.map(toCmsPage);
});

export const getContentPage = cache(async (pageKind: ContentPageKind, slug: string): Promise<CmsContentPage | null> => {
  const page = await client.fetch<SanityContentPage | null>(contentPageBySlugQuery, {pageKind, slug}, fetchOptions);
  return page ? toCmsPage(page) : null;
});
