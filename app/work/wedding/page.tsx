import type { Metadata } from "next";
import CaseWedding from "@/components/CaseWedding";

export const metadata: Metadata = {
  title: "Our wedding: an invitation you can open from WhatsApp — Giulio Libralato",
  description: "Case study: a wedding website designed and built from the printed invitation, with a gift list, two doors for guests and visitors, and real usage numbers.",
};

export default function Page() {
  return <CaseWedding />;
}
