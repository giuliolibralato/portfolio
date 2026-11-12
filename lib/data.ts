export type Lang = "en" | "es";
export type Audience = "anyone" | "recruiters" | "leads";

export type Project = {
  title: string;
  desc: string;
  type: string;
  year: string;
  href?: string;
  phone?: boolean;
  cover?: { video: string; poster: string }; // looping video for the card cover
  tags?: string[]; // extra type tags after the main one
  client?: string; // shown before the title on the card: “client — title”
  image?: string; // a still from the case, sitting in the card's grey frame
};

export const EMAIL = "giuliolibralatooliva@gmail.com";
export const WHATSAPP = "https://wa.me/+51983203160";
export const LINKEDIN = "https://www.linkedin.com/in/giuliolibralato/";
export const GITHUB = "https://github.com/giuliolibralato";
export const BEHANCE = "https://www.behance.net/giuliolibralatooliva";

export const NAV = ["intro", "work", "experience", "resume", "references", "contact"] as const;

export const INTRO: Record<Audience, [string, string]> = {
  anyone: [
    "I design B2B tools and AI workflows for web and mobile. Lately I've been exploring ways to simplify the small details that make platforms and apps hard to use.",
    "I love taking on new challenges, and I prototype in code when a picture isn't enough.",
  ],
  recruiters: [
    "Product designer with 5 years designing web and mobile products for U.S. and Latin American clients in healthcare, real estate, telecom, insurance and SaaS.",
    "Available now and open to relocation. Fluent in English (C1), native in Spanish.",
  ],
  leads: [
    "I lead work from discovery workshops to user flows, prototypes and design system contributions, and I present the why behind each decision directly to clients.",
    "I use AI (Claude Code, Figma Make, Mobbin MCP) to reach a testable prototype faster.",
  ],
};

export const AUDIENCES: [Audience, string][] = [
  ["anyone", "for anyone"],
  ["recruiters", "recruiters"],
  ["leads", "design leads"],
];

export const PROJECTS: Record<string, Project> = {
  beacon: { client: "Beacon", title: "one sidebar for 60 destinations", desc: "B2B prospecting platform · 5-day sprint", type: "case study", year: "2026", href: "/work/beacon/", cover: { video: "/cases/beacon/cover", poster: "/cases/beacon/cover-poster.webp" } },
  keyway: { client: "Keyway", title: "332 legal fields in 4 acts", desc: "Listing flow for a home-selling product", type: "case study", year: "2026", href: "/work/keyway/", cover: { video: "/cases/keyway/cover", poster: "/cases/keyway/cover-poster.webp" } },
  cdv: { tags: ["website"], client: "Camino de Vida", title: "a site for the first visit", desc: "Information architecture and home for Camino de Vida", type: "case study", year: "2026", href: "/work/cdv/", cover: { video: "/cases/cdv/cover", poster: "/cases/cdv/cover-poster.webp" } },
  digito: { client: "Dígito", title: "gamified timesheets", desc: "SaaS redesign for Dígito · Product Design course", type: "case study", year: "2025", href: "https://www.figma.com/proto/sBBTvq1mUKGzu4n07rMyiH?node-id=72247-64147&t=8lnjHKkBJD2JNIop-6" },
  cinepolis: { title: "Cinépolis UX research", desc: "UX research and UI case · UX/UI course", type: "case study", year: "2023", href: "https://www.figma.com/proto/PxyIyigICANcLSaEwWBZf8/Cin%C3%A9polis-%7C-Proyecto-UX---UI?node-id=1-3&p=f&starting-point-node-id=1%3A3" },
  brightpath: { title: "BrightPath", desc: "Technical test for UX/UI Designer position at Designli", type: "design challenge", year: "2025", href: "https://www.figma.com/design/hDQVOnULGRqM5pmxR0A6io/Design-Test---Giulio-Libralato?node-id=2946-1483" },
  cdvweb: { title: "Camino de Vida", desc: "Church website · cdv.pe", type: "website", year: "2026", href: "https://cdv.pe" },
  cdvmusica: { title: "CDV Música", desc: "Music ministry website · cdvmusica.com", type: "website", year: "2025", href: "https://cdvmusica.com" },
  nexo: { title: "Nexo Summit", desc: "Event site, from design system to SEO", type: "website", year: "2026", href: "https://nexosummit.pe" },
  lessin: { title: "Lessin", desc: "Ed-tech website and design system · in Figma", type: "website", year: "2023", href: "https://www.figma.com/design/aMI8KBC7X9fAnlAEOBCdHL/Lessin---Plataforma-Web?node-id=121-2&p=f" },
  wedding: { title: "Our wedding", desc: "Wedding website, designed and coded", type: "website", year: "2026", href: "https://gyfwedding.vercel.app/" },
  firstlancer: { title: "Firstlancer", desc: "iOS app design · case on Behance", type: "app", year: "2022", phone: true, href: "https://www.behance.net/gallery/156666141/Firstlancer-App" },
  budgy: { title: "Budgy", desc: "Personal finance app, designed and built", type: "passion project", year: "2026", phone: true },
  monthly: { title: "Monthly Budget", desc: "Household budget and grocery-planning website", type: "passion project", year: "2026" },
};

export const TABS: [string, string[]][] = [
  ["selected", ["beacon", "keyway", "cdv", "nexo"]],
  ["cases", ["beacon", "keyway", "cdv", "digito", "brightpath", "cinepolis"]],
  ["websites", ["cdv", "cdvmusica", "nexo", "lessin", "wedding"]],
  ["apps", ["firstlancer", "budgy"]],
  ["passion projects", ["budgy", "monthly"]],
];

export const PIECES = [
  { name: "Avanza Internacional", year: "2022", art: "Avanza · logo", href: "https://www.behance.net/gallery/147727383/AVANZA-Internacional" },
  { name: "DL Group", year: "2022", art: "DL Group · branding", href: "https://www.behance.net/gallery/149637333/BRANDING-DL-GROUP" },
  { name: "Fotomontaje Publicitario II", year: "2025", art: "Fotomontaje Publicitario II", href: "https://www.behance.net/gallery/226440389/Fotomontaje-Publicitario-II" },
  { name: "VOLT x Real Madrid", year: "2025", art: "VOLT x Real Madrid", href: "https://www.behance.net/gallery/226440183/VOLT-Fotomontaje-Publicitario" },
];

export const EXPERIENCE = [
  { co: "Designli", role: "ux/ui & product designer", y: "sep 2025 – oct 2026", p: "Designed 16+ web and mobile products across 6+ industries. Led design in 2-week Solution Labs and 5-day Impact Weeks." },
  { co: "freelance", role: "ux/ui designer", y: "2021 – now", p: "Designed and built the Nexo Summit website, from design system to SEO, with custom ticketing plugins." },
  { co: "Konecta", role: "ui designer", y: "oct 2022 – dec 2024", p: "Visual identities, campaign systems and responsive landing pages for telecom and insurance brands." },
  { co: "minegocioendigital.pe", role: "digital consultant · product developer", y: "2021 – 2022", p: "Designed and built responsive WordPress sites; led a team of 3 across 30–40 clients." },
];

export const REFERENCES = [
  {
    quote: "He’s the kind of teammate who makes the whole design team better. (…) He was great at turning messy requirements into clean, usable flows and handled client feedback with patience and clarity.",
    name: "Iliana Marticorena",
    role: "UX/UI Designer",
    href: "https://www.linkedin.com/in/iliana-marticorena/",
  },
  {
    quote: "In my experience working together with him in software development he has demonstrated not only extensive technical and creative knowledge but also amazing interpersonal and social skills.",
    name: "José Guillén",
    role: "Technical Lead @ Designli",
    href: "https://www.linkedin.com/in/jos%C3%A9-guill%C3%A9n/",
  },
];

export const CURSOR_COLORS: [string, string][] = [
  ["blue", "#007AFF"],
  ["purple", "#7C3AED"],
  ["pink", "#DB2777"],
  ["orange", "#EA580C"],
  ["green", "#16A34A"],
  ["graphite", "#334155"],
];

export const LEGAL: Record<Lang, string> = {
  en: "Client work is shown for portfolio purposes only. All rights belong to Designli, Konecta and their respective clients. Names, brands, colors and data have been changed or removed to protect confidential information.",
  es: "Los proyectos de cliente se muestran con fines de portafolio. Todos los derechos pertenecen a Designli, Konecta y sus clientes. Nombres, marcas, colores y datos se cambiaron o eliminaron para proteger información confidencial.",
};
