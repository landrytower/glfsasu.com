"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services as staticServices } from "@/lib/content";
import { SectionKicker } from "@/components/section-kicker";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/language-context";
import { getServices, getSetting } from "@/lib/firebase-db";
import { numberToFrench } from "@/lib/number-to-french";

export function ServicePillars() {
  const t = useT().servicePillars;

  const [services, setServices] = useState(staticServices);
  const [sectionText, setSectionText] = useState<{
    headlineEm?: string;
    headlineSuffix?: string;
    sub?: string;
  }>({});

  useEffect(() => {
    getServices()
      .then((docs) => {
        if (docs.length > 0) setServices(docs);
      })
      .catch(() => {});
    getSetting("servicesPillars")
      .then((snap) => {
        if (snap) setSectionText(snap as typeof sectionText);
      })
      .catch(() => {});
  }, []);

  const countWord = numberToFrench(services.length);
  const headlineEm = sectionText.headlineEm || t.headlineEm;
  const headlineSuffix = sectionText.headlineSuffix || t.headlineSuffix;
  const sub = sectionText.sub || t.sub;

  return (
    <section className="relative bg-paper-100 py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionKicker number={t.sectionNum} label={t.kicker} />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <Reveal className="lg:col-span-8">
            <h2 className="font-display font-light text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.95] tracking-tight text-balance">
              {countWord} disciplines. <em className="italic text-bordeaux-700">{headlineEm}</em>{" "}
              {headlineSuffix}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:pb-2" delay={0.15}>
            <p className="text-ink-muted leading-relaxed text-pretty">
              {sub}
            </p>
          </Reveal>
        </div>

        {/* Grid of services */}
        <div className="mt-20 border-t border-ink/12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={cn(
                  "group relative flex flex-col p-7 md:p-8 min-h-[260px] transition-colors",
                  "border-b border-ink/12 sm:border-r",
                  "sm:[&:nth-child(2n)]:border-r-0",
                  "lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0",
                  "xl:[&:nth-child(3n)]:border-r xl:[&:nth-child(4n)]:border-r-0",
                  "hover:bg-paper-50/80"
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono-label text-ink-faint">
                    N° {String(i + 1).padStart(2, "0")} / {s.code}
                  </span>
                  <ArrowUpRight className="size-5 text-ink/25 transition-all duration-300 group-hover:text-bordeaux-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>

                <h3 className="mt-8 font-display text-2xl md:text-[26px] leading-[1.05] tracking-tight text-pretty">
                  {s.title}
                </h3>

                <p className="mt-4 text-sm text-ink-muted leading-relaxed flex-1">
                  {s.blurb}
                </p>

                <span className="mt-5 font-mono-label text-bordeaux-700 opacity-0 transition-opacity group-hover:opacity-100">
                  {t.voirPole}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
