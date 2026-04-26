"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";
import { getSetting } from "@/lib/firebase-db";
import { normalizeAboutSettings, defaultAboutSettings } from "@/lib/about-content";
import { useLanguage } from "@/lib/language-context";

function safeCssValue(value: string, fallback: string) {
  return /^[\w\s.,()%+\-/]+$/.test(value) ? value : fallback;
}

export function AboutPageClient() {
  const { locale } = useLanguage();
  const [aboutData, setAboutData] = useState(defaultAboutSettings);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const aboutSnap = await getSetting("aboutPage");
        if (active && aboutSnap) {
          setAboutData(normalizeAboutSettings(aboutSnap));
        }
      } catch (error) {
        console.error("Failed to load about page settings:", error);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  const current = aboutData.content[locale] ?? aboutData.content.fr;
  const headerTitleSize = safeCssValue(
    aboutData.design.headerTitleSize,
    defaultAboutSettings.design.headerTitleSize,
  );
  const headerIntroSize = safeCssValue(
    aboutData.design.headerIntroSize,
    defaultAboutSettings.design.headerIntroSize,
  );
  const visionTitleSize = safeCssValue(
    aboutData.design.visionTitleSize,
    defaultAboutSettings.design.visionTitleSize,
  );
  const missionItemSize = safeCssValue(
    aboutData.design.missionItemSize,
    defaultAboutSettings.design.missionItemSize,
  );
  const valuesHeadlineSize = safeCssValue(
    aboutData.design.valuesHeadlineSize,
    defaultAboutSettings.design.valuesHeadlineSize,
  );
  const valueCardTitleSize = safeCssValue(
    aboutData.design.valueCardTitleSize,
    defaultAboutSettings.design.valueCardTitleSize,
  );
  const valueCardBodySize = safeCssValue(
    aboutData.design.valueCardBodySize,
    defaultAboutSettings.design.valueCardBodySize,
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper-100 text-ink">
        <div aria-hidden className="absolute inset-0 pointer-events-none grid-lines-paper opacity-50" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 pt-24 pb-16 md:pt-36 md:pb-24">
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-ink-muted"
          >
            <Link href="/" className="hover:opacity-75 transition-opacity">
              <Home className="size-3.5" strokeWidth={1.5} />
            </Link>
            <span className="flex items-center gap-2">
              <ChevronRight className="size-3" />
              <span className="text-ink">{current.header.kicker}</span>
            </span>
          </nav>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 font-mono-label text-ink-muted">
            <span>
              N° {current.header.number} · {current.header.kicker}
            </span>
          </div>

          <Reveal className="mt-8">
            <h1 className="about-header-title font-display font-light leading-[0.92] tracking-tight max-w-5xl text-balance">
              {current.header.title}{" "}
              <em className="italic font-normal text-bordeaux-700">
                {current.header.titleEmphasis}
              </em>
            </h1>
          </Reveal>

          <Reveal className="mt-8 max-w-2xl" delay={0.1}>
            <p className="about-header-intro leading-relaxed text-pretty text-ink-muted">
              {current.header.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-100 py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <SectionKicker number={current.vision.number} label={current.vision.label} />
            <h2 className="about-vision-title mt-6 font-display font-light leading-[1.05] tracking-tight text-balance">
              {current.vision.body}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:pl-10" delay={0.1}>
            <SectionKicker number={current.mission.number} label={current.mission.label} />
            <ul className="mt-6 space-y-5">
              {current.mission.items.map((item) => (
                <li
                  key={item.code}
                  className="flex gap-4 items-baseline border-b border-ink/10 pb-5 text-pretty"
                >
                  <span className="font-mono-label text-bordeaux-700 shrink-0">
                    {item.code}
                  </span>
                  <p className="about-mission-item font-display leading-tight">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-200 py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <SectionKicker number={current.values.number} label={current.values.label} />
          <Reveal className="mt-10 max-w-4xl">
            <h2 className="about-values-headline font-display font-light leading-[1.02] tracking-tight text-balance">
              {current.values.headline}
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/12 border border-ink/12">
            {current.values.items.map((item) => (
              <div
                key={item.code}
                className="bg-paper-100 p-8 flex flex-col min-h-[260px]"
              >
                <span className="font-mono-label text-bordeaux-700">{item.code}</span>
                <h3 className="about-value-title mt-8 font-display leading-tight">
                  {item.title}
                </h3>
                <p className="about-value-body mt-4 text-ink-muted leading-relaxed flex-1">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-header-title {
          font-size: ${headerTitleSize};
        }

        .about-header-intro {
          font-size: ${headerIntroSize};
        }

        .about-vision-title {
          font-size: ${visionTitleSize};
        }

        .about-mission-item {
          font-size: ${missionItemSize};
        }

        .about-values-headline {
          font-size: ${valuesHeadlineSize};
        }

        .about-value-title {
          font-size: ${valueCardTitleSize};
        }

        .about-value-body {
          font-size: ${valueCardBodySize};
        }
      `}</style>
    </>
  );
}