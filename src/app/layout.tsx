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
  title: "Nana -- 3D Creator",
  description:
    "3D Creator portfolio for Nana Septiana — crafting striking 3D modeling, rendering, motion design, branding, and web experiences.",
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
