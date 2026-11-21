"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { PROFILE_DATA } from "@/data/portfolioData";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".home-stagger", {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.11,
        ease: "power3.out",
        clearProps: "transform",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-end pb-12 pt-16 sm:items-center sm:py-20"
    >
      {/* Subtle dark gradient scrim on the left so typography stays crisp over 3D scene */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/55 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="home-stagger font-display text-xs font-semibold tracking-wideLabel text-silver uppercase">
            {PROFILE_DATA.name}
          </p>

          <h1 className="home-stagger mt-4 font-display text-4xl font-bold leading-[1.04] tracking-editorial text-white sm:text-6xl lg:text-7xl">
            {PROFILE_DATA.headline}
          </h1>

          <p className="home-stagger mt-3 font-display text-xl font-medium tracking-tight text-electric-blue sm:text-3xl">
            {PROFILE_DATA.subheadline}
          </p>

          <p className="home-stagger mt-6 max-w-xl text-sm leading-relaxed text-silver sm:text-base">
            {PROFILE_DATA.shortIntro}
          </p>

          <div className="home-stagger mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-silver"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-charcoal/80 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-electric-blue hover:bg-graphite"
              >
                <span>Contact Me</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
