import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";
import { services, realizations } from "@/lib/content";

/* ── Static slugs that already have dedicated pages ── */
const CUSTOM_PAGES = new Set(["travaux-hydrauliques", "routes-ouvrages-art"]);

/* ── Generate static params for all services WITHOUT custom pages ── */
export function generateStaticParams() {
  return services
    .filter((s) => !CUSTOM_PAGES.has(s.slug))
    .map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — Groupe Lipanda Family`,
    description: service.longBlurb ?? service.blurb,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  /* Redirect to custom pages if someone lands here */
  if (CUSTOM_PAGES.has(slug)) {
    notFound();
  }

  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const idx = services.indexOf(service);
  const prev = idx > 0 ? services[idx - 1] : null;
  const next = idx < services.length - 1 ? services[idx + 1] : null;

  /* Find related realizations */
  const related = realizations.filter(
    (r) =>
      r.service.toLowerCase().includes(service.title.toLowerCase()) ||
      r.code.startsWith(`GLF-${service.code}`)
  );

  return (
    <>
      <PageHeader
        number={`${service.code} · 02.${String(idx + 1).padStart(2, "0")}`}
        kicker="Pôle d'expertise"
        title={service.title}
        intro={service.longBlurb ?? service.blurb}
        crumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.title },
        ]}
        coords="04°19′ S · 15°19′ E"
        dark
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/demandes/devis"
            className="group inline-flex items-center gap-2 bg-bordeaux-700 px-6 py-3.5 text-sm font-medium hover:bg-bordeaux-500 transition-colors"
          >
            Demander un devis
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-paper-50/30 px-6 py-3.5 text-sm font-medium hover:bg-paper-50/10 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </PageHeader>

      {/* ── Hero image + description ── */}
      <section className="bg-paper-50 relative">
        <div
          aria-hidden
          className="absolute inset-0 grid-lines-paper opacity-40 pointer-events-none"
        />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Image */}
            <Reveal className="lg:col-span-7">
              {service.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width:1024px) 100vw, 820px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6 text-paper-50 font-mono-label flex items-center justify-between">
                    <span>{service.code}</span>
                    <span>{service.kicker}</span>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br from-navy-950 to-navy-900 flex items-center justify-center">
                  <span className="font-mono text-8xl text-paper-50/8 font-bold tracking-widest">
                    {service.code}
                  </span>
                </div>
              )}
            </Reveal>

            {/* Content panel */}
            <div className="lg:col-span-5">
              <SectionKicker number="01" label="À propos du pôle" />

              <Reveal className="mt-8">
                <h2 className="font-display font-light text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-tight text-balance">
                  {service.kicker},{" "}
                  <em className="italic text-bordeaux-700">
                    notre expertise.
                  </em>
                </h2>
              </Reveal>

              <Reveal className="mt-6 text-ink-muted leading-relaxed text-pretty" delay={0.1}>
                <p>
                  {service.longBlurb ?? service.blurb}
                </p>
              </Reveal>

              {/* Deliverables */}
              {service.deliverables && service.deliverables.length > 0 && (
                <Reveal className="mt-10" delay={0.2}>
                  <div className="bg-paper-100 border border-ink/12 p-8">
                    <div className="flex items-center justify-between font-mono-label text-ink-faint pb-4 border-b border-ink/10">
                      <span>Livrables typiques</span>
                      <span>{service.code}</span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                        >
                          <Check
                            className="size-4 mt-0.5 text-green-700 shrink-0"
                            strokeWidth={2}
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related realizations ── */}
      {related.length > 0 && (
        <section className="bg-navy-950 text-paper-50 py-24 lg:py-32 relative overflow-hidden noise">
          <div
            aria-hidden
            className="absolute inset-0 dot-grid opacity-30 pointer-events-none"
          />
          <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
            <SectionKicker number="02" label="Réalisations liées" dark />
            <Reveal className="mt-8 max-w-4xl">
              <h2 className="font-display font-light text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] tracking-tight text-balance">
                Des projets qui{" "}
                <em className="italic text-bordeaux-400">prouvent</em> notre
                savoir-faire.
              </h2>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-50/10 border border-paper-50/10">
              {related.slice(0, 3).map((r) => (
                <Reveal
                  key={r.slug}
                  className="bg-navy-950 group"
                >
                  <Link
                    href={`/realisations/${r.slug}`}
                    className="block p-6 md:p-8 min-h-[240px] flex flex-col"
                  >
                    {r.image && (
                      <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-sm">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          sizes="(max-width:768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <span className="font-mono-label text-bordeaux-400 text-xs">
                      {r.code}
                    </span>
                    <h3 className="mt-3 font-display text-xl leading-tight text-balance">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm text-paper-50/60 leading-relaxed line-clamp-2">
                      {r.summary}
                    </p>
                    <span className="mt-auto pt-6 inline-flex items-center gap-2 font-mono-label text-xs text-paper-50/50 group-hover:text-bordeaux-400 transition-colors">
                      {r.location}, {r.province}
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA + Navigation ── */}
      <section className="bg-paper-100 relative">
        <div
          aria-hidden
          className="absolute inset-0 grid-lines-paper opacity-30 pointer-events-none"
        />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 py-24 lg:py-32">
          {/* CTA */}
          <Reveal>
            <div className="bg-navy-950 text-paper-50 noise p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 rounded-sm">
              <div className="flex-1">
                <h2 className="font-display text-3xl md:text-[38px] leading-[1.05] tracking-tight">
                  Un projet en{" "}
                  <em className="italic text-bordeaux-400">
                    {service.kicker.toLowerCase()}
                  </em>{" "}
                  ?
                </h2>
                <p className="mt-4 text-paper-50/60 leading-relaxed max-w-lg">
                  Nos ingénieurs vous accompagnent de l&apos;étude de
                  faisabilité à la réception définitive. Contactez-nous pour une
                  première analyse gratuite.
                </p>
              </div>
              <Link
                href="/demandes/devis"
                className="group inline-flex items-center gap-3 bg-bordeaux-700 hover:bg-bordeaux-800 text-paper-50 px-8 py-4 font-mono-label text-sm tracking-[0.1em] transition-colors shrink-0"
              >
                Demander un devis
                <ArrowUpRight
                  className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </Reveal>

          {/* Prev / Next navigation */}
          <Reveal className="mt-16" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-ink/10 pt-12">
              {prev ? (
                <Link
                  href={`/services/${prev.slug}`}
                  className="group flex items-start gap-4 p-6 border border-ink/10 hover:bg-paper-50/50 transition-colors rounded-sm"
                >
                  <ArrowLeft className="size-5 mt-1 text-ink-faint group-hover:text-bordeaux-700 transition-colors shrink-0" />
                  <div>
                    <span className="font-mono-label text-xs text-ink-faint">
                      Pôle précédent
                    </span>
                    <h3 className="mt-1 font-display text-lg leading-tight">
                      {prev.title}
                    </h3>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/services/${next.slug}`}
                  className="group flex items-start gap-4 p-6 border border-ink/10 hover:bg-paper-50/50 transition-colors rounded-sm text-right md:justify-end"
                >
                  <div>
                    <span className="font-mono-label text-xs text-ink-faint">
                      Pôle suivant
                    </span>
                    <h3 className="mt-1 font-display text-lg leading-tight">
                      {next.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="size-5 mt-1 text-ink-faint group-hover:text-bordeaux-700 transition-colors shrink-0" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </Reveal>

          {/* Back to all services */}
          <Reveal className="mt-10 text-center" delay={0.15}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-mono-label text-sm text-ink-muted hover:text-bordeaux-700 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Tous les services
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
