import { getRelated } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { ProductTile } from "./product-tile";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelated(product);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="container-page py-16 md:py-24">
      <h2 id="related-title" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Combina bien con
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {related.map((item) => (
          <li key={item.slug}>
            <ProductTile product={item} sizes="(min-width: 768px) 22vw, 46vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
