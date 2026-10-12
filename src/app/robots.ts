import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/cesta", "/reservar", "/pedido/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
