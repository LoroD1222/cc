import { NextRequest, NextResponse } from "next/server";

type HelpReply = {
  answer: string;
  link?: { href: string; label: string };
};

const countryPages = [
  { terms: ["burundi"], href: "/countries/burundi", label: "View Burundi profile" },
  { terms: ["drc", "congo", "congolese", "democratic republic"], href: "/countries/drc", label: "View D.R. Congo profile" },
  { terms: ["malawi"], href: "/countries/malawi", label: "View Malawi profile" },
  { terms: ["rwanda", "rwandan"], href: "/countries/rwanda", label: "View Rwanda profile" },
  { terms: ["tanzania", "tanzanian"], href: "/countries/tanzania", label: "View Tanzania profile" },
  { terms: ["uganda", "ugandan"], href: "/countries/uganda", label: "View Uganda profile" },
  { terms: ["zambia", "zambian"], href: "/countries/zambia", label: "View Zambia profile" },
];

function replyFor(message: string): HelpReply {
  const query = message.toLowerCase();
  const country = countryPages.find((item) => item.terms.some((term) => query.includes(term)));
  if (country) return { answer: "This Member State profile brings together its Central Corridor routes, infrastructure, border posts, projects, trade information and key stakeholders.", link: { href: country.href, label: country.label } };

  if (/vacanc|career|job|recruit/.test(query)) return { answer: "Current vacancies are published with other opportunities, including the closing date and application information when available.", link: { href: "/opportunities/vacancies", label: "View vacancies" } };
  if (/consult|terms of reference|\btor\b/.test(query)) return { answer: "Consultancy notices and related terms of reference are available in the Opportunities area.", link: { href: "/opportunities/consultancy", label: "View consultancy notices" } };
  if (/tender|procure|bid|rfp|request for proposal/.test(query)) return { answer: "Tender and procurement notices, documents and contact details are published in the dedicated procurement area.", link: { href: "/tenders", label: "View tenders & procurement" } };
  if (/programme|program|policy|custom|trade facilitation|advocacy/.test(query)) return { answer: "CCTTFA programmes cover policy and planning, infrastructure, logistics, customs and trade facilitation, and communication and advocacy.", link: { href: "/programmes", label: "Explore programmes" } };
  if (/infrastructure|rail|road|port|lake|waterway|border post/.test(query)) return { answer: "The Infrastructure area provides an overview of the Central Corridor’s maritime, road, rail and inland-waterway networks.", link: { href: "/infrastructure", label: "Explore infrastructure" } };
  if (/project|investment|completion|funding/.test(query)) return { answer: "The projects directory shows current project descriptions, status, countries involved and available supporting information.", link: { href: "/projects", label: "View projects" } };
  if (/contact|email|phone|office|secretariat/.test(query)) return { answer: "You can contact the CCTTFA Permanent Secretariat directly for official guidance, documents or support.", link: { href: "/contact", label: "Contact CCTTFA" } };
  if (/hello|hi|help/.test(query)) return { answer: "I can guide you to programmes, infrastructure, opportunities, projects, news, contacts, or a Member State profile. What would you like to find?" };

  return { answer: "I can help you find the right CCTTFA page. Try asking about a programme, infrastructure, tender, vacancy, project, Member State or how to contact the Secretariat.", link: { href: "/contact", label: "Contact CCTTFA for assistance" } };
}

export async function POST(request: NextRequest) {
  let body: { message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send a valid question." }, { status: 400 });
  }

  if (typeof body.message !== "string") return NextResponse.json({ error: "Please enter a question." }, { status: 400 });
  const message = body.message.trim();
  if (message.length < 2 || message.length > 500) return NextResponse.json({ error: "Questions must be between 2 and 500 characters." }, { status: 400 });

  return NextResponse.json(replyFor(message));
}
