import { describe, expect, it, vi } from "vitest";
import { createPersistentStore } from "./persistent-store";

interface Counter {
  value: number;
}

const EMPTY: Counter = { value: 0 };
const parse = (raw: unknown): Counter | null =>
  typeof raw === "object" && raw !== null && typeof (raw as Counter).value === "number" ? (raw as Counter) : null;

function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  };
}

const create = (storage = fakeStorage()) => ({ storage, store: createPersistentStore({ key: "k", empty: EMPTY, parse, storage: () => storage }) });

describe("createPersistentStore", () => {
  it("parte del valor vacío si no hay nada guardado", () => {
    expect(create().store.getSnapshot()).toBe(EMPTY);
  });

  it("lee y valida lo guardado", () => {
    const { store } = create(fakeStorage({ k: JSON.stringify({ value: 7 }) }));
    expect(store.getSnapshot()).toEqual({ value: 7 });
  });

  it.each([["JSON roto", "{no es json"], ["forma incorrecta", JSON.stringify({ value: "texto" })]])("ignora datos corruptos (%s)", (_name, raw) => {
    expect(create(fakeStorage({ k: raw })).store.getSnapshot()).toBe(EMPTY);
  });

  it("devuelve la misma referencia mientras no cambie, requisito de useSyncExternalStore", () => {
    const { store } = create(fakeStorage({ k: JSON.stringify({ value: 1 }) }));
    expect(store.getSnapshot()).toBe(store.getSnapshot());
  });

  it("set persiste, actualiza el snapshot y notifica a los suscriptores", () => {
    const { store, storage } = create();
    const listener = vi.fn();
    store.subscribe(listener);
    store.set({ value: 3 });
    expect(store.getSnapshot()).toEqual({ value: 3 });
    expect(JSON.parse(storage.data.get("k") ?? "null")).toEqual({ value: 3 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("update recibe el valor anterior y funciona suelto, sin `this`", () => {
    const { store } = create();
    const { update } = store;
    update((previous) => ({ value: previous.value + 1 }));
    update((previous) => ({ value: previous.value + 1 }));
    expect(store.getSnapshot()).toEqual({ value: 2 });
  });

  it("deja de notificar tras darse de baja", () => {
    const { store } = create();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.set({ value: 1 });
    expect(listener).not.toHaveBeenCalled();
  });

  it("el snapshot de servidor es siempre el valor vacío", () => {
    const { store } = create(fakeStorage({ k: JSON.stringify({ value: 9 }) }));
    expect(store.getServerSnapshot()).toBe(EMPTY);
  });

  it("si el almacenamiento falla al escribir, el estado sigue funcionando en memoria", () => {
    const failing = { getItem: () => null, setItem: () => { throw new Error("QuotaExceededError"); } };
    const store = createPersistentStore({ key: "k", empty: EMPTY, parse, storage: () => failing });
    expect(() => store.set({ value: 5 })).not.toThrow();
    expect(store.getSnapshot()).toEqual({ value: 5 });
  });

  it("sin almacenamiento disponible (servidor o acceso bloqueado) devuelve el vacío", () => {
    const store = createPersistentStore({ key: "k", empty: EMPTY, parse, storage: () => null });
    expect(store.getSnapshot()).toBe(EMPTY);
  });
});
