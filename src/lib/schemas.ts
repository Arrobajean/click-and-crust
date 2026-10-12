import { z } from "zod";
import { MAX_LINES, MAX_QUANTITY } from "./cart";

// Esquemas compartidos: los usa el servidor para validar la entrada y el cliente
// para validar el formulario y leer la cesta guardada.

export const cartLineSchema = z.strictObject({
  slug: z.string().min(1).max(80),
  formatId: z.string().min(1).max(60),
  cut: z.string().min(1).max(30).nullable(),
  quantity: z.number().int().min(1).max(MAX_QUANTITY),
});

export const cartSchema = z.object({ lines: z.array(cartLineSchema).max(MAX_LINES) });

export const nameSchema = z.string().trim().min(2, "Escribe tu nombre.").max(80, "El nombre es demasiado largo.");

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[\d\s().-]+$/, "Escribe un teléfono válido, por ejemplo 612 345 678.")
  .refine((value) => {
    const digits = value.replace(/\D/g, "").length;
    return digits >= 9 && digits <= 15;
  }, "Escribe un teléfono válido, por ejemplo 612 345 678.");

export const emailSchema = z
  .string()
  .trim()
  .max(120, "El correo es demasiado largo.")
  .pipe(z.email("Escribe un correo válido, por ejemplo nombre@correo.es."));

export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Elige un día de recogida.");
export const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Elige una hora de recogida.");
export const notesSchema = z.string().trim().max(300, "Máximo 300 caracteres.");

export const orderRequestSchema = z.strictObject({
  items: z.array(cartLineSchema).min(1, "La cesta está vacía.").max(MAX_LINES),
  customer: z.strictObject({ name: nameSchema, phone: phoneSchema, email: emailSchema }),
  pickup: z.strictObject({ date: dateSchema, time: timeSchema }),
  notes: notesSchema.default(""),
  consent: z.literal(true, { error: "Debes aceptar para continuar." }),
  /** Campo trampa para bots: un humano nunca lo rellena. */
  website: z.string().max(0, "Solicitud no válida.").optional(),
});

export type OrderRequest = z.infer<typeof orderRequestSchema>;

const pricedLineSchema = cartLineSchema.extend({
  key: z.string(),
  name: z.string(),
  image: z.string(),
  formatLabel: z.string(),
  unitCents: z.number().int(),
  lineCents: z.number().int(),
});

/** Pedido guardado en el navegador como justificante. */
export const storedOrderSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  customer: z.object({ name: z.string(), phone: z.string(), email: z.string() }),
  pickup: z.object({ date: z.string(), time: z.string() }),
  notes: z.string(),
  lines: z.array(pricedLineSchema),
  totalCents: z.number().int(),
});

export const receiptsSchema = z.object({ orders: z.array(storedOrderSchema).max(5) });

export type FieldErrors = Record<string, string>;

/** Primer mensaje por campo, indexado por la primera clave de la ruta del error. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    if (!(field in errors)) errors[field] = issue.message;
  }
  return errors;
}
