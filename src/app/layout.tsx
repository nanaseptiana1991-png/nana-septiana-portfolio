import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://nana-septiana-portfolio.vercel.app";
const SHARE_IMAGE = "/images/Profil.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nana Septiana | Business, Operations & Web Systems Portfolio",
    template: "%s | Nana Septiana",
  },
  description:
    "Portofolio Nana Septiana — profesional berorientasi bisnis dengan pengalaman di bidang sales, operasional bisnis, dan pengembangan sistem web serta solusi digital praktis.",
  keywords: [
    "Nana Septiana",
    "Portofolio",
    "Web Systems",
    "Business Operations",
    "Sales & Business Development",
    "Next.js",
    "Google Apps Script",
    "Dashboard & Data Management",
  ],
  authors: [{ name: "Nana Septiana" }],
  creator: "Nana Septiana",
  publisher: "Nana Septiana",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Nana Septiana Portfolio",
    title: "Nana Septiana | Business, Operations & Web Systems Portfolio",
    description:
      "Menghubungkan pemahaman bisnis, operasional lapangan, dan teknologi digital untuk membangun sistem web serta alur kerja yang lebih efisien.",
    images: [
      {
        url: SHARE_IMAGE,
        width: 1200,
        height: 630,
        alt: "Nana Septiana — Business, Operations & Web Systems Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nana Septiana | Business, Operations & Web Systems Portfolio",
    description:
      "Portofolio proyek sistem web, operasional bisnis, data & spreadsheet, serta pengembangan digital oleh Nana Septiana.",
    images: [SHARE_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#0C0C0C] font-sans text-[#D7E2EA] antialiased selection:bg-[#B600A8] selection:text-white">
        {children}
      </body>
    </html>
  );
}
