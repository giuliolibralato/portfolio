import type { Metadata } from "next";
import { DM_Mono, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono" });

export const metadata: Metadata = {
  title: "Giulio Libralato · Product Designer",
  description: "Product designer in Lima, Peru. B2B tools, AI workflows, web and mobile. Open to full-time roles and freelance projects.",
  openGraph: { title: "Giulio Libralato · Product Designer", description: "B2B tools, AI workflows, web and mobile.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
