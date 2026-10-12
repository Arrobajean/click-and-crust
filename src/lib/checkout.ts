import { z } from "zod";
import {
  dateSchema,
  emailSchema,
  nameSchema,
  notesSchema,
  phoneSchema,
  timeSchema,
  toFieldErrors,
  type FieldErrors,
  type OrderRequest,
} from "./schemas";
import type { CartLine } from "./types";

/** Valores planos del formulario de reserva. */
export interface CheckoutValues {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  notes: string;
  consent: boolean;
  /** Campo trampa: debe quedar vacío. */
  website: string;
}

export const EMPTY_CHECKOUT: CheckoutValues = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  notes: "",
  consent: false,
  website: "",
};

const checkoutSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  date: dateSchema,
  time: timeSchema,
  notes: notesSchema,
  consent: z.boolean().refine((value) => value, "Debes aceptar para continuar."),
});

export function validateCheckout(values: CheckoutValues): FieldErrors {
  const result = checkoutSchema.safeParse(values);
  return result.success ? {} : toFieldErrors(result.error);
}

/** Construye la petición al servidor. Solo viajan identificadores y cantidades, nunca importes. */
export function toOrderRequest(values: CheckoutValues, lines: readonly CartLine[]): OrderRequest {
  return {
    items: lines.map(({ slug, formatId, cut, quantity }) => ({ slug, formatId, cut, quantity })),
    customer: { name: values.name.trim(), phone: values.phone.trim(), email: values.email.trim() },
    pickup: { date: values.date, time: values.time },
    notes: values.notes.trim(),
    consent: true,
    website: values.website,
  };
}
