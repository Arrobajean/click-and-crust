import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

interface DisclosureProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/** Bloque desplegable nativo (<details>): funciona sin JavaScript y con teclado. */
export function Disclosure({ title, children, defaultOpen = false }: DisclosureProps) {
  return (
    <details className="group py-5" open={defaultOpen}>
      <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-display text-lg font-medium">
        {title}
        <CaretDown size={18} aria-hidden className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="mt-3 max-w-[65ch] text-muted">{children}</div>
    </details>
  );
}
