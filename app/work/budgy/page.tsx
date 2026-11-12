import type { Metadata } from "next";
import CaseBudgy from "@/components/CaseBudgy";

export const metadata: Metadata = {
  title: "Budgy: a monthly budget that answers one question — Giulio Libralato",
  description: "Case study: a personal iOS budgeting app, designed and built to replace a spreadsheet, from React Native to native SwiftUI with Liquid Glass.",
};

export default function Page() {
  return <CaseBudgy />;
}
