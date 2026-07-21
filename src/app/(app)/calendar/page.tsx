import { apiFetch } from "@/lib/api/server-client";
import type { Event } from "@/lib/api/events";
import type { Studio } from "@/lib/api/studios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CsvImportDialog } from "./csv-import-dialog";

function formatRange(event: Event) {
  const start = new Date(event.start_time);
  const end = new Date(event.end_time);
  const dateFmt = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeFmt = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${dateFmt.format(start)} · ${timeFmt.format(start)} – ${timeFmt.format(end)}`;
}

export default async function CalendarPage() {
  const [events, studios] = await Promise.all([
    apiFetch<Event[]>("/events"),
    apiFetch<Studio[]>("/studios"),
  ]);

  const studioById = new Map(studios.map((s) => [s.id, s.name]));
  const sorted = [...events].sort(
    (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Events imported from CSV, Google Calendar, or added manually.
          </p>
        </div>
        <CsvImportDialog
          studios={studios.map((s) => ({ id: s.id, name: s.name }))}
        />
      </div>

      {sorted.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-normal text-muted-foreground">
              No events yet
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Import a CSV of your classes to get started. Google Calendar sync
            is coming soon.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="divide-y p-0">
            {sorted.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatRange(event)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {event.studio_id && studioById.has(event.studio_id) ? (
                    <Badge variant="secondary">
                      {studioById.get(event.studio_id)}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Unassigned</Badge>
                  )}
                  <Badge variant="ghost" className="text-muted-foreground">
                    {event.source === "csv"
                      ? "CSV"
                      : event.source === "google_calendar"
                        ? "Google"
                        : "Manual"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
