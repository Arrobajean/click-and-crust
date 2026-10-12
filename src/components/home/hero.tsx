import Image from "next/image";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { HERO } from "@/content/home";
import { menuUrl } from "@/lib/routes";

export function Hero() {
  return (
    <section className="container-page grid min-h-[calc(100dvh-4rem)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-14">
      <div className="grid gap-7">
        <h1 className="rise font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{HERO.title}</h1>
        <p className="rise max-w-[44ch] text-lg text-muted" style={{ "--delay": "120ms" } as CSSProperties}>
          {HERO.text}
        </p>
        <div className="rise flex flex-wrap gap-3" style={{ "--delay": "240ms" } as CSSProperties}>
          <ButtonLink href={menuUrl()}>Ver la carta</ButtonLink>
          <ButtonLink href="#como-funciona" variant="ghost">
            Cómo funciona
          </ButtonLink>
        </div>
      </div>

      <div className="settle relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-media)] bg-surface-2 lg:aspect-[4/5] lg:max-h-[min(76dvh,720px)]">
        <Image src={HERO.image} alt={HERO.imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-bottom" />
      </div>
    </section>
  );
}
