"use client";

import { useEffect, useState } from "react";
import { FileText, Eye, ChevronDown } from "lucide-react";
import { getQuotes, updateQuoteStatus, type QuoteSubmission } from "@/lib/firebase-db";
import { cn } from "@/lib/cn";

const statusOptions: { value: QuoteSubmission["status"]; label: string; color: string }[] = [
  { value: "new", label: "Nouveau", color: "bg-blue-100 text-blue-800" },
  { value: "in-review", label: "En cours", color: "bg-yellow-100 text-yellow-800" },
  { value: "quoted", label: "Devisé", color: "bg-purple-100 text-purple-800" },
  { value: "accepted", label: "Accepté", color: "bg-green-100 text-green-800" },
  { value: "declined", label: "Refusé", color: "bg-red-100 text-red-800" },
];

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<(QuoteSubmission & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    loadQuotes();
  }, []);

  async function loadQuotes() {
    try {
      const data = await getQuotes();
      setQuotes(data);
    } catch {
      // empty
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: QuoteSubmission["status"]) {
    await updateQuoteStatus(id, status);
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  }

  const selectedQuote = quotes.find((q) => q.id === selected);

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight">
            Demandes de devis
          </h1>
          <p className="mt-2 text-ink-muted">
            {quotes.length} demande(s) au total
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-paper-50 border border-ink/10 animate-pulse"
            />
          ))}
        </div>
      ) : quotes.length === 0 ? (
        <div className="bg-paper-50 border border-ink/10 p-12 text-center">
          <FileText className="size-12 text-ink-faint mx-auto mb-4" strokeWidth={1} />
          <p className="font-display text-xl">Aucune demande</p>
          <p className="mt-2 text-ink-muted text-sm">
            Les demandes de devis s'afficheront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-0 border border-ink/10 bg-paper-50 divide-y divide-ink/10">
          {quotes.map((q) => {
            const statusInfo = statusOptions.find((s) => s.value === q.status);
            return (
              <div key={q.id}>
                <div
                  className="flex items-center gap-4 p-4 hover:bg-paper-100 transition-colors cursor-pointer"
                  onClick={() =>
                    setSelected(selected === q.id ? null : q.id)
                  }
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs text-ink-faint">
                        {q.code}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[10px] px-2 py-0.5 rounded-full",
                          statusInfo?.color
                        )}
                      >
                        {statusInfo?.label}
                      </span>
                    </div>
                    <p className="mt-1 font-medium text-sm truncate">
                      {q.firstName} {q.lastName}
                      {q.organization ? ` · ${q.organization}` : ""}
                    </p>
                    <p className="text-xs text-ink-muted truncate">
                      {q.service} · {q.location || "Lieu non précisé"}
                    </p>
                  </div>
                  <Eye className="size-4 text-ink-faint shrink-0" />
                </div>

                {selected === q.id && selectedQuote && (
                  <div className="border-t border-ink/10 bg-paper-100 p-4 space-y-4">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {[
                        ["Code", selectedQuote.code],
                        ["Service", selectedQuote.service],
                        ["Sous-service", selectedQuote.subService || "-"],
                        ["Localisation", selectedQuote.location || "-"],
                        ["Urgence", selectedQuote.urgency],
                        ["Délai", selectedQuote.timeline || "-"],
                        ["Budget", selectedQuote.budget || "-"],
                        ["Email", selectedQuote.email],
                        ["Téléphone", selectedQuote.phone],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <dt className="font-mono-label text-ink-faint text-xs">
                            {label}
                          </dt>
                          <dd className="mt-0.5">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    {selectedQuote.description && (
                      <div>
                        <p className="font-mono-label text-ink-faint text-xs mb-1">
                          Description
                        </p>
                        <p className="text-sm whitespace-pre-wrap">
                          {selectedQuote.description}
                        </p>
                      </div>
                    )}

                    {selectedQuote.fileUrl && (
                      <div>
                        <p className="font-mono-label text-ink-faint text-xs mb-1">
                          Pièce jointe
                        </p>
                        <a
                          href={selectedQuote.fileUrl}
                          target="_blank"
                          rel="noopener"
                          className="text-sm text-bordeaux-700 underline"
                        >
                          {selectedQuote.fileName || "Télécharger"}
                        </a>
                      </div>
                    )}

                    <div className="pt-2 flex items-center gap-3">
                      <span className="font-mono-label text-ink-faint text-xs">
                        Statut :
                      </span>
                      <div className="relative">
                        <select
                          aria-label="Statut du devis"
                          value={selectedQuote.status}
                          onChange={(e) =>
                            handleStatusChange(
                              selectedQuote.id,
                              e.target.value as QuoteSubmission["status"]
                            )
                          }
                          className="appearance-none bg-paper-50 border border-ink/20 px-3 py-1.5 pr-8 text-sm font-mono focus:outline-none focus:border-bordeaux-700"
                        >
                          {statusOptions.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="size-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-ink-faint" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
