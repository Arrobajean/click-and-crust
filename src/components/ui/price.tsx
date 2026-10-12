import type { HTMLAttributes } from "react";
import { formatEuro } from "@/lib/money";

interface PriceProps extends HTMLAttributes<HTMLSpanElement> {
  cents: number;
  /** Muestra "desde" delante cuando el producto tiene varios formatos. */
  from?: boolean;
}

export function Price({ cents, from = false, className = "", ...rest }: PriceProps) {
  return (
    <span className={`tabular-nums ${className}`} {...rest}>
      {from && <span className="mr-1 text-muted">desde</span>}
      {formatEuro(cents)}
    </span>
  );
}
