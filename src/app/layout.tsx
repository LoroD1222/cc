import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/gabarito";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://centralcorridor-ttfa.org"),
  title: { default: "Central Corridor | CCTTFA", template: "%s | Central Corridor" },
  description: "The Central Corridor connects seven sovereign nations through integrated, resilient multimodal logistics networks.",
  openGraph: { title: "Central Corridor Transit Transport Facilitation Agency", description: "Seven nations. One corridor to the sea.", type: "website", images: [{ url: "/images/home-hero.png" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Central Corridor Transit Transport Facilitation Agency", alternateName: "CCTTFA", url: "https://centralcorridor-ttfa.org", email: "ttfa@centralcorridor-ttfa.org", address: { "@type": "PostalAddress", addressLocality: "Dar es Salaam", addressCountry: "TZ" } };
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
