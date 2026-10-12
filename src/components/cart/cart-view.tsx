"use client";

import { ButtonLink } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { useCart } from "@/hooks/use-cart";
import { useIsClient } from "@/hooks/use-is-client";
import { menuUrl, ROUTES } from "@/lib/routes";
import { CartLineItem } from "./cart-line-item";

function CartSkeleton() {
  return (
    <div className="grid gap-6" aria-hidden>
      <div className="skeleton h-32 rounded-[var(--radius-media)]" />
      <div className="skeleton h-32 rounded-[var(--radius-media)]" />
    </div>
  );
}

export function EmptyCart() {
  return (
    <div className="grid justify-items-start gap-4 rounded-[var(--radius-media)] bg-surface px-6 py-14 md:px-10" data-testid="empty-cart">
      <h2 className="font-display text-2xl font-semibold">Tu cesta está vacía</h2>
      <p className="max-w-[48ch] text-muted">Añade panes o bollería desde la carta y vuelve aquí para reservar la recogida.</p>
      <ButtonLink href={menuUrl()}>Ver la carta</ButtonLink>
    </div>
  );
}

export function CartView() {
  const cart = useCart();
  const ready = useIsClient();

  if (!ready) return <CartSkeleton />;
  if (cart.isEmpty) return <EmptyCart />;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
      <ul className="divide-y divide-line border-y border-line">
        {cart.lines.map((line) => (
          <CartLineItem key={line.key} line={line} onQuantity={cart.setQuantity} onRemove={cart.remove} />
        ))}
      </ul>

      <aside aria-label="Resumen de la cesta" className="grid gap-5 rounded-[var(--radius-media)] bg-surface p-6 lg:sticky lg:top-24">
        <p className="flex items-baseline justify-between">
          <span className="font-display text-lg font-semibold">Total</span>
          <Price cents={cart.totalCents} className="font-display text-3xl font-semibold" data-testid="cart-total" />
        </p>
        <p className="text-sm text-muted">El pago se haría al recoger. En esta demostración no se cobra nada.</p>
        <ButtonLink href={ROUTES.checkout} className="w-full">
          Reservar recogida
        </ButtonLink>
      </aside>
    </div>
  );
}
