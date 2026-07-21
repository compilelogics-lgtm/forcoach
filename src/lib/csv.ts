export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

export type CsvImportRowResult = {
  line: number;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  studioName?: string;
  studioId?: string;
  notes?: string;
  startIso?: string;
  endIso?: string;
  errors: string[];
  warnings: string[];
};

const REQUIRED_HEADERS = [
  "Title",
  "Start Date",
  "Start Time",
  "End Date",
  "End Time",
] as const;

export function parseEventsCsv(
  text: string,
  studios: { id: string; name: string }[],
): { rows: CsvImportRowResult[]; headerError?: string } {
  const table = parseCsv(text);
  if (table.length === 0) {
    return { rows: [], headerError: "The file is empty." };
  }

  const header = table[0].map((h) => h.trim());
  const missing = REQUIRED_HEADERS.filter((h) => !header.includes(h));
  if (missing.length > 0) {
    return {
      rows: [],
      headerError: `Missing required column${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`,
    };
  }

  const indexOf = (name: string) => header.indexOf(name);
  const studioByName = new Map(
    studios.map((s) => [s.name.trim().toLowerCase(), s.id]),
  );

  const rows: CsvImportRowResult[] = table.slice(1).map((cells, i) => {
    const get = (name: string) => (cells[indexOf(name)] ?? "").trim();

    const title = get("Title");
    const startDate = get("Start Date");
    const startTime = get("Start Time");
    const endDate = get("End Date");
    const endTime = get("End Time");
    const studioName = indexOf("Studio") >= 0 ? get("Studio") : "";
    const notes = indexOf("Notes") >= 0 ? get("Notes") : "";

    const errors: string[] = [];
    if (!title) errors.push("Title is required");
    if (!startDate || !startTime) errors.push("Start date/time is required");
    if (!endDate || !endTime) errors.push("End date/time is required");

    let startIso: string | undefined;
    let endIso: string | undefined;
    if (startDate && startTime) {
      const d = new Date(`${startDate}T${startTime}`);
      if (Number.isNaN(d.getTime())) errors.push("Start date/time is invalid");
      else startIso = d.toISOString();
    }
    if (endDate && endTime) {
      const d = new Date(`${endDate}T${endTime}`);
      if (Number.isNaN(d.getTime())) errors.push("End date/time is invalid");
      else endIso = d.toISOString();
    }
    if (startIso && endIso && new Date(endIso) <= new Date(startIso)) {
      errors.push("End must be after start");
    }

    const warnings: string[] = [];
    let studioId: string | undefined;
    if (studioName) {
      studioId = studioByName.get(studioName.trim().toLowerCase());
      if (!studioId)
        warnings.push(`Studio "${studioName}" not found — will import unassigned`);
    }

    return {
      line: i + 2,
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      studioName: studioName || undefined,
      studioId,
      notes: notes || undefined,
      startIso,
      endIso,
      errors,
      warnings,
    };
  });

  return { rows };
}
