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
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x: nx, y: ny });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  const photoUrl = PHOTO_BY_ROUTE[pathname] ?? PHOTO_BY_ROUTE["/"];
  if (!photoUrl) return null;

  let boxClass =
    "right-6 bottom-6 w-52 md:right-14 md:top-1/2 md:-translate-y-1/2 md:w-72";
  let lookX = 0;
  let lookY = 0;
  let zoom = 1.06;

  if (pathname === "/contact") {
    boxClass = "left-6 bottom-6 w-48 md:left-14 md:bottom-10 md:w-72";
    lookX = -0.9;
    lookY = 0.1;
    zoom = 1.12;
  } else if (pathname === "/about") {
    boxClass = "right-6 top-24 w-48 md:right-14 md:top-28 md:w-72";
    lookX = 0.9;
    lookY = -0.1;
    zoom = 1.1;
  }

  const turnX = lookX + pointer.x * 0.25;
  const turnY = lookY + pointer.y * 0.15;
  const rotateYDeg = turnX * 16;
  const rotateXDeg = -turnY * 10;
  const panX = turnX * 12;
  const panY = turnY * 10;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className={`fixed transition-all duration-700 ease-out ${boxClass}`}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <img
            key={photoUrl}
            src={photoUrl}
            alt="Nana Septiana"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${zoom}) translate3d(${panX}px, ${panY}px, 0)`,
            }}
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(11,13,18,0) 36%, rgba(11,13,18,0.72) 76%, rgba(11,13,18,0.96) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
