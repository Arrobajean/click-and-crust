import { getOrderRepository } from "@/lib/order-repository";
import { isValidDate, slotsForDate } from "@/lib/slots";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";
  if (!isValidDate(date)) {
    return Response.json({ error: "Fecha no válida.", code: "invalid_date" }, { status: 400 });
  }

  const occupancy = await getOrderRepository().countBySlot(date);
  return Response.json({ date, slots: slotsForDate(date, new Date(), occupancy) }, { headers: { "Cache-Control": "no-store" } });
}
