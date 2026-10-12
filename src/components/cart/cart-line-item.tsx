import { Trash } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { ROUTES } from "@/lib/routes";
import type { PricedLine } from "@/lib/types";

interface CartLineItemProps {
  line: PricedLine;
  onQuantity: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}

export function CartLineItem({ line, onQuantity, onRemove }: CartLineItemProps) {
  return (
    <li className="grid grid-cols-[88px_1fr] gap-4 py-6 sm:grid-cols-[104px_1fr_auto]" data-testid="cart-line">
      <Link href={ROUTES.product(line.slug)} className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-surface-2">
        <Image src={line.image} alt="" fill sizes="104px" className="object-cover object-bottom" />
      </Link>

      <div className="grid content-start gap-3">
        <div>
          <Link href={ROUTES.product(line.slug)} className="font-display text-lg font-medium leading-tight hover:underline">
            {line.name}
          </Link>
          <p className="text-sm text-muted">
            {line.formatLabel}
            {line.cut ? `, ${line.cut.toLowerCase()}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <QuantityStepper value={line.quantity} onChange={(next) => onQuantity(line.key, next)} label={`Cantidad de ${line.name}`} />
          <button
            type="button"
            onClick={() => onRemove(line.key)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:text-ink"
          >
            <Trash size={16} aria-hidden />
            Quitar
            <span className="sr-only"> {line.name}</span>
          </button>
        </div>
      </div>

      <Price cents={line.lineCents} className="col-start-2 font-medium sm:col-start-3 sm:text-right" />
    </li>
  );
}
