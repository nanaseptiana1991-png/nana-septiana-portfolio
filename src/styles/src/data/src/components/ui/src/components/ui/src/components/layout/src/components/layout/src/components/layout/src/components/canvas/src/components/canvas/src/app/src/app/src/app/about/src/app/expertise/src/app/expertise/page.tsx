"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERTISE_DATA } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function ExpertisePage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".expertise-header", {
        x: -28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.from(".expertise-track-business", {
        x: -36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: ".expertise-grid",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".expertise-track-digital", {
        x: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: ".expertise-grid",
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="expertise-header font-display text-xs font-semibold tracking-wideLabel text-electric-blue uppercase">
            Expertise & Capabilities
          </p>
          <h1 className="expertise-header mt-3 font-display text-3xl font-bold leading-tight tracking-editorial text-white sm:text-5xl">
            OPERATIONAL CLARITY & MODERN WEB TOOLS.
          </h1>
          <p className="expertise-header mt-4 text-sm leading-relaxed text-silver sm:text-base">
            Structured capabilities across commercial execution, partner workflows,
            administration, and web-based system development.
          </p>
        </div>

        <div className="expertise-grid mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Category 1: Business & Operations */}
          <div className="rounded-xl border border-white/10 bg-charcoal/85 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                BUSINESS & OPERATIONS
              </h2>
              <span className="font-mono text-xs text-silver">06</span>
            </div>

            <ul className="mt-6 divide-y divide-white/[0.06]">
              {EXPERTISE_DATA.businessAndOperations.map((item, idx) => (
                <li
                  key={item}
                  className="expertise-track-business flex items-center justify-between py-3.5 transition-colors hover:text-white"
                >
                  <span className="text-sm font-medium text-white/90 sm:text-base">
                    {item}
                  </span>
                  <span className="font-mono text-xs text-silver/70">
                    0{idx + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Category 2: Digital & Technology */}
          <div className="rounded-xl border border-white/10 bg-charcoal/85 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                DIGITAL & TECHNOLOGY
              </h2>
              <span className="font-mono text-xs text-electric-blue">09</span>
            </div>

            <ul className="mt-6 divide-y divide-white/[0.06]">
              {EXPERTISE_DATA.digitalAndTechnology.map((item, idx) => (
                <li
                  key={item}
                  className="expertise-track-digital flex items-center justify-between py-3.5 transition-colors hover:text-white"
                >
                  <span className="text-sm font-medium text-white/90 sm:text-base">
                    {item}
                  </span>
                  <span className="font-mono text-xs text-silver/70">
                    0{idx + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
