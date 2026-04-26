import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";
import { services, realizations } from "@/lib/content";

const service = services.find((s) => s.slug === "travaux-hydrauliques")!;
const relatedRealizations = realizations.filter((r) =>
  r.service.toLowerCase().includes("hydraulique")
);

export const metadata: Metadata = {
  title: `${service.title}, Pôle hydraulique`,
  description: service.longBlurb ?? service.blurb,
};

const processSteps = [
  {
    n: "01",
    title: "Prospection géophysique",
    body: "VES, résistivité électrique et reconnaissance topographique pour localiser l'aquifère avant tout forage.",
  },
  {
    n: "02",
    title: "Foration & essais de pompage",
    body: "Foration au marteau fond-de-trou, équipement PVC alimentaire, essais de pompage normalisés sur 72 h.",
  },
  {
    n: "03",
    title: "Équipement & pompage solaire",
    body: "Pompes immergées solaires, réservoir tampon, systèmes hybrides PV + groupe pour zones enclavées.",
  },
  {
    n: "04",
    title: "Adduction & distribution",
    body: "Château d'eau, réseau primaire et bornes fontaines, avec option de télémétrie longue portée.",
  },
  {
    n: "05",
    title: "Exploitation & maintenance",
    body: "Contrat d'exploitation, formation d'opérateurs locaux, pièces de rechange garanties 5 ans.",
  },
];

const dataSheet = [
  { label: "Profondeur type", value: "60 – 150 m" },
  { label: "Débit moyen", value: "1,8 – 3,2 m³/h" },
  { label: "Capacité stockage", value: "10 – 50 m³" },
  { label: "Type de pompage", value: "Solaire · Hybride · Manuel" },
  { label: "Essais de pompage", value: "72 h normalisés" },
  { label: "Garantie ouvrage", value: "5 ans + SAV" },
];

export default function TravauxHydrauliquesPage() {
  return (
    <>
      <PageHeader
        number={`${service.code} · 02.02`}
        kicker="Pôle d'expertise"
        title={service.title}
        intro={service.longBlurb}
        crumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.title },
        ]}
        coords="Kasaï Central & bassin du Congo"
        dark
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/demandes/devis?type=forage"
            className="group inline-flex items-center gap-2 bg-bordeaux-700 px-6 py-3.5 text-sm font-medium hover:bg-bordeaux-500 transition-colors"
          >
            Demander un devis hydraulique
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/demandes/etude-geophysique"
            className="inline-flex items-center gap-2 border border-paper-50/30 px-6 py-3.5 text-sm font-medium hover:bg-paper-50/10 transition-colors"
          >
            Étude géophysique préalable
          </Link>
        </div>
      </PageHeader>

      {/* Intro + data sheet */}
      <section className="bg-paper-50 py-24 lg:py-32 relative">
        <div aria-hidden className="absolute inset-0 grid-lines-paper opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <SectionKicker number="01" label="Notre chaîne de valeur" />
              <Reveal className="mt-8">
                <h2 className="font-display font-light text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-tight text-balance">
                  De la prospection à l'exploitation,{" "}
                  <em className="italic text-bordeaux-700">
                    la maîtrise complète
                  </em>{" "}
                  de l'ouvrage.
                </h2>
              </Reveal>
              <Reveal className="mt-6 space-y-5 text-ink-muted leading-relaxed text-pretty max-w-2xl" delay={0.1}>
                <p>
                  Plutôt qu'une sous-traitance par silos, nous gardons sous le
                  même toit la géophysique, la foration, l'équipement solaire et
                  la maintenance. Cette continuité permet de livrer et de
                  garantir un ouvrage qui tient dans le temps.
                </p>
                <p>
                  Notre expérience sur le territoire de Luiza (6 forages, ~12
                  400 bénéficiaires) a consolidé une méthode reproductible : un
                  forage communautaire opérationnel en 90 jours, de l'étude de
                  sol à la mise en service.
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
                  préalable.
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
          <SectionKicker number="03" label="Ouvrage de référence" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/work/forage-developpement.jpg"
                  alt="Développement de forage à Luiza, montée d'eau lors des essais de pompage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 820px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 text-paper-50 font-mono-label flex items-center justify-between">
                  <span>GLF-HYD-2023-06</span>
                  <span>07°11′ S · 22°25′ E</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.15}>
              <p className="font-mono-label text-bordeaux-700 mb-6">
                Kasaï Central, 2023/2024
              </p>
              <h3 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-balance">
                6 forages d'eau potable à pompage solaire, Luiza.
              </h3>
              <p className="mt-6 text-ink-muted leading-relaxed">
                De la prospection géophysique (résistivité + VES) à la mise en
                service de six bornes fontaines, le programme a mobilisé 18 kWc
                de PV et desservi près de 12 400 habitants. Notre ouvrage phare.
              </p>
              <Link
                href="/realisations/luiza-6-forages-solaires"
                className="mt-10 inline-flex items-center gap-2 text-bordeaux-700 font-medium"
              >
                <span className="ink-link-grow">Lire l'étude de cas</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related realizations */}
      <section className="bg-paper-200 py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <SectionKicker number="04" label="Autres ouvrages hydrauliques" />
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
    </>
  );
}
