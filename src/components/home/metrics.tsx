"use client";

import { metrics } from "@/lib/content";
import { Counter } from "@/components/counter";
import { SectionKicker } from "@/components/section-kicker";
import { Reveal } from "@/components/reveal";
import { useT } from "@/lib/language-context";

export function Metrics() {
  const tm = useT().metrics;
  return (
    <section className="bg-paper-50 py-24 lg:py-32 relative">
      <div aria-hidden className="absolute inset-0 grid-lines-paper opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionKicker number={tm.sectionNum} label={tm.kicker} />

        <Reveal className="mt-10 max-w-3xl">
          <h2 className="font-display font-light text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] tracking-tight text-balance">
            {tm.headline} <em className="italic text-bordeaux-700">{tm.headlineEm}</em>
            {tm.headlineSuffix}
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.1}>
              <div className="flex flex-col">
                <span className="font-mono-label text-ink-faint mb-6">
                  N° 0{i + 1}
                </span>
                <p className="font-display font-light text-[clamp(3.5rem,7vw,6.5rem)] leading-none tracking-tight text-ink">
                  <Counter
                    value={m.value}
                    prefix={m.prefix ?? ""}
                    suffix={m.suffix ?? ""}
                  />
                </p>
                <div className="mt-6 pt-4 border-t border-ink/15">
                  <p className="font-medium text-ink leading-snug">
                    {tm.items[i]?.label ?? m.label}
                  </p>
                  {m.sub && (
                    <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                      {tm.items[i]?.sub ?? m.sub}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
