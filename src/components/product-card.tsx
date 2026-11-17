"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Check, Eye, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart-provider";
import { formatINR } from "@/lib/utils";

/** Compact pack-size picker: pills when more than one size, label otherwise */
function PackPicker({
  product,
  size,
  onChange,
}: {
  product: Product;
  size: string;
  onChange?: (size: string) => void;
}) {
  if (product.packSizes.length === 1) {
    return <span className="text-sm text-charcoal/60">{product.packSizes[0].size}</span>;
  }
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Pack size">
      {product.packSizes.map((ps) => (
        <button
          key={ps.size}
          type="button"
          role="radio"
          aria-checked={ps.size === size}
          onClick={() => onChange?.(ps.size)}
          className={
            ps.size === size
              ? "rounded-full border border-brand bg-brand px-3 py-1.5 text-sm font-semibold text-white"
              : "rounded-full border border-cream-dark bg-white px-3 py-1.5 text-sm font-medium text-charcoal hover:border-brand"
          }
        >
          {ps.size}
        </button>
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.packSizes[0]?.size ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const pack = product.packSizes.find((ps) => ps.size === size) ?? product.packSizes[0];

  function handleAdd() {
    if (!product.isAvailable || !pack) return;
    add(product.id, pack.size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-cream-dark transition-shadow hover:shadow-lg">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-cream"
        aria-label={`View details for ${product.name}`}
      >
        <Image
          src={product.image}
          alt={`${product.name}, ${product.category}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.isBestseller && product.isAvailable && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-charcoal shadow">
            Bestseller
          </span>
        )}
        {!product.isAvailable && (
          <span className="absolute inset-0 flex items-center justify-center bg-cream/80 text-sm font-bold uppercase tracking-wide text-charcoal">
            Currently Unavailable
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand">
            {product.category}
          </span>
          <span className="text-xs text-charcoal/50">{pack?.size}</span>
        </div>

        <Link href={`/products/${product.slug}`} className="text-lg font-semibold text-charcoal hover:text-brand">
          {product.name}
        </Link>

        <p className="line-clamp-2 text-[15px] leading-relaxed text-charcoal/60">{product.description}</p>

        <PackPicker product={product} size={size} onChange={setSize} />

        {/* quantity stepper, sits with the pack-size picker */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-charcoal/70">Qty</span>
          <div
            className="flex items-center rounded-full border border-cream-dark bg-white"
            role="group"
            aria-label="Quantity"
          >
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={!product.isAvailable || qty <= 1}
              aria-label="Decrease quantity"
              className="rounded-l-full px-2.5 py-1.5 text-charcoal transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:text-charcoal/30"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden />
            </button>
            <span aria-live="polite" className="min-w-6 text-center text-sm font-bold text-charcoal">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              disabled={!product.isAvailable}
              aria-label="Increase quantity"
              className="rounded-r-full px-2.5 py-1.5 text-charcoal transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:text-charcoal/30"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-lg font-bold text-charcoal">{formatINR(pack?.price ?? 0)}</span>
          <div className="flex gap-1.5">
            <Link
              href={`/products/${product.slug}`}
              aria-label={`View details for ${product.name}`}
              className="flex items-center gap-1 rounded-full border border-cream-dark px-3 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-brand hover:text-brand"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">Details</span>
            </Link>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!product.isAvailable}
              aria-label={
                product.isAvailable
                  ? `Add ${product.name} (${pack?.size}) to cart`
                  : `${product.name} is currently unavailable`
              }
              className="flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-charcoal/20"
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden /> Added
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" aria-hidden /> Add{qty > 1 ? ` ${qty}` : ""}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* floating confirmation toast */}
      {added && (
        <div
          role="status"
          className="anim-pop fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white px-5 py-3 shadow-xl ring-1 ring-cream-dark"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10">
            <Check className="h-3.5 w-3.5 text-brand" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-charcoal">Added to cart</span>
          <Link href="/cart" className="text-sm font-bold text-brand hover:text-brand-dark">
            View Cart
          </Link>
        </div>
      )}
    </article>
  );
}
