import type { Metadata } from "next";
import CaseDigito from "@/components/CaseDigito";

export const metadata: Metadata = {
  title: "Dígito: making the timesheet the easy part — Giulio Libralato",
  description: "Case study: redesign of an internal project-management SaaS around a one-click hour log with a daily streak, from interviews and desk research to a Figma prototype.",
};

export default function Page() {
  return <CaseDigito />;
}
