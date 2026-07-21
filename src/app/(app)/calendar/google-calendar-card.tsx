"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarClock, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { GoogleCalendarOption, GoogleCalendarStatus } from "@/lib/api/google-calendar";
import {
  disconnectGoogleCalendar,
  fetchGoogleCalendars,
  getGoogleConnectUrl,
  selectGoogleCalendar,
  syncGoogleCalendar,
} from "./actions";

export function GoogleCalendarCard({ status }: { status: GoogleCalendarStatus }) {
  const params = useSearchParams();
  const googleFlag = params.get("google");
  const [actionError, setError] = useState<string | undefined>();
  const [actionNotice, setNotice] = useState<string | undefined>();
  const [calendars, setCalendars] = useState<GoogleCalendarOption[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const needsCalendarSelection = status.connected && !status.calendarId;
  const error = actionError ?? (googleFlag === "error"
    ? "Something went wrong connecting Google Calendar. Please try again."
    : undefined);
  const notice = actionNotice ?? (googleFlag === "connected"
    ? "Connected! Choose a calendar below."
    : undefined);

  useEffect(() => {
    if (needsCalendarSelection && calendars === null) {
      startTransition(async () => {
        const result = await fetchGoogleCalendars();
        if (result.error) setError(result.error);
        else setCalendars(result.calendars ?? []);
      });
    }
  }, [needsCalendarSelection, calendars]);

  function handleConnect() {
    setError(undefined);
    startTransition(async () => {
      const result = await getGoogleConnectUrl();
      if (result.error) setError(result.error);
      else if (result.url) window.location.href = result.url;
    });
  }

  function handleSelect(cal: GoogleCalendarOption) {
    setError(undefined);
    startTransition(async () => {
      const result = await selectGoogleCalendar(cal.id, cal.name);
      if (result.error) setError(result.error);
      else setNotice(`Connected to ${cal.name}.`);
    });
  }

  function handleSync() {
    setError(undefined);
    startTransition(async () => {
      const result = await syncGoogleCalendar();
      if (result.error) setError(result.error);
      else if (result.result) {
        setNotice(
          `Synced: ${result.result.created} new, ${result.result.updated} updated.`,
        );
      }
    });
  }

  function handleDisconnect() {
    setError(undefined);
    startTransition(async () => {
      const result = await disconnectGoogleCalendar();
      if (result.error) setError(result.error);
      else {
        setNotice("Disconnected.");
        setCalendars(null);
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarClock className="size-4 text-muted-foreground" />
          Google Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {notice && !error && (
          <Alert>
            <AlertDescription>{notice}</AlertDescription>
          </Alert>
        )}

        {!status.connected && (
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Sync classes from your Google Calendar automatically.
            </p>
            <Button onClick={handleConnect} disabled={isPending}>
              <Link2 className="mr-2 size-4" />
              {isPending ? "Connecting..." : "Connect"}
            </Button>
          </div>
        )}

        {needsCalendarSelection && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Choose which calendar to sync:</p>
            {isPending && calendars === null ? (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Loading calendars...
              </p>
            ) : (
              <div className="space-y-1.5">
                {(calendars ?? []).map((cal) => (
                  <div
                    key={cal.id}
                    className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                  >
                    <span>
                      {cal.name}
                      {cal.primary && (
                        <span className="ml-1.5 text-xs text-muted-foreground">(primary)</span>
                      )}
                    </span>
                    <Button size="sm" disabled={isPending} onClick={() => handleSelect(cal)}>
                      Select
                    </Button>
                  </div>
                ))}
                {calendars && calendars.length === 0 && (
                  <p className="text-sm text-muted-foreground">No calendars found.</p>
                )}
              </div>
            )}
          </div>
        )}

        {status.connected && status.calendarId && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm">
              <p className="font-medium">{status.calendarName ?? status.calendarId}</p>
              <p className="text-xs text-muted-foreground">
                {status.lastSyncedAt
                  ? `Last synced ${new Date(status.lastSyncedAt).toLocaleString()}`
                  : "Not synced yet"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={isPending} onClick={handleSync}>
                {isPending ? "Syncing..." : "Sync now"}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Disconnect
                    </Button>
                  }
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Disconnect Google Calendar?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This stops future syncing. Events already imported stay in your calendar.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDisconnect}>Disconnect</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
