import { describe, expect, it } from "vitest";
import {
  CAPACITY_PER_SLOT,
  HORIZON_DAYS,
  addDays,
  bookableDates,
  checkSlot,
  isValidDate,
  localNow,
  slotTimes,
  slotsForDate,
} from "./slots";

// Lunes 12 de octubre de 2026, 09:00 en Madrid (UTC+2).
const MONDAY_MORNING = new Date("2026-10-12T07:00:00Z");

const statusOf = (date: string, now: Date, time: string, occupancy = {}) =>
  slotsForDate(date, now, occupancy).find((slot) => slot.time === time)?.status;

describe("localNow", () => {
  it("convierte a hora de Madrid, no a la del servidor", () => {
    expect(localNow(MONDAY_MORNING)).toEqual({ date: "2026-10-12", minutes: 9 * 60 });
  });

  it("cruza medianoche: 22:30 UTC es ya el día siguiente en Madrid", () => {
    expect(localNow(new Date("2026-10-12T22:30:00Z"))).toEqual({ date: "2026-10-13", minutes: 30 });
  });

  it("aplica el cambio de hora de octubre (UTC+2 pasa a UTC+1)", () => {
    expect(localNow(new Date("2026-10-25T00:30:00Z")).minutes).toBe(2 * 60 + 30); // aún verano
    expect(localNow(new Date("2026-10-25T23:30:00Z"))).toEqual({ date: "2026-10-26", minutes: 30 }); // ya invierno
  });
});

describe("isValidDate", () => {
  it("acepta fechas reales, incluido el 29 de febrero bisiesto", () => {
    expect(isValidDate("2026-10-12")).toBe(true);
    expect(isValidDate("2028-02-29")).toBe(true);
  });

  it("rechaza fechas inexistentes y formatos erróneos", () => {
    expect(isValidDate("2026-02-30")).toBe(false);
    expect(isValidDate("2027-02-29")).toBe(false);
    expect(isValidDate("12/10/2026")).toBe(false);
    expect(isValidDate("")).toBe(false);
  });
});

describe("slotTimes", () => {
  it("entre semana hay 18 franjas: 12 de mañana y 6 de tarde", () => {
    const times = slotTimes("2026-10-12");
    expect(times).toHaveLength(18);
    expect(times[0]).toBe("08:00");
    expect(times[11]).toBe("13:30"); // la última de la mañana termina a las 14:00
    expect(times[12]).toBe("17:00");
    expect(times.at(-1)).toBe("19:30");
  });

  it("el sábado solo hay mañana", () => {
    expect(slotTimes("2026-10-17")).toHaveLength(12);
  });

  it("el domingo no hay franjas", () => {
    expect(slotTimes("2026-10-18")).toEqual([]);
  });
});

describe("slotsForDate", () => {
  it("hoy exige 3 horas de antelación: a las 9:00 la primera libre es a las 12:00", () => {
    expect(statusOf("2026-10-12", MONDAY_MORNING, "08:00")).toBe("too_soon");
    expect(statusOf("2026-10-12", MONDAY_MORNING, "11:30")).toBe("too_soon");
    expect(statusOf("2026-10-12", MONDAY_MORNING, "12:00")).toBe("available");
    expect(statusOf("2026-10-12", MONDAY_MORNING, "17:00")).toBe("available");
  });

  it("mañana a primera hora ya está disponible", () => {
    expect(statusOf("2026-10-13", MONDAY_MORNING, "08:00")).toBe("available");
  });

  it("marca como completa una franja que alcanza el aforo", () => {
    const occupancy = { "09:00": CAPACITY_PER_SLOT };
    expect(statusOf("2026-10-13", MONDAY_MORNING, "09:00", occupancy)).toBe("full");
    expect(statusOf("2026-10-13", MONDAY_MORNING, "09:30", occupancy)).toBe("available");
  });

  it("una franja con un hueco menos que el aforo sigue libre", () => {
    expect(statusOf("2026-10-13", MONDAY_MORNING, "09:00", { "09:00": CAPACITY_PER_SLOT - 1 })).toBe("available");
  });

  it("devuelve vacío para días pasados, fuera del horizonte o cerrados", () => {
    expect(slotsForDate("2026-10-11", MONDAY_MORNING)).toEqual([]);
    expect(slotsForDate(addDays("2026-10-12", HORIZON_DAYS + 1), MONDAY_MORNING)).toEqual([]);
    expect(slotsForDate("2026-10-18", MONDAY_MORNING)).toEqual([]); // domingo
    expect(slotsForDate("no-es-fecha", MONDAY_MORNING)).toEqual([]);
  });

  it("el último día del horizonte aún se puede reservar", () => {
    expect(slotsForDate(addDays("2026-10-12", HORIZON_DAYS), MONDAY_MORNING).length).toBeGreaterThan(0);
  });

  it("la antelación cuenta también entre días: a las 23:30 el sábado ya hay tiempo para el lunes", () => {
    const saturdayNight = new Date("2026-10-17T21:30:00Z"); // 23:30 del sábado en Madrid
    expect(statusOf("2026-10-19", saturdayNight, "08:00")).toBe("available");
  });
});

describe("bookableDates", () => {
  it("incluye hoy mientras queden franjas por la tarde y excluye los domingos", () => {
    const dates = bookableDates(MONDAY_MORNING);
    expect(dates[0]).toBe("2026-10-12");
    expect(dates).not.toContain("2026-10-18");
    expect(dates.length).toBeLessThanOrEqual(HORIZON_DAYS + 1);
  });

  it("no incluye hoy cuando ya no queda ninguna franja con antelación suficiente", () => {
    const lateEvening = new Date("2026-10-12T18:00:00Z"); // 20:00 en Madrid
    expect(bookableDates(lateEvening)[0]).toBe("2026-10-13");
  });
});

describe("checkSlot", () => {
  it("acepta una franja válida", () => {
    expect(checkSlot("2026-10-13", "10:00", MONDAY_MORNING)).toEqual({ ok: true });
  });

  it.each([
    ["2026-10-13", "14:00", "closed"], // la hora de cierre no es una franja
    ["2026-10-13", "15:30", "closed"], // descanso del mediodía
    ["2026-10-18", "10:00", "closed"], // domingo
    ["2026-10-12", "09:30", "too_soon"],
    ["2026-10-11", "10:00", "out_of_range"],
    ["2026-11-30", "10:00", "out_of_range"],
    ["2026-10-13", "25:00", "out_of_range"],
    ["2026-02-30", "10:00", "out_of_range"],
  ] as const)("rechaza %s %s por %s", (date, time, reason) => {
    expect(checkSlot(date, time, MONDAY_MORNING)).toEqual({ ok: false, reason });
  });

  it("rechaza una franja completa", () => {
    expect(checkSlot("2026-10-13", "09:00", MONDAY_MORNING, { "09:00": CAPACITY_PER_SLOT })).toEqual({ ok: false, reason: "full" });
  });
});
