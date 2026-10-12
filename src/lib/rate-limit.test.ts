import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

function clock(start = 1_000_000) {
  let current = start;
  return { now: () => current, advance: (ms: number) => (current += ms) };
}

describe("createRateLimiter", () => {
  it("permite hasta el límite y bloquea la siguiente petición", () => {
    const { now } = clock();
    const limiter = createRateLimiter({ limit: 3, windowMs: 60_000, now });
    expect([1, 2, 3].map(() => limiter.hit("ip-1").allowed)).toEqual([true, true, true]);
    expect(limiter.hit("ip-1").allowed).toBe(false);
  });

  it("cuenta cada clave por separado", () => {
    const { now } = clock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now });
    expect(limiter.hit("a").allowed).toBe(true);
    expect(limiter.hit("b").allowed).toBe(true);
    expect(limiter.hit("a").allowed).toBe(false);
  });

  it("informa de cuánto esperar y vuelve a permitir al acabar la ventana", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: time.now });
    limiter.hit("a");
    time.advance(20_000);
    expect(limiter.hit("a")).toEqual({ allowed: false, retryAfterSeconds: 40 });
    time.advance(40_000);
    expect(limiter.hit("a").allowed).toBe(true);
  });

  it("es deslizante: las peticiones antiguas dejan de contar una a una", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 2, windowMs: 60_000, now: time.now });
    limiter.hit("a"); // t=0
    time.advance(30_000);
    limiter.hit("a"); // t=30s
    time.advance(31_000); // t=61s: la primera ya salió de la ventana
    expect(limiter.hit("a").allowed).toBe(true);
    expect(limiter.hit("a").allowed).toBe(false);
  });

  it("una petición bloqueada no alarga el bloqueo", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: time.now });
    limiter.hit("a");
    for (let index = 0; index < 10; index += 1) limiter.hit("a");
    time.advance(60_000);
    expect(limiter.hit("a").allowed).toBe(true);
  });
});
