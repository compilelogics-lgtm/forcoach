export type EventSource = "google_calendar" | "csv" | "manual";
export type EventStatus = "assigned" | "unassigned" | "excluded";

export type Event = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  location: string | null;
  start_time: string;
  end_time: string;
  source: EventSource;
  studio_id: string | null;
  status: EventStatus;
  external_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ImportEventRow = {
  title: string;
  startTime: string;
  endTime: string;
  studioId?: string;
  notes?: string;
};

export type ImportEventsResult = {
  activity: {
    id: string;
    status: string;
    records_processed: number;
    records_created: number;
    records_skipped: number;
  };
  created: number;
  skipped: number;
};
