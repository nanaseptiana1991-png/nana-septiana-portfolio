export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  category: string;
  statusLabel: string;
  previewNote: string;
  summary: string;
  objective: string;
  techStack: string[];
  implementedFeatures: string[];
  inProgressFeatures: string[];
  projectUrl?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
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
    "Business & management background meets sales execution, operational discipline, and web application development.",
  aboutTitle: "BRIDGING FIELD OPERATIONS, PARTNERSHIPS & WEB SYSTEMS.",
  aboutSummary:
    "My work spans commercial outreach, field operations, administrative coordination, and building practical web tools that keep daily workflows structured and measurable.",
  contactHeadline: "LET’S BUILD SOMETHING GREAT.",
  email: "13.nanaseptiana@gmail.com",
  whatsapp: "0895333818131",
  whatsappHref: "https://wa.me/62895333818131",
  githubUrl: "",
  linkedinUrl: "",
};

export const EXPERTISE_DATA = {
  businessAndOperations: [
    "Sales & Partner Acquisition",
    "Field Execution & Outreach",
    "Operational Coordination",
    "Administrative & Reporting Accuracy",
    "Customer & Partner Support",
    "Problem Solving & Workflow Discipline",
  ],
  digitalAndTechnology: [
    "Web Application Development",
    "HTML, CSS & JavaScript",
    "React & Next.js",
    "Google Apps Script",
    "Spreadsheet & Data Management",
    "API & Messaging Integration",
    "UI/UX & Digital Branding",
    "AI-Assisted Development Workflows",
    "Web Hosting & Deployment",
  ],
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "aak-company",
    code: "PROJECT 01",
    title: "AAK COMPANY",
    category: "Web-Based Operational Management System",
    statusLabel: "Active Build",
    previewNote:
      "Preview placeholder: web operational system architecture for expedition, CRM/leads, warehouse, inventory, supplier, and KPI views.",
    summary:
      "A web-based operational management application designed to organize expedition records, prospective leads/CRM, inventory, suppliers, and performance tracking in one workspace.",
    objective:
      "Replace fragmented manual logs with structured modules and clear data visibility for day-to-day business operations.",
    techStack: [
      "HTML",
      "JavaScript",
      "Google Apps Script",
      "PropertiesService",
      "Google Maps Platform",
      "WhatsApp Integration",
    ],
    implementedFeatures: [
      "Core web interface structure and multi-module navigation layout",
      "Expedition entry workflow and operational record handling",
      "Leads & CRM module setup with Google Maps Platform and WhatsApp workflow hooks",
      "Google Apps Script backend integration using PropertiesService",
    ],
    inProgressFeatures: [
      "Full synchronization and edge-case refinement across Warehouse, Inventory, and Supplier modules",
      "KPI Dashboard metric aggregations and role-based workflow polish",
      "Android APK packaging exploration via Android Studio",
    ],
  },
  {
    id: "lion-parcel-ramdan",
    code: "PROJECT 02",
    title: "LION PARCEL RAMDAN OPERATION SYSTEM",
    category: "Courier & Outlet Operations Workflow System",
    statusLabel: "In Progress",
    previewNote:
      "Preview placeholder: courier drop-off, pickup, manifest tracking, and daily outlet operational workflow concept.",
    summary:
      "An operational workflow concept focused on streamlining daily parcel handling, pickup/drop-off coordination, and outlet reporting for courier operations.",
    objective:
      "Improve visibility over daily shipment activity, customer handoffs, and operational checklists at the outlet level.",
    techStack: [
      "Web UI",
      "JavaScript",
      "Operational Workflow Design",
      "Structured Data Logs",
    ],
    implementedFeatures: [
      "Operational workflow mapping for daily outlet transactions and status tracking",
      "Initial interface structure and form/table layout concepts",
    ],
    inProgressFeatures: [
      "Complete transaction lifecycle validation and reporting summaries",
      "Live outlet testing and workflow refinement with daily operational staff",
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-2026-detak-nadi",
    period: "2026",
    role: "Field Executive Intern",
    company: "PT Detak Nadi Indonesia",
    focus:
      "Partner acquisition, field visits, partner onboarding/database updates, outlet branding coordination, and program execution support.",
  },
  {
    id: "exp-2025-2026-sales-ops",
    period: "2025 – 2026",
    role: "Sales & Operational Support",
    company: "Multi-Channel Commercial & Outlet Operations",
    focus:
      "Sales onboarding support, outlet acquisition workflows, promotional execution, and operational coordination.",
  },
  {
    id: "exp-2024-2025-admin-ops",
    period: "2024 – 2025",
    role: "Administrative & Operational Coordination",
    company: "Business & Digital Operations",
    focus:
      "Data organization, reporting accuracy, digital administration, and web-based workflow tools.",
  },
  {
    id: "exp-2022-2024-field-sales",
    period: "2022 – 2024",
    role: "Field Sales & Customer Operations",
    company: "Commercial & Service Channels",
    focus:
      "Direct customer/partner engagement, territory outreach, and consistent daily operational follow-up.",
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-inaba",
    period: "Ongoing",
    institution: "Universitas INABA",
    degree: "Management / Business Studies",
    statusNote: "Higher education coursework in management, business, and digital operations.",
  },
  {
    id: "edu-smk-pui",
    period: "Completed",
    institution: "SMK PUI Majalengka",
    degree: "Vocational Secondary Education",
    statusNote: "Foundational vocational training and discipline.",
  },
];
