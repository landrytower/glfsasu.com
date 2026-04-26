"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/content";

const ease = [0.2, 0.6, 0.2, 1] as const;

type Props = {
  service: Service;
  index: number;
  reversed?: boolean;
};

export function ServiceCard({ service, index, reversed = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay: 0.05, ease }}
      className={cn(
        "group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-24",
        reversed && "lg:[&>:first-child]:order-2"
      )}
    >
      {/* Image */}
      <Link
        href={`/services/${service.slug}`}
        className="relative block overflow-hidden rounded-sm aspect-[4/3]"
      >
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            loading={index < 2 ? "eager" : "lazy"}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 to-navy-900 flex items-center justify-center">
            <span className="font-mono text-6xl text-paper-50/10 font-bold tracking-widest">
              {service.code}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Code badge */}
        <div className="absolute top-4 left-4 bg-bordeaux-700 text-paper-50 px-3 py-1.5 font-mono-label text-xs tracking-[0.2em]">
          {service.code}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3 text-ink-muted">
          <span className="font-mono-label">N° {num}</span>
          <span aria-hidden className="h-px flex-1 max-w-16 bg-ink/15" />
          <span className="font-mono-label text-bordeaux-700">
            {service.kicker}
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-[40px] leading-[1.05] tracking-tight text-pretty">
          {service.title}
        </h2>

        <p className="text-ink-muted leading-relaxed text-pretty max-w-lg">
          {service.blurb}
        </p>

        {service.deliverables && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-1">
            {service.deliverables.slice(0, 4).map((d) => (
              <li
                key={d}
                className="flex items-start gap-2 text-sm text-ink-muted"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-bordeaux-700"
                />
                {d}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 mt-2 font-mono-label text-sm text-bordeaux-700 hover:text-bordeaux-900 transition-colors group/link w-fit"
        >
          <span className="relative">
            Découvrir ce pôle
            <span className="absolute inset-x-0 -bottom-0.5 h-px bg-bordeaux-700 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left" />
          </span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </motion.div>
  );
}
