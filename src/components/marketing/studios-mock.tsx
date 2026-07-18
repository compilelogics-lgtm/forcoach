"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Clock, Layers, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const STUDIOS = [
  {
    name: "Pilates House",
    rate: "€45.00 / hour",
    contact: "Studio Manager",
    status: "Active",
    type: "hourly",
  },
  {
    name: "Reform Lab",
    rate: "€38.00 / class",
    contact: "Front Desk",
    status: "Active",
    type: "class",
  },
  {
    name: "Flow Yoga Studio",
    rate: "€40.00 / hour",
    contact: null,
    status: "Inactive",
    type: "hourly",
  },
];

export function StudiosMock() {
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
      className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[0_20px_60px_-15px_rgba(28,28,28,0.25)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-15px_rgba(28,28,28,0.32)] sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="font-heading text-sm font-semibold">Studios</div>
          <div className="text-xs text-muted-foreground">3 studios</div>
        </div>
        <div className="group flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5">
          <Plus className="size-3.5 transition-transform duration-200 group-hover:rotate-90" />
          Add studio
        </div>
      </div>
      <div className="space-y-3">
        {STUDIOS.map((studio, i) => (
          <div
            key={studio.name}
            className={cn(
              "rounded-lg border border-border p-3 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm",
              studio.status === "Inactive" && "opacity-60",
              inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              studio.status === "Inactive" && inView && "opacity-60",
            )}
            style={{ transitionDelay: inView ? `${i * 120}ms` : "0ms" }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <Building2 className="size-3.5" />
                </div>
                <div>
                  <div className="text-sm font-medium">{studio.name}</div>
                  {studio.contact && (
                    <div className="text-xs text-muted-foreground">
                      {studio.contact}
                    </div>
                  )}
                </div>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                  studio.status === "Active"
                    ? "bg-accent/15 text-accent"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {studio.status}
              </span>
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
    </div>
  );
}
