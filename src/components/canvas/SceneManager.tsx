"use client";

import { usePathname } from "next/navigation";

const PHOTO_BY_ROUTE: Record<string, string> = {
  "/": "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture.png",
  "/contact":
    "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture%202.PNG",
  "/about":
    "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture.png",
};

export default function SceneManager() {
  const pathname = usePathname();
  const photoUrl = PHOTO_BY_ROUTE[pathname] ?? PHOTO_BY_ROUTE["/"];

  const isContact = pathname === "/contact";
  const isAbout = pathname === "/about";

  const containerClass = isContact
    ? "left-4 bottom-8 w-52 md:left-12 md:bottom-12 md:w-80"
    : isAbout
    ? "right-4 top-20 w-52 md:right-12 md:top-24 md:w-72"
    : "right-4 bottom-8 w-56 md:right-14 md:top-1/2 md:-translate-y-1/2 md:w-80";

  const imageClass = isContact
    ? "h-full w-full object-cover object-top scale-125 -translate-x-2 translate-y-3 transition-all duration-700 ease-out"
    : isAbout
    ? "h-full w-full object-cover object-top scale-115 translate-x-2 translate-y-2 transition-all duration-700 ease-out"
    : "h-full w-full object-cover object-top scale-105 transition-all duration-700 ease-out";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className={`fixed transition-all duration-700 ease-out ${containerClass}`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/90 shadow-2xl">
          <img
            src={photoUrl}
            alt="Nana Septiana"
            className={imageClass}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 34%, rgba(10,12,18,0) 34%, rgba(10,12,18,0.68) 76%, rgba(10,12,18,0.96) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
