"use client";

import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { SectionKicker } from "@/components/section-kicker";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useT } from "@/lib/language-context";

const articles = [
  {
    slug: "lancement-centre-formation-ndjili",
    title: "Lancement du Centre de formation professionnelle de Ndjili",
    kicker: "Formation",
    date: "12 mars 2026",
    excerpt:
      "Première cohorte de 48 stagiaires en BTP, agriculture et énergies renouvelables. Rentrée officielle le 02 avril.",
    image: "/work/btp-equipe-chantier.jpg",
    comments: 12,
  },
  {
    slug: "luiza-bilan-2-ans",
    title: "Luiza, deux ans après : bilan des 6 forages solaires",
    kicker: "Hydraulique",
    date: "28 février 2026",
    excerpt:
      "Retour sur le programme phare du Kasaï Central. Disponibilité 97 %, et 63 % de temps de corvée d'eau en moins.",
    image: "/work/chateau-eau-luiza.jpg",
    comments: 8,
  },
  {
    slug: "partenariat-formation-energies",
    title: "Partenariat technique avec l'Institut Supérieur Technique Kinshasa",
    kicker: "Formation & innovation",
    date: "14 février 2026",
    excerpt:
      "Une convention-cadre pour la filière énergies renouvelables, avec stages obligatoires en entreprise.",
    image: "/work/archidiocese-equipe.jpg",
    comments: 5,
  },
];

export function ActualitesContent() {
  const ta = useT().actualitesPage;
  return (
    <>
      <PageHeader
        number="04"
        kicker={ta.kicker}
        title={ta.title}
        titleEmphasis={ta.titleEm}
        intro={ta.intro}
        crumbs={[{ href: "/actualites", label: ta.kicker }]}
      />

      <section className="bg-paper-100 py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <SectionKicker number="04.A" label={ta.latestLabel} />
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <Link href={`/actualites/${a.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading={i === 0 ? "eager" : "lazy"}
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-navy-950/10 mix-blend-multiply" />
                  </div>
                  <div className="mt-6 flex items-center justify-between font-mono-label text-ink-faint">
                    <span>{a.kicker}</span>
                    <span>{a.date}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl md:text-3xl leading-[1.08] tracking-tight text-balance">
                    {a.title}
                  </h3>
                  <p className="mt-4 text-ink-muted leading-relaxed">
                    {a.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-mono-label text-ink-muted">
                      <MessageCircle className="size-3.5" strokeWidth={1.5} />
                      {a.comments} {ta.comments}
                    </span>
                    <ArrowUpRight className="size-5 text-ink/30 transition-all group-hover:text-bordeaux-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
