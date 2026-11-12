import type { Metadata } from "next";
import CaseNexo from "@/components/CaseNexo";

export const metadata: Metadata = {
  title: "Nexo Summit: from ENASEI to Nexo Summit — Giulio Libralato",
  description: "Case study: designing and building the site for Peru's real-estate conference as it changed its name, from the design system to ticket sales with Mercado Pago.",
};

export default function Page() {
  return <CaseNexo />;
}
