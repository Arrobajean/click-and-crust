"use client";

import { OrderSummary } from "@/components/cart/order-summary";
import { ButtonLink } from "@/components/ui/button";
import { useReceipt } from "@/hooks/use-receipt";
import { capitalize, formatLongDate } from "@/lib/dates";
import { menuUrl } from "@/lib/routes";

export function OrderReceipt({ id }: { id: string }) {
  const { ready, order } = useReceipt(id);

  if (!ready) return <div className="skeleton h-72 rounded-[var(--radius-media)]" aria-hidden />;

  if (!order) {
    return (
      <div className="grid justify-items-start gap-4 rounded-[var(--radius-media)] bg-surface px-6 py-14 md:px-10" data-testid="receipt-missing">
        <h2 className="font-display text-2xl font-semibold">No encontramos este pedido</h2>
        <p className="max-w-[52ch] text-muted">
          Los justificantes de esta demostración se guardan solo en el navegador donde se hizo la reserva. Si cambiaste de navegador o borraste los datos, ya no están.
        </p>
        <ButtonLink href={menuUrl()}>Ver la carta</ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start" data-testid="receipt">
      <div className="grid gap-8">
        <div className="grid gap-3">
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">Reserva registrada</h1>
          <p className="text-lg text-muted">
            Número de pedido <strong className="font-semibold text-ink" data-testid="order-id">{order.id}</strong>
          </p>
        </div>

        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Recogida</dt>
            <dd className="font-display text-xl font-medium" data-testid="receipt-pickup">
              {capitalize(formatLongDate(order.pickup.date))}, {order.pickup.time}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">A nombre de</dt>
            <dd className="font-display text-xl font-medium">{order.customer.name}</dd>
          </div>
          {order.notes && (
            <div className="sm:col-span-2">
              <dt className="text-sm text-muted">Tus notas</dt>
              <dd>{order.notes}</dd>
            </div>
          )}
        </dl>

        <p className="max-w-[56ch] rounded-[var(--radius-field)] border border-line p-4 text-sm text-muted">
          Esto es una demostración: no se envía ningún correo, el pedido no se prepara y no se cobra nada.
        </p>

        <ButtonLink href={menuUrl()} variant="ghost" className="w-fit">
          Ver la carta
        </ButtonLink>
      </div>

      <aside aria-label="Resumen del pedido" className="rounded-[var(--radius-media)] bg-surface p-6">
        <OrderSummary lines={order.lines} totalCents={order.totalCents} />
      </aside>
    </div>
  );
}
