"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart-provider";
import { formatINR } from "@/lib/utils";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.packSizes[0]?.size ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const pack = product.packSizes.find((ps) => ps.size === size) ?? product.packSizes[0];
  const showWholesale =
    product.isAvailable &&
    pack?.wholesalePrice != null &&
    product.minimumWholesaleQuantity != null;

  if (!product.isAvailable) {
    return (
      <div className="mt-6">
        <p className="inline-block rounded-full bg-charcoal/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-charcoal/60">
          Currently Unavailable
        </p>
        <p className="mt-2 text-sm text-charcoal/60">
          This snack is out of stock right now. Please check back soon or{" "}
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            contact us
          </Link>{" "}
          for alternatives.
        </p>
      </div>
    );
  }

  function handleAdd() {
    if (!pack) return;
    add(product.id, pack.size, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mt-6">
      {/* Pack size */}
      <fieldset>
        <legend className="text-sm font-semibold text-charcoal">Pack Size</legend>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Pack size">
          {product.packSizes.map((ps) => (
            <button
              key={ps.size}
              type="button"
              role="radio"
              aria-checked={ps.size === size}
              onClick={() => setSize(ps.size)}
              className={
                ps.size === size
                  ? "rounded-xl border-2 border-brand bg-brand/10 px-4 py-2.5 text-sm font-bold text-brand"
                  : "rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:border-brand"
              }
            >
              {ps.size}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Price — always from products.ts, updates with the selected pack */}
      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-4xl font-extrabold text-charcoal" aria-live="polite">
          {formatINR((pack?.price ?? 0) * quantity)}
        </span>
        <span className="text-sm text-charcoal/50">
          {formatINR(pack?.price ?? 0)} / {pack?.size}
        </span>
      </div>

      {showWholesale && (
        <p className="mt-2 text-sm text-leaf">
          Wholesale price {formatINR(pack.wholesalePrice!)} / {pack.size} — available for
          orders of {product.minimumWholesaleQuantity}+ packs.{" "}
          <Link href="/wholesale" className="font-semibold underline hover:text-brand">
            Enquire here
          </Link>
          .
        </p>
      )}

      {/* Quantity + Add to cart */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-cream-dark bg-white">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="rounded-full p-3 text-charcoal transition-colors hover:bg-gold/30 disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" aria-hidden />
          </button>
          <span className="w-10 text-center font-bold" aria-live="polite" aria-label={`Quantity ${quantity}`}>
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="rounded-full p-3 text-charcoal transition-colors hover:bg-gold/30"
          >
            <Plus className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 font-bold text-white shadow-md transition-colors hover:bg-brand-dark"
        >
          {added ? (
            <>
              <Check className="h-5 w-5" aria-hidden /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" aria-hidden /> Add to Cart
            </>
          )}
        </button>
      </div>

      {added && (
        <p className="mt-3 text-sm font-semibold text-leaf">
          Added {quantity} × {pack?.size} to your cart.{" "}
          <Link href="/cart" className="underline hover:text-brand">
            Go to cart
          </Link>
        </p>
      )}
    </div>
  );
}
