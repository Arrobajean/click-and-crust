import Link from "next/link";
import { CATEGORIES } from "@/content/categories";
import { menuUrl } from "@/lib/routes";
import type { CategoryId } from "@/lib/types";

interface CatalogFiltersProps {
  active: CategoryId | null;
  query: string;
  counts: Record<CategoryId, number>;
  total: number;
}

const CHIP = "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[15px] transition-colors";

/** Categorías como enlaces: la URL es el estado, así que funciona sin JavaScript y se puede compartir. */
export function CatalogFilters({ active, query, counts, total }: CatalogFiltersProps) {
  const items = [{ id: null, name: "Todo", count: total }, ...CATEGORIES.map((category) => ({ id: category.id, name: category.name, count: counts[category.id] }))];

  return (
    <nav aria-label="Categorías de la carta">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.name}>
              <Link
                href={menuUrl({ category: item.id, query })}
                aria-current={isActive ? "page" : undefined}
                className={`${CHIP} ${isActive ? "border-accent bg-accent text-accent-ink" : "border-line hover:border-ink"}`}
              >
                {item.name}
                <span className="text-sm tabular-nums opacity-70">{item.count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
