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
  const [transitionIn, setTransitionIn] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTransitionIn(false);
    const t = window.setTimeout(() => setTransitionIn(true), 120);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setTilt({ x: nx, y: ny });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const photoUrl = PHOTO_BY_ROUTE[pathname] ?? PHOTO_BY_ROUTE["/"];
  if (!photoUrl) return null;

  // Default di Home (/): berdiri lebih utuh di sisi kanan, tanpa kotak
  let stageStyle =
    "right-2 bottom-0 h-[72vh] w-64 md:right-10 md:bottom-0 md:h-[86vh] md:w-[420px]";
  let cropTransform = "scale(1.02) translate3d(0%, 2%, 0) rotate(0deg)";

  if (pathname === "/contact") {
    // Pindah ke kiri, zoom lebih dekat ke muka, dan miring halus seolah menoleh/mengajak ke arah form
    stageStyle =
      "left-2 bottom-0 h-[74vh] w-64 md:left-10 md:bottom-0 md:h-[88vh] md:w-[440px]";
    cropTransform = "scale(1.65) translate3d(-5%, 16%, 0) rotate(-3deg)";
  } else if (pathname === "/about") {
    // Geser ke kanan & zoom sedang ke bagian atas/wajah dengan arah miring berlawanan
    stageStyle =
      "right-2 bottom-0 h-[74vh] w-64 md:right-12 md:bottom-0 md:h-[88vh] md:w-[430px]";
    cropTransform = "scale(1.38) translate3d(4%, 11%, 0) rotate(3deg)";
  } else if (pathname === "/projects") {
    stageStyle =
      "left-2 bottom-0 h-[70vh] w-60 md:left-12 md:bottom-0 md:h-[84vh] md:w-[400px]";
    cropTransform = "scale(1.25) translate3d(-2%, 8%, 0) rotate(-2deg)";
  }

  const pointerX = tilt.x * 12;
  const pointerY = tilt.y * 8;
  const pointerRotY = tilt.x * 7;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <style>{`
        @keyframes standBreathing {
          0%, 100% {
            transform: translate3d(0px, 0px, 0px) scaleY(1);
          }
          50% {
            transform: translate3d(0px, -6px, 0px) scaleY(1.012);
          }
        }
        .figur-stand-motion {
          animation: standBreathing 4.5s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>

      <div
        className={`fixed transition-all duration-700 ease-out ${stageStyle}`}
        style={{
          perspective: "1200px",
          opacity: transitionIn ? 1 : 0,
        }}
      >
        <div
          className="figur-stand-motion h-full w-full transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${pointerX}px, ${pointerY}px, 0) rotateY(${pointerRotY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 74% 78% at 50% 42%, #000 52%, rgba(0,0,0,0.45) 76%, transparent 100%), linear-gradient(to top, transparent 0%, #000 18%, #000 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "radial-gradient(ellipse 74% 78% at 50% 42%, #000 52%, rgba(0,0,0,0.45) 76%, transparent 100%)",
            }}
          >
            <img
              key={`${pathname}-${photoUrl}`}
              src={photoUrl}
              alt="Nana Septiana"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out"
              style={{
                transform: cropTransform,
              }}
            />

            {/* Gradasi bawah halus supaya bagian kaki/bawah melebur ke latar */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,12,18,0.95) 0%, rgba(10,12,18,0.5) 55%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
