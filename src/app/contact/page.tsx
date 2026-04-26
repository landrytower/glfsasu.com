"use client";

import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionKicker } from "@/components/section-kicker";
import { Reveal } from "@/components/reveal";
import { company } from "@/lib/content";
import { useState, useRef } from "react";
import { submitContact } from "@/lib/firebase-db";
import { useT } from "@/lib/language-context";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const tc = useT().contactPage;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      await submitContact({
        name: fd.get("name") as string,
        organization: fd.get("organization") as string,
        email: fd.get("email") as string,
        phone: fd.get("phone") as string,
        subject: fd.get("subject") as string,
        message: fd.get("message") as string,
      });
      setSubmitted(true);
    } catch {
      alert(tc.sendError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        number="08"
        kicker={tc.kicker}
        title={tc.title}
        titleEmphasis={tc.titleEm}
        intro={tc.intro}
        crumbs={[{ href: "/contact", label: tc.kicker }]}
        coords={company.coords}
      />

      <section className="bg-paper-100 py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left — details */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <SectionKicker number="01" label={tc.hqLabel} />
              <Reveal className="mt-8">
                <div className="flex gap-4">
                  <MapPin
                    className="size-5 mt-1 text-bordeaux-700 shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="space-y-1.5">
                    <p className="font-display text-2xl leading-tight">
                      {company.address.line1}
                    </p>
                    <p className="text-ink-muted">{company.address.line2}</p>
                    <p className="text-ink-muted">
                      {company.address.city}, {company.address.country}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div>
              <SectionKicker number="02" label={tc.channelsLabel} />
              <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                <ContactLine
                  href={company.phoneHref}
                  Icon={Phone}
                  label={tc.labelPhone}
                  value={company.phone}
                />
                <ContactLine
                  href={company.whatsappHref}
                  Icon={MessageCircle}
                  label={tc.labelWhatsApp}
                  value={company.whatsapp}
                  external
                />
                <ContactLine
                  href={`mailto:${company.email}`}
                  Icon={Mail}
                  label={tc.labelEmail}
                  value={company.email}
                />
                <ContactLine
                  Icon={Clock}
                  label={tc.labelHours}
                  value={tc.hoursValue}
                />
              </div>
            </div>

            <div>
              <SectionKicker number="03" label={tc.infoLabel} />
              <dl className="mt-8 grid grid-cols-2 gap-6">
                {[
                  { l: "RCCM", v: company.rccm },
                  { l: "ID NAT", v: company.idNat },
                  { l: "N° Impôt", v: company.tax },
                  { l: tc.labelFounder, v: company.founder },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="font-mono-label text-ink-faint mb-1.5">
                      {s.l}
                    </dt>
                    <dd className="font-mono text-sm">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right — form + map */}
          <div className="lg:col-span-7 space-y-6">
            {/* Map */}
            <Reveal>
              <div className="relative aspect-[4/5] sm:aspect-[16/9] overflow-hidden bg-navy-900 border border-ink/15">
                <MapIllustration />
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-start justify-between gap-3 text-paper-50 font-mono-label">
                  <span className="text-[10px] sm:text-[11px]">{tc.mapNote}</span>
                  <span className="text-[10px] sm:text-[11px] text-right">{company.coords}</span>
                </div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div className="text-paper-50">
                    <p className="font-mono-label text-paper-50/60 mb-1">
                      {tc.siegeLabel}
                    </p>
                    <p className="font-display text-lg sm:text-xl leading-tight">
                      Nº 36 B, Av. Africain, Q.12
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${company.coords}`}
                    target="_blank"
                    rel="noopener"
                    className="self-start sm:self-auto inline-block border border-paper-50/30 px-4 py-2 text-paper-50 font-mono-label hover:bg-paper-50/10 transition-colors"
                  >
                    {tc.openMaps}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <div className="border border-ink/12 bg-paper-50 p-6 md:p-10">
                <SectionKicker number="04" label={tc.formLabel} />
                {submitted ? (
                  <div className="mt-8 py-12 text-center">
                    <p className="font-display text-3xl leading-tight">
                      {tc.successTitle}
                    </p>
                    <p className="mt-4 text-ink-muted">
                      {tc.successSub}
                    </p>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    className="mt-8 space-y-8"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormInput name="name" label={tc.nameLabel} placeholder={tc.namePh} required />
                      <FormInput
                        name="organization"
                        label={tc.orgLabel}
                        placeholder={tc.orgPh}
                      />
                      <FormInput
                        name="email"
                        label={tc.emailLabel}
                        type="email"
                        placeholder={tc.emailPh}
                        required
                      />
                      <FormInput
                        name="phone"
                        label={tc.phoneLabelForm}
                        type="tel"
                        placeholder={tc.phonePh}
                      />
                    </div>
                    <FormInput
                      name="subject"
                      label={tc.subjectLabel}
                      placeholder={tc.subjectPh}
                    />
                    <label className="block">
                      <span className="font-mono-label text-ink-muted block mb-2">
                        {tc.msgLabel}
                      </span>
                      <textarea
                        name="message"
                        rows={6}
                        required
                        className="w-full bg-transparent border-b border-ink/20 px-0 py-3 text-base focus:border-bordeaux-700 focus:outline-none transition-colors resize-none"
                        placeholder={tc.msgPh}
                      />
                    </label>

                    <div className="flex items-center justify-between pt-4">
                      <p className="font-mono-label text-ink-faint">
                        {tc.responseTime}
                      </p>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-bordeaux-700 text-paper-50 px-6 py-3.5 text-sm font-medium hover:bg-bordeaux-800 disabled:opacity-50 transition-colors"
                      >
                        {submitting ? tc.submitting : tc.submit}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}





function FormInput({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono-label text-ink-muted block mb-2">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-ink/20 px-0 py-3 text-base text-ink placeholder:text-ink-faint focus:border-bordeaux-700 focus:outline-none transition-colors"
      />
    </label>
  );
}

function ContactLine({
  href,
  Icon,
  label,
  value,
  external,
}: {
  href?: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  external?: boolean;
}) {
  const inner = (
    <div className="group flex items-center gap-5 py-5">
      <Icon className="size-4 text-bordeaux-700 shrink-0" strokeWidth={1.5} />
      <div className="flex-1">
        <p className="font-mono-label text-ink-faint">{label}</p>
        <p className="mt-1 font-medium">{value}</p>
      </div>
    </div>
  );
  if (!href) return inner;
  return external ? (
    <a href={href} target="_blank" rel="noopener" className="block hover:bg-paper-50 -mx-2 px-2 transition-colors">
      {inner}
    </a>
  ) : (
    <a href={href} className="block hover:bg-paper-50 -mx-2 px-2 transition-colors">
      {inner}
    </a>
  );
}

function MapIllustration() {
  return (
    <svg
      viewBox="0 0 1200 675"
      className="absolute inset-0 w-full h-full"
      aria-label="Carte stylisée de Kinshasa — Ndjili"
    >
      <defs>
        <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="var(--color-paper-50)"
            strokeOpacity="0.07"
          />
        </pattern>
        <radialGradient id="pin-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-bordeaux-500)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-bordeaux-500)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="675" fill="url(#mapgrid)" />

      {/* River (Congo) */}
      <path
        d="M 0 420 Q 200 380 400 410 T 800 400 Q 1000 390 1200 420 L 1200 460 Q 1000 440 800 445 T 400 460 Q 200 430 0 470 Z"
        fill="var(--color-navy-800)"
        opacity="0.6"
      />
      <path
        d="M 0 420 Q 200 380 400 410 T 800 400 Q 1000 390 1200 420"
        fill="none"
        stroke="var(--color-paper-50)"
        strokeOpacity="0.15"
        strokeDasharray="4 6"
      />

      {/* District blocks */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={80 + i * 90}
          y={180 + (i % 3) * 30}
          width={50 + (i % 4) * 20}
          height={30 + (i % 2) * 15}
          fill="var(--color-paper-50)"
          opacity={0.06 + (i % 3) * 0.02}
        />
      ))}

      {/* Radial rings around pin */}
      <circle cx="760" cy="280" r="140" fill="url(#pin-halo)" />
      <circle cx="760" cy="280" r="80" fill="none" stroke="var(--color-bordeaux-500)" strokeOpacity="0.25" strokeDasharray="2 4" />
      <circle cx="760" cy="280" r="45" fill="none" stroke="var(--color-bordeaux-500)" strokeOpacity="0.4" strokeDasharray="2 3" />

      {/* Pin */}
      <g transform="translate(760, 280)">
        <circle r="10" fill="var(--color-bordeaux-700)" />
        <circle r="4" fill="var(--color-paper-50)" />
      </g>

      {/* Label */}
      <text
        x="780"
        y="262"
        fill="var(--color-paper-50)"
        fontSize="12"
        fontFamily="IBM Plex Mono"
        letterSpacing="2"
      >
        NDJILI · Q.12
      </text>

      {/* Compass rose */}
      <g transform="translate(1100, 100)" opacity="0.7">
        <circle r="30" fill="none" stroke="var(--color-paper-50)" strokeOpacity="0.3" />
        <line x1="0" y1="-30" x2="0" y2="30" stroke="var(--color-paper-50)" strokeOpacity="0.3" />
        <line x1="-30" y1="0" x2="30" y2="0" stroke="var(--color-paper-50)" strokeOpacity="0.3" />
        <text
          x="0"
          y="-35"
          textAnchor="middle"
          fill="var(--color-paper-50)"
          fontSize="10"
          fontFamily="IBM Plex Mono"
        >
          N
        </text>
      </g>
    </svg>
  );
}
