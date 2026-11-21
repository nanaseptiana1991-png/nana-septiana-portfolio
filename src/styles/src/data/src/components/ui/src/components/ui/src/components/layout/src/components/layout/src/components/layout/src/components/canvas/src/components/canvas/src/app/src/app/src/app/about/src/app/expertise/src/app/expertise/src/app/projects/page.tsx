"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS_DATA } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.utils.toArray<HTMLElement>(".project-showcase").forEach((card, index) => {
        gsap.from(card, {
          y: index % 2 === 0 ? 32 : 44,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            once: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="projects-heading font-display text-xs font-semibold tracking-wideLabel text-electric-blue uppercase">
            Selected Work
          </p>
          <h1 className="projects-heading mt-3 font-display text-3xl font-bold leading-tight tracking-editorial text-white sm:text-5xl">
            OPERATIONAL & WEB SYSTEM PROJECTS.
          </h1>
          <p className="projects-heading mt-4 text-sm leading-relaxed text-silver sm:text-base">
            Actual project work presented with clear scope boundaries between
            implemented features and items currently in development.
          </p>
        </div>

        <div className="mt-14 space-y-14">
          {PROJECTS_DATA.map((project) => (
            <article
              key={project.id}
              className="project-showcase rounded-2xl border border-white/10 bg-charcoal/90 p-6 backdrop-blur-sm transition-colors hover:border-white/20 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                {/* Left Column: Preview Placeholder & Tech Stack */}
                <div className="lg:col-span-5">
                  <div className="flex aspect-[16/10] w-full flex-col justify-between rounded-xl border border-white/10 bg-graphite p-5">
                    <div className="flex items-center justify-between text-xs font-mono text-silver">
                      <span>{project.code}</span>
                      <span className="rounded border border-electric-blue/40 bg-electric-blue/10 px-2.5 py-0.5 text-[11px] font-medium text-white">
                        {project.statusLabel}
                      </span>
                    </div>

                    <div className="my-auto py-4">
                      <p className="font-display text-lg font-semibold text-white">
                        {project.title}
                      </p>
                      <p className="mt-1 text-xs text-silver">
                        {project.category}
                      </p>
                    </div>

                    <p className="border-t border-white/[0.08] pt-3 text-xs leading-relaxed text-silver/80">
                      {project.previewNote}
                    </p>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-obsidian/70 px-3 py-1 font-mono text-xs text-silver"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Details, Objective, Implemented vs In Progress */}
                <div className="lg:col-span-7 lg:pl-2">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs tracking-wider text-electric-blue uppercase">
                        {project.code} — {project.category}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {project.title}
                      </h2>
                    </div>

                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-electric-blue hover:bg-electric-blue/15"
                      >
                        <span>View Project</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-silver sm:text-base">
                    {project.summary}
                  </p>

                  <div className="mt-5 rounded-lg border border-white/[0.07] bg-obsidian/50 p-4">
                    <h3 className="font-display text-xs font-semibold tracking-wideLabel text-white uppercase">
                      Project Objective
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-silver">
                      {project.objective}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-display text-xs font-semibold tracking-wideLabel text-white uppercase">
                        Built / Implemented Scope
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-silver">
                        {project.implementedFeatures.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-blue" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xs font-semibold tracking-wideLabel text-silver uppercase">
                        In Development / Next Steps
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-silver/80">
                        {project.inProgressFeatures.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
