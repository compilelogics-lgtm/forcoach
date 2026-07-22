"use client";

import { useRef, useState, useTransition } from "react";
import { Upload } from "lucide-react";
import { parseEventsCsv, type CsvImportRowResult } from "@/lib/csv";
import { importEventsCsv } from "./actions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CsvImportDialog({
  studios,
}: {
  studios: { id: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<CsvImportRowResult[] | null>(null);
  const [headerError, setHeaderError] = useState<string | undefined>();
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [success, setSuccess] = useState<{ created: number; skipped: number } | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFileName(null);
    setRows(null);
    setHeaderError(undefined);
    setSubmitError(undefined);
    setSuccess(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleFile(file: File) {
    setFileName(file.name);
    setSuccess(null);
    setSubmitError(undefined);
    const text = await file.text();
    const { rows: parsed, headerError: err } = parseEventsCsv(text, studios);
    setHeaderError(err);
    setRows(err ? null : parsed);
  }

  const validRows = rows?.filter((r) => r.errors.length === 0) ?? [];
  const invalidRows = rows?.filter((r) => r.errors.length > 0) ?? [];

  function handleConfirm() {
    if (!rows) return;
    startTransition(async () => {
      const result = await importEventsCsv(
        validRows.map((r) => ({
          title: r.title,
          startTime: r.startIso!,
          endTime: r.endIso!,
          studioId: r.studioId,
          notes: r.notes,
        })),
      );
      if (result.error) {
        setSubmitError(result.error);
      } else if (result.result) {
        setSuccess({
          created: result.result.created,
          skipped: result.result.skipped,
        });
        setRows(null);
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger
        render={
          <Button variant="outline">
            <Upload className="mr-2 size-4" />
            Import CSV
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import events from CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">Required columns</p>
                <p className="mt-1">
                  Title, Start Date (YYYY-MM-DD), Start Time (HH:MM), End
                  Date, End Time
                </p>
                <p className="mt-1 font-medium text-foreground">
                  Optional columns
                </p>
                <p className="mt-1">Studio (matched by name), Notes</p>
              </div>
              <a
                href="/templates/forcoach-csv-template.csv"
                download
                className="shrink-0 text-xs font-medium text-accent underline underline-offset-2 hover:no-underline"
              >
                Download template
              </a>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
            className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium"
          />

          {fileName && (
            <p className="text-xs text-muted-foreground">
              Selected: {fileName}
            </p>
          )}

          {headerError && (
            <Alert variant="destructive">
              <AlertDescription>{headerError}</AlertDescription>
            </Alert>
          )}

          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>
                Imported {success.created} event
                {success.created === 1 ? "" : "s"}
                {success.skipped > 0
                  ? ` — skipped ${success.skipped} duplicate${success.skipped === 1 ? "" : "s"}.`
                  : "."}
              </AlertDescription>
            </Alert>
          )}

          {rows && rows.length > 0 && (
            <div className="max-h-72 overflow-y-auto rounded-md border">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Line</th>
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Start</th>
                    <th className="px-3 py-2">End</th>
                    <th className="px-3 py-2">Studio</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.line} className="border-t">
                      <td className="px-3 py-2 text-muted-foreground">
                        {r.line}
                      </td>
                      <td className="px-3 py-2">{r.title || "—"}</td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {r.startDate} {r.startTime}
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {r.endDate} {r.endTime}
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {r.studioName ?? "—"}
                      </td>
                      <td className="px-3 py-2">
                        {r.errors.length > 0 ? (
                          <Badge variant="destructive" title={r.errors.join("; ")}>
                            Error
                          </Badge>
                        ) : r.warnings.length > 0 ? (
                          <Badge variant="outline" title={r.warnings.join("; ")}>
                            Unassigned
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Ready</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {rows && rows.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {validRows.length} row{validRows.length === 1 ? "" : "s"} ready
              to import
              {invalidRows.length > 0
                ? `, ${invalidRows.length} skipped due to errors.`
                : "."}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              disabled={!rows || validRows.length === 0 || isPending}
              onClick={handleConfirm}
            >
              {isPending
                ? "Importing..."
                : `Import ${validRows.length || ""} event${validRows.length === 1 ? "" : "s"}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
