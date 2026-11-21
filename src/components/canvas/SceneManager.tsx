"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PHOTO_URL = "/images/profile.png";

interface RoutePhotoConfig {
  desktopClass: string;
  mobileClass: string;
  baseTiltX: number;
  baseTiltY: number;
  accentColor: string;
}

function getRoutePhotoConfig(pathname: string): RoutePhotoConfig {
  switch (pathname) {
    case "/about":
      return {
        desktopClass: "left-8 top-24 w-64 lg:left-14 lg:w-72",
        mobileClass: "left-1/2 -translate-x-1/2 bottom-6 w-44 opacity-25",
        baseTiltX: 1.5,
        baseTiltY: 4,
        accentColor: "rgba(147, 197, 253, 0.35)",
      };
    case "/expertise":
      return {
        desktopClass: "right-8 top-24 w-64 lg:right-14 lg:w-72",
        mobileClass: "left-1/2 -translate-x-1/2 bottom-6 w-44 opacity-20",
        baseTiltX: -1,
        baseTiltY: -4,
        accentColor: "rgba(37, 99, 235, 0.4)",
      };
    case "/projects":
      return {
        desktopClass: "right-8 top-24 w-56 lg:right-12 lg:w-64",
        mobileClass: "left-1/2 -translate-x-1/2 bottom-6 w-40 opacity-15",
        baseTiltX: 0,
        baseTiltY: -3,
        accentColor: "rgba(96, 165, 250, 0.35)",
      };
    case "/experience":
      return {
        desktopClass: "right-8 top-24 w-64 lg:right-14 lg:w-72",
        mobileClass: "left-1/2 -translate-x-1/2 bottom-6 w-44 opacity-20",
        baseTiltX: -1,
        baseTiltY: -3,
        accentColor: "rgba(167, 176, 192, 0.3)",
      };
    case "/contact":
      return {
        desktopClass: "right-8 top-24 w-64 lg:right-14 lg:w-72",
        mobileClass: "left-1/2 -translate-x-1/2 bottom-6 w-44 opacity-20",
        baseTiltX: 0,
        baseTiltY: -2,
        accentColor: "rgba(59, 130, 246, 0.4)",
      };
    case "/":
    default:
      return {
        desktopClass:
          "right-8 top-1/2 -translate-y-1/2 w-64 lg:right-16 lg:w-72",
        mobileClass: "left-1/2 -translate-x-1/2 bottom-6 w-44 opacity-25",
        baseTiltX: 0,
        baseTiltY: -3,
        accentColor: "rgba(37, 99, 235, 0.42)",
      };
  }
}

export default function SceneManager() {
  const pathname = usePathname();
  const [pointerTilt, setPointerTilt] = useState({
    x: 0,
    y: 0,
    spotX: 50,
    spotY: 35,
  });
  const [breathPhase, setBreathPhase] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointerTilt({
        x: -ny * 5,
        y: nx * 6,
        spotX: 50 + nx * 28,
        spotY: 35 + ny * 22,
      });
    };

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      setBreathPhase(elapsed);
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  if (!PHOTO_URL.trim() || photoFailed) {
    return null;
  }

  const config = getRoutePhotoConfig(pathname);
  const idleFloatY = Math.sin(breathPhase * 1.35) * 5;
  const idleBreathScale = 1 + Math.sin(breathPhase * 1.35) * 0.01;
  const idleYaw = Math.sin(breathPhase * 0.7) * 1.4;

  const rotateX = config.baseTiltX + pointerTilt.x;
  const rotateY = config.baseTiltY + pointerTilt.y + idleYaw;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className={`hidden md:block fixed transition-all duration-700 ease-out ${config.desktopClass}`}
        style={{
          perspective: "1100px",
        }}
      >
        <div
          className="absolute -inset-3 -z-10 rounded-3xl blur-2xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${pointerTilt.spotX}% ${pointerTilt.spotY}%, ${config.accentColor}, transparent 70%)`,
          }}
        />

        <div
          className="overflow-hidden rounded-2xl border border-white/15 bg-charcoal/85 shadow-2xl will-change-transform"
          style={{
            transform: `translate3d(${pointerTilt.y * 0.8}px, ${
              idleFloatY + pointerTilt.x * 0.5
            }px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${idleBreathScale})`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <img
              src={PHOTO_URL}
              alt="Nana Septiana"
              onError={() => setPhotoFailed(true)}
              style={{
                transform: `scale(1.03) translate3d(${-pointerTilt.y * 1.1}px, ${
                  -pointerTilt.x * 0.9
                }px, 0)`,
              }}
              className="h-full w-full object-cover object-top transition-transform duration-150 ease-out will-change-transform"
            />

            <div
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{
                background: `radial-gradient(circle at ${pointerTilt.spotX}% ${pointerTilt.spotY}%, rgba(255,255,255,0.12), transparent 58%)`,
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed transition-all duration-500 ${config.mobileClass}`}
      >
        <div
          className="overflow-hidden rounded-2xl border border-white/15 bg-charcoal/80 shadow-xl"
          style={{
            transform: `translate3d(0, ${idleFloatY * 0.45}px, 0) scale(${idleBreathScale})`,
          }}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <img
              src={PHOTO_URL}
              alt="Nana Septiana"
              onError={() => setPhotoFailed(true)}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
