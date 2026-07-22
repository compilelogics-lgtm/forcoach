export function HeroBackground() {
  return (
    <div
      aria-hidden
      data-testid="hero-background"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Soft grey radial fade behind the hero copy -- subtle depth without
          competing with the dashboard mockup below it. */}
      <div
        className="absolute top-[8%] left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--foreground) 7%, transparent) 0%, transparent 100%)",
        }}
      />
      {/* Subtle boundary under the sticky nav so it doesn't blend into the hero */}
      <div
        className="absolute inset-x-0 top-0 h-20"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
