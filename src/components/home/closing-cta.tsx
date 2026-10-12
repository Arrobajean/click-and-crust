import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CLOSING } from "@/content/home";
import { menuUrl } from "@/lib/routes";

export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="container-page pb-20 md:pb-28">
      <Reveal className="grid gap-8 rounded-[var(--radius-media)] bg-accent px-6 py-14 text-accent-ink md:grid-cols-[1.4fr_1fr] md:items-center md:px-14 md:py-20">
        <h2 id="closing-title" className="font-display text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
          {CLOSING.title}
        </h2>
        <div className="md:justify-self-end">
          <ButtonLink href={menuUrl()} variant="ink">
            Ver la carta
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
