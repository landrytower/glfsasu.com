"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Calendar, Wrench, Hash, Loader2 } from "lucide-react";
import { getRealizations, type RealizationDoc } from "@/lib/firebase-db";
import { realizations as staticRealizations } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";

export default function RealizationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [realization, setRealization] = useState<RealizationDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getRealizations()
      .then((docs) => {
        const found = docs.find((d) => d.slug === slug);
        if (found) {
          setRealization(found);
        } else {
          const staticFound = staticRealizations.find((r) => r.slug === slug);
          if (staticFound) {
            setRealization({ ...staticFound, order: 0, metrics: staticFound.metrics ?? [] });
          } else {
            setNotFoundState(true);
          }
        }
      })
      .catch(() => {
        const staticFound = staticRealizations.find((r) => r.slug === slug);
        if (staticFound) {
          setRealization({ ...staticFound, order: 0, metrics: staticFound.metrics ?? [] });
        } else {
          setNotFoundState(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper-100 flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-ink-muted" />
      </div>
    );
  }

  if (notFoundState || !realization) {
    notFound();
  }

  const r = realization!;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-950 text-paper-50 min-h-[60vh] flex flex-col justify-end overflow-hidden">
        {r.image ? (
          <Image
            src={r.image}
            alt={r.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : null}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/20" />

        {/* Breadcrumb */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-10 pt-32 pb-0">
          <nav className="flex items-center gap-2 font-mono text-xs text-paper-50/50">
            <Link href="/" className="hover:text-paper-50 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/realisations" className="hover:text-paper-50 transition-colors">Réalisations</Link>
            <span>/</span>
            <span className="text-paper-50/80">{r.title}</span>
          </nav>
        </div>

        {/* Title block */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-10 pb-16 pt-8">
          <p className="font-mono-label text-bordeaux-400 mb-4">{r.kicker}</p>
          <h1 className="font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight text-balance max-w-3xl">
            {r.title}
          </h1>

          {/* Meta row */}
          <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs text-paper-50/60">
            {r.code && (
              <span className="flex items-center gap-1.5">
                <Hash className="size-3.5" />
                {r.code}
              </span>
            )}
            {r.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {r.location}, {r.province}
              </span>
            )}
            {r.year && (
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {r.year}
              </span>
            )}
            {r.service && (
              <span className="flex items-center gap-1.5">
                <Wrench className="size-3.5" />
                {r.service}
              </span>
            )}
            {r.coords && (
              <span className="opacity-60">{r.coords}</span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-paper-100 py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Main */}
            <div className="lg:col-span-8">
              <SectionKicker number={r.code || "01"} label="Présentation" />
              <Reveal>
                <p className="mt-8 text-lg leading-relaxed text-ink-muted max-w-2xl">
                  {r.summary}
                </p>
              </Reveal>
            </div>

            {/* Metrics sidebar */}
            {r.metrics && r.metrics.length > 0 && (
              <aside className="lg:col-span-4">
                <SectionKicker number="02" label="Chiffres clés" />
                <div className="mt-8 space-y-6">
                  {r.metrics.map((m, i) => (
                    <Reveal key={i} delay={i * 0.07}>
                      <div className="border-l-2 border-bordeaux-600 pl-5">
                        <p className="font-display text-3xl md:text-4xl font-light text-ink tracking-tight">
                          {m.value}
                        </p>
                        <p className="mt-1 font-mono-label text-ink-muted">{m.label}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Back nav */}
      <section className="bg-paper-50 border-t border-ink/10 py-10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 font-mono-label text-ink-muted hover:text-ink transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Retour aux réalisations
          </Link>
        </div>
      </section>
    </>
  );
}
