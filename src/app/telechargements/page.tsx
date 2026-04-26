import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionKicker } from "@/components/section-kicker";

export const metadata: Metadata = { title: "Téléchargements" };

const docs = [
  {
    code: "D.01",
    title: "Plaquette institutionnelle 2026",
    size: "PDF · 4,2 Mo",
    language: "FR",
  },
  {
    code: "D.02",
    title: "Catalogue des formations professionnelles",
    size: "PDF · 2,8 Mo",
    language: "FR",
  },
  {
    code: "D.03",
    title: "Rapport d'activité, Luiza 2023/2024",
    size: "PDF · 6,1 Mo",
    language: "FR",
  },
  {
    code: "D.04",
    title: "Fiche technique forage solaire type",
    size: "PDF · 0,9 Mo",
    language: "FR · EN",
  },
  {
    code: "D.05",
    title: "Grille tarifaire : travaux hydrauliques",
    size: "PDF · 1,1 Mo",
    language: "FR",
  },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHeader
        number="09"
        kicker="Téléchargements"
        title="Plaquettes,"
        titleEmphasis="catalogues, rapports."
        intro="Documents institutionnels, fiches techniques et rapports publics. Tout est à jour au 1er trimestre 2026."
        crumbs={[{ href: "/telechargements", label: "Téléchargements" }]}
      />

      <section className="bg-paper-100 py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <SectionKicker number="09.A" label="Bibliothèque" />
          <div className="mt-12 border-t border-ink/12">
            {docs.map((d) => (
              <a
                key={d.code}
                href="#"
                className="group grid grid-cols-12 items-center gap-6 border-b border-ink/12 py-8 hover:bg-paper-50 transition-colors"
              >
                <span className="col-span-2 md:col-span-1 font-mono-label text-ink-faint">
                  {d.code}
                </span>
                <FileText
                  className="col-span-1 md:col-span-1 size-6 text-bordeaux-700"
                  strokeWidth={1.5}
                />
                <h3 className="col-span-9 md:col-span-6 font-display text-xl md:text-2xl leading-tight">
                  {d.title}
                </h3>
                <p className="col-span-6 md:col-span-2 font-mono-label text-ink-faint">
                  {d.size}
                </p>
                <p className="col-span-4 md:col-span-1 font-mono-label text-ink-faint">
                  {d.language}
                </p>
                <span className="col-span-2 md:col-span-1 justify-self-end inline-flex items-center gap-2 text-bordeaux-700 font-mono-label">
                  <Download className="size-4" strokeWidth={1.5} />
                  <span className="hidden md:inline">PDF</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
