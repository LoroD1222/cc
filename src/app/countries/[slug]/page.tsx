import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, FileText, MapPinned } from "lucide-react";
import { notFound } from "next/navigation";
import { countries } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

type StakeholderGroup = { title: string; members: string[] };
type CountryDetail = {
  routes: string[];
  infrastructure: string[];
  borders: string[];
  projects: string[];
  cargo: string;
  institution: string;
  stakeholderGroups: StakeholderGroup[];
};

const countryDetails: Record<string, CountryDetail> = {
  burundi: {
    routes: ["Bujumbura – Rumonge – Dar es Salaam", "Lake Tanganyika maritime link"],
    infrastructure: ["Port of Bujumbura", "Rumonge–Gitaza road corridor"], borders: ["Kobero / Kabanga"], projects: ["Rumonge – Gitaza / Kabingo Road"],
    cargo: "Lake-linked trade and regional imports serving Burundi and eastern DRC.", institution: "Ministry of Transport, Works & Equipment",
    stakeholderGroups: [
      { title: "Ministries", members: ["Ministry of Transport, Works & Equipment", "Ministry of Commerce and Industries"] },
      { title: "Public authorities & operators", members: ["Office Burundais des Recettes (OBR)", "Autorité Portuaire, Maritime et Ferroviaire du Burundi (AMPF)", "Office des Routes (OdR)", "Bureau Burundais de Normalisation (BBN)", "Police de l’Air des Frontières et des Étrangers (PAFE)", "Police Spéciale de Roulage"] },
      { title: "Private sector & industry", members: ["Chambre de Commerce, d’Industries, d’Agriculture et d’Artisanat du Burundi (CCIB)", "Association des Armateurs du Burundi", "Burundi Global Ports Services (GPS)", "Société d’Entreposage des Produits Pétroliers (SEP)", "Association Burundaise des Agences en Douanes et Transitaires (ABADT)", "Association des Transporteurs Internationaux du Burundi (ATIB)"] },
    ],
  },
  drc: {
    routes: ["Kalundu – Uvira – Bukavu – Dar es Salaam", "Lake Tanganyika access route"], infrastructure: ["Kalundu Port", "Kalemie Port", "Uvira–Bukavu road network"], borders: ["Kavimvira / Gatumba"], projects: ["Kalundu Port – Uvira – Kamanyola – Bukavu Road", "Kalemie Port Rehabilitation"],
    cargo: "Minerals, agricultural products and strategic imports through lake and road networks.", institution: "Ministry of Transport and Ways of Communications",
    stakeholderGroups: [
      { title: "Ministries", members: ["Ministry of Transport and Ways of Communications", "Ministry responsible for Public Works and Infrastructure", "Ministry of Regional Cooperation", "Ministry of Small and Medium Enterprises", "Ministry of Trade and Industry"] },
      { title: "Public authorities & operators", members: ["Société Nationale des Chemins de Fer du Congo (SNCC)", "La Générale des Carrières et des Mines (GECAMINES)", "Régie des Voies Fluviales (RVF)", "Société Commerciale des Transports et des Ports (SCTP)", "Office des Routes (OR)", "Office de Gestion du Fret Multimodal (OGEFREM)", "Lignes Maritimes Congolaises (LMC)", "Direction Générale des Douanes et Accises (DGDA)", "Chemin de Fer des Uélé (CFU)", "Office Congolais de Contrôle (OCC)", "Direction Générale des Migrations"] },
      { title: "Private sector & industry", members: ["Fédération des Entreprises du Congo (FEC)"] },
    ],
  },
  malawi: {
    routes: ["Southern extension to Dar es Salaam", "Rail and road connections through Tanzania"], infrastructure: ["Cross-border rail interfaces", "Regional road links"], borders: ["Songwe / Kasumulu"], projects: ["Southern rail and multimodal links — client input pending"],
    cargo: "Regional agricultural exports and essential imports moving through southern corridor connections.", institution: "Ministry of Transport and Public Works",
    stakeholderGroups: [
      { title: "Ministries & public bodies", members: ["Ministry of Transport and Public Works", "Ministry responsible for Trade", "Ministry responsible for Industrial Development", "Ministry/Department responsible for Immigration Services", "Malawi Bureau of Standards", "The Roads Authority", "Malawi Revenue Authority"] },
      { title: "Transport & logistics operators", members: ["Malawi Railways (1994) Limited", "Marine Transport Operators", "Association of Freight Forwarders and Clearing Agents", "Road Transporters Association of Malawi"] },
      { title: "Private sector & industry", members: ["Malawi Confederation of the Chambers of Commerce and Industry (MCCCI)", "Private Sector Federation"] },
    ],
  },
  rwanda: {
    routes: ["Kigali – Isaka – Dar es Salaam", "Kigali logistics platform connections"], infrastructure: ["Kigali Logistics Platform", "Isaka–Kigali SGR interface"], borders: ["Rusumo / Rusumo"], projects: ["Isaka – Kigali Standard Gauge Railway", "Central Corridor Road Upgrade"],
    cargo: "High-value imports, consumer goods and export cargo supported by integrated customs processes.", institution: "Ministry of Infrastructure",
    stakeholderGroups: [
      { title: "Ministries & public bodies", members: ["Ministry of Infrastructure", "Ministry of Trade and Industry", "Ministry of Finance and Economic Planning", "Ministry of Foreign Affairs and Cooperation", "Rwanda Revenue Authority", "Rwanda Transport Development Authority (RTDA)", "Rwanda Development Board", "Rwanda Standards Board (RSB)", "Directorate of Rwanda Immigration/Emigration", "Rwanda Police Force – Traffic Police"] },
      { title: "Transport, logistics & industry", members: ["Magasins Généraux du Rwanda (MAGERWA)", "Association of Transporters of Rwanda (ATAR)", "Association of Insurers of Rwanda", "Association of Clearing Forwarding Agents of Rwanda (ADAR)", "Rwanda Mining Association", "Rwanda Petroleum Exporters Association"] },
      { title: "Private sector", members: ["Private Sector Federation – Rwanda"] },
    ],
  },
  tanzania: {
    routes: ["Dar es Salaam – Isaka – Kigali", "Central railway, road and lake networks"], infrastructure: ["Port of Dar es Salaam", "Isaka dry port", "Kigoma Port"], borders: ["Kabanga / Kobero", "Rusumo / Rusumo", "Mutukula / Mutukula"], projects: ["Kigoma Port Modernisation", "Isaka – Kigali Standard Gauge Railway", "Central Corridor Road Upgrade"],
    cargo: "Maritime gateway cargo, containers, bulk commodities and regional transit freight.", institution: "Ministry of Transport",
    stakeholderGroups: [
      { title: "Ministries & public bodies", members: ["Ministry of Transport", "Ministry of Works", "Ministry of Trade and Industry", "Tanzania Roads Agency (TANROADS)", "Tanzania Revenue Authority", "Tanzania Police Force – Traffic Police", "Directorate of Tanzania Immigration", "Tanzania Bureau of Standards (TBS)", "National Development Corporation (NDC)"] },
      { title: "Transport & logistics operators", members: ["Tanzania Ports Authority (TPA)", "Tanzania International Container Terminal Services (TICTS)", "Tanzania Railways Ltd", "Rail Assets Holding Company (RAHCO)", "Surface and Marine Transport Regulatory Authority (SUMATRA)", "Marine Services Company Limited (MSCL)", "Tanzania Shipping Agencies Association (TASAA)", "Tanzania Freight Forwarders Association (TAFFA)", "Tanzania Truck Owners Association (TATOA)"] },
      { title: "Private sector", members: ["Tanzania Chamber of Commerce, Industries and Agriculture (TCCIA)"] },
    ],
  },
  uganda: {
    routes: ["Lake Victoria northern loop", "Mutukula – Dar es Salaam access"], infrastructure: ["Lake Victoria terminals", "Mutukula trade gateway"], borders: ["Mutukula / Mutukula"], projects: ["Central Corridor Road Upgrade"],
    cargo: "Regional consumer goods, agricultural products and transit cargo via lake and road corridors.", institution: "Ministry of Works & Transport",
    stakeholderGroups: [
      { title: "Ministries & public bodies", members: ["Ministry of Works & Transport", "Ministry of Trade, Industry & Tourism", "Ministry of Finance", "Ministry of Foreign Affairs", "Uganda Revenue Authority (URA)", "Uganda National Road Agency (UNRA)", "Uganda Bureau of Standards (UBS)", "Uganda Police Force – Traffic Police", "Directorate of Uganda Immigration"] },
      { title: "Transport & logistics operators", members: ["Uganda Railways Corporation (URC)", "Uganda Freight Forwarders Association (UFFA)", "Uganda Importers Exporters Association (UGIETA)", "Kampala City Traders Association (KACITA)"] },
      { title: "Private sector & industry", members: ["Uganda Manufacturers Association (UMA)", "Uganda National Chamber of Commerce and Industry (UNCCI)", "Private Sector Foundation Uganda (PSFU)"] },
    ],
  },
  zambia: {
    routes: ["Southern copper-belt connections", "TAZARA and road access to Dar es Salaam"], infrastructure: ["TAZARA rail interface", "Southern road links"], borders: ["Tunduma / Nakonde"], projects: ["Southern logistics integration — client input pending"],
    cargo: "Copper-belt and agricultural exports alongside regional imports through Tanzania.", institution: "Ministry of Transport and Logistics",
    stakeholderGroups: [
      { title: "Ministries & public bodies", members: ["Ministry of Transport and Logistics", "Ministry of Commerce, Trade and Industry", "Ministry of Infrastructure", "Zambia Revenue Authority (ZRA)", "Road Transport Safety Agency (RTSA)", "Zambia Bureau of Standards (ZABS)", "Zambia Compulsory Standards Agency (ZCSA)", "Department of Immigration", "Zambia Development Agency (ZDA)", "Road Development Agency (RDA)"] },
      { title: "Transport & industry associations", members: ["Zambia Railways Limited (ZRL)", "Oil Transporters Association of Zambia", "SADC Truck Drivers Association of Zambia", "Petroleum Transporters Association of Zambia", "Copperbelt Open Truckers Association"] },
    ],
  },
};

export const dynamicParams = false;
type CountryPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return countries.map((country) => ({ slug: country.slug })); }

export async function generateMetadata({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  return country ? createPageMetadata({ title: `${country.name} Profile`, description: country.description, path: `/countries/${country.slug}`, image: country.flag }) : {};
}

export default async function CountryProfilePage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  const detail = country && countryDetails[country.slug];
  if (!country || !detail) notFound();

  return <>
    <header className="detail-hero"><div className="site-container"><Link className="detail-back" href="/about#partner-states"><ArrowLeft aria-hidden size={16} /> All Member States</Link><div className="country-hero-title"><span><Image src={country.flag} alt="" fill sizes="5rem" /></span><div><p className="eyebrow">Member State Profile</p><h1>{country.name}</h1><p>{country.description}</p></div></div></div></header>
    <main className="section"><div className="site-container profile-layout"><section className="profile-intro"><p className="eyebrow">Central Corridor Partnership</p><h2>{country.name} on the Central Corridor</h2><p>{country.description} The profile brings together the country&apos;s corridor connections, infrastructure priorities, trade information and institutional focal points.</p></section><div className="profile-grid"><section><h2>Central Corridor routes</h2><ul>{detail.routes.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Major infrastructure</h2><ul>{detail.infrastructure.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Border posts</h2><ul>{detail.borders.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Current projects</h2><ul>{detail.projects.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Trade & cargo</h2><p>{detail.cargo}</p></section><section><h2>National focal institution</h2><p>{detail.institution}</p></section></div>
      <section className="country-stakeholders"><div className="country-stakeholders-heading"><Building2 aria-hidden size={24} /><div><p className="eyebrow">Country coordination network</p><h2>Key stakeholders</h2><p>Ministries, public institutions, operators and industry organisations relevant to Central Corridor work in {country.name}.</p></div></div><div className="stakeholder-groups">{detail.stakeholderGroups.map((group) => <article className="stakeholder-group" key={group.title}><h3>{group.title}</h3><ul>{group.members.map((member) => <li key={member}>{member}</li>)}</ul></article>)}</div><small>Stakeholder list migrated from the original public CCTTFA website. The Secretariat should confirm names and mandates whenever national appointments or institutional responsibilities change.</small></section>
      <section className="profile-resources"><div><MapPinned aria-hidden size={24} /><h2>Map & location</h2><p>View this Member State&apos;s place in the integrated Central Corridor network.</p><Link className="text-link" href="/corridor">Explore corridor routes <ArrowRight aria-hidden size={16} /></Link></div><div><FileText aria-hidden size={24} /><h2>Related documents & news</h2><p>Country-specific documents and news will be published here as they are cleared for release.</p><Link className="text-link" href="/news">View latest updates <ArrowRight aria-hidden size={16} /></Link></div></section>
    </div></main>
  </>;
}
