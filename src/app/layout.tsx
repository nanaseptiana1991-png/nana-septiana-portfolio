import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nana Septiana — 3D & Digital Creator",
  description:
    "Portfolio of Nana Septiana — web & internal operational systems, government & private procurement leads, digital marketing, branding, and 3D visual experiences.",
  openGraph: {
    title: "Nana Septiana — 3D & Digital Creator",
    description:
      "Explore operational web systems, procurement lead tools, digital campaigns, and 3D creative portfolio by Nana Septiana.",
    type: "website",
    images: [
      {
        url: "/images/Profil.png",
        alt: "Nana Septiana — 3D & Digital Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nana Septiana — 3D & Digital Creator",
    description:
      "Web & internal operational systems, procurement leads, digital marketing, and 3D creative portfolio by Nana Septiana.",
    images: ["/images/Profil.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kanit.variable} dark`}>
      <body
        className={`${kanit.className} min-h-screen bg-[#0C0C0C] text-[#D7E2EA] antialiased overflow-x-clip`}
      >
        <div id="root" className="min-h-screen bg-[#0C0C0C] overflow-x-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
