"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PHOTO_URL = "/images/Profil.jfif";

interface RouteLookConfig {
  boxClass: string;
  lookX: number; // -1 = nengok ke kiri, 0 = depan, 1 = nengok ke kanan
  lookY: number;
  zoom: number;
}

function getRouteLook(pathname: string): RouteLookConfig {
  switch (pathname) {
    case "/contact":
      return {
        boxClass: "left-6 bottom-6 w-44 md:left-12 md:bottom-10 md:w-64",
        lookX: -1,
        lookY: 0.1,
        zoom: 1.12,
      };
    case "/about":
      return {
        boxClass: "right-6 top-24 w-44 md:right-14 md:top-28 md:w-64",
        lookX: 1,
        lookY: -0.1,
        zoom: 1.1,
      };
    case "/projects":
      return {
        boxClass: "right-6 bottom-6 w-40 md:right-12 md:bottom-8 md:w-56",
        lookX: -0.6,
        lookY: 0.2,
        zoom: 1.08,
      };
    case "/":
    default:
      return {
        boxClass: "right-6 bottom-6 w-48 md:right-14 md:top-1/2 md:-translate-y-1/2 md:w-72",
        lookX: 0,
        lookY: 0,
        zoom: 1.05,
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

  if (!PHOTO_URL) return null;

  const routeCfg = getRouteLook(pathname);

  // Gerak napas halus + nengok mengikuti halaman + respons kursor
  const idleTurn = Math.sin(tick * 1.1) * 0.14;
  const breathY = Math.sin(tick * 1.5) * 4;
  const totalTurnX = routeCfg.lookX + idleTurn + pointer.x * 0.25;
  const totalTurnY = routeCfg.lookY + Math.cos(tick * 1.0) * 0.06 + pointer.y * 0.15;

  const rotateYDeg = totalTurnX * 16;
  const rotateXDeg = -totalTurnY * 10;
  const innerPanX = totalTurnX * 14;
  const innerPanY = totalTurnY * 10 + breathY;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className={`fixed transition-all duration-700 ease-out ${routeCfg.boxClass}`}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-2xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(0, ${breathY * 0.5}px, 0) rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={PHOTO_URL}
            alt="Nana Septiana"
            className="h-full w-full object-contain object-center transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${routeCfg.zoom}) translate3d(${innerPanX}px, ${innerPanY}px, 0)`,
            }}
          />

          {/* Samarkan latar putih dengan vignette gelap di pinggir */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, rgba(11,13,18,0) 44%, rgba(11,13,18,0.65) 82%, rgba(11,13,18,0.94) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neutral-950/90 to-transparent" />
        </div>
      </div>
    </div>
  );
}
