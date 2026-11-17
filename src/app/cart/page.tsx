import type { Metadata } from "next";
import { CartClient } from "@/components/cart-client";

export const metadata: Metadata = {
  title: "Cart & Order Summary",
  description:
    "Review your snack order and send it to us on WhatsApp. No account or payment needed online.",
};

export default function CartPage() {
  return <CartClient />;
}
