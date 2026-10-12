import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const NOW = new Date("2026-10-12T07:00:00Z"); // lunes 09:00 en Madrid

let ipCounter = 0;
const nextIp = () => `10.0.0.${(ipCounter += 1)}`;

function order(overrides: Record<string, unknown> = {}) {
  return {
    items: [{ slug: "pan-de-payes", formatId: "pieza", cut: "Entero", quantity: 2 }],
    customer: { name: "Marta Ibáñez", phone: "612 345 678", email: "marta@example.com" },
    pickup: { date: "2026-10-13", time: "09:00" },
    notes: "",
    consent: true,
    ...overrides,
  };
}

function post(body: unknown, ip = nextIp()) {
  return POST(
    new Request("http://localhost/api/pedidos", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

beforeEach(() => {
  vi.useFakeTimers({ now: NOW, toFake: ["Date"] });
});
afterEach(() => {
  vi.useRealTimers();
});

describe("POST /api/pedidos", () => {
  it("crea el pedido y devuelve 201 con el total calculado en el servidor", async () => {
    const response = await post(order());
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.order.id).toMatch(/^CC-[A-Z2-9]{6}$/);
    expect(body.order.totalCents).toBe(998);
    expect(body.order.lines[0]).toMatchObject({ name: "Pan de Payés", unitCents: 499 });
  });

  it("rechaza (400) un importe enviado por el cliente en vez de ignorarlo", async () => {
    const response = await post(order({ items: [{ slug: "pan-de-payes", formatId: "pieza", cut: "Entero", quantity: 1, price: 1 }] }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("invalid_request");
  });

  it("rechaza (400) el campo trampa relleno", async () => {
    expect((await post(order({ website: "http://spam.example" }))).status).toBe(400);
  });

  it("devuelve 400 con el campo y el mensaje cuando falta un dato", async () => {
    const response = await post(order({ customer: { name: "Marta", phone: "1", email: "marta@example.com" } }));
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ code: "invalid_request", field: "customer" });
  });

  it("devuelve 400 si el cuerpo no es JSON", async () => {
    const response = await post("{esto no es json");
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("invalid_json");
  });

  it("devuelve 413 si el cuerpo es excesivo", async () => {
    expect((await post(order({ notes: "x".repeat(20_000) }))).status).toBe(413);
  });

  it("devuelve 422 si un producto de la cesta ya no existe", async () => {
    const response = await post(order({ items: [{ slug: "pan-fantasma", formatId: "pieza", cut: null, quantity: 1 }] }));
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ code: "invalid_cart", field: "items" });
  });

  it("devuelve 422 si la franja no tiene antelación suficiente", async () => {
    const response = await post(order({ pickup: { date: "2026-10-12", time: "10:00" } }));
    expect(response.status).toBe(422);
    expect((await response.json()).code).toBe("slot_too_soon");
  });

  it("devuelve 409 cuando la franja está completa", async () => {
    const pickup = { date: "2026-10-14", time: "17:00" };
    for (let index = 0; index < 8; index += 1) expect((await post(order({ pickup }))).status).toBe(201);

    const response = await post(order({ pickup }));
    expect(response.status).toBe(409);
    expect((await response.json()).code).toBe("slot_full");
  });

  it("limita las peticiones por IP: la séptima recibe 429 con Retry-After", async () => {
    const ip = nextIp();
    for (let index = 0; index < 6; index += 1) {
      expect((await post(order({ pickup: { date: "2026-10-16", time: "08:00" } }), ip)).status).toBe(201);
    }
    const blocked = await post(order(), ip);
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get("Retry-After"))).toBeGreaterThan(0);
  });
});
