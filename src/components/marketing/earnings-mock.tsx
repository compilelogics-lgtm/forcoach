"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Monthly income", value: "€5,715" },
  { label: "Yearly income", value: "€68,430" },
  { label: "Best studio", value: "Pilates House" },
  { label: "Avg. class rate", value: "€91" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CHART_POINTS =
  "0,50 30,48 60,44 90,40 120,38 150,32 180,28 210,24 240,20 270,16 300,10 330,8";

const STUDIOS = [
  { name: "Pilates House", color: "bg-accent" },
  { name: "Reform Lab", color: "bg-foreground/70" },
  { name: "Flow Yoga Studio", color: "bg-foreground/40" },
  { name: "Core Movement", color: "bg-foreground/20" },
];

export function EarningsMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[0_20px_60px_-15px_rgba(28,28,28,0.25)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-15px_rgba(28,28,28,0.32)] sm:p-6"
    >
      <div className="mb-4">
        <div className="font-heading text-sm font-semibold">Earnings</div>
        <div className="text-xs text-muted-foreground">
          A financial snapshot of your coaching business.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-border bg-background p-3 transition-colors duration-300 hover:border-accent/40"
          >
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {s.label}
            </div>
            <div className="mt-1 font-heading text-base font-semibold">
              {s.value}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="text-xs font-medium text-muted-foreground">
            Income over time — last 12 months
          </div>
          <svg viewBox="0 0 330 60" className="mt-3 h-24 w-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={CHART_POINTS}
              className={cn(inView && "animate-draw-line")}
              style={{ "--line-length": 420 } as React.CSSProperties}
            />
          </svg>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            {MONTHS.filter((_, i) => i % 2 === 0).map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="text-xs font-medium text-muted-foreground">
            Income by studio — this month
          </div>
          <div className="mt-3 space-y-2.5">
            {STUDIOS.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-2 text-[11px] transition-transform duration-200 hover:translate-x-0.5"
              >
                <span className={`size-2 shrink-0 rounded-full ${s.color}`} />
                <span className="text-foreground/80">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
