"use client";

import Image from "next/image";
import { SectionKicker } from "@/components/section-kicker";
import { Reveal } from "@/components/reveal";
import { company } from "@/lib/content";
import { useT } from "@/lib/language-context";

export function LeadershipQuote() {
  const tl = useT().leadershipQuote;
  return (
    <section className="bg-paper-100 py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionKicker number={tl.sectionNum} label={tl.kicker} />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — founder portrait */}
          <Reveal className="lg:col-span-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-navy-900">
              <Image
                src="/founder picture.jpeg"
                alt={`Portrait du fondateur ${company.founder}.`}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy-900/10 via-transparent to-navy-950/75 mix-blend-multiply" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-paper-50">
                <p className="font-mono-label text-paper-50/65 mb-2">
                  {tl.founderRole}
                </p>
                <p className="font-display text-lg leading-tight">
                  {company.founder}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right — quote + bio */}
          <div className="lg:col-span-8 relative">
            <span
              aria-hidden
              className="absolute -top-8 -left-4 font-display text-[12rem] leading-none text-bordeaux-700/15 select-none"
            >
              «
            </span>
            <Reveal delay={0.1}>
              <blockquote className="font-display font-light text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] tracking-tight text-balance text-pretty">
                {tl.quotePre}{" "}
                <em className="italic text-bordeaux-700">
                  {tl.quoteEm}
                </em>
                {tl.quotePost}
              </blockquote>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-8 max-w-xl">
              <div>
                <p className="font-mono-label text-ink-faint mb-2">{tl.styleLabel}</p>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {tl.styleValue}
                </p>
              </div>
              <div>
                <p className="font-mono-label text-ink-faint mb-2">{tl.forcesLabel}</p>
                <ul className="text-sm text-ink-muted leading-relaxed space-y-1">
                  {tl.forces.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
