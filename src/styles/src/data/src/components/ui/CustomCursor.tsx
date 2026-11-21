"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 360, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const updatePointerCapability = () => {
      setEnabled(finePointerQuery.matches);
    };

    updatePointerCapability();
    finePointerQuery.addEventListener("change", updatePointerCapability);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        'a, button, [role="button"], input, textarea, [data-cursor="interactive"]'
      );
      setIsInteractive(Boolean(interactiveEl));
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      finePointerQuery.removeEventListener("change", updatePointerCapability);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, prefersReducedMotion]);

  if (!enabled || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <motion.div
        style={{
          translateX: smoothX,
          translateY: smoothY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: isInteractive ? 40 : 18,
          height: isInteractive ? 40 : 18,
          borderColor: isInteractive
            ? "rgba(37, 99, 235, 0.85)"
            : "rgba(255, 255, 255, 0.45)",
          backgroundColor: isInteractive
            ? "rgba(37, 99, 235, 0.12)"
            : "rgba(255, 255, 255, 0.02)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="rounded-full border backdrop-blur-[1px]"
      />
    </div>
  );
}
