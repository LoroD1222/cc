import { Download, FolderUp } from "lucide-react";
import { DemoSubmitButton } from "@/components/interactive";
import { Field, PageHero, SectionHeading } from "@/components/ui";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Procurement Opportunities & Tenders", description: "View active CCTTFA procurement opportunities, download tender documents and review the digital submission process.", path: "/tenders", image: "/images/tenders-hero.png" });

const tenders = [{ reference: "CCTTFA/PR/2026/04", title: "Provision of Medical Insurance Service Provider", deadline: "Nov 30, 2026", status: "Open" }];

export default function TendersPage() {
  return <>
    <PageHero eyebrow="Procurement Platform" title="Procurement Opportunities & Tenders" description="View active international tenders, submit digital bids securely, and explore guidelines for regional freight infrastructure developments." image="/images/tenders-hero.png" />
    <section className="section"><div className="site-container">
      <SectionHeading title="Active Procurement & Public Tenders" />
      <div className="tender-table" role="table" aria-label="Active tenders"><div className="tender-head" role="row"><span>Reference No.</span><span>Procurement Title</span><span>Deadline</span><span>Status</span><span>Documents</span></div>{tenders.map((tender) => <div className="tender-row" role="row" key={tender.reference}><strong>{tender.reference}</strong><span>{tender.title}</span><time>{tender.deadline}</time><span><i>{tender.status}</i></span><button type="button">Download <Download aria-hidden size={14} /></button></div>)}{Array.from({ length: 4 }).map((_, index) => <div className="tender-row muted-row" role="row" key={index}><span>—</span><span>Awaiting new tender — check back for updates</span><span>—</span><span>—</span><span>—</span></div>)}</div>
      <div className="tender-mobile">{tenders.map((tender) => <article key={tender.reference}><strong>{tender.reference}</strong><h3>{tender.title}</h3><dl><div><dt>Deadline</dt><dd>{tender.deadline}</dd></div><div><dt>Status</dt><dd>{tender.status}</dd></div></dl><button className="button button-dark" type="button"><Download aria-hidden size={15} /> Download Documents</button></article>)}</div>
      <section className="steps-panel"><SectionHeading title="Procurement Guidelines & Submission Process" /><div className="steps-grid">{[["Request Tender", "Download the complete bidding documents and technical requirements directly from our portal."], ["Verify Compliance", "Ensure your firm meets regional liaison standards and joint liability thresholds."], ["Submit Digitally", "Upload and encrypt technical and financial envelopes before the deadline."]].map(([title, text], index) => <article key={title}><span>{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <form className="form-card tender-form"><SectionHeading title="Secure Tender Submission Portal" /><div className="form-grid"><Field label="Company Regular Name" name="company" placeholder="Enter legal entity name..." /><Field label="Representative Email Address" name="email" type="email" placeholder="primary.contact@company.com" /><Field label="Procurement Reference Number" name="reference" placeholder="e.g., CCTTFA/PR/2026/04" /><label className="field full-span"><span>Upload Technical & Financial Envelopes</span><span className="file-drop"><FolderUp aria-hidden size={28} /><strong>Click to upload bid files</strong><small>PDF or ZIP only (Max 100MB)</small><input className="sr-only" type="file" multiple /></span></label></div><DemoSubmitButton>Submit Official Bidding Package</DemoSubmitButton></form>
    </div></section>
  </>;
}
