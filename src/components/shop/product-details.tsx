import { Disclosure } from "@/components/ui/disclosure";
import type { Product } from "@/lib/types";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      <Disclosure title="Ingredientes y alérgenos" defaultOpen>
        <p>{product.ingredients}</p>
        <p className="mt-3 text-ink">
          <strong className="font-semibold">Contiene:</strong> {product.allergens.join(", ")}.
        </p>
      </Disclosure>
      <Disclosure title="Cómo conservarlo">
        <p>{product.storage}</p>
      </Disclosure>
      <Disclosure title="Cómo tomarlo">
        <p>{product.pairing}</p>
      </Disclosure>
    </div>
  );
}
