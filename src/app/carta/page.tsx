import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogFilters } from "@/components/shop/catalog-filters";
import { CatalogSearch } from "@/components/shop/catalog-search";
import { ProductGrid } from "@/components/shop/product-grid";
import { countByCategory, filterProducts, getAllProducts, isCategoryId } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "La carta",
  description: "Panes de masa madre, bollería, bizcochos y galletas. Elige, reserva y recoge.",
  alternates: { canonical: "/carta" },
};

type SearchParams = Promise<{ categoria?: string | string[]; q?: string | string[] }>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export default async function MenuPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requested = first(params.categoria);
  const category = isCategoryId(requested) ? requested : null;
  const query = first(params.q);

  const all = getAllProducts();
  const results = filterProducts(all, { category, query });

  return (
    <div className="container-page py-12 md:py-16">
      <header className="grid gap-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">La carta</h1>
        <p role="status" className="text-muted" data-testid="results-count">
          {results.length} {results.length === 1 ? "producto" : "productos"}
        </p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,420px)_1fr] md:items-start md:gap-10">
        <Suspense fallback={<div className="skeleton h-[88px] rounded-[var(--radius-field)]" aria-hidden />}>
          <CatalogSearch initial={query} />
        </Suspense>
        <div className="md:pt-7">
          <CatalogFilters active={category} query={query} counts={countByCategory(all)} total={all.length} />
        </div>
      </div>

      <div className="mt-10">
        <ProductGrid products={results} />
      </div>
    </div>
  );
}
