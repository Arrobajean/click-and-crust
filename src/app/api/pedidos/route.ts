import { getOrderRepository } from "@/lib/order-repository";
import { createOrder } from "@/lib/orders";
import { createRateLimiter } from "@/lib/rate-limit";
import { orderRequestSchema, toFieldErrors } from "@/lib/schemas";

const limiter = createRateLimiter({ limit: 6, windowMs: 10 * 60_000 });
const MAX_BODY_CHARS = 16_000;

function clientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function failure(status: number, error: string, code: string, field?: string, headers?: HeadersInit) {
  return Response.json({ error, code, ...(field ? { field } : {}) }, { status, headers });
}

// La ruta solo valida y delega: las reglas viven en lib/orders.
export async function POST(request: Request) {
  const limit = limiter.hit(clientKey(request));
  if (!limit.allowed) {
    return failure(429, "Demasiados intentos. Prueba de nuevo en unos minutos.", "rate_limited", undefined, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  const text = await request.text();
  if (text.length > MAX_BODY_CHARS) return failure(413, "La solicitud es demasiado grande.", "payload_too_large");

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return failure(400, "La solicitud no es JSON válido.", "invalid_json");
  }

  const parsed = orderRequestSchema.safeParse(body);
  if (!parsed.success) {
    const [field = "form", message = "Solicitud no válida."] = Object.entries(toFieldErrors(parsed.error))[0] ?? [];
    return failure(400, message, "invalid_request", field);
  }

  const result = await createOrder(parsed.data, { repo: getOrderRepository() });
  if (!result.ok) {
    const { code, message, field } = result.error;
    return failure(code === "slot_full" ? 409 : 422, message, code, field);
  }
  return Response.json({ order: result.order }, { status: 201 });
}
