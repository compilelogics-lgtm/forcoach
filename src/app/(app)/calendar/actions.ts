"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api/server-client";
import type {
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
