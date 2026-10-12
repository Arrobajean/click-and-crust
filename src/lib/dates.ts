const longDate = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

/**
 * "2026-10-13" -> "martes, 13 de octubre". Se formatea a mediodía UTC para que el
 * huso horario del navegador nunca desplace el día.
 */
export function formatLongDate(date: string): string {
  return longDate.format(new Date(`${date}T12:00:00Z`));
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
