import { CATEGORIES } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import type { CategoryId, Product, ProductFormat } from "./types";

const bySlug = new Map(PRODUCTS.map((product) => [product.slug, product]));

export function getAllProducts(): readonly Product[] {
  return PRODUCTS;
}

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getFormat(product: Product, formatId: string): ProductFormat | undefined {
  return product.formats.find((format) => format.id === formatId);
}

export function getCategory(id: string) {
  return CATEGORIES.find((category) => category.id === id);
}

export function isCategoryId(value: string): value is CategoryId {
  return CATEGORIES.some((category) => category.id === value);
}

/** Precio más bajo entre los formatos: el "desde" que se muestra en listados. */
export function fromPriceCents(product: Product): number {
  return Math.min(...product.formats.map((format) => format.priceCents));
}

export function hasSeveralFormats(product: Product): boolean {
  return product.formats.length > 1;
}

export function getFeatured(): readonly Product[] {
  return PRODUCTS.filter((product) => product.featured);
}

export function getRelated(product: Product): readonly Product[] {
  return product.related.map((slug) => bySlug.get(slug)).filter((item): item is Product => item !== undefined);
}

/** Minúsculas y sin tildes, para que "bolleria" encuentre "Bollería". */
export function normalizeText(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

export interface CatalogFilter {
  category: CategoryId | null;
  query: string;
}

export function filterProducts(products: readonly Product[], { category, query }: CatalogFilter): readonly Product[] {
  const needle = normalizeText(query);
  return products.filter((product) => {
    if (category && product.category !== category) return false;
    if (!needle) return true;
    return normalizeText(`${product.name} ${product.description}`).includes(needle);
  });
}

export function countByCategory(products: readonly Product[]): Record<CategoryId, number> {
  const counts: Record<CategoryId, number> = { panes: 0, molde: 0, bolleria: 0, dulces: 0 };
  for (const product of products) counts[product.category] += 1;
  return counts;
}
