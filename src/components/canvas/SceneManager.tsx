"use client";

import { usePathname } from "next/navigation";

const PHOTO_BY_ROUTE: Record<string, string> = {
  "/": "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture.png",
  "/contact":
    "https://raw.githubusercontent.com/nanaseptiana1991-png/nana-septiana-portfolio/main/Picture%202.PNG",
};

export default function SceneManager() {
  const pathname = usePathname();
  const photoUrl = PHOTO_BY_ROUTE[pathname] ?? PHOTO_BY_ROUTE["/"];

  const boxClass =
    pathname === "/contact"
      ? "left-6 bottom-6 w-48 md:left-14 md:bottom-10 md:w-72 -rotate-3"
      : "right-6 bottom-6 w-52 md:right-14 md:top-1/2 md:-translate-y-1/2 md:w-72 rotate-2";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className={`fixed transition-all duration-700 ease-out ${boxClass}`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl">
          <img
            src={photoUrl}
            alt="Nana Septiana"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(11,13,18,0) 36%, rgba(11,13,18,0.72) 76%, rgba(11,13,18,0.96) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
