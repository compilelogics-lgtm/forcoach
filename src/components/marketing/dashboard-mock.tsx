"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutDashboard, CalendarDays, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Classes", value: "63" },
  { label: "Hours", value: "58.5" },
  { label: "Earnings", value: "€5,715" },
  { label: "Pending", value: "3" },
];

const STUDIOS = [
  { name: "Pilates House", pct: 42 },
  { name: "Reform Lab", pct: 31 },
  { name: "Flow Yoga Studio", pct: 18 },
];

export function DashboardMock() {
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
      className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_60px_-15px_rgba(28,28,28,0.25)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-15px_rgba(28,28,28,0.32)]"
    >
      <div className="flex">
        <div className="hidden w-40 shrink-0 flex-col gap-1 border-r border-border bg-sidebar p-4 text-sidebar-foreground sm:flex">
          <div className="mb-3 flex items-center gap-2 text-xs font-heading font-semibold tracking-wide">
            FORCOACH
          </div>
          <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-2 py-1.5 text-xs text-sidebar-accent-foreground">
            <LayoutDashboard className="size-3.5" />
            Dashboard
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-sidebar-foreground/60">
            <CalendarDays className="size-3.5" />
            Calendar
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-sidebar-foreground/60">
            <Building2 className="size-3.5" />
            Studios
          </div>
        </div>
        <div className="flex-1 space-y-4 p-5 sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-background p-3 transition-colors duration-300 hover:border-accent/40"
              >
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </div>
                <div className="mt-1 font-heading text-lg font-semibold">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="text-xs font-medium text-muted-foreground">
                Monthly income
              </div>
              <svg viewBox="0 0 200 60" className="mt-2 h-14 w-full" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,45 25,42 50,38 75,30 100,32 125,20 150,18 175,10 200,12"
                  className={cn(inView && "animate-draw-line")}
                  style={{ "--line-length": 260 } as React.CSSProperties}
                />
              </svg>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="text-xs font-medium text-muted-foreground">
                By studio
              </div>
              <div className="mt-2 space-y-2">
                {STUDIOS.map((s) => (
                  <div key={s.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-foreground/80">{s.name}</span>
                      <span className="text-muted-foreground">{s.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-out"
                        style={{ width: inView ? `${s.pct}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
