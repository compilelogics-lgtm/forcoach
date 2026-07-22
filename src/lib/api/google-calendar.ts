export type GoogleCalendarStatus =
  | { connected: false }
  | {
      connected: true;
      calendarId: string | null;
      calendarName: string | null;
      googleAccountEmail: string | null;
      lastSyncedAt: string | null;
      defaultStudioId: string | null;
    };

export type GoogleCalendarOption = {
  id: string;
  name: string;
  primary: boolean;
};

export type GoogleSyncResult = {
  activity: { id: string; status: string };
  created: number;
  updated: number;
};
