import type { Cart, CartLine } from "./types";

export const MAX_QUANTITY = 20;
export const MAX_LINES = 30;
export const EMPTY_CART: Cart = { lines: [] };

type LineIdentity = Pick<CartLine, "slug" | "formatId" | "cut">;

/** Dos líneas son la misma si coinciden producto, formato y corte. */
export function lineKey({ slug, formatId, cut }: LineIdentity): string {
  return `${slug}|${formatId}|${cut ?? ""}`;
}

const clampQuantity = (quantity: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity)));

/** Añade una línea; si ya existe suma cantidades sin pasar de MAX_QUANTITY. */
export function addToCart(cart: Cart, line: CartLine): Cart {
  const key = lineKey(line);
  const existing = cart.lines.find((item) => lineKey(item) === key);

  if (existing) {
    const quantity = clampQuantity(existing.quantity + line.quantity);
    return { lines: cart.lines.map((item) => (item === existing ? { ...item, quantity } : item)) };
  }
  if (cart.lines.length >= MAX_LINES) return cart;
  return { lines: [...cart.lines, { ...line, quantity: clampQuantity(line.quantity) }] };
}

/** Cantidad 0 o menor elimina la línea. */
export function setLineQuantity(cart: Cart, key: string, quantity: number): Cart {
  if (quantity <= 0) return removeLine(cart, key);
  return {
    lines: cart.lines.map((item) => (lineKey(item) === key ? { ...item, quantity: clampQuantity(quantity) } : item)),
  };
}

export function removeLine(cart: Cart, key: string): Cart {
  return { lines: cart.lines.filter((item) => lineKey(item) !== key) };
}

export function cartItemCount(cart: Cart): number {
  return cart.lines.reduce((total, line) => total + line.quantity, 0);
}
