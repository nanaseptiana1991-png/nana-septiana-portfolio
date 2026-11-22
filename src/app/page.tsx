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
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const HERO_PORTRAIT_URL = "/images/Profil.png";

const WHATSAPP_NUMBER = "62895333818131";
const EMAIL_ADDRESS = "nana.septiana1991@gmail.com";
const TIKTOK_URL = "https://www.tiktok.com/@nanaseptiana91";

// Satu aksen 3D dekoratif saja di sudut aman agar tidak memenuhi area teks
const ACCENT_3D_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png";

interface ShowcaseItem {
  src: string;
  label: string;
  projectIndex: number;
  previewIndex: number;
}

const PROJECT_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    src: "/images/lionparcel-1.png",
    label: "Lion Parcel Ramadan Operation System — View 1",
    projectIndex: 0,
    previewIndex: 0,
  },
  {
    src: "/images/lionparcel-2.png",
    label: "Lion Parcel Ramadan Operation System — View 2",
    projectIndex: 0,
    previewIndex: 1,
  },
  {
    src: "/images/lionparcel-3.jpg",
    label: "Lion Parcel Ramadan Operation System — Overview",
    projectIndex: 0,
    previewIndex: 2,
  },
  {
    src: "/images/proucer%20finder-1.jpg",
    label: "Procure Finder — View 1",
    projectIndex: 1,
    previewIndex: 0,
  },
  {
    src: "/images/proucer%20finder-2.jpg",
    label: "Procure Finder — View 2",
    projectIndex: 1,
    previewIndex: 1,
  },
  {
    src: "/images/procure%20finder-3.png",
    label: "Procure Finder — Overview",
    projectIndex: 1,
    previewIndex: 2,
  },
  {
    src: "/images/aak-1.png",
    label: "AAK Company — View 1",
    projectIndex: 2,
    previewIndex: 0,
  },
  {
    src: "/images/aak-2.png",
    label: "AAK Company — View 2",
    projectIndex: 2,
    previewIndex: 1,
  },
  {
    src: "/images/aak-3.jpg",
    label: "AAK Company — Overview",
    projectIndex: 2,
    previewIndex: 2,
  },
];

const EXPERIENCES = [
  {
    company: "PT Empat Arah Kreasi",
    role: "OSA · Lion Parcel",
    period: "2025 – 2026",
  },
  {
    company: "PT Banceuy Tunggal Jaya",
    role: "Pharmaceutical Sales Representative",
    period: "2024 – 2025",
  },
  {
    company: "PT Borwita Citra Prima",
    role: "Sales WSP",
    period: "2023 – 2024",
  },
  {
    company: "PT Artaboga Cemerlang",
    role: "Sales · Duta Arta",
    period: "2022 – 2023",
  },
];

const SERVICES = [
  {
    name: "WEB & APP DEVELOPMENT",
    description:
      "Developing responsive websites, business applications, and custom digital systems to simplify business processes and improve operational efficiency.",
  },
  {
    name: "BUSINESS & SALES SUPPORT",
    description:
      "Supporting business growth through lead generation, partner acquisition, sales coordination, customer outreach, and business development activities.",
  },
  {
    name: "DATA & SPREADSHEET MANAGEMENT",
    description:
      "Creating structured Google Sheets and Excel solutions, automated formulas, tracking systems, and dashboards for better data management and reporting.",
  },
  {
    name: "DIGITAL MARKETING & PROMOTIONAL DESIGN",
    description:
      "Creating promotional materials, campaign assets, WhatsApp outreach strategies, and digital marketing support for business visibility and customer engagement.",
  },
  {
    name: "BUSINESS OPERATIONS & WORKFLOW",
    description:
      "Organizing operational workflows, project tracking, data validation, team coordination, and reporting systems to support efficient business operations.",
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
    name: "LION PARCEL RAMDAN OPERATION SYSTEM",
    category: "FIELD OPS , TRACKER, ABSENSI",
    summary:
      "Sistem operasional, absensi, transaksi, validasi tracking, dan laporan",
    url: "/images/lionparcel-3.jpg",
    col1Top: "/images/lionparcel-1.png",
    col1Bottom: "/images/lionparcel-2.png",
    col2Tall: "/images/lionparcel-3.jpg",
  },
  {
    num: "02",
    name: "PROCURE FINDER",
    category: "GOVERMENT & PRIVATE PROCUREMENT LEADS",
    summary:
      "Sistem operasional pencarian prospek bisnis dan peluang pengadaan",
    url: "/images/procure%20finder-3.png",
    col1Top: "/images/proucer%20finder-1.jpg",
    col1Bottom: "/images/proucer%20finder-2.jpg",
    col2Tall: "/images/procure%20finder-3.png",
  },
  {
    num: "03",
    name: "AAK COMPANY",
    category: "WEB APP & INTERNAL SYSTEM",
    summary:
      "internal operations web app with role based access ,expedition workflows, leads & crm pipeline and kpi.",
    url: "/images/aak-3.jpg",
    col1Top: "/images/aak-1.png",
    col1Bottom: "/images/aak-2.png",
    col2Tall: "/images/aak-3.jpg",
  },
];

interface PreviewState {
  projectName: string;
  category: string;
  images: { label: string; src: string }[];
  activeIndex: number;
}

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
    <span className="relative inline-block">
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
    offset: ["start 0.85", "end 0.25"],
  });

  const words = text.split(" ");
  const totalChars = text.length;
  let runningIndex = 0;

  return (
    <p ref={paragraphRef} className={className}>
      {words.map((word, wordIdx) => {
        const wordChars = Array.from(word);
        const startIdx = runningIndex;
        runningIndex += wordChars.length + 1;

        return (
          <React.Fragment key={`word-${wordIdx}-${word}`}>
            <span className="inline-block whitespace-nowrap">
              {wordChars.map((char, charIdx) => (
                <AnimatedChar
                  key={`char-${startIdx + charIdx}`}
                  char={char}
                  index={startIdx + charIdx}
                  total={totalChars}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            {wordIdx < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
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

/* ------------------ LAYERED STACK SHOWCASE ------------------ */

interface LayeredShowcaseProps {
  items: ShowcaseItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenLightbox: (item: ShowcaseItem) => void;
}

function LayeredShowcase({
  items,
  activeIndex,
  onSelectIndex,
  onOpenLightbox,
}: LayeredShowcaseProps) {
  const [isMobile, setIsMobile] = useState(false);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 640);
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const total = items.length;

  const handlePrev = () => {
    onSelectIndex((activeIndex - 1 + total) % total);
  };

  const handleNext = () => {
    onSelectIndex((activeIndex + 1) % total);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const deltaX = e.clientX - dragStartX.current;
    dragStartX.current = null;

    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-10">
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative flex h-[230px] sm:h-[300px] md:h-[340px] w-full select-none items-center justify-center touch-pan-y"
      >
        {items.map((item, idx) => {
          let offset = idx - activeIndex;
          const half = Math.floor(total / 2);
          if (offset > half) offset -= total;
          if (offset < -half) offset += total;

          const absOffset = Math.abs(offset);
          const isVisible = absOffset <= 3;

          if (!isVisible) return null;

          const stepX = isMobile ? 42 : 92;
          const stepY = isMobile ? -7 : -14;
          const translateX = offset * stepX;
          const translateY = absOffset * stepY;
          const scale =
            offset === 0 ? 1 : Math.max(0.72, 1 - absOffset * 0.085);
          const opacity =
            offset === 0 ? 1 : Math.max(0.32, 0.88 - absOffset * 0.18);
          const zIndex = 20 - absOffset * 4;

          return (
            <motion.div
              key={item.src}
              initial={false}
              animate={{
                x: translateX,
                y: translateY,
                scale,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
              style={{ zIndex }}
              onClick={() => {
                if (offset === 0) {
                  onOpenLightbox(item);
                } else {
                  onSelectIndex(idx);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={item.label}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (offset === 0) onOpenLightbox(item);
                  else onSelectIndex(idx);
                }
              }}
              className={`absolute h-[165px] w-[245px] sm:h-[220px] sm:w-[340px] md:h-[250px] md:w-[390px] cursor-pointer overflow-hidden rounded-2xl border bg-[#121212] shadow-2xl ${
                offset === 0
                  ? "border-[#D7E2EA]/65 ring-1 ring-[#D7E2EA]/25"
                  : "border-[#D7E2EA]/15 hover:border-[#D7E2EA]/35"
              }`}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="eager"
                draggable={false}
                className="h-full w-full object-cover"
              />
              {offset !== 0 && (
                <div className="pointer-events-none absolute inset-0 bg-[#0C0C0C]/35" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Kontrol gulir / geser & indikator posisi kartu */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#D7E2EA]/10 pt-4">
        <div className="min-w-0">
          <p className="truncate text-xs sm:text-sm font-medium text-[#D7E2EA]">
            {items[activeIndex]?.label}
          </p>
          <p className="text-[11px] text-[#D7E2EA]/50">
            Geser kartu, tekan panah, atau scroll halaman • Klik kartu tengah untuk zoom
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous system preview"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D7E2EA]/25 bg-[#121212] text-[#D7E2EA] transition hover:border-[#D7E2EA]/60 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-xs font-semibold tracking-widest text-[#D7E2EA]/75">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next system preview"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D7E2EA]/25 bg-[#121212] text-[#D7E2EA] transition hover:border-[#D7E2EA]/60 hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------ STICKY PROJECT CARD ------------------ */

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  containerScrollProgress: MotionValue<number>;
  onOpenFullPreview: (project: ProjectItem, initialIndex?: number) => void;
}

function ProjectCard({
  project,
  index,
  totalCards,
  containerScrollProgress,
  onOpenFullPreview,
}: ProjectCardProps) {
  const targetScale = 1 - (totalCards - 1 - index) * 0.025;
  const startRange = index / totalCards;
  const scale = useTransform(
    containerScrollProgress,
    [startRange, 1],
    [1, targetScale]
  );

  const isLastCard = index === totalCards - 1;

  return (
    <div
      className={
        isLastCard
          ? "min-h-[105vh] pb-12"
          : "min-h-[125vh] pb-28 sm:pb-36 md:pb-44"
      }
    >
      <motion.article
        style={{
          scale,
          top: `${28 + index * 24}px`,
        }}
        className="sticky rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-7 md:p-9 shadow-2xl"
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
              onOpenFullPreview(project, 2);
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full md:w-[40%]">
            <img
              src={project.col1Top}
              alt={`${project.name} preview 1`}
              loading="lazy"
              onClick={() => onOpenFullPreview(project, 0)}
              style={{ height: "clamp(140px, 17vw, 240px)" }}
              className="w-full cursor-pointer object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-opacity hover:opacity-90"
            />
            <img
              src={project.col1Bottom}
              alt={`${project.name} preview 2`}
              loading="lazy"
              onClick={() => onOpenFullPreview(project, 1)}
              style={{ height: "clamp(170px, 23vw, 350px)" }}
              className="w-full cursor-pointer object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-opacity hover:opacity-90"
            />
          </div>

          <div className="w-full md:w-[60%]">
            <img
              src={project.col2Tall}
              alt={`${project.name} showcase`}
              loading="lazy"
              onClick={() => onOpenFullPreview(project, 2)}
              className="h-[300px] sm:h-[380px] md:h-full md:min-h-[380px] w-full cursor-pointer object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-opacity hover:opacity-90"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ------------------ MAIN LANDING PAGE ------------------ */

export default function HomePage() {
  const showcaseSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);

  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previewState, setPreviewState] = useState<PreviewState | null>(null);

  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsSectionRef,
    offset: ["start start", "end end"],
  });

  // Menggeser tumpukan kartu saat section masuk & di-scroll tanpa mengganggu scroll halaman
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const section = showcaseSectionRef.current;
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      if (!section || Math.abs(deltaY) < 42) return;

      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;
      const isInView = rect.top < viewportH * 0.85 && rect.bottom > viewportH * 0.15;

      if (!isInView) return;

      setActiveShowcaseIdx((prev) => {
        const total = PROJECT_SHOWCASE_ITEMS.length;
        return deltaY > 0 ? (prev + 1) % total : (prev - 1 + total) % total;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenFullPreview = (project: ProjectItem, initialIndex = 2) => {
    setPreviewState({
      projectName: project.name,
      category: project.category,
      images: [
        { label: "Foto 1", src: project.col1Top },
        { label: "Foto 2", src: project.col1Bottom },
        { label: "Foto Full Utama", src: project.col2Tall },
      ],
      activeIndex: initialIndex,
    });
  };

  const handleOpenContactWithTopic = (topic?: string) => {
    setSubmitted(false);
    if (topic) {
      setProjectDetails(
        `Saya tertarik untuk melihat detail atau berdiskusi tentang proyek "${topic}".`
      );
    }
    setContactOpen(true);
  };

  const currentPreviewImage = previewState
    ? previewState.images[previewState.activeIndex]
    : null;

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
            className="flex w-full flex-wrap items-center justify-between gap-2 px-4 sm:px-6 md:px-10 pt-6 md:pt-8"
          >
            <a
              href="#about"
              className="text-[11px] sm:text-sm md:text-lg lg:text-[1.35rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              About
            </a>
            <a
              href="#experience"
              className="text-[11px] sm:text-sm md:text-lg lg:text-[1.35rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-[11px] sm:text-sm md:text-lg lg:text-[1.35rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              Projects
            </a>
            <a
              href="#services"
              className="text-[11px] sm:text-sm md:text-lg lg:text-[1.35rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              Services
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleOpenContactWithTopic();
              }}
              className="text-[11px] sm:text-sm md:text-lg lg:text-[1.35rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
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

        {/* Avatar 3D Utama dipertahankan */}
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
              alt="Nana Septiana Digital & Web Systems Creator Portrait"
              className="w-full h-auto object-contain select-none"
            />
          </Magnet>
        </FadeIn>

        {/* Bottom Bar */}
        <div className="relative z-20 flex w-full items-end justify-between px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.35} y={20}>
            <p
              className="max-w-[180px] sm:max-w-[240px] md:max-w-[290px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA]"
              style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
            >
              building web systems, operational apps, and digital growth
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={() => handleOpenContactWithTopic()} />
          </FadeIn>
        </div>
      </section>

      {/* 2. SELECTED SYSTEM PREVIEW (LAYERED CARD STACK) */}
      <section
        ref={showcaseSectionRef}
        id="showcase"
        aria-label="Selected System Preview"
        className="w-full bg-[#0C0C0C] pt-16 sm:pt-24 md:pt-28 pb-12 overflow-hidden"
      >
        <div className="mx-auto mb-4 flex max-w-6xl items-center justify-between px-5 sm:px-8 md:px-10">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#D7E2EA]/60">
            Selected System Preview
          </span>
          <span className="text-[11px] sm:text-xs text-[#D7E2EA]/45">
            Geser / gulir untuk berpindah preview
          </span>
        </div>

        <LayeredShowcase
          items={PROJECT_SHOWCASE_ITEMS}
          activeIndex={activeShowcaseIdx}
          onSelectIndex={setActiveShowcaseIdx}
          onOpenLightbox={(item) =>
            handleOpenFullPreview(PROJECTS[item.projectIndex], item.previewIndex)
          }
        />
      </section>

      {/* 3. ABOUT SECTION */}
      <section
        id="about"
        className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#0C0C0C] px-6 sm:px-8 md:px-10 py-20"
      >
        {/* Satu aksen 3D di pojok kiri atas dengan ukuran proporsional */}
        <FadeIn
          delay={0.15}
          x={-40}
          y={0}
          duration={0.8}
          className="pointer-events-none absolute top-8 left-4 sm:top-10 sm:left-8 w-[64px] sm:w-[90px] md:w-[115px] opacity-80"
        >
          <img
            src={ACCENT_3D_URL}
            alt="Minimal 3D Accent"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </FadeIn>

        <div className="relative z-10 flex w-full flex-col items-center">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading text-center font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              About me
            </h2>
          </FadeIn>

          <FadeIn delay={0.12} y={20} className="mt-6 sm:mt-8 text-center">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#D7E2EA]/80">
              <span>Getting to Know Me</span>
            </div>
          </FadeIn>

          <div className="mt-8 sm:mt-10 md:mt-12 flex w-full max-w-[580px] flex-col gap-5 px-2 sm:px-0">
            <AnimatedText
              text="I'm a business-oriented professional with a growing interest in management, technology, and digital innovation."
              className="text-center text-base sm:text-lg font-medium leading-relaxed text-[#D7E2EA]"
            />
            <AnimatedText
              text="Currently pursuing a Bachelor's Degree in Management at Universitas INABA, I'm continuously developing my knowledge and skills in business management."
              className="text-center text-base sm:text-lg font-medium leading-relaxed text-[#D7E2EA]"
            />
            <AnimatedText
              text="With experience in sales, business operations, and business development, I also enjoy exploring digital technologies to create practical solutions for real-world business challenges"
              className="text-center text-base sm:text-lg font-medium leading-relaxed text-[#D7E2EA]"
            />
          </div>

          <div className="mt-14 sm:mt-18 md:mt-20">
            <ContactButton onClick={() => handleOpenContactWithTopic()} />
          </div>
        </div>
      </section>

      {/* 4. PROFESSIONAL EXPERIENCE SECTION */}
      <section
        id="experience"
        className="w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#FFFFFF] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 text-[#0C0C0C]"
      >
        <FadeIn delay={0} y={30}>
          <span className="mb-3 block text-center text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#0C0C0C]/60">
            Career Journey
          </span>
          <h2
            className="mb-14 sm:mb-20 md:mb-24 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
            style={{ fontSize: "clamp(2.2rem, 8.5vw, 120px)" }}
          >
            Professional Experience
          </h2>
        </FadeIn>

        <div className="mx-auto max-w-4xl">
          {EXPERIENCES.map((exp, i) => (
            <FadeIn
              key={`${exp.company}-${exp.period}`}
              delay={i * 0.1}
              y={24}
              className="py-6 sm:py-8 md:py-10"
            >
              <div
                style={{
                  borderBottom:
                    i < EXPERIENCES.length - 1
                      ? "1px solid rgba(12, 12, 12, 0.15)"
                      : "none",
                }}
                className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 pb-6 sm:pb-8 md:pb-10"
              >
                <div className="flex flex-col gap-1.5">
                  <h3
                    className="font-bold uppercase tracking-tight text-[#0C0C0C]"
                    style={{ fontSize: "clamp(1.2rem, 2.3vw, 2rem)" }}
                  >
                    {exp.company}
                  </h3>
                  <p
                    className="font-medium text-[#0C0C0C]/75"
                    style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)" }}
                  >
                    {exp.role}
                  </p>
                </div>

                <span className="inline-block self-start sm:self-center rounded-full border border-[#0C0C0C]/20 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#0C0C0C]/80 shrink-0">
                  {exp.period}
                </span>
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
              onOpenFullPreview={handleOpenFullPreview}
            />
          ))}
        </div>
      </section>

      {/* 6. SERVICES SECTION */}
      <section
        id="services"
        className="relative z-20 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#FFFFFF] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 text-[#0C0C0C]"
      >
        <h2
          className="mb-16 sm:mb-20 md:mb-28 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Services
        </h2>

        <div className="mx-auto max-w-4xl">
          {SERVICES.map((service, i) => (
            <FadeIn
              key={service.name}
              delay={i * 0.1}
              y={24}
              className="py-8 sm:py-10 md:py-12"
            >
              <div
                style={{
                  borderBottom:
                    i < SERVICES.length - 1
                      ? "1px solid rgba(12, 12, 12, 0.15)"
                      : "none",
                }}
                className="flex w-full flex-col gap-3 pb-8 sm:pb-10 md:pb-12"
              >
                <h3
                  className="font-bold uppercase tracking-tight text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-3xl font-light leading-relaxed text-[#0C0C0C] opacity-75"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)" }}
                >
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Direct Social & Contact Footer */}
        <footer className="mx-auto mt-20 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-[#0C0C0C]/15 pt-8 text-xs sm:text-sm uppercase tracking-widest text-[#0C0C0C]/70">
          <span>Nana Septiana — Web Systems &amp; Digital Creator</span>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0C0C0C]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0C0C0C]"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0C0C0C]"
            >
              <span>TikTok @nanaseptiana91</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </footer>
      </section>

      {/* FULL IMAGE LIGHTBOX MODAL */}
      {previewState && currentPreviewImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md"
          onClick={() => setPreviewState(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col gap-4 overflow-y-auto rounded-3xl border border-[#D7E2EA]/20 bg-[#121212] p-4 sm:p-6 text-[#D7E2EA] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#D7E2EA]/10 pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#D7E2EA]/60">
                  {previewState.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                  {previewState.projectName} — {currentPreviewImage.label}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close full image preview"
                onClick={() => setPreviewState(null)}
                className="rounded-full p-2 text-[#D7E2EA]/75 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex max-h-[68vh] w-full items-center justify-center overflow-auto rounded-2xl bg-[#0C0C0C] p-2">
              <img
                src={currentPreviewImage.src}
                alt={`${previewState.projectName} ${currentPreviewImage.label}`}
                className="max-h-[64vh] w-auto max-w-full rounded-xl object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                {previewState.images.map((img, idx) => (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() =>
                      setPreviewState({ ...previewState, activeIndex: idx })
                    }
                    className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition ${
                      previewState.activeIndex === idx
                        ? "bg-white text-[#0C0C0C]"
                        : "border border-[#D7E2EA]/25 text-[#D7E2EA]/80 hover:bg-white/10"
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={currentPreviewImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/30 px-4 py-2 text-xs uppercase tracking-wider text-[#D7E2EA] transition hover:bg-white/10"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Buka Tab Baru</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const topic = previewState.projectName;
                    setPreviewState(null);
                    handleOpenContactWithTopic(topic);
                  }}
                  className="rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-white"
                  style={{
                    background:
                      "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                  }}
                >
                  Tanya via WA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {contactOpen && (
        <div
          id="contact"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-4 backdrop-blur-sm"
          onClick={() => {
            setContactOpen(false);
            setSubmitted(false);
          }}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#D7E2EA]/25 bg-[#121212] p-5 sm:p-8 text-[#D7E2EA] shadow-2xl"
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
