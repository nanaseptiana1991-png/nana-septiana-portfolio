"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    number: "01",
    title: "Sales & Partner Acquisition",
    detail:
      "Hands-on commercial execution, field outreach, and relationship building across distribution and partner channels.",
  },
  {
    number: "02",
    title: "Business & Operational Discipline",
    detail:
      "Structured daily coordination, reporting accuracy, and practical problem solving in fast-moving operational environments.",
  },
  {
    number: "03",
    title: "Digital Administration & Web Systems",
    detail:
      "Turning spreadsheets, operational logs, and business workflows into organized digital tools and web applications.",
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });

      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Asymmetric Editorial Grid: Left space lets 3D avatar breathe, Right carries editorial narrative */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="about-reveal inline-block border-l-2 border-electric-blue pl-4">
              <p className="font-display text-xs font-semibold tracking-wideLabel text-silver uppercase">
                About — Profile
              </p>
              <p className="mt-2 font-display text-sm text-white/90">
                {PROFILE_DATA.name}
              </p>
            </div>

            {/* Avatar status & replacement note */}
            <div
              ref={parallaxRef}
              className="about-reveal mt-10 rounded-lg border border-white/10 bg-charcoal/85 p-6 backdrop-blur-sm"
            >
              <p className="font-display text-xs font-semibold tracking-wideLabel text-electric-blue uppercase">
                3D Avatar Representation
              </p>
              <p className="mt-3 text-sm leading-relaxed text-silver">
                Currently displaying a studio placeholder character with natural
                human proportions and modern formal attire. Designed so a custom{" "}
                <code className="rounded bg-graphite px-1.5 py-0.5 text-xs text-white">
                  .glb
                </code>{" "}
                or{" "}
                <code className="rounded bg-graphite px-1.5 py-0.5 text-xs text-white">
                  .gltf
                </code>{" "}
                model can be plugged into{" "}
                <code className="rounded bg-graphite px-1.5 py-0.5 text-xs text-white">
                  Avatar3D
                </code>{" "}
                later without rebuilding the site.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <h1 className="about-reveal font-display text-3xl font-bold leading-tight tracking-editorial text-white sm:text-5xl">
              {PROFILE_DATA.aboutTitle}
            </h1>

            <p className="about-reveal mt-6 text-base leading-relaxed text-silver sm:text-lg">
              {PROFILE_DATA.aboutSummary}
            </p>

            <div className="about-reveal mt-12 space-y-6 border-t border-white/10 pt-10">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="group flex flex-col gap-2 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="font-display text-xs font-semibold tracking-widest text-electric-blue">
                    {pillar.number}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-white">
                      {pillar.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-silver">
                      {pillar.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-reveal mt-10 flex flex-wrap gap-6">
              <Link
                href="/expertise"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-electric-blue"
              >
                <span>Explore Expertise</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 text-sm font-medium text-silver transition-colors hover:text-white"
              >
                <span>View Career Timeline</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
