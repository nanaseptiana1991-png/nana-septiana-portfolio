import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import ClientSceneWrapper from "@/components/canvas/ClientSceneWrapper";
import { PROFILE_DATA } from "@/data/portfolioData";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PROFILE_DATA.name} — Portfolio`,
  description:
    "Personal portfolio of Nana Septiana — bridging business operations, partner acquisition, and web application development.",
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
      <body className="min-h-screen bg-obsidian font-sans text-white antialiased selection:bg-electric-blue selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          <ClientSceneWrapper />
          <Navbar />
          <main className="relative z-10 min-h-screen pt-16">
            <PageTransition>{children}</PageTransition>
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
