"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Mail,
  MessageCircle,
} from "lucide-react";

const HERO_PORTRAIT_URL = "/images/Profil.png";

const WHATSAPP_NUMBER = "62895333818131";
const EMAIL_ADDRESS = "nana.septiana1991@gmail.com";
const TIKTOK_URL = "https://www.tiktok.com/@nanaseptiana91";

const MOON_ICON_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png";
const OBJECT_3D_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png";
const LEGO_ICON_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png";
const GROUP_3D_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png";

const MARQUEE_GIFS = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const ROW_1_IMAGES = MARQUEE_GIFS.slice(0, 11);
const ROW_2_IMAGES = MARQUEE_GIFS.slice(11, 21);

const SERVICES = [
  {
    num: "01",
    name: "Web & App Systems",
    description:
      "Building responsive web interfaces and internal operational applications tailored to streamline workflows, roles, and reporting.",
  },
  {
    num: "02",
    name: "Digital Marketing",
    description:
      "Designing partner acquisition flows, WhatsApp outreach campaigns, and promotional assets that drive measurable business growth.",
  },
  {
    num: "03",
    name: "Branding & Visuals",
    description:
      "Crafting cohesive visual identities -- from commercial promotional posters and presentation decks to full digital brand systems.",
  },
  {
    num: "04",
    name: "3D & Motion Design",
    description:
      "Interactive 3D elements, visual mockups, and dynamic motion graphics that add depth and energy to modern digital experiences.",
  },
  {
    num: "05",
    name: "Data & Workflow Ops",
    description:
      "Structuring multi-sheet data reconciliation, field mapping, and KPI tracking systems for accurate operational visibility.",
  },
];

interface ProjectItem {
  num: string;
  name: string;
  category: string;
  summary: string;
  url: string;
  col1Top: string;
  col1Bottom: string;
  col2Tall: string;
}

const PROJECTS: ProjectItem[] = [
  {
    num: "01",
    name: "AAK Operations & CRM System",
    category: "Web App & Internal System",
    summary:
      "Internal operations web app with role-based access, expedition workflows, leads & CRM pipeline, and KPI dashboards.",
    url: "#contact",
    col1Top: "/images/aak-1.png",
    col1Bottom: "/images/aak-2.png",
    col2Tall: "/images/aak-3.jpg",
  },
  {
    num: "02",
    name: "Lion Parcel & Interpack Ops",
    category: "Partner Acquisition & Field Ops",
    summary:
      "Partner expansion, field activation, promotional campaign visuals, and multi-outlet operational tracking.",
    url: "#contact",
    col1Top: "/images/lionparcel-1.png",
    col1Bottom: "/images/lionparcel-2.png",
    col2Tall: "/images/lionparcel-3.jpg",
  },
  {
    num: "03",
    name: "Proucer Finder",
    category: "Government & Private Procurement Leads",
    summary:
      "Aplikasi pencarian calon klien dan peluang pengadaan untuk sektor pemerintah maupun swasta.",
    url: "#contact",
    col1Top: "/images/proucer%20finder-1.jpg",
    col1Bottom: "/images/proucer%20finder-2.jpg",
    col2Tall: "/images/procure%20finder-3.png",
  },
];

/* ------------------ REUSABLE COMPONENTS ------------------ */

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className = "",
}: FadeInProps) {
  const MotionComponent = React.useMemo(
    () => motion.create(as as keyof React.JSX.IntrinsicElements),
    [as]
  );

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = Math.abs(e.clientX - centerX) - rect.width / 2;
      const distY = Math.abs(e.clientY - centerY) - rect.height / 2;

      if (distX < padding && distY < padding) {
        setIsActive(true);
        const dx = (e.clientX - centerX) / strength;
        const dy = (e.clientY - centerY) / strength;
        setOffset({ x: dx, y: dy });
      } else {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

interface AnimatedCharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function AnimatedChar({ char, index, total, progress }: AnimatedCharProps) {
  const start = Math.max(0, index / Math.max(total, 1) - 0.08);
  const end = Math.min(1, start + 0.16);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="invisible">{char}</span>
      <motion.span
        style={{ opacity }}
        className="pointer-events-none absolute inset-0"
      >
        {char}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
}

function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = Array.from(text);

  return (
    <p ref={paragraphRef} className={className}>
      {chars.map((char, idx) => (
        <AnimatedChar
          key={`${idx}-${char}`}
          char={char}
          index={idx}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

interface ContactButtonProps {
  onClick: () => void;
  className?: string;
}

function ContactButton({ onClick, className = "" }: ContactButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] ${className}`}
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow:
          "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid #FFFFFF",
        outlineOffset: "-3px",
      }}
    >
      Contact Me
    </button>
  );
}

interface LiveProjectButtonProps {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function LiveProjectButton({ href, onClick }: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10"
    >
      <span>Live Project</span>
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

/* ------------------ STICKY PROJECT CARD ------------------ */

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  containerScrollProgress: MotionValue<number>;
  onOpenContact: (projectName: string) => void;
}

function ProjectCard({
  project,
  index,
  totalCards,
  containerScrollProgress,
  onOpenContact,
}: ProjectCardProps) {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const startRange = index / totalCards;
  const scale = useTransform(
    containerScrollProgress,
    [startRange, 1],
    [1, targetScale]
  );

  return (
    <div className="h-[85vh]">
      <motion.article
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="sticky top-24 md:top-32 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#D7E2EA]/15 pb-5">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              {project.num}
            </span>
            <div>
              <span className="block text-xs sm:text-sm font-light uppercase tracking-widest text-[#D7E2EA]/70">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase tracking-tight text-[#D7E2EA]"
                style={{ fontSize: "clamp(1.25rem, 2.6vw, 2.4rem)" }}
              >
                {project.name}
              </h3>
              <p className="mt-1 max-w-2xl text-xs sm:text-sm font-light text-[#D7E2EA]/75">
                {project.summary}
              </p>
            </div>
          </div>

          <LiveProjectButton
            href={project.url}
            onClick={(e) => {
              e.preventDefault();
              onOpenContact(project.name);
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full md:w-[40%]">
            <img
              src={project.col1Top}
              alt={`${project.name} preview 1`}
              loading="lazy"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
            <img
              src={project.col1Bottom}
              alt={`${project.name} preview 2`}
              loading="lazy"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>

          <div className="w-full md:w-[60%]">
            <img
              src={project.col2Tall}
              alt={`${project.name} showcase`}
              loading="lazy"
              className="h-[280px] sm:h-[360px] md:h-full md:min-h-[360px] w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ------------------ MAIN LANDING PAGE ------------------ */

export default function HomePage() {
  const marqueeSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);

  const [row1Offset, setRow1Offset] = useState(0);
  const [row2Offset, setRow2Offset] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsSectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = marqueeSectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setRow1Offset(offset - 200);
      setRow2Offset(-(offset - 200));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenContactWithTopic = (topic?: string) => {
    setSubmitted(false);
    if (topic) {
      setProjectDetails(
        `Saya tertarik untuk melihat detail atau berdiskusi tentang proyek "${topic}".`
      );
    }
    setContactOpen(true);
  };

  const triRow1 = [...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES];
  const triRow2 = [...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES];

  return (
    <main
      className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA]"
      style={{ overflowX: "clip" }}
    >
      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="relative flex h-screen w-full flex-col justify-between bg-[#0C0C0C]"
        style={{ overflowX: "clip" }}
      >
        <FadeIn delay={0} y={-20} as="header">
          <nav
            aria-label="Primary Navigation"
            className="flex w-full items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
          >
            <a
              href="#about"
              className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              About
            </a>
            <a
              href="#services"
              className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              Price
            </a>
            <a
              href="#projects"
              className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleOpenContactWithTopic();
              }}
              className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              Contact
            </a>
          </nav>
        </FadeIn>

        <div className="overflow-hidden px-2 sm:px-4">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading mt-6 sm:mt-4 md:-mt-5 w-full whitespace-nowrap font-black uppercase leading-none tracking-tight text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw]">
              Hi , i&apos;m NANA
            </h1>
          </FadeIn>
        </div>

        {/* Hero Portrait with Magnetic Hover */}
        <FadeIn
          delay={0.6}
          y={30}
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={HERO_PORTRAIT_URL}
              alt="Nana Septiana 3D Creator Portrait"
              className="w-full h-auto object-contain select-none"
            />
          </Magnet>
        </FadeIn>

        {/* Bottom Bar */}
        <div className="relative z-20 flex w-full items-end justify-between px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.35} y={20}>
            <p
              className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA]"
              style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
            >
              a 3d creator driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={() => handleOpenContactWithTopic()} />
          </FadeIn>
        </div>
      </section>

      {/* 2. MARQUEE SECTION */}
      <section
        ref={marqueeSectionRef}
        id="marquee"
        className="w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      >
        <div className="flex flex-col gap-3">
          <div
            className="flex w-max gap-3"
            style={{
              transform: `translate3d(${row1Offset}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {triRow1.map((src, idx) => (
              <img
                key={`r1-${idx}`}
                src={src}
                alt={`3D showcase work ${idx + 1}`}
                loading="lazy"
                className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
              />
            ))}
          </div>

          <div
            className="flex w-max gap-3"
            style={{
              transform: `translate3d(${row2Offset}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {triRow2.map((src, idx) => (
              <img
                key={`r2-${idx}`}
                src={src}
                alt={`3D motion preview ${idx + 1}`}
                loading="lazy"
                className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section
        id="about"
        className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20"
      >
        {/* Corner 3D Decorative Props */}
        <FadeIn
          delay={0.1}
          x={-80}
          y={0}
          duration={0.9}
          className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
        >
          <img
            src={MOON_ICON_URL}
            alt="3D Moon Icon"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </FadeIn>

        <FadeIn
          delay={0.25}
          x={-80}
          y={0}
          duration={0.9}
          className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]"
        >
          <img
            src={OBJECT_3D_URL}
            alt="3D Sculptural Object"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </FadeIn>

        <FadeIn
          delay={0.15}
          x={80}
          y={0}
          duration={0.9}
          className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
        >
          <img
            src={LEGO_ICON_URL}
            alt="3D Brick Icon"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </FadeIn>

        <FadeIn
          delay={0.3}
          x={80}
          y={0}
          duration={0.9}
          className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]"
        >
          <img
            src={GROUP_3D_URL}
            alt="3D Composition Group"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </FadeIn>

        <div className="relative z-10 flex flex-col items-center">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading text-center font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              About me
            </h2>
          </FadeIn>

          <div className="mt-10 sm:mt-14 md:mt-16">
            <AnimatedText
              text="I build web applications, operational workflows, and brand visuals that help businesses grow and stand out. Combining digital strategy, clean execution, and creative design -- let's build something impactful together!"
              className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            />
          </div>

          <div className="mt-16 sm:mt-20 md:mt-24">
            <ContactButton onClick={() => handleOpenContactWithTopic()} />
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section
        id="services"
        className="w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#FFFFFF] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 text-[#0C0C0C]"
      >
        <h2
          className="mb-16 sm:mb-20 md:mb-28 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Services
        </h2>

        <div className="mx-auto max-w-5xl">
          {SERVICES.map((service, i) => (
            <FadeIn
              key={service.num}
              delay={i * 0.1}
              y={24}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
            >
              <div
                style={{
                  borderBottom:
                    i < SERVICES.length - 1
                      ? "1px solid rgba(12, 12, 12, 0.15)"
                      : "none",
                }}
                className="flex w-full flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 md:gap-12 pb-8 sm:pb-10 md:pb-12"
              >
                <span
                  className="font-black leading-none text-[#0C0C0C] shrink-0"
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                >
                  {service.num}
                </span>
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C]"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                    style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section
        ref={projectsSectionRef}
        id="projects"
        className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 text-[#D7E2EA]"
      >
        <h2
          className="hero-heading mb-16 sm:mb-20 md:mb-28 text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Project
        </h2>

        <div className="mx-auto max-w-6xl">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.num}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              containerScrollProgress={projectsProgress}
              onOpenContact={handleOpenContactWithTopic}
            />
          ))}
        </div>

        {/* Direct Social & Contact Footer */}
        <footer className="mx-auto mt-20 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-[#D7E2EA]/15 pt-8 text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/70">
          <span>Nana Septiana — 3D &amp; Digital Creator</span>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <span>TikTok @nanaseptiana91</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </footer>
      </section>

      {/* CONTACT MODAL */}
      {contactOpen && (
        <div
          id="contact"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onClick={() => {
            setContactOpen(false);
            setSubmitted(false);
          }}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-[#D7E2EA]/25 bg-[#121212] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close contact dialog"
              onClick={() => {
                setContactOpen(false);
                setSubmitted(false);
              }}
              className="absolute right-5 top-5 rounded-full p-2 text-[#D7E2EA]/70 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/60">
              <Sparkles className="h-4 w-4 text-[#B600A8]" />
              <span>Nana Septiana — Direct Contact</span>
            </div>

            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-emerald-400" />
                <h3 className="text-xl font-semibold uppercase tracking-wide text-white">
                  Opening WhatsApp...
                </h3>
                <p className="mt-2 text-sm text-[#D7E2EA]/75">
                  Your message has been prepared for Nana Septiana ({EMAIL_ADDRESS}).
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  const message = [
                    `Halo Nana, saya *${senderName}* ingin berdiskusi mengenai proyek.`,
                    `Kontak: ${senderContact}`,
                    `Detail Proyek: ${projectDetails}`,
                  ].join("\n");

                  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    message
                  )}`;

                  window.open(waUrl, "_blank", "noopener,noreferrer");
                  setSubmitted(true);
                  setSenderName("");
                  setSenderContact("");
                  setProjectDetails("");
                }}
                className="flex flex-col gap-4"
              >
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                  Start a Project
                </h3>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-[#D7E2EA]/20 bg-[#0C0C0C] px-4 py-3 text-sm text-white outline-none focus:border-[#B600A8]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                    Email or WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    placeholder="name@email.com or +62..."
                    className="w-full rounded-xl border border-[#D7E2EA]/20 bg-[#0C0C0C] px-4 py-3 text-sm text-white outline-none focus:border-[#B600A8]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                    Project Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    placeholder="Tell us about your web app, procurement leads, 3D visual, or campaign project..."
                    className="w-full rounded-xl border border-[#D7E2EA]/20 bg-[#0C0C0C] px-4 py-3 text-sm text-white outline-none focus:border-[#B600A8]"
                  />
                </div>

                {/* Direct Email & TikTok Shortcuts */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#D7E2EA]/10 pt-3 text-xs text-[#D7E2EA]/70">
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="inline-flex items-center gap-1.5 hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{EMAIL_ADDRESS}</span>
                  </a>
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    <span>TikTok: @nanaseptiana91</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-full px-8 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-white"
                    style={{
                      background:
                        "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                      boxShadow:
                        "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                      outline: "2px solid #FFFFFF",
                      outlineOffset: "-3px",
                    }}
                  >
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
