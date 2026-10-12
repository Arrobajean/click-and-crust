import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { PHILOSOPHY } from "@/content/philosophy";
import { menuUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: PHILOSOPHY.title,
  description: PHILOSOPHY.intro,
  alternates: { canonical: "/filosofia" },
};

export default function PhilosophyPage() {
  const [first, second] = PHILOSOPHY.images;

  return (
    <div className="container-page grid gap-14 py-12 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
      <div className="grid content-start gap-12">
        <header className="grid gap-4">
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">{PHILOSOPHY.title}</h1>
          <p className="max-w-[40ch] text-xl text-muted">{PHILOSOPHY.intro}</p>
        </header>

        <div className="grid gap-10">
          {PHILOSOPHY.sections.map((section) => (
            <section key={section.title} className="grid gap-2">
              <h2 className="font-display text-2xl font-semibold">{section.title}</h2>
              <p className="max-w-[56ch] text-lg text-muted">{section.text}</p>
            </section>
          ))}
        </div>

        <ButtonLink href={menuUrl()} className="w-fit">
          Ver la carta
        </ButtonLink>
      </div>

      <div className="grid content-start gap-6 sm:grid-cols-2 lg:sticky lg:top-24 lg:grid-cols-1 lg:self-start">
        {first && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-surface-2">
            <Image src={first.src} alt={first.alt} fill sizes="(min-width: 1024px) 38vw, 50vw" className="object-cover object-bottom" />
          </div>
        )}
        {second && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-surface-2">
            <Image src={second.src} alt={second.alt} fill sizes="(min-width: 1024px) 38vw, 50vw" className="object-cover object-bottom" />
          </div>
        )}
      </div>
    </div>
  );
}
