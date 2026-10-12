import { CategoriesBento } from "@/components/home/categories-bento";
import { ClosingCta } from "@/components/home/closing-cta";
import { Faq } from "@/components/home/faq";
import { FeaturedRow } from "@/components/home/featured-row";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { PhilosophyTeaser } from "@/components/home/philosophy-teaser";
import { JsonLd } from "@/components/seo/json-ld";
import { bakeryJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={bakeryJsonLd()} />
      <Hero />
      <FeaturedRow />
      <HowItWorks />
      <CategoriesBento />
      <PhilosophyTeaser />
      <Faq />
      <ClosingCta />
    </>
  );
}
