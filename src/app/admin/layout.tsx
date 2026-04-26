"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  FolderOpen,
  Palette,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/cn";

const sidebarNav = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/quotes", label: "Devis", icon: FileText },
  { href: "/admin/contacts", label: "Messages", icon: MessageSquare },
  { href: "/admin/realizations", label: "Réalisations", icon: FolderOpen },
  { href: "/admin/content", label: "Contenu du site", icon: Palette },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !isLoginPage && (!user || !isAdmin)) {
      router.replace("/admin/login");
    }
  }, [user, loading, isAdmin, router, isLoginPage]);

  // Login page renders standalone — no sidebar/topbar
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-100">
        <div className="animate-pulse font-mono text-ink-faint">
          Chargement...
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-paper-100">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-navy-900 text-paper-50">
        <div className="flex items-center justify-between px-4 lg:px-6 h-14">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-paper-50/60 hover:text-paper-50 transition-colors font-mono text-xs"
            >
              <ArrowLeft className="size-3.5" />
              Site
            </Link>
            <span className="text-paper-50/30">|</span>
            <span className="font-mono text-sm tracking-wider">
              LIPANDA <span className="text-bordeaux-400">ADMIN</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block font-mono text-xs text-paper-50/60">
              {user.email}
            </span>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="flex items-center gap-2 text-paper-50/60 hover:text-paper-50 transition-colors font-mono text-xs"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 border-r border-ink/10 bg-paper-50 min-h-[calc(100vh-3.5rem)]">
          <nav className="py-4 px-3 space-y-1">
            {sidebarNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors",
                  "text-ink-muted hover:text-ink hover:bg-paper-100"
                )}
              >
                <item.icon className="size-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-paper-50 border-t border-ink/10 flex">
          {sidebarNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center gap-1 py-3 text-ink-muted hover:text-ink transition-colors"
            >
              <item.icon className="size-5" strokeWidth={1.5} />
              <span className="text-[10px] font-mono">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
