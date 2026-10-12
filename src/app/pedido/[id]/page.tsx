import type { Metadata } from "next";
import { OrderReceipt } from "@/components/checkout/order-receipt";

export const metadata: Metadata = { title: "Reserva registrada", robots: { index: false } };

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container-page py-12 md:py-16">
      <OrderReceipt id={id} />
    </div>
  );
}
