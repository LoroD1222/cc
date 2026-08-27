export type Country = {
  name: string;
  flag: string;
  description: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

export type ProjectStatus = "Planned" | "In Progress" | "Awaiting Brief" | "Ongoing";

export type Project = {
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  countries: string;
  cost: string;
  type: "Railway" | "Road" | "Port";
};

export const publicNavigation = [
  { label: "About us", href: "/about" },
  { label: "The Corridor", href: "/corridor" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Tenders", href: "/tenders" },
  { label: "Resources", href: "/resources" },
];

export const portalNavigation = [
  { label: "Portal & Services", href: "/portal" },
  { label: "Contact Us", href: "/contact" },
  { label: "Feedback", href: "/feedback" },
];

export const countries: Country[] = [
  { name: "Burundi", flag: "/images/flag-burundi.png", description: "Key gateway via Lake Tanganyika and the Bujumbura Port, linking water to highways." },
  { name: "D.R. Congo", flag: "/images/flag-drc.png", description: "Sustains extensive resource networks through the Kalundu and Bukavu lake ports." },
  { name: "Malawi", flag: "/images/flag-malawi.png", description: "Acceded in 2023, expanding the corridor southwards via multimodal rail linkages." },
  { name: "Rwanda", flag: "/images/flag-rwanda.png", description: "A critical high-volume land-linked hub connected directly via the Isaka–Kigali line." },
  { name: "Tanzania", flag: "/images/flag-tanzania.png", description: "The maritime anchor state hosting the world-class deepwater Port of Dar es Salaam." },
  { name: "Uganda", flag: "/images/flag-uganda.png", description: "Maintains strong northern loop pathways via Lake Victoria and Mutukula port of entry." },
  { name: "Zambia", flag: "/images/flag-zambia.png", description: "Integrating deep southern copper-belt logistics directly to Dar es Salaam Port." },
];

export const articles: Article[] = [
  { slug: "board-of-directors-reviews-progress", title: "30th Board of Directors Reviews Progress and Guides Future", excerpt: "Board reviewed FY2025/26 achievements, approved the next Business Plan and handed over chairmanship.", image: "/images/news-board.png", category: "Meetings", date: "Jun 16, 2026" },
  { slug: "kigoma-transport-investments", title: "Landmark Transport Investments in Kigoma Strengthen Corridor", excerpt: "Official delegation evaluates railway and dry-port readiness to receive regional transit cargo.", image: "/images/news-cover-2.png", category: "Infrastructure", date: "Jul 20, 2026" },
  { slug: "green-freight-capacity", title: "CCTTFA Strengthens Capacity on Green Freight", excerpt: "A joint regional initiative builds emissions accounting capacity across the corridor.", image: "/images/news-cover-3.png", category: "Capacity Building", date: "Jul 30, 2026" },
  { slug: "malawi-accedes-central-corridor", title: "Malawi Accedes to Central Corridor Agreement", excerpt: "The agreement expands the partnership and strengthens regional connectivity.", image: "/images/news-cover-1.png", category: "Accession", date: "Dec 01, 2023" },
  { slug: "single-customs-territory", title: "Single Customs Territory Advances Along the Corridor", excerpt: "Customs bodies continue harmonizing procedures to reduce border clearance times.", image: "/images/news-cover-4.png", category: "Meetings", date: "Jul 14, 2024" },
  { slug: "transport-observatory-performance", title: "Transport Observatory Tracks Corridor Performance", excerpt: "The observatory reveals Dar Port dwell times decreased to 4.2 days.", image: "/images/news-cover-5.png", category: "Capacity Building", date: "Aug 12, 2025" },
];

export const projects: Project[] = [
  { title: "Kalundu Port – Uvira – Kamanyola – Bukavu Road", description: "DRC road project covering 50 km, reducing transport costs and improving regional connectivity.", image: "/images/project-road.png", status: "Planned", countries: "DR Congo", cost: "USD 100,000 *", type: "Road" },
  { title: "Kigoma Port Modernisation", description: "Enhancing lake-container handling at Kigoma Port to support increased trade volumes.", image: "/images/project-port.png", status: "In Progress", countries: "Tanzania", cost: "TBC", type: "Port" },
  { title: "Isaka – Kigali Standard Gauge Railway", description: "Standard-gauge railway extension connecting Isaka to Kigali and complementing the SGR corridor.", image: "/images/project-rail.png", status: "Planned", countries: "Tanzania, Rwanda", cost: "TBC", type: "Railway" },
  { title: "Central Corridor Road Upgrade", description: "Multi-country road improvement programme targeting key transport bottlenecks.", image: "/images/project-truck.png", status: "In Progress", countries: "Tanzania, Rwanda, Burundi, Uganda, DR Congo", cost: "TBC", type: "Road" },
  { title: "Rumonge – Gitaza / Kabingo Road", description: "A proposed road rehabilitation improving connectivity in southern Burundi.", image: "/images/project-yard.png", status: "Awaiting Brief", countries: "Burundi", cost: "TBC", type: "Road" },
  { title: "Kalemie Port Rehabilitation", description: "Proposed rehabilitation of Kalemie Port on Lake Tanganyika.", image: "/images/project-kalemie.png", status: "Awaiting Brief", countries: "DR Congo", cost: "TBC", type: "Port" },
];

export const resources = [
  { type: "Annual Report", year: "2025", title: "Transport Observatory Annual Report 2025", size: "12.4 MB" },
  { type: "Masterplan Document", year: "2026", title: "Corridor Infrastructure Masterplan 2026–2030", size: "45.2 MB" },
  { type: "Regional Treaty", year: "2023", title: "Transit Facilitation Agreement Amended Treaty", size: "8.1 MB" },
  { type: "Operational Manual", year: "2024", title: "One-Stop Border Post Standard Operating Manual", size: "15.6 MB" },
  { type: "Regional Protocol", year: "2025", title: "Lake Tanganyika Port Safety Protocols", size: "5.2 MB" },
  { type: "Technical Framework", year: "2026", title: "Joint Southern Logistics Integration Framework", size: "14.8 MB" },
];

export const organs = [
  { title: "Interstate Council of Ministers (ICM)", text: "Ministers of Transport from partner states coordinate policy and meet once a year." },
  { title: "The Executive Board (EB)", text: "Permanent Secretaries and private-sector representatives set general principles and policy." },
  { title: "Stakeholders Consultative Committee (STACON)", text: "Provides feedback on projects, activities and corridor performance targets." },
  { title: "The Permanent Secretariat", text: "Implements decisions and coordinates programmes across all member states." },
];
