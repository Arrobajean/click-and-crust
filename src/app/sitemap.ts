import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/catalog";
import { ROUTES } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [ROUTES.home, ROUTES.menu, ROUTES.philosophy, ROUTES.notice].map((path) => ({ url: absoluteUrl(path) }));
  const products = getAllProducts().map((product) => ({ url: absoluteUrl(ROUTES.product(product.slug)) }));
  return [...pages, ...products];
}
