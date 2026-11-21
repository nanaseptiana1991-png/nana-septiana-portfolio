"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

function getTransitionConfig(pathname: string, reduced: boolean | null) {
  if (reduced) {
    return {
      initial: { opacity: 1, y: 0, x: 0 },
      animate: { opacity: 1, y: 0, x: 0 },
      transition: { duration: 0 },
    };
  }

  switch (pathname) {
    case "/expertise":
      return {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };
    case "/contact":
      return {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      };
    case "/projects":
      return {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };
    default:
      return {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };
  }
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const config = getTransitionConfig(pathname, prefersReducedMotion);

  return (
    <motion.div
      key={pathname}
      initial={config.initial}
      animate={config.animate}
      transition={config.transition}
      className="relative z-10 min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}
