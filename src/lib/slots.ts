import { OPENING_HOURS } from "@/content/hours";
import type { Slot } from "./types";

export const TIME_ZONE = "Europe/Madrid";
/** Duración de cada franja de recogida. */
export const SLOT_MINUTES = 30;
/** Antelación mínima entre el pedido y la hora de recogida. */
export const LEAD_MINUTES = 180;
/** Cuántos días hacia delante se puede reservar. */
export const HORIZON_DAYS = 14;
/** Pedidos máximos por franja. */
export const CAPACITY_PER_SLOT = 8;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const MINUTES_PER_DAY = 1440;

export type Occupancy = Readonly<Record<string, number>>;

export type SlotRejection = "out_of_range" | "closed" | "too_soon" | "full";
export type SlotCheck = { ok: true } | { ok: false; reason: SlotRejection };

export function isValidDate(date: string): boolean {
  if (!DATE_PATTERN.test(date)) return false;
  const [year = 0, month = 0, day = 0] = date.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  // Rechaza fechas inexistentes como 2026-02-30, que Date normalizaría en silencio.
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}

export function isValidTime(time: string): boolean {
  return TIME_PATTERN.test(time);
}

export function toMinutes(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function toTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/** Fecha y hora actuales en la panadería (Madrid), con independencia del servidor. */
export function localNow(now: Date): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function addDays(date: string, days: number): string {
  const [year = 0, month = 0, day = 0] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

function daysBetween(from: string, to: string): number {
  const toUtc = (date: string) => {
    const [year = 0, month = 0, day = 0] = date.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.round((toUtc(to) - toUtc(from)) / (MINUTES_PER_DAY * 60_000));
}

function weekdayOf(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

/** Horas de inicio de todas las franjas del día según el horario; vacío si cierra. */
export function slotTimes(date: string): string[] {
  const times: string[] = [];
  for (const [open, close] of OPENING_HOURS[weekdayOf(date)] ?? []) {
    for (let start = toMinutes(open); start + SLOT_MINUTES <= toMinutes(close); start += SLOT_MINUTES) {
      times.push(toTime(start));
    }
  }
  return times;
}

/**
 * Franjas de un día con su estado. Devuelve [] si el día queda fuera del horizonte
 * de reserva, ya pasó, o la panadería está cerrada.
 */
export function slotsForDate(date: string, now: Date, occupancy: Occupancy = {}): Slot[] {
  if (!isValidDate(date)) return [];
  const today = localNow(now);
  const offset = daysBetween(today.date, date);
  if (offset < 0 || offset > HORIZON_DAYS) return [];

  return slotTimes(date).map((time) => {
    const minutesFromNow = offset * MINUTES_PER_DAY + toMinutes(time) - today.minutes;
    if (minutesFromNow < LEAD_MINUTES) return { time, status: "too_soon" };
    if ((occupancy[time] ?? 0) >= CAPACITY_PER_SLOT) return { time, status: "full" };
    return { time, status: "available" };
  });
}

/** Días reservables: dentro del horizonte y con al menos una franja libre por horario y antelación. */
export function bookableDates(now: Date): string[] {
  const today = localNow(now).date;
  return Array.from({ length: HORIZON_DAYS + 1 }, (_, index) => addDays(today, index)).filter((date) =>
    slotsForDate(date, now).some((slot) => slot.status === "available"),
  );
}

/** Valida una franja concreta; es la comprobación que repite el servidor al crear el pedido. */
export function checkSlot(date: string, time: string, now: Date, occupancy: Occupancy = {}): SlotCheck {
  if (!isValidDate(date) || !isValidTime(time)) return { ok: false, reason: "out_of_range" };
  const offset = daysBetween(localNow(now).date, date);
  if (offset < 0 || offset > HORIZON_DAYS) return { ok: false, reason: "out_of_range" };

  const slot = slotsForDate(date, now, occupancy).find((item) => item.time === time);
  if (!slot) return { ok: false, reason: "closed" };
  if (slot.status === "too_soon") return { ok: false, reason: "too_soon" };
  if (slot.status === "full") return { ok: false, reason: "full" };
  return { ok: true };
}
