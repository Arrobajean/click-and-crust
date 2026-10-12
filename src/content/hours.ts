/** Tramo de apertura: [abre, cierra] en HH:MM, hora local de la panadería. */
export type Interval = readonly [open: string, close: string];

/**
 * Horario de recogida por día de la semana (0 = domingo ... 6 = sábado).
 * Es la única fuente: las franjas disponibles y el horario visible salen de aquí.
 */
export const OPENING_HOURS: Readonly<Record<number, readonly Interval[]>> = {
  0: [],
  1: [["08:00", "14:00"], ["17:00", "20:00"]],
  2: [["08:00", "14:00"], ["17:00", "20:00"]],
  3: [["08:00", "14:00"], ["17:00", "20:00"]],
  4: [["08:00", "14:00"], ["17:00", "20:00"]],
  5: [["08:00", "14:00"], ["17:00", "20:00"]],
  6: [["08:00", "14:00"]],
};
