"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { company } from "@/lib/content";
import { useT } from "@/lib/language-context";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.6, 0.2, 1] } },
};

export function Hero() {
  const t = useT().hero;
  return (
    <section className="relative overflow-hidden bg-navy-950 text-paper-50 noise">
      {/* Background image — duotone */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/work/forage-developpement.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 mix-blend-luminosity object-[60%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-navy-900/95" />
      </div>

      {/* 12-column grid lines */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 right-0 grid-lines-dark opacity-60 pointer-events-none"
      />

      {/* Large ornamental arc — engineering compass aesthetic */}
      <svg
        aria-hidden
        className="absolute -right-[15%] top-[12%] w-[900px] max-w-none pointer-events-none opacity-[0.16]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="398" stroke="var(--color-paper-50)" strokeDasharray="1 12" />
        <circle cx="400" cy="400" r="300" stroke="var(--color-green-300)" strokeDasharray="4 10" />
        <circle cx="400" cy="400" r="200" stroke="var(--color-paper-50)" strokeDasharray="1 6" />
        <line x1="400" y1="0" x2="400" y2="800" stroke="var(--color-paper-50)" strokeDasharray="2 10" />
        <line x1="0" y1="400" x2="800" y2="400" stroke="var(--color-paper-50)" strokeDasharray="2 10" />
      </svg>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid min-h-[92vh] max-w-[1440px] grid-cols-1 gap-y-10 px-6 pb-20 pt-28 lg:grid-cols-12 lg:gap-x-8 lg:px-10 lg:pt-36"
      >
        {/* top meta row */}
        <motion.div
          variants={item}
          className="lg:col-span-12 flex flex-wrap items-start justify-between gap-4 text-paper-50/60"
        >
          <span className="font-mono-label">N° 00 · {t.manifeste.replace('N° 00 · ', '')}</span>
          <span className="font-mono-label">
            {company.coords} · Ndjili, Kinshasa, R.D. Congo
          </span>
        </motion.div>

        {/* Headline */}
        <div className="lg:col-span-8 flex flex-col justify-end">
          <motion.p
            variants={item}
            className="font-mono-label text-bordeaux-500 mb-8"
          >
            {t.kicker}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-light leading-[0.9] tracking-tight text-[clamp(3.25rem,9.5vw,10rem)] text-balance"
          >
            <span className="block">{t.headline1}</span>
            <span className="block italic font-normal">
              <span className="text-green-300">{t.headline2}</span>
              <span className="text-bordeaux-500">.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-10 max-w-xl text-lg leading-relaxed text-paper-100/85 text-pretty"
          >
            {t.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/demandes/devis"
              className="group inline-flex items-center gap-2 bg-bordeaux-700 px-7 py-4 text-sm font-medium hover:bg-bordeaux-500 transition-colors"
            >
              {t.btnDevis}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 border border-paper-50/30 px-7 py-4 text-sm font-medium hover:bg-paper-50/10 transition-colors"
            >
              <MessageCircle className="size-4" />
              {t.btnWhatsapp}
            </a>
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 px-2 py-4 text-sm font-medium text-paper-50/70 hover:text-paper-50 transition-colors"
            >
              <span className="ink-link-grow">{t.btnRealisations}</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </motion.div>
        </div>

        {/* Data sheet — institutional credential panel */}
        <motion.aside
          variants={item}
          className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end border-l border-paper-50/15 pl-6 lg:pl-8 mt-12 lg:mt-0"
        >
          <p className="font-mono-label text-paper-50/45 mb-6">
            {t.ficheTitle}
          </p>
          <dl className="space-y-6 text-sm">
            <div>
              <dt className="font-mono-label text-paper-50/45 mb-1.5">{t.fondateur}</dt>
              <dd className="font-display text-xl leading-tight">{company.founder}</dd>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <dt className="font-mono-label text-paper-50/45">RCCM</dt>
              <dd className="font-mono text-[13px] text-right">{company.rccm}</dd>
              <dt className="font-mono-label text-paper-50/45">ID NAT</dt>
              <dd className="font-mono text-[13px] text-right">{company.idNat}</dd>
              <dt className="font-mono-label text-paper-50/45">N° Impôt</dt>
              <dd className="font-mono text-[13px] text-right">{company.tax}</dd>
            </div>
            <div className="pt-4 border-t border-paper-50/10">
              <dt className="font-mono-label text-paper-50/45 mb-1">{t.siege}</dt>
              <dd className="leading-relaxed text-paper-100/90">
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.city}, R.D. Congo
              </dd>
            </div>
          </dl>
        </motion.aside>

        {/* bottom status bar */}
        <motion.div
          variants={item}
          className="lg:col-span-12 mt-12 lg:mt-20 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-paper-50/10 font-mono-label text-paper-50/50"
        >
          <span>{t.scrollTip}</span>
          <span>{t.stats}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
