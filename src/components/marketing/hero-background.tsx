export function HeroBackground() {
  return (
    <div
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
    </div>
  );
}
