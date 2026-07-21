"use client";

import { useTransition } from "react";
import { setEventExcluded } from "./actions";
import { Button } from "@/components/ui/button";
import type { Event } from "@/lib/api/events";

export function ExcludeEventButton({ event }: { event: Event }) {
  const [isPending, startTransition] = useTransition();
  const excluded = event.status === "excluded";

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          void setEventExcluded(event.id, !excluded, event.studio_id);
        })
      }
    >
      {isPending ? "..." : excluded ? "Include" : "Exclude"}
    </Button>
  );
}
