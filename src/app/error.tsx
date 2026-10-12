"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page grid justify-items-start gap-5 py-24" role="alert">
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Algo ha fallado</h1>
      <p className="max-w-[48ch] text-lg text-muted">No hemos podido cargar esta página. Inténtalo de nuevo; tu cesta sigue guardada.</p>
      <Button onClick={reset}>Reintentar</Button>
    </div>
  );
}
