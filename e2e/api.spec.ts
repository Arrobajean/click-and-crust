import type { APIRequestContext } from "@playwright/test";
import { expect, test } from "./fixtures";

const ITEM = { slug: "pan-de-payes", formatId: "pieza", cut: "Entero", quantity: 2 };
const CUSTOMER = { name: "Marta Ibáñez", phone: "612 345 678", email: "marta@example.com" };

function body(overrides: Record<string, unknown> = {}) {
  return { items: [ITEM], customer: CUSTOMER, pickup: { date: "", time: "" }, notes: "", consent: true, ...overrides };
}

const isoDate = (offset: number) => {
  // Fecha local de Madrid, igual que la usa el servidor.
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date(Date.now() + offset * 86_400_000));
  return parts;
};

/** Busca una franja libre real consultando la propia API. */
async function findFreeSlot(api: APIRequestContext, from = 2) {
  for (let offset = from; offset < from + 10; offset += 1) {
    const date = isoDate(offset);
    const { slots } = await (await api.get(`/api/franjas?date=${date}`)).json();
    const free = slots.find((slot: { status: string }) => slot.status === "available");
    if (free) return { date, time: free.time as string };
  }
  throw new Error("No hay ninguna franja libre en los próximos días");
}

test.describe("GET /api/franjas", () => {
  test("devuelve franjas con estado y sin caché", async ({ api }) => {
    const date = isoDate(3);
    const response = await api.get(`/api/franjas?date=${date}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["cache-control"]).toBe("no-store");
    const data = await response.json();
    expect(data.date).toBe(date);
    for (const slot of data.slots) expect(["available", "full", "too_soon"]).toContain(slot.status);
  });

  test("rechaza fechas inválidas", async ({ api }) => {
    expect((await api.get("/api/franjas?date=mañana")).status()).toBe(400);
    expect((await api.get("/api/franjas?date=2026-02-30")).status()).toBe(400);
  });
});

test.describe("POST /api/pedidos", () => {
  test("crea un pedido y el total sale del catálogo", async ({ api }) => {
    const pickup = await findFreeSlot(api);
    const response = await api.post("/api/pedidos", { data: body({ pickup }) });
    expect(response.status()).toBe(201);
    const { order } = await response.json();
    expect(order.id).toMatch(/^CC-[A-Z2-9]{6}$/);
    expect(order.totalCents).toBe(2 * 499);
  });

  test("un importe enviado por el cliente se rechaza, no se acepta ni se ignora", async ({ api }) => {
    const pickup = await findFreeSlot(api);
    const response = await api.post("/api/pedidos", { data: body({ pickup, items: [{ ...ITEM, price: 1 }] }) });
    expect(response.status()).toBe(400);
  });

  test("el campo trampa relleno se rechaza", async ({ api }) => {
    const pickup = await findFreeSlot(api);
    expect((await api.post("/api/pedidos", { data: body({ pickup, website: "http://spam.example" }) })).status()).toBe(400);
  });

  test("un domingo se rechaza porque la panadería no abre", async ({ api }) => {
    let sunday = "";
    for (let offset = 1; offset <= 8 && !sunday; offset += 1) {
      const date = isoDate(offset);
      if (new Date(`${date}T12:00:00Z`).getUTCDay() === 0) sunday = date;
    }
    const response = await api.post("/api/pedidos", { data: body({ pickup: { date: sunday, time: "10:00" } }) });
    expect(response.status()).toBe(422);
    expect((await response.json()).code).toBe("slot_closed");
  });

  test("fuera del horizonte de reserva se rechaza", async ({ api }) => {
    const response = await api.post("/api/pedidos", { data: body({ pickup: { date: isoDate(40), time: "10:00" } }) });
    expect(response.status()).toBe(422);
    expect((await response.json()).code).toBe("slot_out_of_range");
  });

  test("una franja que se llena devuelve 409 y la API la marca como completa", async ({ api, playwright, baseURL }) => {
    const pickup = await findFreeSlot(api, 5);
    for (let index = 0; index < 8; index += 1) {
      // Cada pedido desde una IP distinta para no activar el límite de peticiones.
      const client = await playwright.request.newContext({ baseURL, extraHTTPHeaders: { "x-forwarded-for": `172.16.${index}.${Math.floor(Math.random() * 250)}` } });
      expect((await client.post("/api/pedidos", { data: body({ pickup }) })).status()).toBe(201);
      await client.dispose();
    }
    const ninth = await api.post("/api/pedidos", { data: body({ pickup }) });
    expect(ninth.status()).toBe(409);
    expect((await ninth.json()).code).toBe("slot_full");

    const { slots } = await (await api.get(`/api/franjas?date=${pickup.date}`)).json();
    expect(slots.find((slot: { time: string }) => slot.time === pickup.time).status).toBe("full");
  });

  test("el límite por IP responde 429 con Retry-After", async ({ api }) => {
    const pickup = await findFreeSlot(api, 8);
    const statuses: number[] = [];
    for (let index = 0; index < 8; index += 1) {
      const response = await api.post("/api/pedidos", { data: body({ pickup }) });
      statuses.push(response.status());
      if (response.status() === 429) expect(Number(response.headers()["retry-after"])).toBeGreaterThan(0);
    }
    expect(statuses.filter((status) => status === 429).length).toBeGreaterThanOrEqual(2);
    expect(statuses.slice(0, 6).every((status) => status === 201)).toBe(true);
  });
});
