"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { allTranslations, type Dict, type Locale } from "./translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("locale") as Locale | null;
      if (saved && saved in allTranslations) {
        setLocaleState(saved);
      }
    } catch {
      // localStorage unavailable (e.g. private browsing with strict settings)
    }
  }, []);

  // Sync html[lang] and html[dir] whenever locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("locale", l);
    } catch {
      // ignore
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: allTranslations[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside <LanguageProvider>");
  return ctx;
}

/** Shorthand — returns the translation dictionary for the active locale. */
export function useT() {
  return useLanguage().t;
}
