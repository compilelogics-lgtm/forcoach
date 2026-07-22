"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getCoachmarkSnapshot,
  markCoachmarkSeen,
  subscribeCoachmarks,
} from "@/lib/onboarding";

export function CoachMark({
  id,
  title,
  message,
  side = "bottom",
  align = "start",
  className,
  children,
}: {
  id: string;
  title: string;
  message: string;
  side?: "bottom" | "top";
  align?: "start" | "end";
  className?: string;
  children: React.ReactNode;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const visible = useSyncExternalStore(
    subscribeCoachmarks,
    () => getCoachmarkSnapshot(id),
    () => false,
  );

  useEffect(() => {
    if (!visible) return;
    function update() {
      if (anchorRef.current) setRect(anchorRef.current.getBoundingClientRect());
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [visible]);

  return (
    <div ref={anchorRef} className={cn("inline-flex", className)}>
      {children}
      {visible &&
        rect &&
        createPortal(
          <div
            role="status"
            style={{
              position: "fixed",
              ...(side === "bottom"
                ? { top: rect.bottom + 8 }
                : { bottom: window.innerHeight - rect.top + 8 }),
              ...(align === "end"
                ? { right: window.innerWidth - rect.right }
                : { left: rect.left }),
            }}
            className="z-50 w-64 rounded-lg border border-accent/30 bg-popover p-3 text-left shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95"
          >
            <div
              className={cn(
                "absolute size-2.5 rotate-45 border border-accent/30 bg-popover",
                side === "bottom"
                  ? "-top-1.5 border-r-0 border-b-0"
                  : "-bottom-1.5 border-t-0 border-l-0",
                align === "end" ? "right-6" : "left-6",
              )}
            />
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-popover-foreground">
                {title}
              </p>
              <button
                type="button"
                aria-label="Dismiss tip"
                onClick={() => markCoachmarkSeen(id)}
                className="shrink-0 rounded p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{message}</p>
            <button
              type="button"
              onClick={() => markCoachmarkSeen(id)}
              className="mt-2 text-xs font-medium text-accent hover:underline"
            >
              Got it
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
