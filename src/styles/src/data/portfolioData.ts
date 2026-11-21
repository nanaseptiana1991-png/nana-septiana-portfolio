export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  category: string;
  summary: string;
  objective: string;
  techStack: string[];
  statusLabel: string;
  implementedFeatures: string[];
  inProgressFeatures: string[];
  previewNote: string;
  projectUrl?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  focus: string;
}

export interface EducationItem {
  id: string;
  period: string;
  institution: string;
  degree: string;
  statusNote: string;
}

export const PROFILE_DATA = {
  name: "NANA SEPTIANA",
  headline: "HELLO, I’M NANA.",
  subheadline: "BUILDING DIGITAL EXPERIENCES.",
  shortIntro:
    "Bridging commercial operations, field execution, structured administration, and modern web application development.",
  aboutTitle: "COMMERCIAL DISCIPLINE MEETS DIGITAL EXECUTION.",
  aboutSummary:
    "Professional background across sales, partner acquisition, operational coordination, digital administration, and web-based system development. Focused on turning real-world business workflows into clear, structured, and reliable digital tools.",
  contactHeadline: "LET’S BUILD SOMETHING GREAT.",
  email: "13.nanaseptiana@gmail.com",
  whatsapp: "0895333818131",
  whatsappHref: "https://wa.me/62895333818131",
  githubUrl: "",
  linkedinUrl: "",
};

export const EXPERTISE_DATA = {
  businessAndOperations: [
    "Sales & Business Development",
    "Partner Acquisition",
    "Operational Management",
    "Project Coordination",
    "Data Management",
    "Reporting & Administration",
  ],
  digitalAndTechnology: [
    "Website Development",
    "Web Application Development",
    "HTML, CSS, JavaScript",
    "Google Sheets & Excel",
    "Google Apps Script",
    "Supabase",
    "GitHub",
    "Canva",
    "AI-Assisted Development",
  ],
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "aak-company",
    code: "PROJECT 01",
    title: "AAK COMPANY",
    category: "Enterprise Business Management System",
    summary:
      "Integrated business management web system structured around operational oversight, commercial leads, and inventory/warehouse workflows.",
    objective:
      "Centralize day-to-day operational records, lead tracking, and resource workflows into a structured web application.",
    techStack: ["HTML", "CSS", "JavaScript", "Google Apps Script", "Web System"],
    statusLabel: "Active Development (Core Modules Built & Tested)",
    implementedFeatures: [
      "Core operational data structure & module interface layout",
      "Leads & CRM workflow concept and data entry flow",
      "Inventory & warehouse operational tracking structure",
      "KPI & reporting view structure",
    ],
    inProgressFeatures: [
      "Full end-to-end production hardening across all enterprise modules",
      "Extended multi-role User Management & Procurement automation",
      "Advanced cross-module analytics & packaging workflows",
    ],
    previewNote:
      "Visual preview placeholder — verified application screenshots will be added once final UI captures are ready.",
  },
  {
    id: "lion-parcel-ramdan",
    code: "PROJECT 02",
    title: "LION PARCEL RAMDAN OPERATION SYSTEM",
    category: "Operational Management Web Application",
    summary:
      "Web-based operational management application designed to support daily outlet and field monitoring across attendance, transactions, tracking validation, and reporting.",
    objective:
      "Streamline daily operational visibility and validation records for outlet and field activities.",
    techStack: ["Web Application", "JavaScript", "Spreadsheet / Cloud Data", "Operational UI"],
    statusLabel: "Active Development (Operational Workflows in Progress)",
    implementedFeatures: [
      "Core operational dashboard structure & record layout",
      "Employee attendance & transaction record views",
      "Tracking validation & operational report formatting",
    ],
    inProgressFeatures: [
      "Full live validation edge-case testing & automated reporting sync",
      "Role-based access refinement & historical audit export",
    ],
    previewNote:
      "Visual preview placeholder — verified application screenshots will be added once final UI captures are ready.",
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2025–2026",
    company: "PT Empat Arah Kreasi (Lion Parcel)",
    role: "OSA",
    focus: "Field & outlet operational support, partner coordination, and reporting.",
  },
  {
    id: "exp-2",
    period: "2024–2025",
    company: "PT Banceuy Tunggal Jaya",
    role: "Sales Representative Farmasi",
    focus: "Pharmaceutical sales execution, account follow-up, and commercial reporting.",
  },
  {
    id: "exp-3",
    period: "2023–2024",
    company: "PT Borwita Citra Prima",
    role: "Sales WSP",
    focus: "Distribution sales operations, customer coverage, and order coordination.",
  },
  {
    id: "exp-4",
    period: "2022–2023",
    company: "PT Artaboga Cemerlang",
    role: "Sales (Duta Arta)",
    focus: "Field sales execution, partner engagement, and territory targets.",
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    period: "2023–Present",
    institution: "Universitas INABA",
    degree: "S1 Manajemen",
    statusNote: "Undergraduate Management Studies",
  },
  {
    id: "edu-2",
    period: "2007–2010",
    institution: "SMK PUI Majalengka",
    degree: "Vocational High School",
    statusNote: "Completed",
  },
];
