"use client";

import { Check } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChoiceGroup } from "@/components/ui/choice-group";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { formatEuro } from "@/lib/money";
import { ROUTES } from "@/lib/routes";
import type { Product } from "@/lib/types";

export function AddToCartPanel({ product }: { product: Product }) {
  const form = useAddToCart(product);

  return (
    <div className="grid gap-6">
      {product.formats.length > 1 && (
        <ChoiceGroup
          legend="Formato"
          name="format"
          value={form.formatId}
          onChange={form.setFormatId}
          choices={product.formats.map((format) => ({ value: format.id, label: format.label, detail: formatEuro(format.priceCents) }))}
        />
      )}

      {product.cuts.length > 0 && (
        <ChoiceGroup
          legend="Corte"
          name="cut"
          value={form.cut ?? ""}
          onChange={form.setCut}
          choices={product.cuts.map((cut) => ({ value: cut, label: cut }))}
        />
      )}

      <div className="flex flex-wrap items-center gap-4">
        <QuantityStepper value={form.quantity} onChange={form.setQuantity} label={`Cantidad de ${product.name}`} />
        <Price cents={form.totalCents} className="font-display text-2xl font-semibold" />
      </div>

      <div className="grid gap-3">
        <Button onClick={form.submit} className="w-full sm:w-fit">
          Añadir a la cesta
        </Button>
        <p role="status" aria-live="polite" className="min-h-6 text-sm">
          {form.added && (
            <span className="inline-flex items-center gap-2">
              <Check size={16} weight="bold" aria-hidden className="text-accent-text" />
              Añadido.{" "}
              <Link href={ROUTES.cart} className="underline underline-offset-4 hover:text-accent-text">
                Ir a la cesta
              </Link>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
