const euro = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

/** 499 -> "4,99 €". Recibe céntimos enteros. */
export function formatEuro(cents: number): string {
  return euro.format(cents / 100);
}

/** 499 -> "4.99", para JSON-LD y otros formatos máquina. */
export function toDecimalString(cents: number): string {
  return (cents / 100).toFixed(2);
}
