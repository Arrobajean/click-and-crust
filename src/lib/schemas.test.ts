import { describe, expect, it } from "vitest";
import { MAX_LINES, MAX_QUANTITY } from "./cart";
import { cartSchema, orderRequestSchema, receiptsSchema, toFieldErrors } from "./schemas";

const base = {
  items: [{ slug: "pan-de-payes", formatId: "pieza", cut: "Entero", quantity: 1 }],
  customer: { name: "Marta Ibáñez", phone: "612345678", email: "marta@example.com" },
  pickup: { date: "2026-10-13", time: "09:00" },
  consent: true,
};

describe("orderRequestSchema", () => {
  it("acepta una petición válida y rellena las notas vacías", () => {
    const result = orderRequestSchema.safeParse(base);
    expect(result.success && result.data.notes).toBe("");
  });

  it("rechaza campos desconocidos: un precio enviado por el cliente no se ignora, se rechaza", () => {
    const tampered = { ...base, items: [{ ...base.items[0], price: 1 }] };
    expect(orderRequestSchema.safeParse(tampered).success).toBe(false);
    expect(orderRequestSchema.safeParse({ ...base, total: 0 }).success).toBe(false);
  });

  it("rechaza el campo trampa relleno", () => {
    expect(orderRequestSchema.safeParse({ ...base, website: "http://spam.example" }).success).toBe(false);
    expect(orderRequestSchema.safeParse({ ...base, website: "" }).success).toBe(true);
  });

  it("rechaza cantidades inválidas", () => {
    for (const quantity of [0, -1, 1.5, MAX_QUANTITY + 1, "2"]) {
      const result = orderRequestSchema.safeParse({ ...base, items: [{ ...base.items[0], quantity }] });
      expect(result.success, String(quantity)).toBe(false);
    }
  });

  it("rechaza una cesta vacía o excesiva", () => {
    expect(orderRequestSchema.safeParse({ ...base, items: [] }).success).toBe(false);
    const many = Array.from({ length: MAX_LINES + 1 }, (_, index) => ({ ...base.items[0], slug: `p-${index}` }));
    expect(orderRequestSchema.safeParse({ ...base, items: many }).success).toBe(false);
  });

  it("exige consentimiento explícito", () => {
    expect(orderRequestSchema.safeParse({ ...base, consent: false }).success).toBe(false);
    expect(orderRequestSchema.safeParse({ ...base, consent: undefined }).success).toBe(false);
  });
});

describe("toFieldErrors", () => {
  it("devuelve el primer mensaje por campo", () => {
    const result = orderRequestSchema.safeParse({ ...base, customer: { name: "", phone: "1", email: "x" } });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(Object.keys(toFieldErrors(result.error))).toEqual(["customer"]);
  });
});

describe("esquemas de lo guardado en el navegador", () => {
  it("cartSchema rechaza datos corruptos", () => {
    expect(cartSchema.safeParse({ lines: [{ slug: "x" }] }).success).toBe(false);
    expect(cartSchema.safeParse("basura").success).toBe(false);
    expect(cartSchema.safeParse({ lines: [] }).success).toBe(true);
  });

  it("receiptsSchema limita a 5 pedidos", () => {
    expect(receiptsSchema.safeParse({ orders: [] }).success).toBe(true);
    const order = {
      id: "CC-ABC234", createdAt: "2026-10-12T07:00:00.000Z", notes: "", totalCents: 499,
      customer: { name: "M", phone: "1", email: "e" }, pickup: { date: "2026-10-13", time: "09:00" }, lines: [],
    };
    expect(receiptsSchema.safeParse({ orders: Array(6).fill(order) }).success).toBe(false);
  });
});
