import { describe, expect, it } from "vitest";
import { truncate } from "./text";

describe("truncate", () => {
  it("deja intacto el texto que cabe", () => {
    expect(truncate("Pan de payés", 50)).toBe("Pan de payés");
  });

  it("recorta en un límite de palabra y añade puntos suspensivos", () => {
    const result = truncate("Nuestro pan de payés está elaborado solo con harina, agua y sal", 40);
    expect(result.endsWith("…")).toBe(true);
    expect(result.length).toBeLessThanOrEqual(40);
    expect(result).not.toMatch(/\s…$/);
    expect("Nuestro pan de payés está elaborado solo con harina, agua y sal".startsWith(result.slice(0, -1))).toBe(true);
  });

  it("no deja una coma o un punto colgando antes de los puntos suspensivos", () => {
    expect(truncate("Una frase larga, con coma, que se corta justo aquí mismo", 22)).not.toMatch(/[,.;:]…$/);
  });

  it("colapsa espacios y saltos de línea", () => {
    expect(truncate("uno   dos\n\ntres", 50)).toBe("uno dos tres");
  });
});
