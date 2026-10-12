import Image from "next/image";
import { Price } from "@/components/ui/price";
import type { PricedLine } from "@/lib/types";

interface OrderSummaryProps {
  lines: readonly PricedLine[];
  totalCents: number;
}

/** Resumen de solo lectura: lo usan la reserva y la confirmación. */
export function OrderSummary({ lines, totalCents }: OrderSummaryProps) {
  return (
    <div className="grid gap-5">
      <ul className="grid gap-4">
        {lines.map((line) => (
          <li key={line.key} className="grid grid-cols-[56px_1fr_auto] items-center gap-3">
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-field)] bg-surface-2">
              <Image src={line.image} alt="" fill sizes="56px" className="object-cover object-bottom" />
            </div>
            <div>
              <p className="font-medium leading-tight">{line.name}</p>
              <p className="text-sm text-muted">
                {line.quantity} x {line.formatLabel}
                {line.cut ? `, ${line.cut.toLowerCase()}` : ""}
              </p>
            </div>
            <Price cents={line.lineCents} className="text-[15px]" />
          </li>
        ))}
      </ul>
      <p className="flex items-baseline justify-between border-t border-line pt-4">
        <span className="font-display text-lg font-semibold">Total</span>
        <Price cents={totalCents} className="font-display text-2xl font-semibold" data-testid="order-total" />
      </p>
    </div>
  );
}
