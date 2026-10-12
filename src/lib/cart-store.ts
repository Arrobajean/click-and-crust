import { EMPTY_CART } from "./cart";
import { createPersistentStore } from "./persistent-store";
import { cartSchema } from "./schemas";
import type { Cart } from "./types";

/** Cesta del cliente, guardada en localStorage y validada al leerla. */
export const cartStore = createPersistentStore<Cart>({
  key: "cc:cart:v1",
  empty: EMPTY_CART,
  parse: (raw) => {
    const result = cartSchema.safeParse(raw);
    return result.success ? result.data : null;
  },
});
