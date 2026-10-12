import { OPENING_HOURS, type Interval } from "@/content/hours";

export interface HoursRow {
  days: string;
  hours: string;
}

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
/** Orden de visualización: la semana empieza en lunes. */
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const shortTime = (time: string) => time.replace(/^0/, "");

function describe(intervals: readonly Interval[]): string {
  if (intervals.length === 0) return "Cerrado";
  return intervals.map(([open, close]) => `${shortTime(open)} a ${shortTime(close)}`).join(" y ");
}

/** Agrupa días consecutivos con el mismo horario: "Lunes a viernes: 8:00 a 14:00 y 17:00 a 20:00". */
export function summarizeHours(hours: Readonly<Record<number, readonly Interval[]>> = OPENING_HOURS): HoursRow[] {
  const groups: { days: number[]; hours: string }[] = [];

  for (const day of DISPLAY_ORDER) {
    const text = describe(hours[day] ?? []);
    const last = groups[groups.length - 1];
    if (last && last.hours === text) last.days.push(day);
    else groups.push({ days: [day], hours: text });
  }

  return groups.map(({ days, hours: text }) => {
    const first = DAY_NAMES[days[0] ?? 0] ?? "";
    const last = DAY_NAMES[days[days.length - 1] ?? 0] ?? "";
    return { days: days.length === 1 ? capitalize(first) : `${capitalize(first)} a ${last}`, hours: text };
  });
}
