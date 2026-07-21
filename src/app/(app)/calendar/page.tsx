import { apiFetch } from "@/lib/api/server-client";
import type { Event } from "@/lib/api/events";
import type { Studio } from "@/lib/api/studios";
import type { GoogleCalendarStatus } from "@/lib/api/google-calendar";
import { Button } from "@/components/ui/button";
import { CsvImportDialog } from "./csv-import-dialog";
import { ImportHistoryDialog } from "./import-history-dialog";
import { EventFormDialog } from "./event-form-dialog";
import { CalendarView } from "./calendar-view";
import { GoogleCalendarCard } from "./google-calendar-card";

export default async function CalendarPage() {
  const [events, studios, googleStatus] = await Promise.all([
    apiFetch<Event[]>("/events"),
    apiFetch<Studio[]>("/studios"),
    apiFetch<GoogleCalendarStatus>("/calendar/google/status"),
  ]);

  const studioOptions = studios.map((s) => ({ id: s.id, name: s.name }));

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

      <GoogleCalendarCard status={googleStatus} />

      <CalendarView events={events} studios={studios} />
    </div>
  );
}
