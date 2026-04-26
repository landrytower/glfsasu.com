import { cn } from "@/lib/cn";

type Props = { className?: string; mono?: boolean; subtle?: boolean };

export function BrandMark({ className, mono = false, subtle = false }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center leading-none",
        className
      )}
      aria-label="Groupe Lipanda FAMILY"
    >
      <span
        className={cn(
          "relative block shrink-0 overflow-hidden rounded-full",
          subtle ? "size-20 shadow-lg shadow-black/20" : "size-14 shadow-md shadow-black/10",
          mono ? "grayscale" : "",
        )}
      >
        <img
          src="/logo.jpeg"
          alt="Logo du Groupe Lipanda Family"
          width={subtle ? 80 : 56}
          height={subtle ? 80 : 56}
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
        />
      </span>
    </span>
  );
}
