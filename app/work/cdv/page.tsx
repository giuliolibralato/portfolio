import type { Metadata } from "next";
import CaseCdv from "@/components/CaseCdv";

export const metadata: Metadata = {
  title: "Camino de Vida: a website ordered around the first visit — Giulio Libralato",
  description: "Case study: information architecture and home for a church in Lima, from a menu shaped like an org chart to six sections shaped around a first visit.",
};

export default function Page() {
  return <CaseCdv />;
}
