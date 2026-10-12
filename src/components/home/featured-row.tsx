import { ProductTile } from "@/components/shop/product-tile";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getFeatured } from "@/lib/catalog";
import { menuUrl } from "@/lib/routes";

export function FeaturedRow() {
  const products = getFeatured();

  return (
    <section aria-labelledby="featured-title" className="py-16 md:py-24">
      <Reveal>
        <div className="container-page flex items-end justify-between gap-6">
          <h2 id="featured-title" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Los favoritos de la casa
          </h2>
          <ButtonLink href={menuUrl()} variant="ghost" className="hidden sm:inline-flex">
            Ver la carta
          </ButtonLink>
        </div>

        {/* Región enfocable: sin ella el scroll horizontal no se puede usar con teclado. */}
        <div role="region" aria-label="Productos destacados" tabIndex={0} className="snap-row container-page mt-8 snap-x snap-mandatory overflow-x-auto pb-4">
          <ul className="flex gap-4 md:gap-6">
            {products.map((product) => (
              <li key={product.slug} className="w-[64vw] shrink-0 snap-start sm:w-[290px]">
                <ProductTile product={product} sizes="(min-width: 640px) 290px, 64vw" />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
