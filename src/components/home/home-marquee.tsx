"use client";

import { useT } from "@/lib/language-context";
import { Marquee } from "@/components/marquee";

export function HomeMarquee() {
  const t = useT();
  return <Marquee items={t.marquee} dark />;
}
