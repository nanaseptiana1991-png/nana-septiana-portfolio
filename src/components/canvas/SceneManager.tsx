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

interface RouteScenePreset {
  stageClass: string;
  faceZoom: number;
  facePanX: number;
  facePanY: number;
  tiltY: number;
  tiltX: number;
}

function getRoutePreset(pathname: string): RouteScenePreset {
  switch (pathname) {
    case "/contact":
      return {
        // Bergeser ke kiri & lebih zoom ke area wajah
        stageClass:
          "left-4 bottom-8 w-52 md:left-12 md:bottom-12 md:w-80",
        faceZoom: 1.38,
        facePanX: -6,
        facePanY: 10,
        tiltY: 12,
        tiltX: -3,
      };
    case "/about":
      return {
        stageClass:
          "right-4 top-20 w-52 md:right-12 md:top-24 md:w-76",
        faceZoom: 1.25,
        facePanX: 5,
        facePanY: 7,
        tiltY: -12,
        tiltX: 4,
      };
    case "/":
    default:
      return {
        stageClass:
          "right-4 bottom-8 w-56 md:right-14 md:top-1/2 md:-translate-y-1/2 md:w-80",
        faceZoom: 1.08,
        facePanX: 0,
        facePanY: 2,
        tiltY: -7,
        tiltX: 2,
      };
  }
}

export default function SceneManager() {
  const pathname = usePathname();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    setEntering(true);
    const timer = window.setTimeout(() => {
      setEntering(false);
    }, 60);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x: nx, y: ny });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const photoUrl = PHOTO_BY_ROUTE[pathname] ?? PHOTO_BY_ROUTE["/"];
  if (!photoUrl) return null;

  const preset = getRoutePreset(pathname);

  // Layer 1 (frame 3D) & Layer 2 (foto/wajah) bergerak dengan kedalaman berbeda (parallax)
  const frameRotateY = preset.tiltY + pointer.x * 10;
  const frameRotateX = preset.tiltX - pointer.y * 7;
  const frameShiftX = pointer.x * 14;
  const frameShiftY = pointer.y * 10;

  const photoPanX = preset.facePanX - pointer.x * 10;
  const photoPanY = preset.facePanY - pointer.y * 8;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className={`fixed transition-all duration-700 ease-out ${preset.stageClass}`}
        style={{
          perspective: "1200px",
          opacity: entering ? 0.15 : 1,
          transform: entering ? "scale(0.95)" : "scale(1)",
        }}
      >
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/90 shadow-2xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${frameShiftX}px, ${frameShiftY}px, 0) rotateX(${frameRotateX}deg) rotateY(${frameRotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <img
            key={`${pathname}-${photoUrl}`}
            src={photoUrl}
            alt="Nana Septiana"
            className="h-full w-full object-cover object-top transition-all duration-700 ease-out"
            style={{
              transform: `scale(${preset.faceZoom}) translate3d(${photoPanX}px, ${photoPanY}px, 0)`,
            }}
          />

          {/* Vignette sinematik agar tepi menyatu dengan latar gelap */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                
