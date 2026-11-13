import type { Metadata } from "next";
import CaseBrightPath from "@/components/CaseBrightPath";

export const metadata: Metadata = {
  title: "BrightPath: a design test that led to a hire — Giulio Libralato",
  description: "Case study: Designli's design test, extending a course app inside its system and designing a business-minded landing page, with live Figma prototypes.",
};

export default function Page() {
  return <CaseBrightPath />;
}
