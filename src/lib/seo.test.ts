import { describe, expect, it } from "vitest";
import { getProduct } from "./catalog";
import { absoluteUrl, bakeryJsonLd, breadcrumbJsonLd, productJsonLd } from "./seo";

describe("absoluteUrl", () => {
  it("antepone el dominio con o sin barra inicial", () => {
    expect(absoluteUrl("/carta")).toBe("http://localhost:3000/carta");
    expect(absoluteUrl("carta")).toBe("http://localhost:3000/carta");
  });
});

describe("productJsonLd", () => {
  it("un solo formato produce un Offer con precio decimal", () => {
    const json = productJsonLd(getProduct("pan-de-payes")!);
    expect(json["@type"]).toBe("Product");
    expect(json.offers).toMatchObject({ "@type": "Offer", priceCurrency: "EUR", price: "4.99" });
    expect(json.image[0]).toBe("http://localhost:3000/images/products/pan-de-payes-1.webp");
  });

  it("varios formatos producen un AggregateOffer con mínimo, máximo y cantidad", () => {
    const json = productJsonLd(getProduct("palmera-de-mantequilla")!);
    expect(json.offers).toMatchObject({ "@type": "AggregateOffer", lowPrice: "2.65", highPrice: "14.00", offerCount: 3 });
  });
});

describe("bakeryJsonLd", () => {
  it("deriva el horario de la misma fuente que las franjas", () => {
    const { openingHoursSpecification } = bakeryJsonLd();
    // 5 días laborables x 2 tramos + sábado x 1 tramo = 11 tramos
    expect(openingHoursSpecification).toHaveLength(11);
    expect(openingHoursSpecification).toContainEqual({ "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" });
    expect(openingHoursSpecification.some((item) => item.dayOfWeek === "Sunday")).toBe(false);
  });
});

describe("breadcrumbJsonLd", () => {
  it("numera las posiciones desde 1", () => {
    const json = breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Carta", path: "/carta" }]);
    expect(json.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    expect(json.itemListElement[1]?.item).toBe("http://localhost:3000/carta");
  });
});
