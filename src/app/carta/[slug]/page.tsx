import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { AddToCartPanel } from "@/components/shop/add-to-cart-panel";
import { ProductDetails } from "@/components/shop/product-details";
import { ProductGallery } from "@/components/shop/product-gallery";
import { RelatedProducts } from "@/components/shop/related-products";
import { getAllProducts, getCategory, getProduct } from "@/lib/catalog";
import { menuUrl, ROUTES } from "@/lib/routes";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { truncate } from "@/lib/text";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: truncate(product.description, 155),
    alternates: { canonical: ROUTES.product(product.slug) },
    openGraph: { images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: ROUTES.home },
          { name: "Carta", path: ROUTES.menu },
          { name: product.name, path: ROUTES.product(product.slug) },
        ])}
      />

      <div className="container-page grid gap-10 py-8 md:py-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery name={product.name} images={product.images} />
        </div>

        <div className="grid content-start gap-8">
          <div className="grid gap-4">
            <nav aria-label="Ruta de navegación" className="text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={ROUTES.menu} className="hover:text-ink hover:underline">
                    Carta
                  </Link>
                </li>
                {category && (
                  <li className="flex items-center gap-2">
                    <span aria-hidden>/</span>
                    <Link href={menuUrl({ category: category.id })} className="hover:text-ink hover:underline">
                      {category.name}
                    </Link>
                  </li>
                )}
              </ol>
            </nav>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">{product.name}</h1>
            <p className="max-w-[60ch] text-lg text-muted">{product.description}</p>
          </div>

          <AddToCartPanel product={product} />
          <ProductDetails product={product} />
        </div>
      </div>

      <RelatedProducts product={product} />
    </>
  );
}
