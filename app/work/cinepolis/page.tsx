import type { Metadata } from "next";
import CaseCinepolis from "@/components/CaseCinepolis";

export const metadata: Metadata = {
  title: "Cinépolis: research for a cinema website — Giulio Libralato",
  description: "Case study: UX research for cinepolis.com.pe, from audit and survey to a new information architecture tested against the old one with tree testing.",
};

export default function Page() {
  return <CaseCinepolis />;
}
