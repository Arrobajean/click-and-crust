"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { ApiError, submitOrder } from "@/lib/api";
import { EMPTY_CHECKOUT, toOrderRequest, validateCheckout, type CheckoutValues } from "@/lib/checkout";
import { focusFirstInvalid } from "@/lib/dom";
import { saveReceipt } from "@/lib/receipt-store";
import { ROUTES } from "@/lib/routes";
import type { FieldErrors } from "@/lib/schemas";
import { bookableDates } from "@/lib/slots";
import { useCart } from "./use-cart";
import { useIsClient } from "./use-is-client";
import { usePickupSlots } from "./use-pickup-slots";

/** Estado y envío del formulario de reserva. */
export function useCheckout() {
  const router = useRouter();
  const cart = useCart();
  const isClient = useIsClient();
  const [values, setValues] = useState<CheckoutValues>(EMPTY_CHECKOUT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const slots = usePickupSlots(values.date);

  // Los días se calculan en el navegador tras hidratar; el servidor vuelve a validar la franja.
  const dates = useMemo(() => (isClient ? bookableDates(new Date()) : []), [isClient]);

  function setField<K extends keyof CheckoutValues>(field: K, value: CheckoutValues[K]) {
    // Cambiar de día invalida la hora elegida.
    setValues((previous) => (field === "date" ? { ...previous, date: String(value), time: "" } : { ...previous, [field]: value }));
    setErrors((previous) => Object.fromEntries(Object.entries(previous).filter(([key]) => key !== field)));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const found = validateCheckout(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      focusFirstInvalid(found);
      return;
    }

    setSubmitting(true);
    setFormError("");
    try {
      const { order } = await submitOrder(toOrderRequest(values, cart.lines));
      saveReceipt(order);
      cart.clear();
      router.push(ROUTES.order(order.id));
    } catch (error) {
      setSubmitting(false);
      if (error instanceof ApiError && error.field === "pickup") {
        setErrors({ time: error.message });
        slots.retry(); // el aforo pudo cambiar mientras rellenaba el formulario
        focusFirstInvalid({ time: error.message });
      } else {
        setFormError(error instanceof Error ? error.message : "No se pudo enviar el pedido. Inténtalo de nuevo.");
      }
    }
  }

  return { cart, values, errors, formError, submitting, dates, slots, setField, submit };
}
