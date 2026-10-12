import Link from "next/link";
import { SITE } from "@/content/site";
import { summarizeHours } from "@/lib/hours";
import { ROUTES } from "@/lib/routes";

export function SiteFooter() {
  const hours = summarizeHours();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="grid content-start gap-3">
          <p className="font-display text-2xl font-semibold tracking-tight">{SITE.name}</p>
          <p className="max-w-[40ch] text-muted">Proyecto de demostración: los pedidos no se preparan ni se cobran.</p>
        </div>

        <div className="grid content-start gap-3">
          <h2 className="font-display text-lg font-semibold">Horario de recogida</h2>
          <dl className="grid gap-2 text-sm">
            {hours.map((row) => (
              <div key={row.days}>
                <dt className="text-muted">{row.days}</dt>
                <dd>{row.hours}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Pie de página" className="grid content-start gap-3">
          <h2 className="font-display text-lg font-semibold">Enlaces</h2>
          <ul className="grid gap-2 text-sm">
            <li><Link href={ROUTES.menu} className="hover:underline">Carta</Link></li>
            <li><Link href={ROUTES.philosophy} className="hover:underline">Filosofía</Link></li>
            <li><Link href={ROUTES.notice} className="hover:underline">Aviso sobre esta demo</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
