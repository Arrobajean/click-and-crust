import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/ui/price";
import { fromPriceCents, hasSeveralFormats } from "@/lib/catalog";
import { ROUTES } from "@/lib/routes";
import type { Product } from "@/lib/types";

interface ProductTileProps {
  product: Product;
  sizes: string;
  priority?: boolean;
  /** Nivel del título: h2 si la rejilla cuelga del h1 de la página, h3 si está dentro de una sección con h2. */
  heading?: "h2" | "h3";
}

export function ProductTile({ product, sizes, priority = false, heading: Heading = "h3" }: ProductTileProps) {
  return (
    <Link href={ROUTES.product(product.slug)} className="group grid content-start gap-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-surface-2">
        {/* alt vacío: el nombre ya está en el texto del enlace */}
        <Image
          src={product.images[0] ?? ""}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <Heading className="font-display text-lg leading-tight">{product.name}</Heading>
        <Price cents={fromPriceCents(product)} from={hasSeveralFormats(product)} className="shrink-0 text-[15px]" />
      </div>
    </Link>
  );
}
