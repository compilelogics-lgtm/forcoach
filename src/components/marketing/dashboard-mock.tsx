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
  Layers,
  Trophy,
  Percent,
  User,
  Globe,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "dashboard" | "calendar" | "studios" | "earnings" | "invoices" | "settings";

const NAV_ITEMS: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "studios", label: "Studios", icon: Building2 },
  { id: "earnings", label: "Earnings", icon: Coins },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const STATS = [
  { label: "Classes", value: "63", icon: Dumbbell, trend: "+8%" },
  { label: "Hours", value: "58.5", icon: Clock, trend: "+5%" },
  { label: "Earnings", value: "€5,715", icon: Wallet, trend: "+12%" },
  { label: "Pending", value: "3", icon: Hourglass, trend: null },
];

const STUDIO_SHARE = [
  { name: "Pilates House", pct: 42, color: "bg-accent" },
  { name: "Reform Lab", pct: 31, color: "bg-foreground/60" },
  { name: "Flow Yoga Studio", pct: 18, color: "bg-foreground/30" },
];

const STUDIO_LIST = [
  { name: "Pilates House", rate: "€45.00 / hour", status: "Active", type: "hourly" as const },
  { name: "Reform Lab", rate: "€38.00 / class", status: "Active", type: "class" as const },
  { name: "Flow Yoga Studio", rate: "€40.00 / hour", status: "Inactive", type: "hourly" as const },
];

const EARNINGS_STATS = [
  { label: "Monthly income", value: "€5,715", icon: Wallet },
  { label: "Yearly income", value: "€68,430", icon: TrendingUp },
  { label: "Best studio", value: "Pilates House", icon: Trophy },
  { label: "Avg. class rate", value: "€91", icon: Percent },
];

const CALENDAR_EVENTS = [
  { title: "Reformer Basics", time: "Mon · 9:00 – 10:00 AM", studio: "Pilates House", source: "Google" },
  { title: "Vinyasa Flow", time: "Mon · 6:00 – 7:00 PM", studio: "Flow Yoga Studio", source: "Google" },
  { title: "Reformer Advanced", time: "Wed · 8:00 – 9:00 AM", studio: "Pilates House", source: "CSV" },
  { title: "Megaformer Sculpt", time: "Thu · 3:00 – 4:00 PM", studio: "Reform Lab", source: "Google" },
  { title: "Restorative Yoga", time: "Sat · 5:00 – 6:00 PM", studio: "Unassigned", source: "Manual" },
];

const INVOICES = [
  { number: "FC-2026-014", studio: "Pilates House", period: "Jul 1 – 31", amount: "€2,172", status: "Generated" },
  { number: "FC-2026-013", studio: "Reform Lab", period: "Jul 1 – 31", amount: "€1,657", status: "Generated" },
  { number: "FC-2026-012", studio: "Flow Yoga Studio", period: "Jun 1 – 30", amount: "€1,140", status: "Archived" },
  { number: "FC-2026-011", studio: "Pilates House", period: "Jun 1 – 30", amount: "€1,980", status: "Archived" },
];

const AREA_PATH =
  "M0,45 25,42 50,38 75,30 100,32 125,20 150,18 175,10 200,12";

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
        status === "Active" || status === "Generated"
          ? "bg-accent/15 text-accent"
          : "bg-secondary text-secondary-foreground",
      )}
    >
      {status}
    </span>
  );
}

export function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [tab, setTab] = useState<TabId>("dashboard");

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
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                tab === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
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

        {/* Mobile tab strip */}
        <div className="flex w-full flex-col sm:hidden">
          <div className="flex gap-1 overflow-x-auto border-b border-border p-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                  tab === item.id
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div
          key={tab}
          className="flex-1 space-y-5 p-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 sm:p-8"
        >
          {tab === "dashboard" && (
            <>
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
                    {STUDIO_SHARE.map((s) => (
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
            </>
          )}

          {tab === "calendar" && (
            <>
              <div>
                <div className="font-heading text-base font-semibold">Calendar</div>
                <div className="text-sm text-muted-foreground">
                  Synced from Google Calendar, CSV, or added manually.
                </div>
              </div>
              <div className="flex gap-1.5">
                {["List", "Month", "Week", "Day"].map((v, i) => (
                  <span
                    key={v}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-medium",
                      i === 0 ? "bg-secondary text-secondary-foreground" : "text-muted-foreground",
                    )}
                  >
                    {v}
                  </span>
                ))}
              </div>
              <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-background">
                {CALENDAR_EVENTS.map((e) => (
                  <div key={e.title} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <div className="text-sm font-medium">{e.title}</div>
                      <div className="text-xs text-muted-foreground">{e.time}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          e.studio === "Unassigned"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-accent/15 text-accent",
                        )}
                      >
                        {e.studio}
                      </span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                        {e.source}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "studios" && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-heading text-base font-semibold">Studios</div>
                  <div className="text-sm text-muted-foreground">3 studios</div>
                </div>
                <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  + Add studio
                </span>
              </div>
              <div className="space-y-3">
                {STUDIO_LIST.map((studio) => (
                  <div
                    key={studio.name}
                    className={cn(
                      "rounded-lg border border-border p-3",
                      studio.status === "Inactive" && "opacity-60",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                          <Building2 className="size-3.5" />
                        </div>
                        <div className="text-sm font-medium">{studio.name}</div>
                      </div>
                      <StatusBadge status={studio.status} />
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 pl-9.5 text-sm font-medium text-accent">
                      {studio.type === "hourly" ? (
                        <Clock className="size-3.5" />
                      ) : (
                        <Layers className="size-3.5" />
                      )}
                      {studio.rate}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "earnings" && (
            <>
              <div>
                <div className="font-heading text-base font-semibold">Earnings</div>
                <div className="text-sm text-muted-foreground">
                  A financial snapshot of your coaching business.
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {EARNINGS_STATS.map((s) => (
                  <div key={s.label} className="rounded-lg border border-border bg-background p-3">
                    <s.icon className="size-3.5 text-accent" />
                    <div className="mt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {s.label}
                    </div>
                    <div className="font-heading text-base font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "invoices" && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-heading text-base font-semibold">Invoices</div>
                  <div className="text-sm text-muted-foreground">
                    Generated automatically from your tracked hours.
                  </div>
                </div>
                <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  + New invoice
                </span>
              </div>
              <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-background">
                {INVOICES.map((inv) => (
                  <div key={inv.number} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                        <FileText className="size-3.5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{inv.number}</div>
                        <div className="text-xs text-muted-foreground">
                          {inv.studio} · {inv.period}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{inv.amount}</span>
                      <StatusBadge status={inv.status} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "settings" && (
            <>
              <div>
                <div className="font-heading text-base font-semibold">Settings</div>
                <div className="text-sm text-muted-foreground">
                  Your profile, account, and connections.
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: User, label: "Full name", value: "Jordan Cole" },
                  { icon: Globe, label: "Time zone", value: "Europe/Paris" },
                  { icon: Lock, label: "Password", value: "•••••••••••" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <row.icon className="size-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                    </div>
                    <span className="text-sm font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
