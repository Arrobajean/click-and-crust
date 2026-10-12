import { describe, expect, it } from "vitest";
import { summarizeHours } from "./hours";

describe("summarizeHours", () => {
  it("agrupa los días consecutivos con el mismo horario", () => {
    expect(summarizeHours()).toEqual([
      { days: "Lunes a viernes", hours: "8:00 a 14:00 y 17:00 a 20:00" },
      { days: "Sábado", hours: "8:00 a 14:00" },
      { days: "Domingo", hours: "Cerrado" },
    ]);
  });

  it("no agrupa días separados por otro horario", () => {
    const rows = summarizeHours({
      0: [], 1: [["09:00", "13:00"]], 2: [["10:00", "13:00"]], 3: [["09:00", "13:00"]], 4: [["09:00", "13:00"]], 5: [["09:00", "13:00"]], 6: [],
    });
    expect(rows.map((row) => row.days)).toEqual(["Lunes", "Martes", "Miércoles a viernes", "Sábado a domingo"]);
  });
});
