"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api/server-client";
import type {
  Event,
  EventInput,
  ImportActivity,
  ImportEventRow,
  ImportEventsResult,
} from "@/lib/api/events";

export type ImportActionState = {
  error?: string;
  result?: ImportEventsResult;
};

export async function importEventsCsv(
  rows: ImportEventRow[],
): Promise<ImportActionState> {
  try {
    const result = await apiFetch<ImportEventsResult>("/events/import", {
      method: "POST",
      body: JSON.stringify({ source: "csv", rows }),
    });
    revalidatePath("/calendar");
    return { result };
  } catch (err) {
    return {
      error: err instanceof ApiError ? err.message : "Failed to import events",
    };
  }
}

export type EventActionState = {
  error?: string;
};

function parseEventInput(formData: FormData): EventInput {
  const value = (key: string) => {
    const raw = formData.get(key);
    return typeof raw === "string" && raw.trim() !== "" ? raw.trim() : undefined;
  };

  const startDate = value("startDate");
  const startTime = value("startTime");
  const endDate = value("endDate");
  const endTime = value("endTime");
  const rawStudioId = value("studioId");
  const studioId = rawStudioId && rawStudioId !== "none" ? rawStudioId : undefined;

  return {
    title: value("title") ?? "",
    notes: value("notes"),
    startTime: startDate && startTime
      ? new Date(`${startDate}T${startTime}`).toISOString()
      : "",
    endTime: endDate && endTime
      ? new Date(`${endDate}T${endTime}`).toISOString()
      : "",
    studioId: studioId ?? null,
    status: studioId ? "assigned" : "unassigned",
  };
}

export async function createEvent(
  _prevState: EventActionState,
  formData: FormData,
): Promise<EventActionState> {
  try {
    await apiFetch<Event>("/events", {
      method: "POST",
      body: JSON.stringify({ ...parseEventInput(formData), source: "manual" }),
    });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Failed to create event" };
  }
  revalidatePath("/calendar");
  return {};
}

export async function updateEvent(
  id: string,
  _prevState: EventActionState,
  formData: FormData,
): Promise<EventActionState> {
  try {
    await apiFetch<Event>(`/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(parseEventInput(formData)),
    });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Failed to update event" };
  }
  revalidatePath("/calendar");
  return {};
}

export async function deleteEvent(id: string): Promise<EventActionState> {
  try {
    await apiFetch(`/events/${id}`, { method: "DELETE" });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Failed to delete event" };
  }
  revalidatePath("/calendar");
  return {};
}

export async function fetchImportActivity(): Promise<{
  error?: string;
  activity?: ImportActivity[];
}> {
  try {
    const activity = await apiFetch<ImportActivity[]>("/events/import-activity");
    return { activity };
  } catch (err) {
    return {
      error: err instanceof ApiError ? err.message : "Failed to load import history",
    };
  }
}

export async function setEventExcluded(
  id: string,
  excluded: boolean,
  fallbackStudioId: string | null,
): Promise<EventActionState> {
  try {
    await apiFetch<Event>(`/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: excluded
          ? "excluded"
          : fallbackStudioId
            ? "assigned"
            : "unassigned",
      }),
    });
  } catch (err) {
    return { error: err instanceof ApiError ? err.message : "Failed to update event" };
  }
  revalidatePath("/calendar");
  return {};
}
