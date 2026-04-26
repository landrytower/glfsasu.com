"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type Props = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

export function Counter({ value, duration = 2, prefix = "", suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0.6, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  const formatted = new Intl.NumberFormat("fr-FR").format(display);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
