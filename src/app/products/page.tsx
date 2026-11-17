import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/data/products";
import { ShopClient } from "@/components/shop-client";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse authentic Gujarati and Kutchi namkeen — sev, gathiya, fafda, khakhra, combos and more. Fresh batches, retail and wholesale packs.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-charcoal">Shop All Snacks</h1>
        <p className="mt-2 text-charcoal/60">
          Freshly packed namkeen in retail and wholesale pack sizes.
        </p>
      </header>
      <Suspense fallback={null}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
