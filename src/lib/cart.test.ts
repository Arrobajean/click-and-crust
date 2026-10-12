import { describe, expect, it } from "vitest";
import { EMPTY_CART, MAX_LINES, MAX_QUANTITY, addToCart, cartItemCount, lineKey, removeLine, setLineQuantity } from "./cart";
import type { CartLine } from "./types";

const payes = (quantity = 1, cut: string | null = "Entero"): CartLine => ({ slug: "pan-de-payes", formatId: "pieza", cut, quantity });

describe("lineKey", () => {
  it("distingue producto, formato y corte", () => {
    expect(lineKey(payes())).not.toBe(lineKey(payes(1, "Rebanado")));
    expect(lineKey({ slug: "a", formatId: "x", cut: null })).not.toBe(lineKey({ slug: "a", formatId: "y", cut: null }));
  });
});

describe("addToCart", () => {
  it("añade una línea nueva sin mutar la cesta original", () => {
    const next = addToCart(EMPTY_CART, payes(2));
    expect(next.lines).toEqual([payes(2)]);
    expect(EMPTY_CART.lines).toEqual([]);
  });

  it("suma cantidades si la línea ya existe", () => {
    const cart = addToCart(addToCart(EMPTY_CART, payes(2)), payes(3));
    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0]?.quantity).toBe(5);
  });

  it("trata cortes distintos como líneas distintas", () => {
    const cart = addToCart(addToCart(EMPTY_CART, payes(1, "Entero")), payes(1, "Rebanado"));
    expect(cart.lines).toHaveLength(2);
  });

  it("limita la cantidad máxima, también al sumar", () => {
    expect(addToCart(EMPTY_CART, payes(999)).lines[0]?.quantity).toBe(MAX_QUANTITY);
    const cart = addToCart(addToCart(EMPTY_CART, payes(MAX_QUANTITY - 1)), payes(5));
    expect(cart.lines[0]?.quantity).toBe(MAX_QUANTITY);
  });

  it("no pasa del máximo de líneas distintas", () => {
    let cart = EMPTY_CART;
    for (let index = 0; index < MAX_LINES + 5; index += 1) {
      cart = addToCart(cart, { slug: `producto-${index}`, formatId: "pieza", cut: null, quantity: 1 });
    }
    expect(cart.lines).toHaveLength(MAX_LINES);
  });
});

describe("setLineQuantity y removeLine", () => {
  const cart = addToCart(EMPTY_CART, payes(2));
  const key = lineKey(payes());

  it("cambia la cantidad de la línea indicada", () => {
    expect(setLineQuantity(cart, key, 7).lines[0]?.quantity).toBe(7);
  });

  it("cantidad 0 o negativa elimina la línea", () => {
    expect(setLineQuantity(cart, key, 0).lines).toEqual([]);
    expect(setLineQuantity(cart, key, -3).lines).toEqual([]);
  });

  it("ignora una clave inexistente", () => {
    expect(setLineQuantity(cart, "no-existe", 9)).toEqual(cart);
    expect(removeLine(cart, "no-existe")).toEqual(cart);
  });

  it("removeLine elimina solo esa línea", () => {
    const two = addToCart(cart, payes(1, "Rebanado"));
    expect(removeLine(two, key).lines).toEqual([payes(1, "Rebanado")]);
  });
});

describe("cartItemCount", () => {
  it("suma unidades, no líneas", () => {
    const cart = addToCart(addToCart(EMPTY_CART, payes(2)), { slug: "bizcocho-cacao", formatId: "rebanada", cut: null, quantity: 3 });
    expect(cartItemCount(cart)).toBe(5);
    expect(cartItemCount(EMPTY_CART)).toBe(0);
  });
});
