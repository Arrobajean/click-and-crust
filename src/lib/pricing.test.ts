import { describe, expect, it } from "vitest";
import { priceCart, priceCartLenient, priceLine } from "./pricing";
import type { CartLine } from "./types";

const payes: CartLine = { slug: "pan-de-payes", formatId: "pieza", cut: "Entero", quantity: 3 };
const pack: CartLine = { slug: "palmera-de-mantequilla", formatId: "pack-6-uds", cut: null, quantity: 2 };

describe("priceLine", () => {
  it("resuelve nombre, formato y importes en céntimos enteros", () => {
    const result = priceLine(payes);
    expect(result).toMatchObject({
      ok: true,
      line: { name: "Pan de Payés", formatLabel: "Pieza", unitCents: 499, lineCents: 1497, key: "pan-de-payes|pieza|Entero" },
    });
  });

  it("usa el precio del formato elegido, no el de otro formato del mismo producto", () => {
    const unit = priceLine({ slug: "palmera-de-mantequilla", formatId: "unidad", cut: null, quantity: 1 });
    const six = priceLine({ ...pack, quantity: 1 });
    expect(unit.ok && unit.line.unitCents).toBe(265);
    expect(six.ok && six.line.unitCents).toBe(1400);
  });

  it.each([
    ["unknown_product", { ...payes, slug: "no-existe" }],
    ["unknown_format", { ...payes, formatId: "no-existe" }],
    ["invalid_cut", { ...payes, cut: "Troceado" }],
    ["invalid_cut", { ...payes, cut: null }],
    ["invalid_cut", { ...pack, cut: "Entero" }],
  ] as const)("devuelve %s", (error, line) => {
    expect(priceLine(line)).toMatchObject({ ok: false, error });
  });
});

describe("priceCart (estricto)", () => {
  it("suma el total de todas las líneas", () => {
    const result = priceCart([payes, pack]);
    expect(result.ok && result.totalCents).toBe(3 * 499 + 2 * 1400);
  });

  it("falla entero si una sola línea es inválida", () => {
    expect(priceCart([payes, { ...pack, formatId: "pack-99" }])).toMatchObject({ ok: false, error: "unknown_format" });
  });

  it("una cesta vacía suma cero", () => {
    expect(priceCart([])).toEqual({ ok: true, lines: [], totalCents: 0 });
  });
});

describe("priceCartLenient (cliente)", () => {
  it("descarta las líneas que ya no existen y conserva el resto", () => {
    const result = priceCartLenient([payes, { ...pack, slug: "producto-retirado" }]);
    expect(result.lines).toHaveLength(1);
    expect(result.totalCents).toBe(1497);
  });
});
