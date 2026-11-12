import type { Metadata } from "next";
import CaseBeacon from "@/components/CaseBeacon";

export const metadata: Metadata = {
  title: "One sidebar for 60 destinations — Giulio Libralato",
  description: "Case study: redesigning a brokerage's prospecting portal in a 5-day Impact Week. One sidebar, one assistant, one score per building.",
};

export default function Page() {
  return <CaseBeacon />;
}
