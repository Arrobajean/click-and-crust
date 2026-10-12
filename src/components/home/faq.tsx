import { Disclosure } from "@/components/ui/disclosure";
import { Reveal } from "@/components/ui/reveal";
import { FAQ } from "@/content/faq";

export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="container-page scroll-mt-16 py-16 md:py-24">
      <Reveal className="mx-auto max-w-3xl">
        <h2 id="faq-title" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {FAQ.map((item) => (
            <Disclosure key={item.question} title={item.question}>
              <p>{item.answer}</p>
            </Disclosure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
