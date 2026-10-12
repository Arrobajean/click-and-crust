import { OPENING_HOURS } from "@/content/hours";
import { SITE } from "@/content/site";
import { toDecimalString } from "./money";
import { ROUTES } from "./routes";
import type { Product } from "./types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const SCHEMA_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export function bakeryJsonLd() {
  const openingHoursSpecification = Object.entries(OPENING_HOURS).flatMap(([day, intervals]) =>
    intervals.map(([opens, closes]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAYS[Number(day)],
      opens,
      closes,
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: SITE.name,
    description: SITE.description,
    url: SITE_URL,
    image: absoluteUrl("/opengraph-image"),
    openingHoursSpecification,
  };
}

export function productJsonLd(product: Product) {
  const prices = product.formats.map((format) => format.priceCents);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const availability = "https://schema.org/InStock";

  const offers =
    low === high
      ? { "@type": "Offer", priceCurrency: "EUR", price: toDecimalString(low), availability }
      : { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: toDecimalString(low), highPrice: toDecimalString(high), offerCount: prices.length, availability };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map(absoluteUrl),
    url: absoluteUrl(ROUTES.product(product.slug)),
    offers,
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
