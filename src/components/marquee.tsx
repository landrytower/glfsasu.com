import { cn } from "@/lib/cn";

type Props = {
  items: string[];
  className?: string;
  separator?: string;
  dark?: boolean;
};

export function Marquee({
  items,
  className,
  separator = "✱",
  dark = false,
}: Props) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "overflow-hidden border-y py-5",
        dark
          ? "border-paper-50/15 bg-navy-950 text-paper-50"
          : "border-ink/10 bg-paper-50 text-ink",
        className
      )}
    >
      <div className="flex marquee-track gap-10 whitespace-nowrap font-display italic font-light text-[clamp(2rem,4vw,3.5rem)] tracking-tight">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{item}</span>
            <span
              aria-hidden
              className={cn(
                "text-bordeaux-500 not-italic font-sans text-2xl",
                dark && "text-bordeaux-500"
              )}
            >
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
