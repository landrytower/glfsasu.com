import type { Metadata } from "next";
import { ServicesContent } from "./services-content";

export const metadata: Metadata = {
  title: "Services & pôles d'expertise",
  description:
    "Dix disciplines d'ingénierie : études, hydraulique, BTP, études spécialisées, énergies renouvelables, agro-business, formation, expertise foncière, informatique, routes.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}

