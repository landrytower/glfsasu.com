import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

type Crumb = { href: string; label: string };

type Props = {
  kicker: string;
  number: string;
  title: string;
  titleEmphasis?: string;
  intro?: string;
  crumbs?: Crumb[];
  coords?: string;
  dark?: boolean;
  children?: React.ReactNode;
};

export function PageHeader({
  kicker,
  number,
  title,
  titleEmphasis,
  intro,
  crumbs,
  coords,
  dark = false,
  children,
}: Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b",
        dark
          ? "bg-navy-950 text-paper-50 border-paper-50/15 noise"
          : "bg-paper-100 text-ink border-ink/10"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 pointer-events-none",
          dark ? "grid-lines-dark opacity-40" : "grid-lines-paper opacity-50"
        )}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 pt-24 pb-16 md:pt-36 md:pb-24">
        {/* Crumbs */}
        {crumbs && (
          <nav
            aria-label="Fil d'Ariane"
            className={cn(
              "flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em]",
              dark ? "text-paper-50/55" : "text-ink-muted"
            )}
          >
            <Link href="/" className="hover:opacity-75 transition-opacity">
              <Home className="size-3.5" strokeWidth={1.5} />
            </Link>
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-2">
                <ChevronRight className="size-3" />
                {i === crumbs.length - 1 ? (
                  <span className={dark ? "text-paper-50" : "text-ink"}>
                    {c.label}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="hover:opacity-75 transition-opacity"
                  >
                    {c.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 font-mono-label">
          <span className={dark ? "text-paper-50/55" : "text-ink-muted"}>
            N° {number} · {kicker}
          </span>
          {coords && (
            <span className={dark ? "text-paper-50/55" : "text-ink-muted"}>
              {coords}
            </span>
          )}
        </div>

        <Reveal className="mt-8">
          <h1 className="font-display font-light text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.92] tracking-tight max-w-5xl text-balance">
            {title}
            {titleEmphasis && (
              <>
                {" "}
                <em
                  className={cn(
                    "italic font-normal",
                    dark ? "text-green-300" : "text-bordeaux-700"
                  )}
                >
                  {titleEmphasis}
                </em>
              </>
            )}
          </h1>
        </Reveal>

        {intro && (
          <Reveal className="mt-8 max-w-2xl" delay={0.1}>
            <p
              className={cn(
                "text-lg leading-relaxed text-pretty",
                dark ? "text-paper-50/80" : "text-ink-muted"
              )}
            >
              {intro}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal className="mt-12" delay={0.2}>
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
