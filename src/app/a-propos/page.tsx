import type { Metadata } from "next";
import { AboutPageClient } from "./about-page-client";

export const metadata: Metadata = {
  title: "À propos",
  description: "Historique, mission, vision et valeurs du Groupe Lipanda FAMILY SASU.",
};

export default function AProposPage() {
  return <AboutPageClient />;
}
