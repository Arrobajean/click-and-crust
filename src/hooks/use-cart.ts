"use client";

import { useMemo, useSyncExternalStore } from "react";
import { EMPTY_CART, addToCart, cartItemCount, removeLine, setLineQuantity } from "@/lib/cart";
import { cartStore } from "@/lib/cart-store";
import { priceCartLenient } from "@/lib/pricing";
import type { CartLine } from "@/lib/types";

/** Estado de la cesta: líneas con precio resuelto, totales y acciones. */
export function useCart() {
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const priced = useMemo(() => priceCartLenient(cart.lines), [cart]);

  return {
    lines: priced.lines,
    totalCents: priced.totalCents,
    itemCount: cartItemCount(cart),
    isEmpty: priced.lines.length === 0,
    add: (line: CartLine) => cartStore.update((previous) => addToCart(previous, line)),
    setQuantity: (key: string, quantity: number) => cartStore.update((previous) => setLineQuantity(previous, key, quantity)),
    remove: (key: string) => cartStore.update((previous) => removeLine(previous, key)),
    clear: () => cartStore.set(EMPTY_CART),
  };
}
