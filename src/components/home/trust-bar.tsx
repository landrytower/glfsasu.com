"use client";

import { company } from "@/lib/content";
import { useT } from "@/lib/language-context";

export function TrustBar() {
  const t = useT().trustBar;
  const items = [
    { label: "RCCM", value: company.rccm },
    { label: "ID. NAT", value: company.idNat },
    { label: "N° Impôt", value: company.tax },
    { label: t.siege, value: "Ndjili, Kinshasa, R.D. Congo" },
    { label: t.fondateur, value: company.founder },
  ];
  return (
    <section className="bg-paper-200 border-y border-ink/10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-4 flex flex-wrap items-center gap-x-10 gap-y-2 font-mono-label text-ink-muted">
        {items.map((it, i) => (
          <span key={it.label} className="flex items-center gap-3">
            {i > 0 && (
              <span aria-hidden className="h-2.5 w-px bg-ink/20 hidden md:block" />
            )}
            <span className="text-ink-faint">{it.label}</span>
            <span className="text-ink/85">{it.value}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
