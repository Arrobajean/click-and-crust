import { describe, expect, it } from "vitest";
import { createMemoryOrderRepository, createOrder, newOrderId } from "./orders";
import type { OrderRequest } from "./schemas";
import { CAPACITY_PER_SLOT } from "./slots";

const NOW = new Date("2026-10-12T07:00:00Z"); // lunes 09:00 en Madrid

function request(overrides: Partial<OrderRequest> = {}): OrderRequest {
  return {
    items: [{ slug: "pan-de-payes", formatId: "pieza", cut: "Entero", quantity: 2 }],
    customer: { name: "Marta Ibáñez", phone: "612 345 678", email: "marta@example.com" },
    pickup: { date: "2026-10-13", time: "09:00" },
    notes: "",
    consent: true,
    ...overrides,
  };
}

const deps = (repo = createMemoryOrderRepository()) => ({ repo, now: NOW, generateId: () => "CC-TEST01" });

describe("createOrder", () => {
  it("crea el pedido con el total calculado desde el catálogo", async () => {
    const result = await createOrder(request(), deps());

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.order).toMatchObject({ id: "CC-TEST01", totalCents: 998, createdAt: NOW.toISOString() });
    expect(result.order.lines[0]).toMatchObject({ name: "Pan de Payés", unitCents: 499, lineCents: 998 });
  });

  it("suma varias líneas y formatos distintos", async () => {
    const result = await createOrder(
      request({
        items: [
          { slug: "palmera-de-mantequilla", formatId: "pack-6-uds", cut: null, quantity: 1 },
          { slug: "bizcocho-cacao", formatId: "rebanada", cut: null, quantity: 3 },
        ],
      }),
      deps(),
    );
    expect(result.ok && result.order.totalCents).toBe(1400 + 3 * 380);
  });

  it("guarda el pedido: la siguiente consulta de aforo lo cuenta", async () => {
    const repo = createMemoryOrderRepository();
    await createOrder(request(), deps(repo));
    expect(await repo.countBySlot("2026-10-13")).toEqual({ "09:00": 1 });
    expect(await repo.countBySlot("2026-10-14")).toEqual({});
  });

  it.each([
    ["producto inexistente", { slug: "pan-fantasma", formatId: "pieza", cut: null, quantity: 1 }],
    ["formato inexistente", { slug: "pan-de-payes", formatId: "pack-99", cut: "Entero", quantity: 1 }],
    ["corte no permitido", { slug: "pan-de-payes", formatId: "pieza", cut: "En cubos", quantity: 1 }],
    ["corte obligatorio ausente", { slug: "pan-de-payes", formatId: "pieza", cut: null, quantity: 1 }],
    ["corte enviado a un producto sin cortes", { slug: "bizcocho-cacao", formatId: "rebanada", cut: "Entero", quantity: 1 }],
  ])("rechaza el pedido entero por %s", async (_name, line) => {
    const repo = createMemoryOrderRepository();
    const result = await createOrder(request({ items: [line] }), deps(repo));

    expect(result).toMatchObject({ ok: false, error: { code: "invalid_cart", field: "items" } });
    expect(await repo.countBySlot("2026-10-13")).toEqual({}); // no se guardó nada
  });

  it("rechaza una franja con poca antelación", async () => {
    const result = await createOrder(request({ pickup: { date: "2026-10-12", time: "10:00" } }), deps());
    expect(result).toMatchObject({ ok: false, error: { code: "slot_too_soon", field: "pickup" } });
  });

  it("rechaza un domingo y una hora fuera de horario", async () => {
    expect(await createOrder(request({ pickup: { date: "2026-10-18", time: "10:00" } }), deps())).toMatchObject({
      ok: false,
      error: { code: "slot_closed" },
    });
    expect(await createOrder(request({ pickup: { date: "2026-10-13", time: "15:00" } }), deps())).toMatchObject({
      ok: false,
      error: { code: "slot_closed" },
    });
  });

  it("rechaza fechas fuera del plazo de reserva", async () => {
    const result = await createOrder(request({ pickup: { date: "2027-01-05", time: "09:00" } }), deps());
    expect(result).toMatchObject({ ok: false, error: { code: "slot_out_of_range" } });
  });

  it("respeta el aforo: el pedido número 9 de una franja se rechaza", async () => {
    const repo = createMemoryOrderRepository();
    for (let index = 0; index < CAPACITY_PER_SLOT; index += 1) {
      expect((await createOrder(request(), deps(repo))).ok).toBe(true);
    }
    expect(await createOrder(request(), deps(repo))).toMatchObject({ ok: false, error: { code: "slot_full" } });
    // Otra franja del mismo día sigue libre.
    expect((await createOrder(request({ pickup: { date: "2026-10-13", time: "09:30" } }), deps(repo))).ok).toBe(true);
  });
});

describe("newOrderId", () => {
  it("genera CC- más 6 caracteres sin símbolos ambiguos", () => {
    for (let index = 0; index < 200; index += 1) {
      expect(newOrderId()).toMatch(/^CC-[A-HJ-NP-Z2-9]{6}$/);
    }
  });

  it("no repite identificadores en una muestra grande", () => {
    const ids = new Set(Array.from({ length: 2000 }, newOrderId));
    expect(ids.size).toBe(2000);
  });
});
