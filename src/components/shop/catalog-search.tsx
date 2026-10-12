"use client";

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useCatalogSearch } from "@/hooks/use-catalog-search";

export function CatalogSearch({ initial }: { initial: string }) {
  const { value, change, pending } = useCatalogSearch(initial);

  return (
    <div className="grid gap-2">
      <label htmlFor="field-q" className="text-sm font-medium">
        Buscar en la carta
      </label>
      <div className="relative">
        <MagnifyingGlass size={18} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          id="field-q"
          type="search"
          name="q"
          value={value}
          onChange={(event) => change(event.target.value)}
          placeholder="Espelta, croissant, plumcake"
          autoComplete="off"
          className="h-12 w-full rounded-[var(--radius-field)] border border-line bg-surface pl-11 pr-4 text-ink placeholder:text-muted focus-visible:border-ink"
        />
      </div>
      <p className="min-h-5 text-sm text-muted" role="status">
        {pending ? "Buscando..." : ""}
      </p>
    </div>
  );
}
