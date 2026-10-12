import { formatEuro } from "@/lib/money";

interface PriceProps {
  cents: number;
  /** Muestra "desde" delante cuando el producto tiene varios formatos. */
  from?: boolean;
  className?: string;
}

export function Price({ cents, from = false, className = "" }: PriceProps) {
  return (
    <span className={`tabular-nums ${className}`}>
      {from && <span className="mr-1 text-muted">desde</span>}
      {formatEuro(cents)}
    </span>
  );
}
