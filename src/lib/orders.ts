import { priceCart } from "./pricing";
import type { OrderRequest } from "./schemas";
import { checkSlot, type Occupancy, type SlotRejection } from "./slots";
import type { Order } from "./types";

/**
 * Persistencia de pedidos. La demo usa memoria del proceso; para producción se
 * implementa esta interfaz sobre una base de datos real. OJO: allí `save` debe
 * reservar la franja de forma atómica (transacción), porque la comprobación de
 * aforo de `createOrder` no es atómica entre peticiones concurrentes.
 */
export interface OrderRepository {
  /** Pedidos ya reservados por hora de inicio de franja en un día. */
  countBySlot(date: string): Promise<Occupancy>;
  save(order: Order): Promise<void>;
}

export function createMemoryOrderRepository(): OrderRepository {
  const orders: Order[] = [];
  return {
    async countBySlot(date) {
      const counts: Record<string, number> = {};
      for (const order of orders) {
        if (order.pickup.date === date) counts[order.pickup.time] = (counts[order.pickup.time] ?? 0) + 1;
      }
      return counts;
    },
    async save(order) {
      orders.push(order);
    },
  };
}

export type OrderErrorCode = "invalid_cart" | "slot_out_of_range" | "slot_closed" | "slot_too_soon" | "slot_full";

export interface OrderError {
  code: OrderErrorCode;
  message: string;
  field: "items" | "pickup";
}

export type CreateOrderResult = { ok: true; order: Order } | { ok: false; error: OrderError };

const SLOT_ERRORS: Record<SlotRejection, OrderError> = {
  out_of_range: { code: "slot_out_of_range", field: "pickup", message: "Ese día queda fuera del plazo de reserva." },
  closed: { code: "slot_closed", field: "pickup", message: "La panadería no recoge pedidos a esa hora." },
  too_soon: { code: "slot_too_soon", field: "pickup", message: "Esa franja ya no tiene antelación suficiente. Elige una más tarde." },
  full: { code: "slot_full", field: "pickup", message: "Esa franja está completa. Elige otra." },
};

const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin I, O, 0, 1: no se confunden al dictarlos

/** CC-7K3M9X. 32 símbolos y 256 % 32 = 0, así que no hay sesgo al reducir cada byte. */
export function newOrderId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `CC-${Array.from(bytes, (byte) => ID_ALPHABET.charAt(byte % ID_ALPHABET.length)).join("")}`;
}

export interface CreateOrderDeps {
  repo: OrderRepository;
  now?: Date;
  generateId?: () => string;
}

/**
 * Crea un pedido a partir de una petición ya validada con orderRequestSchema.
 * Recalcula los precios desde el catálogo y revisa la franja con el reloj del servidor.
 */
export async function createOrder(request: OrderRequest, deps: CreateOrderDeps): Promise<CreateOrderResult> {
  const now = deps.now ?? new Date();

  const priced = priceCart(request.items);
  if (!priced.ok) {
    return { ok: false, error: { code: "invalid_cart", field: "items", message: "Hay productos de la cesta que ya no están disponibles." } };
  }

  const occupancy = await deps.repo.countBySlot(request.pickup.date);
  const slot = checkSlot(request.pickup.date, request.pickup.time, now, occupancy);
  if (!slot.ok) return { ok: false, error: SLOT_ERRORS[slot.reason] };

  const order: Order = {
    id: (deps.generateId ?? newOrderId)(),
    createdAt: now.toISOString(),
    customer: request.customer,
    pickup: request.pickup,
    notes: request.notes,
    lines: priced.lines,
    totalCents: priced.totalCents,
  };
  await deps.repo.save(order);
  return { ok: true, order };
}
