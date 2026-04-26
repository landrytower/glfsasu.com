"use client";

import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { locales } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/lib/language-context";
import type { Locale } from "@/lib/translations";

type Props = { dark?: boolean };

export function LanguageSwitcher({ dark = false }: Props) {
  const { locale: current, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuId = "language-switcher-menu";

  const active = locales.find((l) => l.code === current) ?? locales[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 font-mono-label transition-colors",
          dark
            ? "text-paper-50/70 hover:text-paper-50"
            : "text-ink-muted hover:text-ink"
        )}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        <Globe className="size-3.5" strokeWidth={1.5} />
        {active.short}
        <ChevronDown
          className={cn("size-3 transition-transform", open && "rotate-180")}
          strokeWidth={1.75}
        />
      </button>
      {open && (
        <ul
          id={menuId}
          aria-label="Choix de la langue"
          className={cn(
            "absolute right-0 top-full mt-3 min-w-[180px] border py-2 shadow-2xl",
            dark
              ? "bg-navy-900 border-paper-50/15 text-paper-50"
              : "bg-paper-50 border-ink/10 text-ink"
          )}
        >
          {locales.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                onClick={() => {
                  setLocale(l.code as Locale);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors",
                  dark
                    ? "hover:bg-paper-50/5"
                    : "hover:bg-paper-200/60",
                  l.code === current && "font-medium"
                )}
                dir={l.dir ?? "ltr"}
              >
                <span>{l.label}</span>
                <span className="font-mono-label opacity-60">{l.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
