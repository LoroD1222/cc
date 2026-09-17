import { Download, FolderUp } from "lucide-react";
import { DemoSubmitButton } from "@/components/interactive";
import { Field, PageHero, SectionHeading } from "@/components/ui";
import { createPageMetadata } from "@/lib/metadata";
import { NewsArticleBody } from "@/sanity/portable-text";
import { getTenders } from "@/sanity/tenders";

export const revalidate = 60;
export const metadata = createPageMetadata({ title: "Procurement Opportunities & Tenders", description: "View active CCTTFA procurement opportunities, download tender documents and review the digital submission process.", path: "/tenders", image: "/images/tenders-hero.png" });

export default async function TendersPage() {
  const tenders = await getTenders();
  const tenderDetails = tenders.filter((tender) => tender.description.length);

  return <>
    <PageHero eyebrow="Procurement Platform" title="Procurement Opportunities & Tenders" description="View active international tenders, submit digital bids securely, and explore guidelines for regional freight infrastructure developments." image="/images/tenders-hero.png" />
    <section className="section"><div className="site-container">
      <SectionHeading title="Active Procurement & Public Tenders" />
      <div className="tender-table" role="table" aria-label="Public tenders"><div className="tender-head" role="row"><span>Reference No.</span><span>Procurement Title</span><span>Deadline</span><span>Status</span><span>Documents</span></div>{tenders.map((tender) => <div className="tender-row" role="row" key={tender.id}><strong>{tender.referenceNumber}</strong><span><strong>{tender.title}</strong>{tender.summary && <small>{tender.summary}</small>}</span><time>{tender.closingDate || "Not stated"}</time><span><i>{tender.status}</i></span><span>{tender.documents.length ? tender.documents.map((document) => document.url ? <a className="text-link" href={document.url} target="_blank" rel="noreferrer" key={document.id}>Download <Download aria-hidden size={14} /></a> : <span key={document.id}>{document.title}</span>) : "No documents published"}</span></div>)}{tenders.length === 0 && <div className="tender-row muted-row" role="row"><span>—</span><span>No procurement notices are currently published.</span><span>—</span><span>—</span><span>—</span></div>}</div>
      <div className="tender-mobile">{tenders.map((tender) => <article key={tender.id}><strong>{tender.referenceNumber}</strong><h3>{tender.title}</h3>{tender.summary && <p>{tender.summary}</p>}<dl><div><dt>Published</dt><dd>{tender.publishedDate || "Not stated"}</dd></div><div><dt>Deadline</dt><dd>{tender.closingDate || "Not stated"}</dd></div><div><dt>Status</dt><dd>{tender.status}</dd></div>{tender.contactEmail && <div><dt>Contact</dt><dd><a href={`mailto:${tender.contactEmail}`}>{tender.contactEmail}</a></dd></div>}</dl>{tender.documents.length ? tender.documents.map((document) => document.url ? <a className="button button-dark" href={document.url} target="_blank" rel="noreferrer" key={document.id}><Download aria-hidden size={15} /> {document.title}</a> : null) : <p>No tender documents have been published.</p>}</article>)}{tenders.length === 0 && <p className="empty-state">No procurement notices are currently published.</p>}</div>
      {tenderDetails.length > 0 && <section className="steps-panel"><SectionHeading title="Tender details" />{tenderDetails.map((tender) => <article key={tender.id}><h3>{tender.title}</h3><NewsArticleBody value={tender.description} /></article>)}</section>}
      <section className="steps-panel"><SectionHeading title="Procurement Guidelines & Submission Process" /><div className="steps-grid">{[["Request Tender", "Download the complete bidding documents and technical requirements directly from our portal."], ["Verify Compliance", "Ensure your firm meets regional liaison standards and joint liability thresholds."], ["Submit Digitally", "Upload and encrypt technical and financial envelopes before the deadline."]].map(([title, text], index) => <article key={title}><span>{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <form className="form-card tender-form"><SectionHeading title="Secure Tender Submission Portal" /><div className="form-grid"><Field label="Company Regular Name" name="company" placeholder="Enter legal entity name..." /><Field label="Representative Email Address" name="email" type="email" placeholder="primary.contact@company.com" /><Field label="Procurement Reference Number" name="reference" placeholder="e.g., CCTTFA/PR/2026/04" /><label className="field full-span"><span>Upload Technical & Financial Envelopes</span><span className="file-drop"><FolderUp aria-hidden size={28} /><strong>Click to upload bid files</strong><small>PDF or ZIP only (Max 100MB)</small><input className="sr-only" type="file" multiple /></span></label></div><DemoSubmitButton>Submit Official Bidding Package</DemoSubmitButton></form>
    </div></section>
  </>;
}
