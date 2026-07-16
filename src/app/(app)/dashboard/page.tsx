import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KPI_CARDS = [
  { label: "Total Hours", value: "—" },
  { label: "Total Earnings", value: "—" },
  { label: "Active Studios", value: "—" },
  { label: "Upcoming Classes", value: "—" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Your coaching business at a glance.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPI_CARDS.map((card) => (
          <Card key={card.label}>
            <CardHeader>
              <CardTitle className="text-sm font-normal text-muted-foreground">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-heading font-semibold">
                {card.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-muted-foreground font-normal">
            Earnings, hours, and studio breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Wired up with real data in Milestone 3, once studios and events
          exist.
        </CardContent>
      </Card>
    </div>
  );
}
