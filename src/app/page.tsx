"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { PROFILE_DATA } from "@/data/portfolioData";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-center"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="hero-stagger font-display text-xs font-semibold tracking-wideLabel text-electric-blue uppercase">
            {PROFILE_DATA.name}
          </p>

          <h1 className="hero-stagger mt-4 font-display text-4xl font-bold leading-[1.06] tracking-editorial text-white sm:text-6xl lg:text-7xl">
            {PROFILE_DATA.headline}
          </h1>

          <p className="hero-stagger mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-silver sm:text-2xl">
            {PROFILE_DATA.subheadline}
          </p>

          <p className="hero-stagger mt-6 max-w-xl text-sm leading-relaxed text-silver/90 sm:text-base">
            {PROFILE_DATA.shortIntro}
          </p>

          <div className="hero-stagger mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-silver"
              >
                <span>View Projects</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-charcoal/80 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-electric-blue hover:bg-electric-blue/15"
              >
                <span>Contact Me</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
