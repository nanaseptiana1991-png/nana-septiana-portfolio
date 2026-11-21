"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PHOTO_BY_ROUTE: Record<string, string> = {
  "/": "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture.png",
  "/contact":
    "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture%202.PNG",
  "/about":
    "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture.png",
  "/projects":
    "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture%202.PNG",
  "/experience":
    "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture.png",
  "/expertise":
    "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture%202.PNG",
};

interface RouteMotionConfig {
  boxClass: string;
  lookX: number;
  lookY: number;
  zoom: number;
}

function getRouteMotion(pathname: string): RouteMotionConfig {
  switch (pathname) {
    case "/contact":
      return {
        boxClass: "left-6 bottom-6 w-48 md:left-14 md:bottom-10 md:w-72",
        lookX: -0.9,
        lookY: 0.1,
        zoom: 1.12,
      };
    case "/about":
      return {
        boxClass: "right-6 top-24 w-48 md:right-14 md:top-28 md:w-72",
        lookX: 0.9,
        lookY: -0.1,
        zoom: 1.1,
      };
    case "/":
    default:
      return {
        boxClass:
          "right-6 bottom-6 w-52 md:right-14 md:top-1/2 md:-translate-y-1/2 md:w-72",
        lookX: 0,
        lookY: 0,
        zoom: 1.06,
      };
  }
}

export default function SceneManager() {
  const pathname = usePathname();
  const [tick, setTick] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x: nx, y: ny });
    };

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setTick((now - start) / 1000);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  const photoUrl = PHOTO_BY_ROUTE[pathname] ?? PHOTO_BY_ROUTE["/"];
  if (!photoUrl) return null;

  const cfg = getRouteMotion(pathname);

  const idleTurn = Math.sin(tick * 1.2) * 0.18;
  const breathY = Math.sin(tick * 1.6) * 5;
  const breathScale = 1 + Math.sin(tick * 1.6) * 0.015;

  const totalTurnX = cfg.lookX + idleTurn + pointer.x * 0.25;
  const totalTurnY =
    cfg.lookY + Math.cos(tick * 1.1) * 0.08 + pointer.y * 0.15;

  const rotateYDeg = totalTurnX * 16;
  const rotateXDeg = -totalTurnY * 10;
  const panX = totalTurnX * 14;
  const panY = totalTurnY * 10 + breathY;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className={`fixed transition-all duration-700 ease-out ${cfg.boxClass}`}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(0, ${breathY * 0.5}px, 0) rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg) scale(${breathScale})`,
            transformStyle: "preserve-3d",
          }}
        >
          <img
            key={photoUrl}
            src={photoUrl}
            alt="Nana Septiana"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${cfg.zoom}) translate3d(${panX}px, ${panY}px, 0)`,
            }}
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(11,13,18,0) 36%, rgba(11,13,18,0.72) 76%, rgba(
