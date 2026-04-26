"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";

/**
 * Wraps the public site chrome (header / footer / floating actions).
 * Hidden on /admin and /admin-login routes so the admin panel
 * gets its own standalone layout.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-paper-50"
      >
        Aller au contenu principal
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
