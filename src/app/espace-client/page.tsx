"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FileText,
  Receipt,
  Droplets,
  FolderKanban,
  ArrowUpRight,
  Download,
  Check,
  Clock,
  AlertCircle,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionKicker } from "@/components/section-kicker";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

type Status = "ok" | "pending" | "due";

const quotes = [
  {
    code: "DV-2026-0412-01",
    title: "Forage positif + château d'eau 15 m³",
    amount: "USD 38 420",
    status: "pending" as Status,
    sent: "04 avril 2026",
  },
  {
    code: "DV-2026-0328-07",
    title: "Étude géophysique, Nsele",
    amount: "USD 4 180",
    status: "ok" as Status,
    sent: "28 mars 2026",
  },
  {
    code: "DV-2025-1119-11",
    title: "Kits solaires 3 écoles",
    amount: "USD 22 900",
    status: "ok" as Status,
    sent: "19 nov. 2025",
  },
];

const invoices = [
  {
    code: "FA-2026-03-041",
    title: "Acompte forage Nsele",
    amount: "USD 9 605",
    status: "due" as Status,
    date: "Échéance : 30 avril",
  },
  {
    code: "FA-2025-12-209",
    title: "Étude géotechnique Matete",
    amount: "USD 3 420",
    status: "ok" as Status,
    date: "Payée · 18 déc. 2025",
  },
];

const projects = [
  {
    code: "P-2026-01",
    title: "Adduction AEP Nsele, Phase 1",
    progress: 68,
    stage: "Foration en cours",
    eta: "Livraison prévue : 15 juin 2026",
  },
  {
    code: "P-2025-14",
    title: "Centre de formation Ndjili",
    progress: 22,
    stage: "Gros œuvre",
    eta: "Livraison prévue : novembre 2026",
  },
];

export default function EspaceClientPage() {
  const [tab, setTab] = useState<"overview" | "quotes" | "invoices" | "projects" | "water">("overview");

  return (
    <>
      <PageHeader
        number="06"
        kicker="Espace client"
        title="Votre chantier,"
        titleEmphasis="toujours lisible."
        intro="Consultez vos devis, payez vos factures en toute sécurité (Mobile Money, carte bancaire, PayPal) et suivez l'avancement de chaque ouvrage."
        crumbs={[{ href: "/espace-client", label: "Espace client" }]}
      />

      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16 lg:py-24">
          {/* Account bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-ink/12 py-5 font-mono-label">
            <div className="flex items-center gap-4">
              <div className="size-9 rounded-full bg-navy-900 text-paper-50 flex items-center justify-center text-sm font-medium">
                MK
              </div>
              <div>
                <p className="text-ink">Mme Nsele Kasongo</p>
                <p className="text-ink-faint">client@example.cd · Compte n° L-2025-0042</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-ink/20 hover:bg-paper-50 text-ink-muted transition-colors">
              Se déconnecter
            </button>
          </div>

          {/* Tabs — horizontally scrollable on small screens */}
          <div className="mt-10 border-b border-ink/10 -mx-6 lg:mx-0 overflow-x-auto">
            <div className="flex gap-2 px-6 lg:px-0 min-w-max">
              {[
                { id: "overview", label: "Vue d'ensemble" },
                { id: "quotes", label: "Devis" },
                { id: "invoices", label: "Factures" },
                { id: "projects", label: "Projets" },
                { id: "water", label: "Consommation d'eau" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as typeof tab)}
                  className={cn(
                    "relative whitespace-nowrap px-4 md:px-5 py-3 text-sm font-medium transition-colors",
                    tab === t.id
                      ? "text-ink"
                      : "text-ink-faint hover:text-ink"
                  )}
                >
                  {t.label}
                  {tab === t.id && (
                    <span className="absolute inset-x-0 -bottom-px h-[3px] bg-bordeaux-700" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12">
            {tab === "overview" && <Overview setTab={setTab} />}
            {tab === "quotes" && <QuotesList />}
            {tab === "invoices" && <InvoicesList />}
            {tab === "projects" && <ProjectsList />}
            {tab === "water" && <WaterPayment />}
          </div>
        </div>
      </section>
    </>
  );
}

function Overview({ setTab }: { setTab: (t: "overview" | "quotes" | "invoices" | "projects" | "water") => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      <Reveal className="lg:col-span-8">
        <SectionKicker number="A" label="Aperçu rapide" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TileCard
            icon={FileText}
            n="01"
            title="Devis"
            value="03 actifs"
            sub="1 en attente de votre validation"
            onClick={() => setTab("quotes")}
          />
          <TileCard
            icon={Receipt}
            n="02"
            title="Factures"
            value="USD 9 605"
            sub="À régler d'ici le 30 avril"
            tone="due"
            onClick={() => setTab("invoices")}
          />
          <TileCard
            icon={FolderKanban}
            n="03"
            title="Projets actifs"
            value="02"
            sub="Adduction Nsele · Centre Ndjili"
            onClick={() => setTab("projects")}
          />
          <TileCard
            icon={Droplets}
            n="04"
            title="Consommation d'eau"
            value="4,2 m³"
            sub="Mois en cours · Compteur 34-NSL-0412"
            onClick={() => setTab("water")}
          />
        </div>
      </Reveal>

      <Reveal className="lg:col-span-4" delay={0.1}>
        <SectionKicker number="B" label="Raccourcis" />
        <div className="mt-8 border border-ink/12 bg-paper-50">
          {[
            { href: "/demandes/devis", label: "Nouvelle demande de devis" },
            { href: "/demandes/etude-geophysique", label: "Étude géophysique" },
            { href: "/demandes/raccordement-aep", label: "Raccordement AEP" },
            { href: "/demandes/formation", label: "Inscription : formation" },
            { href: "/telechargements", label: "Télécharger une plaquette" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between border-b border-ink/10 last:border-b-0 px-5 py-4 hover:bg-paper-100 transition-colors"
            >
              <span className="text-sm font-medium">{l.label}</span>
              <ArrowUpRight className="size-4 text-ink/35 group-hover:text-bordeaux-700 transition-colors" />
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

function TileCard({
  icon: Icon,
  n,
  title,
  value,
  sub,
  tone,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  n: string;
  title: string;
  value: string;
  sub: string;
  tone?: "due";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group text-left p-6 border transition-all hover:-translate-y-0.5 hover:shadow-lg",
        tone === "due"
          ? "bg-bordeaux-50 border-bordeaux-100 hover:border-bordeaux-500"
          : "bg-paper-50 border-ink/12 hover:border-ink/30"
      )}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono-label text-ink-faint">N° {n}</span>
        <Icon className={cn("size-5", tone === "due" ? "text-bordeaux-700" : "text-ink/60")} strokeWidth={1.5} />
      </div>
      <p className="mt-6 font-mono-label text-ink-muted">{title}</p>
      <p className="mt-2 font-display text-3xl leading-tight tracking-tight">
        {value}
      </p>
      <p className="mt-3 text-sm text-ink-muted leading-relaxed">{sub}</p>
    </button>
  );
}

function StatusChip({ status }: { status: Status }) {
  const map = {
    ok: {
      label: "Accepté",
      className: "text-green-700 bg-green-100 border-green-300/50",
      Icon: Check,
    },
    pending: {
      label: "En attente",
      className: "text-navy-700 bg-navy-50 border-navy-100",
      Icon: Clock,
    },
    due: {
      label: "À régler",
      className: "text-bordeaux-800 bg-bordeaux-50 border-bordeaux-100",
      Icon: AlertCircle,
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.15em] border",
        map.className
      )}
    >
      <map.Icon className="size-3" strokeWidth={2} />
      {map.label}
    </span>
  );
}

function QuotesList() {
  return (
    <div className="border border-ink/12 bg-paper-50">
      {/* Desktop table header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-ink/10 font-mono-label text-ink-faint">
        <span className="col-span-3">Référence</span>
        <span className="col-span-5">Intitulé</span>
        <span className="col-span-2">Montant</span>
        <span className="col-span-2 text-right">État</span>
      </div>
      {quotes.map((q) => (
        <div
          key={q.code}
          className="border-b border-ink/10 last:border-b-0 hover:bg-paper-100 transition-colors"
        >
          {/* Desktop row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-5 items-center">
            <div className="col-span-3">
              <p className="font-mono text-sm">{q.code}</p>
              <p className="font-mono-label text-ink-faint mt-1">Envoyé : {q.sent}</p>
            </div>
            <div className="col-span-5">
              <p className="font-display text-lg leading-tight">{q.title}</p>
            </div>
            <p className="col-span-2 font-mono text-sm">{q.amount}</p>
            <div className="col-span-2 flex justify-end items-center gap-3">
              <StatusChip status={q.status} />
              <button
                className="p-2 border border-ink/15 hover:bg-paper-200 transition-colors"
                aria-label="Télécharger le PDF"
              >
                <Download className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Mobile stacked card */}
          <div className="md:hidden px-5 py-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-xs text-ink-faint">{q.code}</p>
              <StatusChip status={q.status} />
            </div>
            <p className="font-display text-lg leading-tight">{q.title}</p>
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-mono-label text-ink-faint text-[10px]">Montant</p>
                <p className="font-mono text-base">{q.amount}</p>
              </div>
              <button
                className="p-2.5 border border-ink/15 hover:bg-paper-200 transition-colors"
                aria-label="Télécharger le PDF"
              >
                <Download className="size-4" strokeWidth={1.5} />
              </button>
            </div>
            <p className="font-mono-label text-ink-faint text-[10px]">Envoyé : {q.sent}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function InvoicesList() {
  return (
    <div className="space-y-4">
      {invoices.map((i) => (
        <div
          key={i.code}
          className="border border-ink/12 bg-paper-50 p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
        >
          <div className="md:col-span-4">
            <p className="font-mono text-sm">{i.code}</p>
            <p className="mt-2 font-display text-xl leading-tight">{i.title}</p>
            <p className="mt-1 font-mono-label text-ink-faint">{i.date}</p>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono-label text-ink-faint mb-1">Montant</p>
            <p className="font-display text-2xl tracking-tight">{i.amount}</p>
          </div>
          <div className="md:col-span-2">
            <StatusChip status={i.status} />
          </div>
          <div className="md:col-span-3 flex justify-end gap-2">
            {i.status === "due" ? (
              <>
                <button className="px-5 py-2.5 bg-bordeaux-700 text-paper-50 text-sm font-medium hover:bg-bordeaux-800 transition-colors">
                  Payer
                </button>
                <button className="p-2.5 border border-ink/15" aria-label="Télécharger">
                  <Download className="size-4" strokeWidth={1.5} />
                </button>
              </>
            ) : (
              <button className="px-5 py-2.5 border border-ink/20 text-sm font-medium hover:bg-paper-200 transition-colors">
                Télécharger le PDF
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Payment panel */}
      <div className="mt-10 border border-ink/12 bg-paper-50 p-8">
        <SectionKicker number="§" label="Moyens de paiement sécurisés" />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Airtel Money", sub: "Mobile Money" },
            { name: "M-Pesa", sub: "Vodacom" },
            { name: "Orange Money", sub: "Mobile Money" },
            { name: "Visa / MC", sub: "Carte bancaire" },
          ].map((p) => (
            <div
              key={p.name}
              className="border border-ink/12 p-5 text-center hover:border-bordeaux-500 transition-colors cursor-pointer"
            >
              <p className="font-display text-lg leading-tight">{p.name}</p>
              <p className="mt-2 font-mono-label text-ink-faint">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsList() {
  return (
    <div className="space-y-6">
      <style>{projects.map((p, i) => `.proj-bar-${i}{width:${p.progress}%}`).join("")}</style>
      {projects.map((p, i) => (
        <div
          key={p.code}
          className="border border-ink/12 bg-paper-50 p-6 md:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono-label text-ink-faint">{p.code}</p>
              <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight">
                {p.title}
              </h3>
              <p className="mt-2 font-mono-label text-bordeaux-700">
                {p.stage} · {p.eta}
              </p>
            </div>
            <p className="font-display text-5xl font-light tabular-nums">
              {p.progress}
              <span className="text-xl text-ink-faint">%</span>
            </p>
          </div>

          <div className="mt-8 h-1.5 bg-paper-200 relative overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 bg-bordeaux-700 proj-bar-${i}`}
            />
          </div>

          <div className="mt-8 grid grid-cols-5 gap-2 text-[11px]">
            {["Étude", "Foration", "Équipement", "Adduction", "Réception"].map(
              (m, i) => {
                const reached = (i + 1) * 20 <= p.progress + 15;
                return (
                  <div key={m} className="flex flex-col items-start gap-2">
                    <span
                      className={cn(
                        "size-3 rounded-full",
                        reached ? "bg-bordeaux-700" : "bg-ink/15"
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono uppercase tracking-[0.15em]",
                        reached ? "text-ink" : "text-ink-faint"
                      )}
                    >
                      {m}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function WaterPayment() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 border border-ink/12 bg-paper-50 p-8">
        <SectionKicker number="§" label="Compteur actif" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono-label text-ink-faint">
              Compteur 34-NSL-0412
            </p>
            <p className="mt-2 font-display text-4xl md:text-5xl">Nsele, quartier 4</p>
          </div>
          <p className="font-mono-label text-bordeaux-700">Relevé du 12 avril 2026</p>
        </div>

        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { l: "Relevé précédent", v: "128,4 m³" },
            { l: "Relevé actuel", v: "132,6 m³" },
            { l: "Consommation", v: "4,2 m³" },
            { l: "Tarif m³", v: "USD 0,85" },
          ].map((s) => (
            <div key={s.l}>
              <dt className="font-mono-label text-ink-faint mb-2">{s.l}</dt>
              <dd className="font-display text-xl">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 pt-8 border-t border-ink/10 flex items-end justify-between">
          <div>
            <p className="font-mono-label text-ink-faint mb-1">Total à régler</p>
            <p className="font-display text-5xl font-light">USD 3,57</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-bordeaux-700 text-paper-50 px-6 py-3.5 text-sm font-medium hover:bg-bordeaux-800 transition-colors">
            Régler maintenant
            <ArrowUpRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 border border-ink/12 bg-paper-50 p-8">
        <SectionKicker number="Hx" label="Historique 12 mois" />
        <div className="mt-10 grid grid-cols-12 items-end h-48 gap-1.5">
          <style>{[3.1, 3.8, 4.2, 3.5, 4.0, 3.9, 4.4, 4.1, 3.7, 4.3, 4.0, 4.2].map((v, i) => `.chart-bar-${i}{height:${(v / 5) * 100}%}`).join("")}</style>
          {[3.1, 3.8, 4.2, 3.5, 4.0, 3.9, 4.4, 4.1, 3.7, 4.3, 4.0, 4.2].map(
            (v, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 min-w-0 h-full justify-end"
              >
                <div
                  className={`w-full bg-navy-900 chart-bar-${i}`}
                />
                <span className="font-mono-label text-ink-faint text-[9px]">
                  {[
                    "M",
                    "J",
                    "J",
                    "A",
                    "S",
                    "O",
                    "N",
                    "D",
                    "J",
                    "F",
                    "M",
                    "A",
                  ][i]}
                </span>
              </div>
            )
          )}
        </div>
        <p className="mt-8 text-sm text-ink-muted leading-relaxed">
          Consommation moyenne : 3,9 m³/mois. Votre mois en cours reste dans la
          norme saisonnière.
        </p>
      </div>
    </div>
  );
}
