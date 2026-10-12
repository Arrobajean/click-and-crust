import { createPersistentStore } from "./persistent-store";
import { receiptsSchema } from "./schemas";
import type { Order } from "./types";

export interface Receipts {
  orders: readonly Order[];
}

const EMPTY_RECEIPTS: Receipts = { orders: [] };
const MAX_RECEIPTS = 5;

/**
 * Justificantes de pedido en el navegador. La demo no guarda pedidos de forma
 * duradera en el servidor, así que la página de confirmación los lee de aquí.
 */
export const receiptStore = createPersistentStore<Receipts>({
  key: "cc:receipts:v1",
  empty: EMPTY_RECEIPTS,
  parse: (raw) => {
    const result = receiptsSchema.safeParse(raw);
    return result.success ? result.data : null;
  },
});

export function saveReceipt(order: Order): void {
  receiptStore.update((previous) => ({
    orders: [order, ...previous.orders.filter((item) => item.id !== order.id)].slice(0, MAX_RECEIPTS),
  }));
}

export function findReceipt(receipts: Receipts, id: string): Order | undefined {
  return receipts.orders.find((order) => order.id === id);
}
