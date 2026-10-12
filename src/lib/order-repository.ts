import { createMemoryOrderRepository, type OrderRepository } from "./orders";

// En desarrollo, Next recarga los módulos; se guarda en globalThis para no perder los pedidos.
const globalStore = globalThis as typeof globalThis & { __clickAndCrustOrders?: OrderRepository };

export function getOrderRepository(): OrderRepository {
  globalStore.__clickAndCrustOrders ??= createMemoryOrderRepository();
  return globalStore.__clickAndCrustOrders;
}
