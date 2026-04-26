import type { Metadata } from "next";
import { ActualitesContent } from "./actualites-content";

export const metadata: Metadata = { title: "Actualités" };

export default function ActualitesPage() {
  return <ActualitesContent />;
}
