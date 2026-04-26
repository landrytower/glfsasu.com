"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, MessageSquare, FolderOpen, ArrowRight } from "lucide-react";
import { getQuotes } from "@/lib/firebase-db";
import { getContacts } from "@/lib/firebase-db";
import { getRealizations } from "@/lib/firebase-db";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    quotes: 0,
    newQuotes: 0,
    contacts: 0,
    unreadContacts: 0,
    realizations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [quotes, contacts, realizations] = await Promise.all([
          getQuotes(),
          getContacts(),
          getRealizations(),
        ]);
        setStats({
          quotes: quotes.length,
          newQuotes: quotes.filter((q) => q.status === "new").length,
          contacts: contacts.length,
          unreadContacts: contacts.filter((c) => !c.read).length,
          realizations: realizations.length,
        });
      } catch {
        // Firestore may be empty on first load
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    {
      href: "/admin/quotes",
      icon: FileText,
      label: "Demandes de devis",
      total: stats.quotes,
      badge: stats.newQuotes,
      badgeLabel: "nouveau(x)",
      color: "text-bordeaux-700",
      bg: "bg-bordeaux-50",
    },
    {
      href: "/admin/contacts",
      icon: MessageSquare,
      label: "Messages",
      total: stats.contacts,
      badge: stats.unreadContacts,
      badgeLabel: "non lu(s)",
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      href: "/admin/realizations",
      icon: FolderOpen,
      label: "Réalisations",
      total: stats.realizations,
      badge: 0,
      badgeLabel: "",
      color: "text-green-700",
      bg: "bg-green-50",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl tracking-tight">
          Tableau de bord
        </h1>
        <p className="mt-2 text-ink-muted">
          Vue d'ensemble de l'activité du site.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 bg-paper-50 border border-ink/10 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-paper-50 border border-ink/10 p-6 hover:border-ink/25 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`${card.bg} ${card.color} p-2.5 rounded`}
                >
                  <card.icon className="size-5" strokeWidth={1.5} />
                </div>
                {card.badge > 0 && (
                  <span className="bg-bordeaux-700 text-paper-50 font-mono text-xs px-2 py-0.5 rounded-full">
                    {card.badge} {card.badgeLabel}
                  </span>
                )}
              </div>
              <p className="mt-6 font-display text-4xl tracking-tight">
                {card.total}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono-label text-ink-muted">
                  {card.label}
                </span>
                <ArrowRight className="size-4 text-ink-faint group-hover:text-ink transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
