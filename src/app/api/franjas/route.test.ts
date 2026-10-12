import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getOrderRepository } from "@/lib/order-repository";
import { GET } from "./route";

const NOW = new Date("2026-10-12T07:00:00Z"); // lunes 09:00 en Madrid

const get = (query: string) => GET(new Request(`http://localhost/api/franjas${query}`));

beforeEach(() => {
  vi.useFakeTimers({ now: NOW, toFake: ["Date"] });
});
afterEach(() => {
  vi.useRealTimers();
});

describe("GET /api/franjas", () => {
  it("devuelve las franjas del día con su estado", async () => {
    const response = await get("?date=2026-10-12");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(body.slots).toHaveLength(18);
    expect(body.slots.find((slot: { time: string }) => slot.time === "08:00").status).toBe("too_soon");
    expect(body.slots.find((slot: { time: string }) => slot.time === "17:00").status).toBe("available");
  });

  it("marca como completa la franja que alcanza el aforo", async () => {
    const repo = getOrderRepository();
    for (let index = 0; index < 8; index += 1) {
      await repo.save({
        id: `CC-FULL0${index}`, createdAt: NOW.toISOString(), notes: "", totalCents: 499,
        customer: { name: "Test", phone: "612345678", email: "t@example.com" },
        pickup: { date: "2026-10-15", time: "10:00" }, lines: [],
      });
    }
    const body = await (await get("?date=2026-10-15")).json();
    const status = (time: string) => body.slots.find((slot: { time: string }) => slot.time === time).status;
    expect(status("10:00")).toBe("full");
    expect(status("10:30")).toBe("available");
  });

  it("un domingo o una fecha fuera de plazo devuelve la lista vacía", async () => {
    expect((await (await get("?date=2026-10-18")).json()).slots).toEqual([]);
    expect((await (await get("?date=2027-01-01")).json()).slots).toEqual([]);
  });

  it.each(["", "?date=", "?date=mañana", "?date=2026-02-30"])("devuelve 400 con la consulta %j", async (query) => {
    const response = await get(query);
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("invalid_date");
  });
});
