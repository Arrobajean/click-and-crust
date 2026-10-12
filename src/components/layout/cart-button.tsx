"use client";

import { ShoppingBag } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { ROUTES } from "@/lib/routes";

export function CartButton() {
  const { itemCount } = useCart();
  const label = itemCount === 0 ? "Cesta, vacía" : `Cesta, ${itemCount} ${itemCount === 1 ? "artículo" : "artículos"}`;

  return (
    <Link
      href={ROUTES.cart}
      aria-label={label}
      className="relative grid h-11 min-w-11 place-items-center rounded-full px-2 transition-colors hover:bg-surface-2 active:scale-95"
    >
      <ShoppingBag size={22} aria-hidden />
      {itemCount > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-xs font-semibold tabular-nums text-accent-ink"
          data-testid="cart-count"
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
}
