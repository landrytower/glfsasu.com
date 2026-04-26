import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";
import { services, realizations } from "@/lib/content";

const service = services.find((s) => s.slug === "routes-ouvrages-art")!;
const relatedRealizations = realizations.filter((r) =>
  r.service.toLowerCase().includes("route") ||
  r.service.toLowerCase().includes("bâtiment") ||
  r.service.toLowerCase().includes("travaux public")
);

export const metadata: Metadata = {
  title: `${service.title}, Pôle mobilité`,
  description: service.longBlurb ?? service.blurb,
};

const processSteps = [
  {
    n: "01",
    title: "Études & topographie",
    body: "Levés GPS RTK, profils en long et en travers, études géotechniques du sol support et calcul de structure de chaussée.",
  },
  {
    n: "02",
    title: "Terrassement & plate-forme",
    body: "Débroussaillage, décapage, remblai compacté, nivellement laser et réglage de la plate-forme selon les tolérances projet.",
  },
  {
    n: "03",
    title: "Ouvrages d'assainissement",
    body: "Fossés bétonnés, buses et dalots, caniveaux longitudinaux et traversées de chaussée dimensionnés par hydrologie.",
  },
  {
    n: "04",
    title: "Couches de chaussée",
    body: "Sous-couche granulaire, couche de base latérite améliorée ou grave-bitume, enrobé dense ou béton selon trafic.",
  },
  {
    n: "05",
    title: "Ouvrages d'art & réception",
    body: "Ponts en béton armé ou métalliques, garde-corps, signalisation horizontale et verticale, essais à la plaque et réception.",
  },
];

const dataSheet = [
  { label: "Linéaire typique", value: "0,5 – 50 km" },
  { label: "Type de surface", value: "Latérite · Bitume · Béton" },
  { label: "Portée de pont", value: "5 – 40 m" },
  { label: "Charge de référence", value: "Classe 60 tf (convoi type)" },
  { label: "Essais de compactage", value: "Proctor modifié CBR" },
  { label: "Garantie bonne exécution", value: "12 mois · pénalités contractuelles" },
];

export default function RoutesOuvragesArtPage() {
  return (
    <>
      <PageHeader
        number={`${service.code} · 02.06`}
        kicker="Pôle d'expertise"
        title={service.title}
        intro={service.longBlurb}
        crumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.title },
        ]}
        coords="R.D. Congo, Réseau routier national & provincial"
        dark
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/demandes/devis?type=route"
            className="group inline-flex items-center gap-2 bg-bordeaux-700 px-6 py-3.5 text-sm font-medium hover:bg-bordeaux-500 transition-colors"
          >
            Demander un devis route
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-paper-50/30 px-6 py-3.5 text-sm font-medium hover:bg-paper-50/10 transition-colors"
          >
            Parler à un ingénieur
          </Link>
        </div>
      </PageHeader>

      {/* Intro + data sheet */}
      <section className="bg-paper-50 py-24 lg:py-32 relative">
        <div aria-hidden className="absolute inset-0 grid-lines-paper opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <SectionKicker number="01" label="Notre approche" />
              <Reveal className="mt-8">
                <h2 className="font-display font-light text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-tight text-balance">
                  De la piste de terre à la route bitumée,{" "}
                  <em className="italic text-bordeaux-700">
                    la maîtrise complète
                  </em>{" "}
                  du chantier.
                </h2>
              </Reveal>
              <Reveal className="mt-6 space-y-5 text-ink-muted leading-relaxed text-pretty max-w-2xl" delay={0.1}>
                <p>
                  En R.D. Congo, l'enclavement routier est un frein direct au
                  développement économique et à l'accès aux soins. Notre pôle
                  mobilité conçoit des itinéraires adaptés aux conditions
                  climatiques tropicales : sols latéritiques, crues saisonnières,
                  et dimensionne chaque ouvrage d'art pour traverser les
                  décennies.
                </p>
                <p>
                  Nous travaillons en mode clé en main : topographie, études
                  géotechniques, terrassement, chaussée, assainissement et
                  ouvrages d'art sont réalisés par nos propres équipes, sans
                  sous-traitance sur les postes critiques.
                </p>
              </Reveal>

              <Reveal className="mt-12" delay={0.2}>
                <h3 className="font-mono-label text-ink-faint mb-4">
                  Livrables typiques
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                  {service.deliverables?.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                    >
                      <Check
                        className="size-4 mt-0.5 text-green-700 shrink-0"
                        strokeWidth={2}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Data sheet */}
            <Reveal className="lg:col-span-5 lg:pl-10" delay={0.15}>
              <div className="bg-paper-100 border border-ink/12 p-8 lg:p-10">
                <div className="flex items-center justify-between font-mono-label text-ink-faint pb-4 border-b border-ink/10">
                  <span>Fiche technique type</span>
                  <span>{service.code}</span>
                </div>
                <dl className="mt-6 divide-y divide-ink/10">
                  {dataSheet.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-5 py-4 gap-3 text-sm"
                    >
                      <dt className="col-span-2 text-ink-muted">{row.label}</dt>
                      <dd className="col-span-3 font-mono text-ink">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-8 text-sm text-ink-muted leading-relaxed">
                  Valeurs indicatives, un devis précis est établi après étude
                  préalable et reconnaissance de terrain.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy-950 text-paper-50 py-24 lg:py-32 relative overflow-hidden noise">
        <div aria-hidden className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
          <SectionKicker number="02" label="Méthode" dark />
          <Reveal className="mt-8 max-w-4xl">
            <h2 className="font-display font-light text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-tight text-balance">
              Cinq jalons,{" "}
              <em className="italic text-green-300">zéro approximation</em>.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-px bg-paper-50/10 border border-paper-50/10">
            {processSteps.map((s) => (
              <Reveal
                key={s.n}
                className="bg-navy-950 p-7 md:p-8 flex flex-col min-h-[280px]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display italic font-light text-5xl text-bordeaux-500">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-xl leading-tight text-balance">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-paper-50/70 leading-relaxed">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship image panel */}
      <section className="relative bg-paper-100">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-24 lg:py-32">
          <SectionKicker number="03" label="Expertise de référence" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-mono-label text-paper-50/40 text-center px-8">
                    Photo de chantier, Route provinciale, R.D. Congo
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 text-paper-50 font-mono-label flex items-center justify-between">
                  <span>GLF-ROU</span>
                  <span>R.D. Congo</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.15}>
              <p className="font-mono-label text-bordeaux-700 mb-6">
                Kasaï Central & Kinshasa
              </p>
              <h3 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-balance">
                Routes rurales, ponts et désenclavement communautaire.
              </h3>
              <p className="mt-6 text-ink-muted leading-relaxed">
                Nous réhabilitons des pistes dégradées, construisons des ponts
                sur cours d'eau permanents et réalisons les ouvrages
                d'assainissement indispensables pour pérenniser ces
                infrastructures face aux pluies tropicales.
              </p>
              <Link
                href="/demandes/devis?type=route"
                className="mt-10 inline-flex items-center gap-2 text-bordeaux-700 font-medium"
              >
                <span className="ink-link-grow">Démarrer un projet route</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related realizations */}
      {relatedRealizations.length > 0 && (
        <section className="bg-paper-200 py-20">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <SectionKicker number="04" label="Ouvrages similaires" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedRealizations.slice(0, 4).map((r) => (
                <Link
                  key={r.slug}
                  href={`/realisations/${r.slug}`}
                  className="group border border-ink/12 bg-paper-100 hover:bg-paper-50 transition-colors p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between font-mono-label text-ink-faint">
                    <span>{r.code}</span>
                    <span>{r.year}</span>
                  </div>
                  <h4 className="mt-6 font-display text-xl leading-tight text-balance">
                    {r.title}
                  </h4>
                  <p className="mt-2 text-sm text-ink-muted">
                    {r.location}, {r.province}
                  </p>
                  <ArrowUpRight className="mt-8 size-5 text-ink/30 transition-all group-hover:text-bordeaux-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-bordeaux-700 py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <p className="font-mono-label text-paper-50/65 mb-3">Pôle ROU</p>
            <h2 className="font-display font-light text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-tight text-paper-50 text-balance">
              Un projet de route ou d'ouvrage d'art ?
            </h2>
            <p className="mt-3 text-paper-50/75 leading-relaxed max-w-xl">
              Nos ingénieurs vous recontactent sous 48 h avec une estimation
              préliminaire basée sur vos données de terrain.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/demandes/devis?type=route"
              className="inline-flex items-center gap-2 bg-paper-50 text-bordeaux-700 px-7 py-4 font-medium hover:bg-paper-100 transition-colors"
            >
              Demander un devis
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-paper-50/30 text-paper-50 px-7 py-4 font-medium hover:bg-paper-50/10 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
