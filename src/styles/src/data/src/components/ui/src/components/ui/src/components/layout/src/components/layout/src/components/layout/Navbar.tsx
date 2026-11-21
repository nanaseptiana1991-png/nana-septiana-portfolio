"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PROFILE_DATA } from "@/data/portfolioData";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Expertise", href: "/expertise" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.06] bg-obsidian/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-xs font-semibold tracking-wideLabel text-white transition-colors hover:text-silver sm:text-sm"
        >
          {PROFILE_DATA.name}
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary Navigation" className="hidden md:flex md:items-center md:gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-xs font-medium tracking-wider uppercase transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-silver hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-electric-blue" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-charcoal text-white transition-colors hover:border-white/25 md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Dedicated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border-b border-white/10 bg-charcoal px-5 py-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item, index) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-2 text-base font-medium transition-colors ${
                        isActive ? "text-white" : "text-silver hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-silver/60">
                          0{index + 1}
                        </span>
                        <span className="font-display">{item.label}</span>
                      </span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-electric-blue" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
