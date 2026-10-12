import { describe, expect, it } from "vitest";
import { formatEuro, toDecimalString } from "./money";

// Intl separa la cifra del símbolo con un espacio duro (U+00A0).
const nbsp = " ";

describe("formatEuro", () => {
  it("usa coma decimal y símbolo al final", () => {
    expect(formatEuro(499)).toBe(`4,99${nbsp}€`);
    expect(formatEuro(1400)).toBe(`14,00${nbsp}€`);
    expect(formatEuro(0)).toBe(`0,00${nbsp}€`);
  });

  it("no pierde céntimos por coma flotante", () => {
    expect(formatEuro(10)).toBe(`0,10${nbsp}€`);
    expect(formatEuro(2025)).toBe(`20,25${nbsp}€`);
  });
});

describe("toDecimalString", () => {
  it("devuelve punto decimal y dos decimales", () => {
    expect(toDecimalString(499)).toBe("4.99");
    expect(toDecimalString(1400)).toBe("14.00");
  });
});
