"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PHOTO_URL = "/images/Profil.jfif";

export default function SceneManager() {
  const pathname = usePathname();
  const [tilt, setTilt] = useState({ x: 0, y: 0, spotX: 50, spotY: 35 });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setTilt({
        x: -ny * 5,
        y: nx * 6,
        spotX: 50 + nx * 28,
        spotY: 35 + ny * 22,
      });
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

  const floatY = Math.sin(tick * 1.35) * 5;
  const breath = 1 + Math.sin(tick * 1.35) * 0.01;
  const yaw = Math.sin(tick * 0.7) * 1.4;
  const positionClass =
    pathname === "/about"
      ? "left-8 top-24 w-64 lg:left-14 lg:w-72"
      : "right-8 top-1/2 -translate-y-1/2 w-64 lg:right-16 lg:w-72";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className={`block fixed transition-all duration-700 ease-out ${positionClass}`}
        style={{ perspective: "1100px" }}
      >
        <div
          className="overflow-hidden rounded-2xl border border-white/15 bg-charcoal/85 shadow-2xl"
          style={{
            transform: `translate3d(${tilt.y * 0.8}px, ${
              floatY + tilt.x * 0.5
            }px, 0) rotateX(${tilt.x}deg) rotateY(${
              tilt.y + yaw - 3
            }deg) scale(${breath})`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <img
              src={PHOTO_URL}
              alt="Nana Septiana"
              className="h-full w-full object-contain object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{
                background: `radial-gradient(circle at ${tilt.spotX}% ${tilt.spotY}%, rgba(255,255,255,0.14), transparent 58%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
