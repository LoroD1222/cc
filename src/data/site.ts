export type Country = {
  name: string;
  flag: string;
  description: string;
  slug: string;
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
  slug: string;
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
  { slug: "burundi", name: "Burundi", flag: "/images/flag-burundi.png", description: "Key gateway via Lake Tanganyika and the Bujumbura Port, linking water to highways." },
  { slug: "drc", name: "D.R. Congo", flag: "/images/flag-drc.png", description: "Sustains extensive resource networks through the Kalundu and Bukavu lake ports." },
  { slug: "malawi", name: "Malawi", flag: "/images/flag-malawi.png", description: "Acceded in 2023, expanding the corridor southwards via multimodal rail linkages." },
  { slug: "rwanda", name: "Rwanda", flag: "/images/flag-rwanda.png", description: "A critical high-volume land-linked hub connected directly via the Isaka–Kigali line." },
  { slug: "tanzania", name: "Tanzania", flag: "/images/flag-tanzania.png", description: "The maritime anchor state hosting the world-class deepwater Port of Dar es Salaam." },
  { slug: "uganda", name: "Uganda", flag: "/images/flag-uganda.png", description: "Maintains strong northern loop pathways via Lake Victoria and Mutukula port of entry." },
  { slug: "zambia", name: "Zambia", flag: "/images/flag-zambia.png", description: "Integrating deep southern copper-belt logistics directly to Dar es Salaam Port." },
];

export const articles: Article[] = [
  { slug: "lake-tanganyika-authority-cooperation", title: "CCTTFA and Lake Tanganyika Authority Strengthen Cooperation for Sustainable Transport and Regional Trade", excerpt: "CCTTFA and the Lake Tanganyika Authority signed an MoU to advance sustainable transport, maritime safety and regional trade.", image: "/images/news-lake-tanganyika-authority.jpeg", category: "Partnerships", date: "Aug 12, 2026" },
  { slug: "tanzania-maniema-transport-cooperation", title: "Tanzania and Maniema Province Deepen Cooperation on Strategic Transport Infrastructure and Trade Development", excerpt: "A high-level technical engagement advanced strategic infrastructure and trade-development cooperation between Tanzania and Maniema Province.", image: "/images/news-maniema-cooperation.jpeg", category: "Infrastructure", date: "Aug 05, 2026" },
  { slug: "green-freight-emissions-accounting", title: "CCTTFA Strengthens Regional Capacity on Green Freight and Emissions Accounting", excerpt: "Regional participants strengthened practical capacity in freight decarbonisation and emissions-accounting methods.", image: "/images/news-green-freight.jpg", category: "Capacity Building", date: "Jul 30, 2026" },
  { slug: "kigoma-transport-investments", title: "Landmark Transport Investments in Kigoma Strengthen the Central Corridor’s Competitiveness", excerpt: "New investments in Kigoma support a stronger, more competitive multimodal Central Corridor network.", image: "/images/news-kigoma-investments.jpeg", category: "Infrastructure", date: "Jul 20, 2026" },
  { slug: "15th-inter-state-council-of-ministers", title: "15th Inter-State Council of Ministers Meeting Strengthens Regional Cooperation", excerpt: "The 15th Ordinary ICM Meeting in Dar es Salaam advanced strategic Central Corridor priorities and regional cooperation.", image: "/images/news-icm-2026.jpg", category: "Meetings", date: "Jun 18, 2026" },
  { slug: "30th-board-of-directors-meeting", title: "30th Ordinary Board of Directors Meeting Reviews Progress and Guides the Future", excerpt: "Board representatives met in Dar es Salaam to review progress and guide the Central Corridor’s next priorities.", image: "/images/news-board-2026.jpeg", category: "Meetings", date: "Jun 15, 2026" },
];

export type SecretariatStaff = {
  name: string;
  designation: string;
  unit: string;
  photo: string;
};

export const secretariatLeadership: SecretariatStaff[] = [
  { name: "Emmanuel Rutagengwa", designation: "Director — Transport Policy & Planning", unit: "Transport Policy & Planning Directorate", photo: "/images/avatar-placeholder.svg" },
  { name: "Name pending official confirmation", designation: "Director — Infrastructure Development", unit: "Infrastructure Development Directorate", photo: "/images/avatar-placeholder.svg" },
  { name: "Melchior Barantandikiye", designation: "Director — Logistics & Transit Facilitation", unit: "Logistics & Transit Facilitation Directorate", photo: "/images/avatar-placeholder.svg" },
  { name: "Charles Mtonga", designation: "Director — Customs & Trade Facilitation", unit: "Customs & Trade Facilitation Directorate", photo: "/images/avatar-placeholder.svg" },
  { name: "Name pending official confirmation", designation: "Director — Finance & Administration", unit: "Finance & Administration Directorate", photo: "/images/avatar-placeholder.svg" },
  { name: "Name pending official confirmation", designation: "Director — Monitoring, Evaluation & Data", unit: "Monitoring, Evaluation & Data Directorate", photo: "/images/avatar-placeholder.svg" },
  { name: "Grace Kutemba", designation: "Director — Communication & Advocacy", unit: "Communication & Advocacy Directorate", photo: "/images/avatar-placeholder.svg" },
];

export const projects: Project[] = [
  { slug: "kalundu-port-uvira-kamanyola-bukavu-road", title: "Kalundu Port – Uvira – Kamanyola – Bukavu Road", description: "DRC road project covering 50 km, reducing transport costs and improving regional connectivity.", image: "/images/project-road.png", status: "Planned", countries: "DR Congo", cost: "USD 100,000 *", type: "Road" },
  { slug: "kigoma-port-modernisation", title: "Kigoma Port Modernisation", description: "Enhancing lake-container handling at Kigoma Port to support increased trade volumes.", image: "/images/project-port.png", status: "In Progress", countries: "Tanzania", cost: "TBC", type: "Port" },
  { slug: "isaka-kigali-standard-gauge-railway", title: "Isaka – Kigali Standard Gauge Railway", description: "Standard-gauge railway extension connecting Isaka to Kigali and complementing the SGR corridor.", image: "/images/project-rail.png", status: "Planned", countries: "Tanzania, Rwanda", cost: "TBC", type: "Railway" },
  { slug: "central-corridor-road-upgrade", title: "Central Corridor Road Upgrade", description: "Multi-country road improvement programme targeting key transport bottlenecks.", image: "/images/project-truck.png", status: "In Progress", countries: "Tanzania, Rwanda, Burundi, Uganda, DR Congo", cost: "TBC", type: "Road" },
  { slug: "rumonge-gitaza-kabingo-road", title: "Rumonge – Gitaza / Kabingo Road", description: "A proposed road rehabilitation improving connectivity in southern Burundi.", image: "/images/project-yard.png", status: "Awaiting Brief", countries: "Burundi", cost: "TBC", type: "Road" },
  { slug: "kalemie-port-rehabilitation", title: "Kalemie Port Rehabilitation", description: "Proposed rehabilitation of Kalemie Port on Lake Tanganyika.", image: "/images/project-kalemie.png", status: "Awaiting Brief", countries: "DR Congo", cost: "TBC", type: "Port" },
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
  { slug: "interstate-council-of-ministers", title: "Interstate Council of Ministers (ICM)", text: "Ministers of Transport from partner states coordinate policy and meet once a year." },
  { slug: "executive-board", title: "The Executive Board (EB)", text: "Permanent Secretaries and private-sector representatives set general principles and policy." },
  { slug: "stacon", title: "Stakeholders Consultative Committee (STACON)", text: "Provides feedback on projects, activities and corridor performance targets." },
  { slug: "permanent-secretariat", title: "The Permanent Secretariat", text: "Implements decisions and coordinates programmes across all member states." },
];
