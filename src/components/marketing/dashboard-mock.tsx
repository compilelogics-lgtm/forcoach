"use client";

import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Building2,
  Coins,
  FileText,
  Settings,
  Dumbbell,
  Clock,
  Wallet,
  Hourglass,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Classes", value: "63", icon: Dumbbell, trend: "+8%" },
  { label: "Hours", value: "58.5", icon: Clock, trend: "+5%" },
  { label: "Earnings", value: "€5,715", icon: Wallet, trend: "+12%" },
  { label: "Pending", value: "3", icon: Hourglass, trend: null },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Calendar", icon: CalendarDays, active: false },
  { label: "Studios", icon: Building2, active: false },
  { label: "Earnings", icon: Coins, active: false },
  { label: "Invoices", icon: FileText, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const STUDIOS = [
  { name: "Pilates House", pct: 42, color: "bg-accent" },
  { name: "Reform Lab", pct: 31, color: "bg-foreground/60" },
  { name: "Flow Yoga Studio", pct: 18, color: "bg-foreground/30" },
];

const AREA_PATH =
  "M0,45 25,42 50,38 75,30 100,32 125,20 150,18 175,10 200,12";

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
      className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_60px_-15px_rgba(28,28,28,0.25)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-15px_rgba(28,28,28,0.32)]"
    >
      <div className="flex">
        <div className="hidden w-52 shrink-0 flex-col gap-1 border-r border-border bg-sidebar p-5 text-sidebar-foreground sm:flex">
          <div className="mb-4 flex items-center gap-2 text-sm font-heading font-semibold tracking-wide">
            FORCOACH
          </div>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </div>
          ))}
          <div className="mt-auto flex items-center gap-2 border-t border-sidebar-foreground/10 pt-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-[11px] font-medium text-sidebar-accent-foreground">
              JC
            </div>
            <div className="text-xs text-sidebar-foreground/60">
              Jordan Cole
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-5 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-heading text-base font-semibold">
                Good morning, Jordan
              </div>
              <div className="text-sm text-muted-foreground">
                Here&apos;s your business this month.
              </div>
            </div>
            <div className="hidden rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground sm:block">
              July 2026
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-background p-4 transition-colors duration-300 hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <s.icon className="size-4 text-accent" />
                  {s.trend && (
                    <span className="flex items-center gap-0.5 text-[10px] font-medium text-accent">
                      <TrendingUp className="size-3" />
                      {s.trend}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </div>
                <div className="font-heading text-xl font-semibold">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">
                  Monthly income
                </div>
                <span className="text-sm font-semibold text-foreground">
                  €5,715
                </span>
              </div>
              <svg viewBox="0 0 200 60" className="mt-3 h-20 w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${AREA_PATH} L200,60 L0,60 Z`}
                  fill="url(#dash-area)"
                  className={cn(
                    "transition-opacity duration-700",
                    inView ? "opacity-100" : "opacity-0",
                  )}
                  style={{ transitionDelay: "1.2s" }}
                />
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
              <div className="text-sm font-medium text-muted-foreground">
                By studio
              </div>
              <div className="mt-3 space-y-3">
                {STUDIOS.map((s) => (
                  <div key={s.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground/80">{s.name}</span>
                      <span className="text-muted-foreground">{s.pct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width] duration-1000 ease-out",
                          s.color,
                        )}
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
