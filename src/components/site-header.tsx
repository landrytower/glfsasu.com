"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Phone, Settings } from "lucide-react";
import { BrandMark } from "./brand-mark";
import { LanguageSwitcher } from "./language-switcher";
import { company } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/language-context";
import { useAuth } from "@/lib/auth-context";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useT();
  const { isAdmin } = useAuth();
  const mobileMenuId = "site-mobile-menu";

  const nav = [
    { href: "/a-propos", label: t.nav.aPropos, code: "01" },
    { href: "/services", label: t.nav.services, code: "02" },
    { href: "/realisations", label: t.nav.realisations, code: "03" },
    { href: "/actualites", label: t.nav.actualites, code: "04" },
    { href: "/contact", label: t.nav.contact, code: "05" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Thin top ribbon — coordinates + phone. Institutional detail. */}
      <div className="hidden md:block bg-navy-950 text-paper-50/75 text-[10.5px] font-mono uppercase tracking-[0.22em]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-2 flex items-center justify-between">
          <span>{company.coords} · {t.header.ville}</span>
          <div className="flex items-center gap-6">
            <a
              href={company.phoneHref}
              className="flex items-center gap-2 hover:text-paper-50 transition-colors"
            >
              <Phone className="size-3" strokeWidth={1.75} />
              {company.phone}
            </a>
            <span className="text-paper-50/40">{t.header.rccm} {company.rccm}</span>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-paper-50/95 backdrop-blur-md border-b border-ink/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              scrolled ? "h-16" : "h-20 md:h-24"
            )}
          >
            <Link href="/" className="group">
              <BrandMark />
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-baseline gap-1.5 text-sm font-medium text-ink/80 hover:text-ink transition-colors"
                >
                  <span className="font-mono text-[10px] text-ink-faint tracking-[0.2em]">
                    {item.code}
                  </span>
                  <span className="ink-link">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <LanguageSwitcher />
              {isAdmin && (
                <Link
                  href="/admin"
                  className="p-1.5 text-ink-muted hover:text-bordeaux-700 transition-colors"
                  title="Administration"
                >
                  <Settings className="size-4" strokeWidth={1.75} />
                </Link>
              )}
              <Link
                href="/espace-client"
                className="font-mono-label text-ink-muted hover:text-ink transition-colors"
              >
                {t.nav.espaceClient}
              </Link>
              <Link
                href="/demandes/devis"
                className="group inline-flex items-center gap-2 bg-bordeaux-700 px-5 py-2.5 text-sm font-medium text-paper-50 hover:bg-bordeaux-800 transition-colors"
              >
                {t.nav.demanderDevis}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                type="button"
                className="p-2 -mr-2"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={t.nav.ouvrirMenu}
                aria-controls={mobileMenuId}
              >
                {mobileOpen ? (
                  <X className="size-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="size-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile panel — full screen with its own close button */}
      {mobileOpen && (
        <div
          id={mobileMenuId}
          className="lg:hidden fixed inset-0 z-50 bg-paper-50 overflow-y-auto overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between bg-paper-50/95 backdrop-blur-md border-b border-ink/10 px-6 h-16">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <BrandMark />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-2 -mr-2"
              aria-label="Fermer le menu"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          <div className="px-6 py-8">
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-baseline gap-3 border-b border-ink/10 py-5"
                >
                  <span className="font-mono text-[11px] text-ink-faint tracking-[0.22em]">
                    {item.code}
                  </span>
                  <span className="font-display text-[clamp(1.75rem,8vw,2.5rem)] leading-none tracking-tight">
                    {item.label}
                  </span>
                  <ArrowUpRight className="ml-auto size-5 text-ink/40 transition-all group-hover:text-bordeaux-700" />
                </Link>
              ))}
            </nav>

            <div className="mt-10 space-y-3">
              <Link
                href="/demandes/devis"
                onClick={() => setMobileOpen(false)}
                className="block bg-bordeaux-700 px-6 py-4 text-center text-paper-50 font-medium"
              >
                {t.nav.demanderDevis}
              </Link>
              <Link
                href="/espace-client"
                onClick={() => setMobileOpen(false)}
                className="block border border-ink/20 px-6 py-4 text-center font-medium"
              >
                {t.nav.espaceClient}
              </Link>
              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener"
                className="block bg-[#25D366] px-6 py-4 text-center text-white font-medium"
              >
                WhatsApp {company.whatsapp}
              </a>
              <a
                href={company.phoneHref}
                className="block border border-ink/20 px-6 py-4 text-center font-medium"
              >
                Appeler {company.phone}
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-ink/10 pb-24 flex items-start justify-between">
              <div className="font-mono text-xs text-ink-muted space-y-2">
                <p>{company.coords} · Ndjili, Kinshasa</p>
                <p>{company.email}</p>
                <p>RCCM {company.rccm}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
