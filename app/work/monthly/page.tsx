import type { Metadata } from "next";
import CaseMonthly from "@/components/CaseMonthly";

export const metadata: Metadata = {
  title: "Monthly Budget: a household budget for two — Giulio Libralato",
  description: "Case study: a shared household budget web app with payday steps, meal planning and price comparison across five stores, designed and built for two.",
};

export default function Page() {
  return <CaseMonthly />;
}
