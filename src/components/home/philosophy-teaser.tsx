import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PHILOSOPHY_TEASER } from "@/content/home";
import { ROUTES } from "@/lib/routes";

export function PhilosophyTeaser() {
  const [first, second] = PHILOSOPHY_TEASER.images;

  return (
    <section aria-labelledby="philosophy-title" className="bg-surface py-16 md:py-28">
      <div className="container-page grid items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
        <Reveal className="grid content-start gap-6">
          <h2 id="philosophy-title" className="font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            {PHILOSOPHY_TEASER.title}
          </h2>
          <p className="max-w-[48ch] text-lg text-muted">{PHILOSOPHY_TEASER.text}</p>
          <ButtonLink href={ROUTES.philosophy} variant="ghost" className="w-fit">
            Leer más
          </ButtonLink>
        </Reveal>

        {/* Collage escalonado: la segunda foto baja para romper la simetría. */}
        <Reveal delay={0.1} className="grid grid-cols-2 gap-4 md:gap-6">
          {first && (
            <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-media)] bg-surface-2">
              <Image src={first.src} alt={first.alt} fill sizes="(min-width: 768px) 24vw, 46vw" className="object-cover object-bottom" />
            </div>
          )}
          {second && (
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[var(--radius-media)] bg-surface-2 md:mt-16">
              <Image src={second.src} alt={second.alt} fill sizes="(min-width: 768px) 24vw, 46vw" className="object-cover object-bottom" />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
