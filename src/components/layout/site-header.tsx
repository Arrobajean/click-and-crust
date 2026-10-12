import Link from "next/link";
import { SITE } from "@/content/site";
import { ROUTES } from "@/lib/routes";
import { CartButton } from "./cart-button";
import { ThemeToggle } from "./theme-toggle";

// "Filosofía" se oculta en pantallas muy estrechas para que quepa la marca; sigue en el pie.
const NAV = [
  { label: "Carta", href: ROUTES.menu, className: "" },
  { label: "Filosofía", href: ROUTES.philosophy, className: "hidden sm:inline-flex" },
] as const;

const LINK = "inline-flex min-h-11 items-center rounded-full px-4 text-[15px] transition-colors hover:bg-surface-2";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-line bg-bg">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href={ROUTES.home} className="whitespace-nowrap font-display text-xl font-semibold tracking-tight">
          {SITE.name}
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-1">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={`${LINK} ${item.className}`}>
              {item.label}
            </Link>
          ))}
          <CartButton />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
