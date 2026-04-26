import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";
import { realizations } from "@/lib/content";

const r = realizations.find((r) => r.slug === "luiza-6-forages-solaires")!;

export const metadata: Metadata = {
  title: `${r.title}, ${r.province}`,
  description: r.summary,
};

const galleryImages = [
  { src: "/work/forage-eruption.jpg", caption: "Foration en cours, éjection de boue de forage" },
  { src: "/work/aep-captage-source.jpg", caption: "Captage aménagé — triple becs, béton armé" },
  { src: "/work/aep-village-enfants.jpg", caption: "Desserte quotidienne, enfants aux bornes fontaines" },
  { src: "/work/chateau-eau-luiza.jpg", caption: "Château d'eau solaire, territoire de Luiza" },
];

export default function LuizaCaseStudy() {
  return (
    <>
      <PageHeader
        number={r.code}
        kicker="Étude de cas"
        title={r.title}
        crumbs={[
          { href: "/realisations", label: "Réalisations" },
          { href: `/realisations/${r.slug}`, label: "Luiza" },
        ]}
        coords={r.coords}
        dark
      >
        <dl className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl">
          {r.metrics?.map((m) => (
            <div key={m.label} className="border-l border-paper-50/20 pl-4">
              <dt className="font-mono-label text-paper-50/55 mb-2">
                {m.label}
              </dt>
              <dd className="font-display text-3xl md:text-4xl font-light leading-none">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* Lead image */}
      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 -mt-16 md:-mt-24 relative">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden border border-ink/10 shadow-2xl">
              <Image
                src={r.image}
                alt={r.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Context */}
      <section className="bg-paper-100 py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionKicker number="01" label="Contexte" />
            <Reveal className="mt-8">
              <h2 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tight text-balance">
                Désenclaver l'eau potable dans six villages du territoire de
                Luiza.
              </h2>
            </Reveal>
            <Reveal className="mt-8 space-y-4 text-ink-muted leading-relaxed text-pretty" delay={0.1}>
              <p>
                Commune rurale du Kasaï Central, Luiza souffrait d'un déficit
                chronique d'accès à l'eau potable, avec des nappes profondes et
                un réseau électrique inexistant pour alimenter un pompage
                classique.
              </p>
              <p>
                Notre mandat : prospecter, forer, équiper et mettre en service
                six forages communautaires en moins de 18 mois, en pompage
                entièrement solaire, pour garantir l'autonomie énergétique des
                ouvrages.
              </p>
            </Reveal>

            <Reveal className="mt-10" delay={0.2}>
              <figure className="relative">
                <div className="relative aspect-[4/5] sm:aspect-[3/2] overflow-hidden border border-ink/10">
                  <Image
                    src="/work/avant-projet-eau.jpg"
                    alt="Avant-projet : communauté à la source dégradée, corvée d'eau quotidienne."
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 font-mono-label text-ink-faint">
                  Avant · Point d'eau naturel : corvée quotidienne de 2 à 5 km
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <SectionKicker number="02" label="Défi technique" />
            <Reveal className="mt-8 space-y-6" delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    n: "2A",
                    title: "Identifier l'aquifère",
                    body: "Sous un sol latéritique épais, la nappe productive se trouvait entre 70 et 100 m. Une prospection géophysique combinée (VES + résistivité) a précédé chaque forage.",
                  },
                  {
                    n: "2B",
                    title: "Garantir le débit",
                    body: "Essais de pompage de 72 h pour dimensionner le couple pompe / panneaux PV, avec marge pour les variations saisonnières.",
                  },
                  {
                    n: "2C",
                    title: "Résister à l'usage",
                    body: "Châteaux d'eau surélevés, bornes fontaines blindées, compteurs mécaniques simples pour la redevance communautaire.",
                  },
                  {
                    n: "2D",
                    title: "Former les opérateurs",
                    body: "Deux jeunes par village formés à la maintenance de premier niveau, avec kit d'outillage et stock initial de pièces.",
                  },
                ].map((b) => (
                  <div
                    key={b.n}
                    className="border border-ink/12 bg-paper-50 p-6"
                  >
                    <p className="font-mono-label text-bordeaux-700">{b.n}</p>
                    <h3 className="mt-4 font-display text-xl leading-tight">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Solution — dark */}
      <section className="bg-navy-950 text-paper-50 py-24 lg:py-32 relative overflow-hidden noise">
        <div aria-hidden className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
          <SectionKicker number="03" label="Solution livrée" dark />
          <Reveal className="mt-10 max-w-4xl">
            <h2 className="font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-tight text-balance">
              Six ouvrages sœurs,{" "}
              <em className="italic text-green-300">un seul standard</em>.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <Reveal className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-1">
                {galleryImages.map((g, i) => (
                  <div
                    key={i}
                    className={
                      i === 0
                        ? "col-span-2 aspect-[16/9] relative group"
                        : "aspect-square relative group"
                    }
                  >
                    <Image
                      src={g.src}
                      alt={g.caption}
                      fill
                      sizes="(max-width: 1024px) 100vw, 640px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-navy-950/25 mix-blend-multiply" />
                    <span className="absolute bottom-3 left-3 right-3 font-mono-label text-paper-50/85 text-[10px] leading-snug">
                      N° {String(i + 1).padStart(2, "0")} · {g.caption}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="lg:col-span-5 lg:pl-8">
              <Reveal delay={0.15}>
                <p className="text-paper-50/80 text-lg leading-relaxed text-pretty">
                  Chaque forage intègre le même kit normalisé :
                  pompe immergée solaire, champ PV de 3 kWc, châteaux d'eau de
                  5 à 10 m³, borne fontaine blindée et télémétrie SIM longue
                  portée.
                </p>
              </Reveal>

              <Reveal delay={0.2} className="mt-10 space-y-4">
                {[
                  "Prospection géophysique (VES + résistivité électrique)",
                  "Foration marteau fond-de-trou, PVC alimentaire Ø 125 mm",
                  "Pompe immergée solaire 750 W à 1,1 kW selon profondeur",
                  "Champ photovoltaïque 3 kWc par site",
                  "Château d'eau 5 à 10 m³ en béton armé",
                  "Télémétrie cellulaire pour suivi du débit",
                  "Formation de 12 opérateurs locaux",
                ].map((i, idx) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-4 py-3 border-b border-paper-50/10"
                  >
                    <span className="font-mono-label text-green-300 shrink-0">
                      03.{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-paper-100/85">
                      {i}
                    </span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-paper-50 py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <SectionKicker number="04" label="Impact mesuré" />
          <Reveal className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <h2 className="lg:col-span-8 font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.98] tracking-tight text-balance">
              <em className="italic text-bordeaux-700">12 400</em> personnes
              avec l'eau à moins de 500 m de leur porte.
            </h2>
            <p className="lg:col-span-4 text-ink-muted leading-relaxed lg:pb-3">
              L'enquête post-mise en service a mesuré une baisse de 63 % des
              temps de corvée d'eau et une généralisation de la scolarisation
              des filles dans quatre des six villages concernés.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { v: "06", l: "Forages positifs" },
              { v: "84 m", l: "Profondeur moyenne" },
              { v: "2,4 m³/h", l: "Débit moyen" },
              { v: "18 kWc", l: "PV installé" },
              { v: "12 400", l: "Bénéficiaires" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08}>
                <div className="border-t border-ink/15 pt-5">
                  <p className="font-mono-label text-ink-faint mb-3">
                    N° {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-display font-light text-[clamp(2rem,4.5vw,3.5rem)] leading-none tracking-tight">
                    {s.v}
                  </p>
                  <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                    {s.l}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Next CTA */}
      <section className="bg-paper-200 border-t border-ink/10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <p className="font-mono-label text-ink-faint mb-4">Suite logique</p>
            <h2 className="font-display font-light text-3xl md:text-5xl leading-[1.05] tracking-tight text-balance max-w-3xl">
              Un projet similaire dans votre territoire ?{" "}
              <em className="italic text-bordeaux-700">Parlons-en.</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/demandes/devis?type=forage"
              className="group inline-flex items-center gap-2 bg-bordeaux-700 px-6 py-3.5 text-paper-50 text-sm font-medium hover:bg-bordeaux-800 transition-colors"
            >
              Demander un devis
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/services/travaux-hydrauliques"
              className="inline-flex items-center gap-2 border border-ink/25 px-6 py-3.5 text-sm font-medium hover:bg-paper-50 transition-colors"
            >
              Pôle hydraulique
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
