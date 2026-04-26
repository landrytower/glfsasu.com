"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getRealizations, type RealizationDoc } from "@/lib/firebase-db";
import { realizations as staticRealizations } from "@/lib/content";
import { SectionKicker } from "@/components/section-kicker";
import { Reveal } from "@/components/reveal";
import { useT } from "@/lib/language-context";

export function FeaturedRealizations() {
  const tf = useT().featuredRealizations;
  const [allRealizations, setAllRealizations] = useState<RealizationDoc[]>(
    staticRealizations.map((r, i) => ({ ...r, order: i, metrics: r.metrics ?? [] }))
  );

  useEffect(() => {
    getRealizations()
      .then((docs) => { if (docs.length > 0) setAllRealizations(docs); })
      .catch(console.error);
  }, []);

  const featured = allRealizations.slice(0, 3);

  return (
    <section className="relative bg-navy-950 text-paper-50 py-24 lg:py-36 overflow-hidden noise">
      <div aria-hidden className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionKicker number={tf.sectionNum} label={tf.kicker} dark />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <Reveal className="lg:col-span-9">
            <h2 className="font-display font-light text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-tight text-balance">
              {tf.headline1}{" "}
              <em className="italic text-green-300">{tf.headlinePlace1}</em>{" "}
              {tf.headlineMid}{" "}
              <em className="italic text-green-300">{tf.headlinePlace2}</em>
              {tf.headlineSuffix}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-3 lg:pb-3" delay={0.15}>
            <Link
              href="/realisations"
              className="group inline-flex items-center gap-2 font-mono-label text-paper-50/75 hover:text-paper-50 transition-colors"
            >
              <span className="ink-link-grow">{tf.allProjects}</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Lead case study */}
          {featured[0] && (
            <FeaturedCard realization={featured[0]} className="lg:col-span-7" large />
          )}
          {(featured[1] || featured[2]) && (
            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
              {featured[1] && <FeaturedCard realization={featured[1]} />}
              {featured[2] && <FeaturedCard realization={featured[2]} />}
            </div>
          )}
          {featured.length === 0 && (
            <div className="lg:col-span-12 py-12 text-center font-mono-label text-paper-50/30">
              Les réalisations seront affichées ici.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  realization,
  className,
  large,
}: {
  realization: RealizationDoc;
  className?: string;
  large?: boolean;
}) {
  return (
    <Reveal className={className}>
      <Link
        href={`/realisations/${realization.slug}`}
        className="group block relative overflow-hidden border border-paper-50/10 hover:border-paper-50/25 transition-colors h-full"
      >
        <div className={`relative overflow-hidden ${large ? "aspect-[16/11]" : "aspect-[16/10]"}`}>
          <Image
            src={realization.image}
            alt={realization.title}
            fill
            sizes={large ? "(max-width: 1024px) 100vw, 840px" : "(max-width: 1024px) 100vw, 420px"}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          {/* duotone */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/70 via-navy-900/30 to-navy-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[color:var(--color-navy-900)]/20 mix-blend-color" />
        </div>

        {/* Meta overlay */}
        <div className="absolute top-0 inset-x-0 p-5 md:p-6 flex items-start justify-between font-mono-label text-paper-50/80">
          <span>{realization.code}</span>
          <span>{realization.year}</span>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
          <p className="font-mono-label text-bordeaux-500 mb-3">
            {realization.kicker} · {realization.province}
          </p>
          <h3
            className={
              large
                ? "font-display font-light text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-tight text-balance"
                : "font-display font-light text-2xl md:text-[28px] leading-[1.1] tracking-tight text-balance"
            }
          >
            {realization.title}
          </h3>
          <div className="mt-5 flex items-center justify-between">
            <p className="font-mono-label text-paper-50/60">
              {realization.coords}
            </p>
            <ArrowUpRight className="size-5 text-paper-50/70 transition-all group-hover:text-bordeaux-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
