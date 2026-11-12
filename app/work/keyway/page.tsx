import type { Metadata } from "next";
import CaseKeyway from "@/components/CaseKeyway";

export const metadata: Metadata = {
  title: "Keyway: 332 legal fields in 4 acts — Giulio Libralato",
  description: "Case study: redesigning a 332-field legal listing questionnaire as four acts with a listing card that assembles as you answer, plus an audit of 177 questions against 129 tickets.",
};

export default function Page() {
  return <CaseKeyway />;
}
