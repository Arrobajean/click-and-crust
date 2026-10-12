import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = { title: "Reservar recogida", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Reservar recogida</h1>
      <div className="mt-10">
        <CheckoutView />
      </div>
    </div>
  );
}
