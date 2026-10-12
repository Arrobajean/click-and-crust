"use client";

import { useSyncExternalStore } from "react";
import { findReceipt, receiptStore } from "@/lib/receipt-store";
import { useIsClient } from "./use-is-client";

/** Justificante guardado en este navegador. `ready` es false hasta que se puede leer localStorage. */
export function useReceipt(id: string) {
  const ready = useIsClient();
  const receipts = useSyncExternalStore(receiptStore.subscribe, receiptStore.getSnapshot, receiptStore.getServerSnapshot);
  return { ready, order: ready ? findReceipt(receipts, id) : undefined };
}
