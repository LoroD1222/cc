import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Executive Secretary's Message", description: "A message from the Executive Secretary on CCTTFA's regional mandate and priorities.", path: "/about/executive-secretary", image: "/images/leader-flory.png" });

export default function ExecutiveMessagePage() {
  return <><header className="detail-hero"><div className="site-container"><Link className="detail-back" href="/about#secretariat-leadership"><ArrowLeft aria-hidden size={16} /> Secretariat leadership</Link><p className="eyebrow">Office of the Executive Secretary</p><h1>Executive Secretary&apos;s Message</h1><p>Institutional leadership for a connected, resilient and competitive Central Corridor.</p></div></header><main className="section"><div className="site-container executive-message"><div className="executive-portrait"><Image src="/images/leader-flory.png" alt="Adv. Okandju Okonge Flory, Executive Secretary" fill sizes="24rem" /></div><article className="detail-copy"><p className="eyebrow">Adv. Okandju Okonge Flory</p><h2>Executive Secretary</h2><p>The Executive Secretary leads the implementation of decisions of the CCTTFA governing organs, coordinates the Permanent Secretariat and represents the institution in regional and international partnerships.</p><p>Through a shared agenda with Member States, CCTTFA continues to advance practical trade facilitation, stronger logistics networks and infrastructure that connects the region to global maritime pathways.</p><p>This page provides the institutional context for the Executive Secretary&apos;s office. An official message, speeches and statements can be added here once cleared for publication.</p></article></div></main></>;
}
