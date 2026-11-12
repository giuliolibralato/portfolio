import type { Metadata } from "next";
import CaseCdvMusica from "@/components/CaseCdvMusica";

export const metadata: Metadata = {
  title: "CDV Música: one home for the music and the teams who play it — Giulio Libralato",
  description: "Case study: the music ministry website of Camino de Vida, from a run of campaign sections to a catalog with one template per song, built in WordPress.",
};

export default function Page() {
  return <CaseCdvMusica />;
}
