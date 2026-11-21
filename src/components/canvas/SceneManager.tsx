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

export default function SceneManager() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Transisi keluar-masuk setiap kali berpindah rute/halaman
  useEffect(() => {
    setVisible(false);
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 140);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Efek parallax 3D saat pointer/sentuhan digerakkan
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setParallax({ x: nx, y: ny });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const photoUrl = PHOTO_BY_ROUTE[pathname] ?? PHOTO_BY_ROUTE["/"];
  if (!photoUrl) return null;

  // Konfigurasi posisi, zoom ke wajah, dan geser tiap halaman
  let positionClass =
    "right-4 bottom-8 w-52 md:right-14 md:top-1/2 md:-translate-y-1/2 md:w-80";
  let faceTransform = "scale(1.08) translate3d(0%, 2%, 0)";
  let baseTiltY = -8;
  let baseTiltX = 2;

  if (pathname === "/contact") {
    // Bergeser ke sisi kiri & zoom lebih dekat ke area wajah
    positionClass = "left-4 bottom-8 w-52 md:left-14 md:bottom-10 md:w-80";
    faceTransform = "scale(1.52) translate3d(-4%, 14%, 0)";
    baseTiltY = 14;
    baseTiltX = -4;
  } else if (pathname === "/about") {
    // Bergeser ke kanan atas & zoom sedang ke wajah
    positionClass = "right-4 top-20 w-48 md:right-14 md:top-24 md:w-72";
    faceTransform = "scale(1.32) translate3d(3%, 9%, 0)";
    baseTiltY = -12;
    baseTiltX = 3;
  } else if (pathname === "/projects") {
    positionClass = "left-4 top-24 w-48 md:left-12 md:top-28 md:w-72";
    faceTransform = "scale(1.22) translate3d(-2%, 6%, 0)";
    baseTiltY = 10;
    baseTiltX = 2;
  }

  const rotY = baseTiltY + parallax.x * 12;
  const rotX = baseTiltX - parallax.y * 9;
  const shiftX = parallax.x * 16;
  const shiftY = parallax.y * 12;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <style>{`
        @keyframes sceneFloatBreath {
          0%, 100% {
            transform: translate3d(0px, 0px, 0px) scale(1);
          }
          50% {
            transform: translate3d(0px, -10px, 0px) scale(1.02);
          }
        }
        .scene-float-active {
          animation: sceneFloatBreath 4.2s ease-in-out infinite;
        }
      `}</style>

      <div
        className={`fixed transition-all duration-700 ease-out ${positionClass}`}
        style={{
          perspective: "1100px",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translate3d(0, 0, 0) scale(1)"
            : "translate3d(0, 18px, 0) scale(0.94)",
        }}
      >
        <div className="scene-float-active">
          <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/90 shadow-2xl transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${shiftX}px, ${shiftY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <img
              key={`${pathname}-${photoUrl}`}
              src={photoUrl}
              alt="Nana Septiana"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out"
              style={{
                transform: faceTransform,
              }}
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 34%, rgba(10,12,18,0) 34%, rgba(10,12,18,0.68) 76%, rgba(10,12,18,0.96) 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
