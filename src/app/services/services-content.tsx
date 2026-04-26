"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionKicker } from "@/components/section-kicker";
import { DynamicServicesList } from "./dynamic-services-list";
import { useT } from "@/lib/language-context";

export function ServicesContent() {
  const ts = useT().servicesPage;
  return (
    <>
      <PageHeader
        number="02"
        kicker={ts.kicker}
        title={ts.title}
        titleEmphasis={ts.titleEm}
        intro={ts.intro}
        crumbs={[{ href: "/services", label: ts.kicker }]}
        coords="04°19′ S · 15°19′ E"
      />

      {/* --- Featured services with images --- */}
      <section className="bg-paper-100 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none grid-lines-paper opacity-30"
        />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="pt-24 pb-4">
            <SectionKicker number="02.A" label={ts.expertsLabel} />
          </div>

          <DynamicServicesList />
        </div>
      </section>

      {/* --- CTA band --- */}
      <section className="bg-navy-950 text-paper-50 noise">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20 md:py-28 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <SectionKicker
              number="02.B"
              label={ts.ctaKicker}
              dark
            />
            <h2 className="mt-6 font-display text-3xl md:text-[42px] leading-[1.05] tracking-tight">
              {ts.ctaTitle}{" "}
              <em className="font-display italic text-bordeaux-400">
                {ts.ctaTitleEm}
              </em>
            </h2>
            <p className="mt-4 text-paper-50/60 leading-relaxed max-w-lg">
              {ts.ctaSub}
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-bordeaux-700 hover:bg-bordeaux-800 text-paper-50 px-8 py-4 font-mono-label text-sm tracking-[0.1em] transition-colors"
          >
            {ts.ctaBtn}
            <ArrowUpRight
              className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </section>
    </>
  );
}
