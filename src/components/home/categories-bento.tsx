import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/content/categories";
import { Reveal } from "@/components/ui/reveal";
import { countByCategory, getAllProducts } from "@/lib/catalog";
import { menuUrl } from "@/lib/routes";

// Cuatro categorías, cuatro celdas: 7+5 arriba y 5+7 abajo para que la rejilla tenga ritmo.
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"] as const;

export function CategoriesBento() {
  const counts = countByCategory(getAllProducts());

  return (
    <section aria-labelledby="categories-title" className="container-page py-16 md:py-24">
      <Reveal>
        <h2 id="categories-title" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
          Qué hay en la carta
        </h2>
        <ul className="mt-10 grid gap-4 md:auto-rows-[340px] md:grid-cols-12">
          {CATEGORIES.map((category, index) => (
            <li key={category.id} className={SPANS[index]}>
              <Link href={menuUrl({ category: category.id })} className="group relative block h-full min-h-[280px] overflow-hidden rounded-[var(--radius-media)] bg-surface-2">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  style={{ objectPosition: category.imagePosition }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 grid gap-1 p-6 text-white">
                  <h3 className="font-display text-2xl font-semibold">{category.name}</h3>
                  <p className="max-w-[38ch] text-sm text-white/85">{category.description}</p>
                  <p className="text-sm tabular-nums text-white/85">{counts[category.id]} productos</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
