import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import SmoothScroll from "@/components/layout/SmoothScroll";
import SceneManager from "@/components/canvas/SceneManager";
import CustomCursor from "@/components/ui/CustomCursor";
import { PROFILE_DATA } from "@/data/portfolioData";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${PROFILE_DATA.name} — Interactive 3D Portfolio`,
  description: PROFILE_DATA.shortIntro,
  keywords: [
    "Nana Septiana",
    "Business Operations",
    "Sales & Partnership",
    "Web Application Development",
    "Interactive 3D Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} dark`}
    >
      <body className="min-h-screen bg-obsidian font-sans text-white antialiased selection:bg-electric-blue/30">
        <CustomCursor />
        <SmoothScroll>
          <SceneManager />
          <Navbar />
          <main className="relative z-10 pt-16">
            <PageTransition>{children}</PageTransition>
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
