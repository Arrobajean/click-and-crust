"use client";

import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import { MAX_QUANTITY } from "@/lib/cart";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  /** Texto para lectores de pantalla: "Cantidad de Pan de Payés". */
  label: string;
  /** Con allowZero, bajar de 1 elimina (lo usa la cesta). */
  min?: number;
}

const BUTTON =
  "grid size-11 place-items-center transition-colors hover:bg-surface-2 active:scale-95 disabled:pointer-events-none disabled:opacity-40";

export function QuantityStepper({ value, onChange, label, min = 1 }: QuantityStepperProps) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center overflow-hidden rounded-full border border-line">
      <button type="button" className={BUTTON} aria-label="Quitar una unidad" onClick={() => onChange(value - 1)} disabled={value <= min && min > 0}>
        <Minus size={16} weight="bold" aria-hidden />
      </button>
      <output className="min-w-10 text-center font-medium tabular-nums" aria-live="polite">
        {value}
      </output>
      <button type="button" className={BUTTON} aria-label="Añadir una unidad" onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY}>
        <Plus size={16} weight="bold" aria-hidden />
      </button>
    </div>
  );
}
