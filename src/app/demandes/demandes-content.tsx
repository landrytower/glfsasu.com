"use client";

import Link from "next/link";
import { ArrowUpRight, FileText, Droplets, GraduationCap, Compass } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionKicker } from "@/components/section-kicker";
import { useT } from "@/lib/language-context";

const forms = [
  {
    code: "F.01",
    title: "Demande de devis général",
    slug: "devis",
    icon: FileText,
    sub: "Construction, BTP, forage, études. Multi-pôles.",
    time: "5",
  },
  {
    code: "F.02",
    title: "Étude géophysique",
    slug: "etude-geophysique",
    icon: Compass,
    sub: "Localisation, coordonnées GPS, profondeur visée, contexte géologique.",
    time: "4",
  },
  {
    code: "F.03",
    title: "Raccordement AEP Lipanda",
    slug: "raccordement-aep",
    icon: Droplets,
    sub: "Adresse, consommation prévue, pièces justificatives.",
    time: "6",
  },
  {
    code: "F.04",
    title: "Inscription : formation professionnelle",
    slug: "formation",
    icon: GraduationCap,
    sub: "Choix de la filière, cycle, dates de la cohorte.",
    time: "3",
  },
];

export function DemandesContent() {
  const td = useT().demandesPage;
  return (
    <>
      <PageHeader
        number="07"
        kicker={td.kicker}
        title={td.title}
        titleEmphasis={td.titleEm}
        intro={td.intro}
        crumbs={[{ href: "/demandes", label: td.kicker }]}
      />

      <section className="bg-paper-100 py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <SectionKicker number="07.A" label={td.startBtn} />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {forms.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.slug}
                  href={`/demandes/${f.slug}`}
                  className="group relative p-8 md:p-10 border border-ink/12 bg-paper-50 hover:bg-paper-100 hover:border-ink/25 transition-colors flex flex-col gap-6 min-h-[280px]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono-label text-ink-faint">
                      {f.code}
                    </span>
                    <Icon className="size-6 text-bordeaux-700" strokeWidth={1.5} />
                  </div>
                  <div className="mt-auto">
                    <h2 className="font-display text-2xl md:text-3xl leading-[1.05] tracking-tight text-balance">
                      {f.title}
                    </h2>
                    <p className="mt-3 text-ink-muted leading-relaxed">
                      {f.sub}
                    </p>
                    <div className="mt-8 flex items-center justify-between">
                      <span className="font-mono-label text-ink-faint">
                        Durée estimée · {f.time} {td.minuteLabel}
                      </span>
                      <ArrowUpRight className="size-5 text-ink/30 transition-all group-hover:text-bordeaux-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
