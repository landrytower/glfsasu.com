import type { Metadata } from "next";
import { DemandesContent } from "./demandes-content";

export const metadata: Metadata = {
  title: "Formulaires en ligne",
  description: "Demande de devis, étude géophysique, raccordement AEP, inscription formation professionnelle.",
};

export default function DemandesHub() {
  return <DemandesContent />;
}

