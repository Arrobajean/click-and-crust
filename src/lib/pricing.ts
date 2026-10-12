import { lineKey } from "./cart";
import { getFormat, getProduct } from "./catalog";
import type { CartLine, PricedLine } from "./types";

export type PricingError = "unknown_product" | "unknown_format" | "invalid_cut";

export type PricedLineResult =
  | { ok: true; line: PricedLine }
  | { ok: false; error: PricingError; source: CartLine };

/**
 * Resuelve una línea contra el catálogo. El precio SIEMPRE sale de aquí: ningún
 * importe que llegue del cliente se usa, ni en la cesta ni en el pedido.
 */
export function priceLine(source: CartLine): PricedLineResult {
  const product = getProduct(source.slug);
  if (!product) return { ok: false, error: "unknown_product", source };

  const format = getFormat(product, source.formatId);
  if (!format) return { ok: false, error: "unknown_format", source };

  // Con opciones de corte el cliente debe elegir una; sin ellas, no puede mandar ninguna.
  const validCut = product.cuts.length === 0 ? source.cut === null : source.cut !== null && product.cuts.includes(source.cut);
  if (!validCut) return { ok: false, error: "invalid_cut", source };

  return {
    ok: true,
    line: {
      ...source,
      key: lineKey(source),
      name: product.name,
      image: product.images[0] ?? "",
      formatLabel: format.label,
      unitCents: format.priceCents,
      lineCents: format.priceCents * source.quantity,
    },
  };
}

export type CartPricing =
  | { ok: true; lines: readonly PricedLine[]; totalCents: number }
  | { ok: false; error: PricingError; source: CartLine };

/** Estricto: usado en el servidor. Una línea inválida invalida el pedido entero. */
export function priceCart(lines: readonly CartLine[]): CartPricing {
  const priced: PricedLine[] = [];
  for (const source of lines) {
    const result = priceLine(source);
    if (!result.ok) return result;
    priced.push(result.line);
  }
  return { ok: true, lines: priced, totalCents: priced.reduce((total, line) => total + line.lineCents, 0) };
}

/** Permisivo: usado en el cliente. Descarta líneas que ya no existen en el catálogo. */
export function priceCartLenient(lines: readonly CartLine[]): { lines: readonly PricedLine[]; totalCents: number } {
  const priced = lines.map(priceLine).flatMap((result) => (result.ok ? [result.line] : []));
  return { lines: priced, totalCents: priced.reduce((total, line) => total + line.lineCents, 0) };
}
