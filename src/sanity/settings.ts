import {cache} from "react";
import {client} from "@/sanity/client";
import {siteSettingsQuery} from "@/sanity/queries";

type SanitySiteSettings = {
  organisationName?: string | null;
  shortName?: string | null;
  tagline?: string | null;
  logo?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  footerNote?: string | null;
  socialLinks?: Array<{platform?: string | null; url?: string | null}> | null;
};

export type SiteSettings = {
  organisationName?: string;
  shortName?: string;
  tagline?: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  footerNote?: string;
  socialLinks: Array<{platform: string; url: string}>;
};

const fetchOptions = {next: {revalidate: 60, tags: ["siteSettings"]}};

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  const settings = await client.fetch<SanitySiteSettings | null>(siteSettingsQuery, {}, fetchOptions);
  if (!settings) return null;

  return {
    organisationName: settings.organisationName || undefined,
    shortName: settings.shortName || undefined,
    tagline: settings.tagline || undefined,
    logo: settings.logo || undefined,
    email: settings.email || undefined,
    phone: settings.phone || undefined,
    address: settings.address || undefined,
    footerNote: settings.footerNote || undefined,
    socialLinks: (settings.socialLinks || []).flatMap((link) => link.platform && link.url ? [{platform: link.platform, url: link.url}] : []),
  };
});
