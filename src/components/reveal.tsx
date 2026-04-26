"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  once?: boolean;
};

/**
 * Reveal — scroll-triggered fade-up animation.
 *
 * Elements that are already in the viewport on page load are shown
 * immediately with no animation (no opacity-0 flash).
 * Elements below the fold are hidden after first paint and
 * animate in when they scroll into view.
 */
export function Reveal({ children, delay = 0, className, y = 16, once = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // "idle"  = initial SSR state (no inline styles → content visible)
  // "out"   = below fold, hidden instantly
  // "in"    = in view, animating/animated to visible
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the element top is within/above the viewport, skip animation entirely
    if (el.getBoundingClientRect().top < window.innerHeight + 80) {
      return;
    }

    // Element is below the fold — hide it instantly (no transition), then watch
    setPhase("out");

    let obs: IntersectionObserver;
    const rafId = requestAnimationFrame(() => {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPhase("in");
            if (once) obs.disconnect();
          }
        },
        { rootMargin: "0px 0px -60px 0px" },
      );
      obs.observe(el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      obs?.disconnect();
    };
  }, [once]);

  const style: React.CSSProperties =
    phase === "out"
      ? { opacity: 0, transform: `translateY(${y}px)` }
      : phase === "in"
        ? {
            opacity: 1,
            transform: "translateY(0)",
            transition: `opacity 0.75s cubic-bezier(0.2,0.6,0.2,1) ${delay}s, transform 0.75s cubic-bezier(0.2,0.6,0.2,1) ${delay}s`,
          }
        : {}; // idle: no inline styles → browser default (opacity:1)

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}

