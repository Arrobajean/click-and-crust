"use client";

import { useEffect, useRef, useState } from "react";
import { MAX_QUANTITY } from "@/lib/cart";
import { getFormat } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { useCart } from "./use-cart";

const CONFIRMATION_MS = 3000;

/** Estado del formulario de compra de una ficha de producto. */
export function useAddToCart(product: Product) {
  const { add } = useCart();
  const [formatId, setFormatId] = useState(product.formats[0]?.id ?? "");
  const [cut, setCut] = useState<string | null>(product.cuts[0] ?? null);
  const [quantity, setQuantityState] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const unitCents = (getFormat(product, formatId) ?? product.formats[0])?.priceCents ?? 0;

  function setQuantity(next: number) {
    setQuantityState(Math.min(MAX_QUANTITY, Math.max(1, next)));
  }

  function submit() {
    add({ slug: product.slug, formatId, cut, quantity });
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), CONFIRMATION_MS);
  }

  return { formatId, setFormatId, cut, setCut, quantity, setQuantity, unitCents, totalCents: unitCents * quantity, added, submit };
}
