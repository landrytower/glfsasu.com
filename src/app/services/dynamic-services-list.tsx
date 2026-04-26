"use client";

import { useEffect, useState } from "react";
import { services as staticServices } from "@/lib/content";
import { getServices } from "@/lib/firebase-db";
import { ServiceCard } from "@/components/service-card";

export function DynamicServicesList() {
  const [services, setServices] = useState(staticServices);

  useEffect(() => {
    getServices()
      .then((docs) => {
        if (docs.length > 0) setServices(docs);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="divide-y divide-ink/10">
      {services.map((s, i) => (
        <ServiceCard
          key={s.slug}
          service={s}
          index={i}
          reversed={i % 2 === 1}
        />
      ))}
    </div>
  );
}
