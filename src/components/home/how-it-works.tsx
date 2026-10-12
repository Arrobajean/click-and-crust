import { Reveal } from "@/components/ui/reveal";
import { STEPS } from "@/content/home";

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="how-title" className="scroll-mt-16 bg-surface py-16 md:py-28">
      <div className="container-page">
        <Reveal>
          <h2 id="how-title" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Reservar es así de fácil
          </h2>
          <ol className="mt-12 grid gap-10 md:mt-16 md:gap-14">
            {STEPS.map((step) => (
              <li key={step.verb} className="grid gap-3 md:grid-cols-[1fr_1.2fr] md:items-baseline md:gap-10">
                <span className="font-display text-5xl font-semibold tracking-tight text-accent-text md:text-7xl">{step.verb}</span>
                <p className="max-w-[46ch] text-lg text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
