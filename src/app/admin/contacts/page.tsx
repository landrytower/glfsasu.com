"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Mail, Phone, Check } from "lucide-react";
import { getContacts, markContactRead, type ContactSubmission } from "@/lib/firebase-db";
import { cn } from "@/lib/cn";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<(ContactSubmission & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch {
      // empty
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkRead(id: string) {
    await markContactRead(id);
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, read: true } : c))
    );
  }

  const selectedContact = contacts.find((c) => c.id === selected);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl tracking-tight">Messages</h1>
        <p className="mt-2 text-ink-muted">
          {contacts.length} message(s) ·{" "}
          {contacts.filter((c) => !c.read).length} non lu(s)
        </p>
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
      ) : contacts.length === 0 ? (
        <div className="bg-paper-50 border border-ink/10 p-12 text-center">
          <MessageSquare
            className="size-12 text-ink-faint mx-auto mb-4"
            strokeWidth={1}
          />
          <p className="font-display text-xl">Aucun message</p>
          <p className="mt-2 text-ink-muted text-sm">
            Les messages du formulaire de contact s'afficheront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-0 border border-ink/10 bg-paper-50 divide-y divide-ink/10">
          {contacts.map((c) => (
            <div key={c.id}>
              <div
                className={cn(
                  "flex items-center gap-4 p-4 hover:bg-paper-100 transition-colors cursor-pointer",
                  !c.read && "bg-blue-50/50"
                )}
                onClick={() => {
                  setSelected(selected === c.id ? null : c.id);
                  if (!c.read) handleMarkRead(c.id);
                }}
              >
                <div
                  className={cn(
                    "size-2 rounded-full shrink-0",
                    c.read ? "bg-transparent" : "bg-blue-500"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm truncate",
                      !c.read ? "font-semibold" : "font-medium"
                    )}
                  >
                    {c.name}
                    {c.organization ? ` · ${c.organization}` : ""}
                  </p>
                  <p className="text-xs text-ink-muted truncate">
                    {c.subject || c.message.slice(0, 80)}
                  </p>
                </div>
              </div>

              {selected === c.id && selectedContact && (
                <div className="border-t border-ink/10 bg-paper-100 p-4 space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="flex items-center gap-2 text-bordeaux-700 hover:underline"
                    >
                      <Mail className="size-3.5" />
                      {selectedContact.email}
                    </a>
                    {selectedContact.phone && (
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="flex items-center gap-2 text-bordeaux-700 hover:underline"
                      >
                        <Phone className="size-3.5" />
                        {selectedContact.phone}
                      </a>
                    )}
                  </div>

                  {selectedContact.subject && (
                    <div>
                      <p className="font-mono-label text-ink-faint text-xs mb-1">
                        Sujet
                      </p>
                      <p className="text-sm font-medium">
                        {selectedContact.subject}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="font-mono-label text-ink-faint text-xs mb-1">
                      Message
                    </p>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {selectedContact.message}
                    </p>
                  </div>

                  {!selectedContact.read && (
                    <button
                      onClick={() => handleMarkRead(selectedContact.id)}
                      className="flex items-center gap-2 text-sm text-green-700 hover:underline"
                    >
                      <Check className="size-3.5" />
                      Marquer comme lu
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
