import { describe, expect, it } from "vitest";
import { capitalize, formatLongDate } from "./dates";

describe("formatLongDate", () => {
  it("escribe el día de la semana, el día y el mes en español", () => {
    expect(formatLongDate("2026-10-13")).toContain("13 de octubre");
    expect(formatLongDate("2026-10-13").toLowerCase()).toContain("martes");
  });

  it("no cambia de día según el huso horario de la máquina", () => {
    expect(formatLongDate("2026-01-01")).toContain("1 de enero");
    expect(formatLongDate("2026-12-31")).toContain("31 de diciembre");
  });
});

describe("capitalize", () => {
  it("pone en mayúscula solo la primera letra", () => {
    expect(capitalize("martes, 13 de octubre")).toBe("Martes, 13 de octubre");
    expect(capitalize("")).toBe("");
  });
});
