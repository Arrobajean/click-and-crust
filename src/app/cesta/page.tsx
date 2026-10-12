import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = { title: "Tu cesta", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Tu cesta</h1>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
