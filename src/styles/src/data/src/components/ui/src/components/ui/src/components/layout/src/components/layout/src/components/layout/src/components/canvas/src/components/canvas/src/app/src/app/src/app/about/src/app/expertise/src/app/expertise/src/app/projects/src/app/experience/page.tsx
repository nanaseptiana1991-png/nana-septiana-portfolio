"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE_DATA, EDUCATION_DATA } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function ExperiencePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>(EXPERIENCE_DATA[0]?.id ?? "");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".exp-header", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.utils.toArray<HTMLElement>(".exp-entry").forEach((entry) => {
        const id = entry.dataset.expId;

        gsap.from(entry, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: entry,
            start: "top 82%",
            once: true,
          },
        });

        ScrollTrigger.create({
          trigger: entry,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => id && setActiveId(id),
          onEnterBack: () => id && setActiveId(id),
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen w-full py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="exp-header font-display text-xs font-semibold tracking-wideLabel text-electric-blue uppercase">
            Experience & Education
          </p>
          <h1 className="exp-header mt-3 font-display text-3xl font-bold leading-tight tracking-editorial text-white sm:text-5xl">
            CAREER TIMELINE & ACADEMIC FOUNDATION.
          </h1>
          <p className="exp-header mt-4 text-sm leading-relaxed text-silver sm:text-base">
            Field sales, distribution operations, partner support, and ongoing
            management studies.
          </p>
        </div>

        {/* Work Experience Timeline */}
        <div className="mt-14">
          <h2 className="font-display text-xs font-semibold tracking-wideLabel text-silver uppercase">
            Work Experience
          </h2>

          <div className="relative mt-8 border-l border-white/15 pl-6 sm:pl-10">
            <div className="space-y-8">
              {EXPERIENCE_DATA.map((item) => {
                const isHighlighted = activeId === item.id;

                return (
                  <div
                    key={item.id}
                    data-exp-id={item.id}
                    onMouseEnter={() => setActiveId(item.id)}
                    className={`exp-entry relative rounded-xl border p-5 transition-colors sm:p-7 ${
                      isHighlighted
                        ? "border-electric-blue/60 bg-charcoal/95"
                        : "border-white/10 bg-charcoal/75"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[31px] top-7 h-2.5 w-2.5 rounded-full transition-colors sm:-left-[47px] ${
                        isHighlighted ? "bg-electric-blue" : "bg-white/35"
                      }`}
                    />

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-mono text-xs font-semibold tracking-wider text-electric-blue">
                        {item.period}
                      </span>
                      <span className="text-xs font-medium text-silver">
                        {item.role}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                      {item.company}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-silver">
                      {item.focus}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <h2 className="font-display text-xs font-semibold tracking-wideLabel text-silver uppercase">
            Education
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {EDUCATION_DATA.map((edu) => (
              <div
                key={edu.id}
                className="rounded-xl border border-white/10 bg-charcoal/85 p-6 backdrop-blur-sm"
              >
                <span className="font-mono text-xs font-semibold text-electric-blue">
                  {edu.period}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-white sm:text-xl">
                  {edu.institution}
                </h3>
                <p className="mt-1 text-sm font-medium text-white/90">
                  {edu.degree}
                </p>
                <p className="mt-2 text-xs text-silver">{edu.statusNote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
