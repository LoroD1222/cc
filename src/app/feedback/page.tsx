import { DemoSubmitButton, RatingInput } from "@/components/interactive";
import { Field, PageHero, SectionHeading, TextAreaField } from "@/components/ui";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Stakeholder Feedback", description: "Report non-tariff barriers, customs delays, logistics issues and suggested improvements to the CCTTFA Secretariat.", path: "/feedback", image: "/images/feedback-hero.png" });

const improvements = [
  { title: "Mutukula Border Customs Post", before: "Severe dwell delays averaging 18 hours due to manually compiled single-window databases.", after: "Automated custom sync pipelines reduced average transit delays to 1.8 hours.", date: "Dec 2025" },
  { title: "Lake Tanganyika Barge Access", before: "Lack of deep barge coordinate mappings and slow lake-water clearances at Kalundu.", after: "Shared GPS routes and unified marine border documents integrated directly.", date: "Jan 2026" },
  { title: "Dar es Salaam Port Dwell", before: "Heavy container storage blockages due to legacy clearance networks and slow paperwork.", after: "Digital portal dispatch secured a 4.2-day average turnaround.", date: "Feb 2026" },
];

export default function FeedbackPage() {
  return <>
    <PageHero eyebrow="Community Observatory" title="Your Voice Matters" description="Help us eliminate non-tariff trade barriers. Share suggestions, report customs delays, and rate our logistics network performance." image="/images/feedback-hero.png" position="center 45%" />
    <section className="section"><div className="site-container feedback-grid"><div><SectionHeading eyebrow="Submit Feedback" title="Stakeholder Feedback Form" description="Submit feedback directly to the CCTTFA Permanent Secretariat. All responses help improve corridor services and are reviewed through the STACON process." /><div className="form-card optional-info"><h3>Your Information (Optional)</h3><div className="form-grid"><Field label="Your Name" name="name" placeholder="Enter name" /><Field label="Your Contact Email" name="email" type="email" placeholder="Enter email" /></div></div></div><form className="form-card feedback-form"><h2>Feedback Details</h2><label className="field"><span>Observation Category</span><select name="category"><option>Service Quality & Custom Delay</option><option>Infrastructure</option><option>Safety</option></select></label><RatingInput /><TextAreaField label="Detailed Feedback" name="feedback" placeholder="Describe issue, non-tariff barrier, or suggested improvement in detail..." /><DemoSubmitButton>Submit Feedback</DemoSubmitButton></form></div></section>
    <section className="section section-muted"><div className="site-container"><SectionHeading eyebrow="Support Resources" title="Common Portal Questions" align="center" /><details className="faq-card" open><summary>How are non-tariff barriers reported and handled?</summary><p>Submitted logs immediately alert Secretariat officers who coordinate with focal points for rapid bilateral resolution.</p></details></div></section>
    <section className="section"><div className="site-container"><SectionHeading eyebrow="Actionable Results" title="Past Improvement Logs" /><div className="improvement-grid">{improvements.map((item) => <article className="improvement-card" key={item.title}><h3>{item.title}</h3><p><strong>Before:</strong> {item.before}</p><p><strong>After:</strong> {item.after}</p><footer><span>Completed {item.date}</span><span>Pending verification</span></footer></article>)}</div></div></section>
  </>;
}
