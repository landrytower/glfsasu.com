"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowUpRight, Loader2, Search, X } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionKicker } from "@/components/section-kicker";
import { Reveal } from "@/components/reveal";
import { getRealizations, type RealizationDoc } from "@/lib/firebase-db";
import { realizations as staticRealizations } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/language-context";

export default function RealisationsPage() {
  const tr = useT().realisationsPage;
  const [service, setService] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [realizations, setRealizations] = useState<RealizationDoc[]>(
    staticRealizations.map((r, i) => ({ ...r, order: i, metrics: r.metrics ?? [] }))
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRealizations()
      .then((docs) => { if (docs.length > 0) setRealizations(docs); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const allServices = Array.from(new Set(realizations.map((r) => r.service)));
  const allProvinces = Array.from(new Set(realizations.map((r) => r.province)));

  const q = search.toLowerCase().trim();
  const filtered = realizations.filter(
    (r) =>
      (service === "" || r.service === service) &&
      (province === "" || r.province === province) &&
      (q === "" ||
        r.title?.toLowerCase().includes(q) ||
        r.summary?.toLowerCase().includes(q) ||
        r.location?.toLowerCase().includes(q) ||
        r.kicker?.toLowerCase().includes(q) ||
        r.code?.toLowerCase().includes(q))
  );

  return (
    <>
      <PageHeader
        number="03"
        kicker={tr.kicker}
        title={tr.title}
        titleEmphasis={tr.titleEm}
        intro={tr.intro}
        crumbs={[{ href: "/realisations", label: tr.kicker }]}
      />

      {/* Filters */}
      <section className="bg-paper-100 border-b border-ink/10 sticky top-0 z-10 backdrop-blur">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-6 flex flex-wrap items-center gap-6">
          <FilterGroup
            label={tr.filterPole}
            allLabel={tr.filterAll}
            options={allServices}
            value={service}
            onChange={setService}
          />
          <FilterGroup
            label={tr.filterProvince}
            allLabel={tr.filterAll}
            options={allProvinces}
            value={province}
            onChange={setProvince}
          />
          {/* Search input */}
          <div className="relative flex items-center ml-auto">
            <Search className="absolute left-3 size-3.5 text-ink-faint pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tr.searchPh}
              className="pl-8 pr-8 py-1.5 text-xs font-medium border border-ink/15 bg-transparent text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink/40 w-52 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 text-ink-faint hover:text-ink transition-colors"
                aria-label={tr.clearSearch}
                title={tr.clearSearch}
              >
                <X className="size-3" />
              </button>
            )}
          </div>
          {!loading && (
            <span className="ml-auto font-mono-label text-ink-faint">
              {String(filtered.length).padStart(2, "0")} /{" "}
              {String(realizations.length).padStart(2, "0")} {tr.ouvrages}
            </span>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="bg-paper-100 py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <SectionKicker number="03.A" label={tr.inventoryLabel} />

          {loading ? (
            <div className="mt-16 flex justify-center py-20">
              <Loader2 className="size-6 animate-spin text-ink-muted" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-16 py-20 text-center font-mono-label text-ink-faint border-t border-ink/10">
              {realizations.length === 0 ? tr.noProjects : tr.noFilter}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((r, i) => (
                <Reveal key={r.slug || i} delay={Math.min(i * 0.05, 0.3)}>
                  <Link
                    href={`/realisations/${r.slug}`}
                    className="group block bg-paper-50 border border-ink/10 hover:border-ink/25 transition-colors h-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                      {r.image ? (
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading={i < 6 ? "eager" : "lazy"}
                          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="h-full w-full bg-navy-900 flex items-center justify-center text-paper-50/20 font-mono text-xs">
                          {tr.noImage}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent mix-blend-multiply" />
                      <div className="absolute top-0 inset-x-0 p-4 flex items-start justify-between text-paper-50 font-mono-label">
                        <span>{r.code}</span>
                        <span>{r.year}</span>
                      </div>
                    </div>

                    <div className="p-6 md:p-7 flex flex-col">
                      <p className="font-mono-label text-bordeaux-700">{r.kicker}</p>
                      <h3 className="mt-4 font-display text-xl md:text-2xl leading-[1.15] tracking-tight text-balance">
                        {r.title}
                      </h3>
                      <p className="mt-3 text-sm text-ink-muted leading-relaxed line-clamp-3">
                        {r.summary}
                      </p>
                      <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between">
                        <div className="font-mono-label text-ink-faint">
                          {r.location}, {r.province}
                        </div>
                        <ArrowUpRight
                          className="size-5 text-ink/30 transition-all group-hover:text-bordeaux-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterGroup({
  label,
  allLabel,
  options,
  value,
  onChange,
}: {
  label: string;
  allLabel: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono-label text-ink-faint">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        <button
          key="__all__"
          onClick={() => onChange("")}
          type="button"
          className={cn(
            "px-3 py-1.5 text-xs font-medium transition-colors border",
            value === ""
              ? "bg-navy-900 text-paper-50 border-navy-900"
              : "border-ink/15 text-ink-muted hover:border-ink/35 hover:text-ink"
          )}
        >
          {allLabel}
        </button>
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            type="button"
            className={cn(
              "px-3 py-1.5 text-xs font-medium transition-colors border",
              value === o
                ? "bg-navy-900 text-paper-50 border-navy-900"
                : "border-ink/15 text-ink-muted hover:border-ink/35 hover:text-ink"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
