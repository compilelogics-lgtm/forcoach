"use client";

import { useEffect, useRef, useState } from "react";

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The container is pointer-events-none (so clicks pass through to the
    // hero content above it), which also means it never receives its own
    // pointer events -- listen on window instead and compute position
    // relative to the container's own bounding box.
    function handlePointerMove(e: PointerEvent) {
      const rect = node!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x, y });
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      data-testid="hero-background"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Dot-grid texture, fading toward the edges */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage:
            "radial-gradient(ellipse 65% 70% at 50% 40%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 70% at 50% 40%, black 0%, transparent 100%)",
        }}
      >
        <defs>
          <pattern
            id="hero-dots"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.6" cy="1.6" r="1.6" fill="var(--accent)" fillOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* Slow-rotating concentric rings, with subtle mouse-driven parallax */}
      <div
        className="absolute top-1/2 left-1/2 size-[900px] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
        style={{
          transform: `translate(calc(-50% + ${offset.x * 24}px), calc(-50% + ${offset.y * 24}px))`,
        }}
      >
        <svg viewBox="0 0 900 900" className="size-full">
          <circle
            cx="450"
            cy="450"
            r="420"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.35"
            strokeWidth="1.25"
            className="motion-safe:animate-[spin_90s_linear_infinite]"
            style={{ transformOrigin: "450px 450px" }}
            strokeDasharray="2 14"
          />
          <circle
            cx="450"
            cy="450"
            r="330"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.45"
            strokeWidth="1.25"
            className="motion-safe:animate-[spin_70s_linear_infinite_reverse]"
            style={{ transformOrigin: "450px 450px" }}
            strokeDasharray="1 10"
          />
          <circle
            cx="450"
            cy="450"
            r="240"
            fill="none"
            stroke="var(--foreground)"
            strokeOpacity="0.18"
            strokeWidth="1"
            className="motion-safe:animate-[spin_50s_linear_infinite]"
            style={{ transformOrigin: "450px 450px" }}
          />
        </svg>
      </div>
    </div>
  );
}
