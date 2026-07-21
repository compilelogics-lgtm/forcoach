import { apiFetch } from "@/lib/api/server-client";
import type { Event } from "@/lib/api/events";
import type { Studio } from "@/lib/api/studios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CsvImportDialog } from "./csv-import-dialog";
import { ImportHistoryDialog } from "./import-history-dialog";
import { EventFormDialog } from "./event-form-dialog";
import { DeleteEventButton } from "./delete-event-button";
import { ExcludeEventButton } from "./exclude-event-button";

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
  const studioOptions = studios.map((s) => ({ id: s.id, name: s.name }));
  const sorted = [...events].sort(
    (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Events imported from CSV, Google Calendar, or added manually.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ImportHistoryDialog />
          <CsvImportDialog studios={studioOptions} />
          <EventFormDialog
            studios={studioOptions}
            trigger={<Button>Add event</Button>}
          />
        </div>
      </div>

      {sorted.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-normal text-muted-foreground">
              No events yet
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Import a CSV of your classes or add one manually to get started.
            Google Calendar sync is coming soon.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="divide-y p-0">
            {sorted.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-3 px-4 py-3",
                  event.status === "excluded" && "opacity-50",
                )}
              >
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatRange(event)}
                  </p>
                  {event.notes && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {event.notes}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {event.status === "excluded" ? (
                    <Badge variant="destructive">Excluded</Badge>
                  ) : event.studio_id && studioById.has(event.studio_id) ? (
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
                  <ExcludeEventButton event={event} />
                  <EventFormDialog
                    event={event}
                    studios={studioOptions}
                    trigger={
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    }
                  />
                  <DeleteEventButton id={event.id} title={event.title} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
