import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/gabarito";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getSiteSettings } from "@/sanity/settings";

export const revalidate = 60;
export const metadata: Metadata = {
  metadataBase: new URL("https://centralcorridor-ttfa.org"),
  title: { default: "Central Corridor | CCTTFA", template: "%s | Central Corridor" },
  description: "The Central Corridor connects seven sovereign nations through integrated, resilient multimodal logistics networks.",
  openGraph: { title: "Central Corridor Transit Transport Facilitation Agency", description: "Seven nations. One corridor to the sea.", type: "website", images: [{ url: "/images/home-hero.png" }] },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: settings?.organisationName || "Central Corridor Transit Transport Facilitation Agency", alternateName: settings?.shortName || "CCTTFA", url: "https://centralcorridor-ttfa.org", email: settings?.email || "ttfa@centralcorridor-ttfa.org", address: { "@type": "PostalAddress", addressLocality: settings?.address || "Dar es Salaam", addressCountry: "TZ" } };
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader settings={settings} /><main id="main-content">{children}</main><SiteFooter settings={settings} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
