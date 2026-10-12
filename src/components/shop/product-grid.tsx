import { ButtonLink } from "@/components/ui/button";
import { menuUrl } from "@/lib/routes";
import type { Product } from "@/lib/types";
import { ProductTile } from "./product-tile";

const GRID_SIZES = "(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw";

export function ProductGrid({ products }: { products: readonly Product[] }) {
  if (products.length === 0) {
    return (
      <div className="grid justify-items-start gap-4 rounded-[var(--radius-media)] bg-surface px-6 py-14 md:px-10" data-testid="empty-results">
        <h2 className="font-display text-2xl font-semibold">No hay nada con ese nombre</h2>
        <p className="max-w-[48ch] text-muted">Prueba con otra palabra, por ejemplo «espelta» o «croissant», o vuelve a ver toda la carta.</p>
        <ButtonLink href={menuUrl()} variant="ghost">
          Quitar filtros
        </ButtonLink>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      {products.map((product, index) => (
        <li key={product.slug}>
          <ProductTile product={product} sizes={GRID_SIZES} priority={index < 4} />
        </li>
      ))}
    </ul>
  );
}
