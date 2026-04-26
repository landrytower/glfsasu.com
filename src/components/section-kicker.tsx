import { cn } from "@/lib/cn";

type Props = {
  number: string;
  label: string;
  dark?: boolean;
  className?: string;
};

export function SectionKicker({ number, label, dark, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        dark ? "text-paper-50/60" : "text-ink-muted",
        className
      )}
    >
      <span className="font-mono-label">N° {number}</span>
      <span
        aria-hidden
        className={cn(
          "h-px flex-1 max-w-20",
          dark ? "bg-paper-50/20" : "bg-ink/15"
        )}
      />
      <span className="font-mono-label">{label}</span>
    </div>
  );
}
