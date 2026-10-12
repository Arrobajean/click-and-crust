/** Orden visual de los campos del formulario de reserva. */
export const CHECKOUT_FIELD_ORDER = ["name", "phone", "email", "date", "time", "notes", "consent"] as const;

/** Lleva el foco al primer campo con error, para que el teclado y el lector de pantalla lo encuentren. */
export function focusFirstInvalid(errors: Readonly<Record<string, string>>): void {
  const first = CHECKOUT_FIELD_ORDER.find((field) => field in errors);
  if (first) document.getElementById(`field-${first}`)?.focus();
}
