import { describe, expect, it } from "vitest";
import { EMPTY_CHECKOUT, toOrderRequest, validateCheckout, type CheckoutValues } from "./checkout";
import { orderRequestSchema } from "./schemas";

const valid: CheckoutValues = {
  ...EMPTY_CHECKOUT,
  name: "Marta Ibáñez",
  phone: "612 345 678",
  email: "marta@example.com",
  date: "2026-10-13",
  time: "09:00",
  consent: true,
};

describe("validateCheckout", () => {
  it("no devuelve errores con datos correctos", () => {
    expect(validateCheckout(valid)).toEqual({});
  });

  it("pide todos los campos obligatorios en un formulario vacío", () => {
    expect(Object.keys(validateCheckout(EMPTY_CHECKOUT)).sort()).toEqual(["consent", "date", "email", "name", "phone", "time"]);
  });

  it.each([
    ["phone", "12345", "teléfono"],
    ["phone", "abc def ghi jkl", "teléfono"],
    ["email", "marta@", "correo"],
    ["email", "sin-arroba.es", "correo"],
    ["name", "A", "nombre"],
    ["notes", "x".repeat(301), "300"],
  ] as const)("rechaza %s = %s", (field, value, hint) => {
    expect(validateCheckout({ ...valid, [field]: value })[field]).toContain(hint);
  });

  it("acepta teléfonos con prefijo internacional y puntuación", () => {
    expect(validateCheckout({ ...valid, phone: "+34 612-345-678" })).toEqual({});
    expect(validateCheckout({ ...valid, phone: "(91) 234 56 78" })).toEqual({});
  });

  it("exige aceptar las condiciones", () => {
    expect(validateCheckout({ ...valid, consent: false }).consent).toBe("Debes aceptar para continuar.");
  });
});

describe("toOrderRequest", () => {
  const lines = [{ slug: "pan-de-payes", formatId: "pieza", cut: "Entero", quantity: 2 }] as const;

  it("construye una petición que el servidor acepta", () => {
    const request = toOrderRequest({ ...valid, name: "  Marta Ibáñez  ", notes: " sin bolsa " }, lines);
    expect(orderRequestSchema.safeParse(request).success).toBe(true);
    expect(request.customer.name).toBe("Marta Ibáñez");
    expect(request.notes).toBe("sin bolsa");
  });

  it("solo envía identificadores y cantidades, nunca importes ni nombres", () => {
    const request = toOrderRequest(valid, [{ ...lines[0], price: 1, name: "x" } as never]);
    expect(Object.keys(request.items[0]!).sort()).toEqual(["cut", "formatId", "quantity", "slug"]);
  });
});
