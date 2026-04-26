"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { BrandMark } from "./brand-mark";
import { company, services } from "@/lib/content";
import { useT } from "@/lib/language-context";

const solutionsLinks = services.slice(0, 6).map((s) => ({
  href: `/services/${s.slug}`,
  label: s.title,
}));

export function SiteFooter() {
  const year = new Date().getFullYear();
  const t = useT();
  const f = t.footer;
  return (
    <footer className="relative bg-navy-950 text-paper-50/90 overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40 pointer-events-none" />
      <div aria-hidden className="absolute inset-0 noise" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Hero line */}
        <div className="py-16 md:py-24 border-b border-paper-50/10">
          <p className="font-mono-label text-paper-50/50 mb-6">
            {f.manifesteNum}
          </p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] tracking-tight font-light max-w-5xl text-balance">
            {f.bigQuoteIntro}{" "}
            <em className="italic font-normal text-green-300">{f.bigQuoteEm}</em>{f.bigQuoteDot}{" "}
            <span className="text-paper-50/55">
              {f.bigQuoteSuffix}
            </span>{" "}
            {f.bigQuoteClose}
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/demandes/devis"
              className="group inline-flex items-center gap-2 bg-bordeaux-700 px-6 py-3.5 font-medium hover:bg-bordeaux-500 transition-colors"
            >
              {f.btnStart}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 border border-paper-50/25 px-6 py-3.5 font-medium hover:bg-paper-50/10 transition-colors"
            >
              <MessageCircle className="size-4" />
              {t.hero.btnWhatsapp} · {company.whatsapp}
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-16">
          <div className="md:col-span-4 lg:col-span-4">
            <div className="text-paper-50">
              <BrandMark subtle />
            </div>
            <div className="mt-8 space-y-5 text-sm text-paper-50/75">
              <div className="flex gap-3">
                <MapPin className="size-4 shrink-0 mt-0.5 text-green-300" strokeWidth={1.5} />
                <div>
                  <p>{company.address.line1}</p>
                  <p>{company.address.line2}</p>
                  <p>{company.address.city}, {company.address.country}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="size-4 shrink-0 mt-0.5 text-green-300" strokeWidth={1.5} />
                <a href={company.phoneHref} className="hover:text-paper-50 transition-colors">
                  {company.phone}
                </a>
              </div>
              <div className="flex gap-3">
                <Mail className="size-4 shrink-0 mt-0.5 text-green-300" strokeWidth={1.5} />
                <a href={`mailto:${company.email}`} className="hover:text-paper-50 transition-colors">
                  {company.email}
                </a>
              </div>
            </div>
          </div>

          <FooterCol title={f.sectionA} links={solutionsLinks} />
          <FooterCol title={f.sectionB} links={f.clientLinks} />

          <div className="md:col-span-2 lg:col-span-2">
            <p className="font-mono-label text-paper-50/50 mb-4">{f.sectionC}</p>
            <ul className="space-y-2.5 text-sm text-paper-50/80">
              {f.suivreLinks.map((l) => (
                <li key={l.label}>
                  {"external" in l && l.external ? (
                    <a href={company.whatsappHref} target="_blank" rel="noopener" className="ink-link-grow">{l.label}</a>
                  ) : "phone" in l && l.phone ? (
                    <a href={company.phoneHref} className="ink-link-grow">{l.label}</a>
                  ) : (
                    <Link href={"href" in l ? l.href! : "/"} className="ink-link-grow">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Registrations */}
        <div className="py-8 border-t border-paper-50/10 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-50/55">
          <div>
            <div className="text-paper-50/40 mb-1">{f.rccmLabel}</div>
            <div className="text-paper-50/80">{company.rccm}</div>
          </div>
          <div>
            <div className="text-paper-50/40 mb-1">{f.idNatLabel}</div>
            <div className="text-paper-50/80">{company.idNat}</div>
          </div>
          <div>
            <div className="text-paper-50/40 mb-1">{f.impotLabel}</div>
            <div className="text-paper-50/80">{company.tax}</div>
          </div>
          <div>
            <div className="text-paper-50/40 mb-1">{f.fondeParLabel}</div>
            <div className="text-paper-50/80">{company.founder}</div>
          </div>
        </div>

        {/* Base */}
        <div className="py-8 border-t border-paper-50/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-paper-50/55">
          <p>© {year} Groupe Lipanda FAMILY SASU · {f.copyright}</p>
          <ul className="flex flex-wrap gap-5">
            {f.legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-paper-50 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Builder credit */}
        <div className="py-5 border-t border-paper-50/10 flex justify-center">
          <a
            href="https://buildbyland.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs text-paper-50/45 hover:text-paper-50 transition-colors duration-300"
          >
            Website built by{" "}
            <span className="relative inline-flex items-center gap-1 font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] group-hover:drop-shadow-[0_0_14px_rgba(251,191,36,0.9)] transition-all duration-300 animate-[shimmer_3s_linear_infinite] bg-[length:200%_100%]">
              Landry Palata
              <ArrowUpRight className="size-3 text-amber-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Oversize tagline — archival watermark */}
      <div aria-hidden className="relative pointer-events-none select-none">
        <p className="font-display italic font-light text-[clamp(5rem,20vw,20rem)] leading-none tracking-tighter text-paper-50/[0.04] whitespace-nowrap -mb-8 px-6">
          {f.bigQuoteEm} · {f.bigQuoteEm} · {f.bigQuoteEm}
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="md:col-span-3 lg:col-span-3">
      <p className="font-mono-label text-paper-50/50 mb-4">
        {title}
      </p>
      <ul className="space-y-2.5 text-sm text-paper-50/80">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="ink-link-grow">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
