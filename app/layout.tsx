import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Giulio Libralato — Product Designer",
  description: "Product designer in Lima, Peru. B2B tools, AI workflows, web and mobile. Open to full-time roles and freelance projects.",
  openGraph: { title: "Giulio Libralato — Product Designer", description: "B2B tools, AI workflows, web and mobile.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t;var c=localStorage.getItem("cursor");if(c)document.documentElement.style.setProperty("--cursor",c)}catch(e){}`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager: the standard loader (it queues gtm.start before the library loads) */}
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NSXMTKQF');`}</Script>
        {children}
      </body>
    </html>
  );
}
