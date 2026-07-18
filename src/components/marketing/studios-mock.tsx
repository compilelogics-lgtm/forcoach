const STUDIOS = [
  { name: "Pilates House", rate: "€45.00 / hour", contact: "Studio Manager", status: "Active" },
  { name: "Reform Lab", rate: "€38.00 / class", contact: "Front Desk", status: "Active" },
  { name: "Flow Yoga Studio", rate: "€40.00 / hour", contact: null, status: "Inactive" },
];

export function StudiosMock() {
  return (
    <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[0_20px_60px_-15px_rgba(28,28,28,0.25)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-15px_rgba(28,28,28,0.32)] sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="font-heading text-sm font-semibold">Studios</div>
          <div className="text-xs text-muted-foreground">3 studios</div>
        </div>
        <div className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
          Add studio
        </div>
      </div>
      <div className="space-y-3">
        {STUDIOS.map((studio) => (
          <div
            key={studio.name}
            className={`rounded-lg border border-border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm ${
              studio.status === "Inactive" ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-medium">{studio.name}</div>
                {studio.contact && (
                  <div className="text-xs text-muted-foreground">
                    {studio.contact}
                  </div>
                )}
              </div>
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                {studio.status}
              </span>
            </div>
            <div className="mt-2 text-sm font-medium text-accent">
              {studio.rate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
