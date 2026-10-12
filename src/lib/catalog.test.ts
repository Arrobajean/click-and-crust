import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CATEGORIES } from "@/content/categories";
import {
  countByCategory,
  filterProducts,
  fromPriceCents,
  getAllProducts,
  getFeatured,
  getProduct,
  getRelated,
  isCategoryId,
  normalizeText,
} from "./catalog";

const products = getAllProducts();
const publicFile = (url: string) => path.join(process.cwd(), "public", url);

// Un catálogo editado a mano se rompe en silencio: estas pruebas lo vigilan.
describe("integridad del contenido", () => {
  it("hay 28 productos con slugs únicos en minúsculas", () => {
    expect(products).toHaveLength(28);
    const slugs = products.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("cada producto tiene fotos y todos los ficheros existen", () => {
    for (const product of products) {
      expect(product.images.length, product.slug).toBeGreaterThan(0);
      for (const image of product.images) expect(existsSync(publicFile(image)), image).toBe(true);
    }
  });

  it("las imágenes de las categorías existen", () => {
    for (const category of CATEGORIES) expect(existsSync(publicFile(category.image)), category.image).toBe(true);
  });

  it("los precios son enteros positivos y los formatos tienen ids únicos", () => {
    for (const product of products) {
      expect(product.formats.length, product.slug).toBeGreaterThan(0);
      expect(new Set(product.formats.map((format) => format.id)).size, product.slug).toBe(product.formats.length);
      for (const format of product.formats) {
        expect(Number.isInteger(format.priceCents), `${product.slug}/${format.id}`).toBe(true);
        expect(format.priceCents, `${product.slug}/${format.id}`).toBeGreaterThan(0);
        expect(format.id, product.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      }
    }
  });

  it("los cortes son 0 o al menos 2 opciones (con una sola no hay nada que elegir)", () => {
    for (const product of products) expect(product.cuts.length === 0 || product.cuts.length >= 2, product.slug).toBe(true);
  });

  it("los relacionados existen y ninguno se apunta a sí mismo", () => {
    for (const product of products) {
      for (const slug of product.related) {
        expect(getProduct(slug), `${product.slug} -> ${slug}`).toBeDefined();
        expect(slug).not.toBe(product.slug);
      }
    }
  });

  it("cada producto pertenece a una categoría válida y cada categoría tiene productos", () => {
    for (const product of products) expect(isCategoryId(product.category), product.slug).toBe(true);
    for (const category of CATEGORIES) expect(countByCategory(products)[category.id], category.id).toBeGreaterThan(0);
  });

  it("todo producto declara alérgenos e ingredientes", () => {
    for (const product of products) {
      expect(product.allergens.length, product.slug).toBeGreaterThan(0);
      expect(product.ingredients.length, product.slug).toBeGreaterThan(10);
    }
  });

  it("hay entre 4 y 8 productos destacados para la portada", () => {
    expect(getFeatured().length).toBeGreaterThanOrEqual(4);
    expect(getFeatured().length).toBeLessThanOrEqual(8);
  });
});

describe("consultas", () => {
  it("getProduct devuelve undefined si no existe", () => {
    expect(getProduct("pan-de-payes")?.name).toBe("Pan de Payés");
    expect(getProduct("nada")).toBeUndefined();
  });

  it("fromPriceCents devuelve el formato más barato", () => {
    expect(fromPriceCents(getProduct("rosquillas-de-anis")!)).toBe(250);
    expect(fromPriceCents(getProduct("pan-de-payes")!)).toBe(499);
  });

  it("getRelated devuelve productos reales", () => {
    const related = getRelated(getProduct("pan-de-payes")!);
    expect(related.map((item) => item.slug)).toEqual(["hogaza-integral", "pan-de-espelta", "pan-de-semillas"]);
  });
});

describe("filterProducts", () => {
  it("sin filtros devuelve todo", () => {
    expect(filterProducts(products, { category: null, query: "" })).toHaveLength(28);
  });

  it("filtra por categoría", () => {
    const result = filterProducts(products, { category: "molde", query: "" });
    expect(result.map((product) => product.slug).sort()).toEqual(["molde-de-semillas", "pan-de-hamburguesa", "viena-molde"]);
  });

  it("la búsqueda ignora mayúsculas y tildes", () => {
    expect(filterProducts(products, { category: null, query: "PAYES" }).map((product) => product.slug)).toContain("pan-de-payes");
    expect(filterProducts(products, { category: null, query: "  espelta " }).length).toBeGreaterThan(1);
  });

  it("combina categoría y texto", () => {
    const result = filterProducts(products, { category: "bolleria", query: "chocolate" });
    expect(result.length).toBeGreaterThan(0);
    for (const product of result) expect(product.category).toBe("bolleria");
  });

  it("devuelve vacío si nada coincide", () => {
    expect(filterProducts(products, { category: null, query: "zzzz" })).toEqual([]);
  });
});

describe("normalizeText", () => {
  it("quita tildes y pasa a minúsculas", () => {
    expect(normalizeText("  Bollería Ñandú ")).toBe("bolleria nandu");
  });
});
