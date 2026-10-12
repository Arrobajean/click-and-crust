"use client";

import { Button, ButtonLink } from "@/components/ui/button";
import { CheckboxField, TextAreaField } from "@/components/ui/field";
import { OrderSummary } from "@/components/cart/order-summary";
import { useCheckout } from "@/hooks/use-checkout";
import { useIsClient } from "@/hooks/use-is-client";
import { menuUrl } from "@/lib/routes";
import { CustomerFields } from "./customer-fields";
import { PickupPicker } from "./pickup-picker";

export function CheckoutView() {
  const { cart, values, errors, formError, submitting, dates, slots, setField, submit } = useCheckout();
  const ready = useIsClient();

  if (!ready) return <div className="skeleton h-96 rounded-[var(--radius-media)]" aria-hidden />;

  if (cart.isEmpty && !submitting) {
    return (
      <div className="grid justify-items-start gap-4 rounded-[var(--radius-media)] bg-surface px-6 py-14 md:px-10">
        <h2 className="font-display text-2xl font-semibold">No hay nada que reservar</h2>
        <p className="max-w-[48ch] text-muted">Tu cesta está vacía. Elige algo de la carta para continuar.</p>
        <ButtonLink href={menuUrl()}>Ver la carta</ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="grid gap-12">
        <CustomerFields values={values} errors={errors} onChange={setField} />

        <PickupPicker
          dates={dates}
          date={values.date}
          time={values.time}
          status={slots.status}
          slots={slots.slots}
          slotsError={slots.error}
          errors={errors}
          onDate={(date) => setField("date", date)}
          onTime={(time) => setField("time", time)}
          onRetry={slots.retry}
        />

        <TextAreaField
          name="notes"
          label="Notas para la panadería (opcional)"
          hint="Máximo 300 caracteres."
          value={values.notes}
          error={errors.notes}
          onChange={(event) => setField("notes", event.target.value)}
        />

        {/* Campo trampa: invisible y fuera del orden de tabulación. Un humano nunca lo rellena. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="field-website">No rellenar</label>
          <input id="field-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => setField("website", event.target.value)} />
        </div>

        <CheckboxField
          name="consent"
          label="Entiendo que es una demostración: el pedido no se prepara ni se cobra, y mis datos se guardan solo en este navegador."
          checked={values.consent}
          error={errors.consent}
          onChange={(event) => setField("consent", event.target.checked)}
        />
      </div>

      <aside aria-label="Resumen del pedido" className="grid gap-6 rounded-[var(--radius-media)] bg-surface p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-2xl font-semibold">Tu pedido</h2>
        <OrderSummary lines={cart.lines} totalCents={cart.totalCents} />
        {formError && (
          <p role="alert" className="rounded-[var(--radius-field)] border border-danger p-3 text-sm">
            {formError}
          </p>
        )}
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Enviando..." : "Confirmar reserva"}
        </Button>
      </aside>
    </form>
  );
}
