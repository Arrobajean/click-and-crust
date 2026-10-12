import { ButtonLink } from "@/components/ui/button";
import { menuUrl, ROUTES } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="container-page grid justify-items-start gap-5 py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Esta página no existe</h1>
      <p className="max-w-[48ch] text-lg text-muted">Puede que el enlace esté mal escrito o que el producto ya no esté en la carta.</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={menuUrl()}>Ver la carta</ButtonLink>
        <ButtonLink href={ROUTES.home} variant="ghost">
          Ir al inicio
        </ButtonLink>
      </div>
    </div>
  );
}
