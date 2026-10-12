"use client";

import { useEffect, useState } from "react";
import { fetchSlots } from "@/lib/api";
import type { Slot } from "@/lib/types";

type Result = { date: string; slots: Slot[] } | { date: string; error: string };

export type SlotsStatus = "idle" | "loading" | "ready" | "error";

/** Franjas de un día, consultadas al servidor (que conoce el aforo). */
export function usePickupSlots(date: string) {
  const [result, setResult] = useState<Result | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!date) return;
    const controller = new AbortController();
    fetchSlots(date, controller.signal)
      .then((response) => setResult({ date, slots: response.slots }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setResult({ date, error: error instanceof Error ? error.message : "No se pudieron cargar las franjas." });
      });
    return () => controller.abort();
  }, [date, attempt]);

  // El estado se deriva: un resultado de otro día cuenta como "cargando".
  const current = result && result.date === date ? result : null;
  const status: SlotsStatus = !date ? "idle" : !current ? "loading" : "error" in current ? "error" : "ready";

  return {
    status,
    slots: current && "slots" in current ? current.slots : [],
    error: current && "error" in current ? current.error : "",
    retry: () => {
      setResult(null);
      setAttempt((value) => value + 1);
    },
  };
}
