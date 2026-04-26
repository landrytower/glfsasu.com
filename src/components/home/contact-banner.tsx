"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone, Mail } from "lucide-react";
import { company } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";
import { useT } from "@/lib/language-context";

const channelIcons = [ArrowUpRight, MessageCircle, Phone, Mail];

export function ContactBanner() {
  const tc = useT().contactBanner;

  const channels = [
    { label: tc.channels[0].label, sub: tc.channels[0].sub, href: "/demandes/devis", cta: tc.channels[0].cta, external: false },
    { label: tc.channels[1].label, sub: company.whatsapp, href: company.whatsappHref, cta: tc.channels[1].cta, external: true },
    { label: tc.channels[2].label, sub: company.phone, href: company.phoneHref, cta: tc.channels[2].cta, external: false },
    { label: tc.channels[3].label, sub: company.email, href: `mailto:${company.email}`, cta: tc.channels[3].cta, external: false },
  ];

  return (
    <section className="bg-paper-200 py-24 lg:py-32 relative">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionKicker number={tc.sectionNum} label={tc.kicker} />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <Reveal className="lg:col-span-8">
            <h2 className="font-display font-light text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] tracking-tight text-balance">
              {tc.headline}{" "}
              <em className="italic text-bordeaux-700">
                {tc.headlineEm}
              </em>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:pb-2" delay={0.1}>
            <p className="text-ink-muted leading-relaxed">
              {tc.sub}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/12 border border-ink/12">
          {channels.map((c, i) => {
            const Icon = channelIcons[i];
            const content = (
              <div className="group relative bg-paper-100 hover:bg-paper-50 transition-colors p-8 h-full flex flex-col">
                <span className="font-mono-label text-ink-faint">
                  {tc.channelPrefix} {String(i + 1).padStart(2, "0")}
                </span>
                <Icon
                  className="mt-8 size-6 text-bordeaux-700"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 font-display text-2xl leading-tight">
                  {c.label}
                </h3>
                <p className="mt-2 text-sm text-ink-muted font-mono">
                  {c.sub}
                </p>
                <p className="mt-auto pt-10 font-mono-label text-bordeaux-700 flex items-center gap-1.5">
                  <span className="ink-link-grow">{c.cta}</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
              </div>
            );

            return c.external ? (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener"
                className="block"
              >
                {content}
              </a>
            ) : (
              <Link key={c.label} href={c.href} className="block">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
