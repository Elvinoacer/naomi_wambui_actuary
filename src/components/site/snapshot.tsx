"use client";

import { snapshot } from "@/lib/portfolio";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export function Snapshot() {
  return (
    <section aria-label="Candidate snapshot" className="relative">
      <StaggerGroup className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {snapshot.map((item) => (
          <StaggerItem key={item.label}>
            <SpotlightCard className="h-full p-4 md:p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-2.5 font-display text-base font-bold leading-tight text-foreground md:text-lg">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
