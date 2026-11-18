"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart-provider";
import { formatINR } from "@/lib/utils";

/** Compact pack-size picker: wraps on tablet+, scrolls in one line on phones */
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
    <div
      className="flex flex-nowrap gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:pb-0"
      role="radiogroup"
      aria-label="Pack size"
    >
      {product.packSizes.map((ps) => (
        <button
          key={ps.size}
          type="button"
          role="radio"
          aria-checked={ps.size === size}
          onClick={() => onChange?.(ps.size)}
          className={
            ps.size === size
              ? "shrink-0 rounded-full border border-brand bg-brand px-3 py-1.5 text-sm font-semibold text-white"
              : "shrink-0 rounded-full border border-cream-dark bg-white px-3 py-1.5 text-sm font-medium text-charcoal hover:border-brand"
          }
        >
          {ps.size}
        </button>
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { lines, add, setQuantity } = useCart();
  const [size, setSize] = useState(product.packSizes[0]?.size ?? "");

  const pack = product.packSizes.find((ps) => ps.size === size) ?? product.packSizes[0];
  // One line per product + pack size, so the stepper follows the selected pack
  const cartLine = lines.find((l) => l.product.id === product.id && l.size === size);

  function handleAdd() {
    if (!product.isAvailable || !pack) return;
    add(product.id, pack.size, 1);
  }

  function handleDecrease() {
    if (!pack || !cartLine) return;
    setQuantity(product.id, pack.size, cartLine.quantity - 1); // 0 removes the line
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-cream-dark transition-shadow hover:shadow-lg">
      <div className="flex sm:block">
        {/* Phones: 112px thumbnail on the left. Tablet+: full-width photo on top. */}
        <Link
          href={`/products/${product.slug}`}
          className="relative block h-28 w-28 shrink-0 overflow-hidden bg-cream sm:aspect-[4/3] sm:h-auto sm:w-full"
          aria-label={`View details for ${product.name}`}
        >
          <Image
            src={product.image}
            alt={`${product.name}, ${product.category}`}
            fill
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isBestseller && product.isAvailable && (
            <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-charcoal shadow sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
              Bestseller
            </span>
          )}
          {!product.isAvailable && (
            <span className="absolute inset-0 flex items-center justify-center bg-cream/80 p-1 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-charcoal sm:text-sm">
              Currently Unavailable
            </span>
          )}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[11px] font-semibold uppercase tracking-wide text-brand sm:text-xs">
              {product.category}
            </span>
            <span className="shrink-0 text-xs text-charcoal/50">{pack?.size}</span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="line-clamp-2 text-base font-semibold text-charcoal hover:text-brand sm:text-lg"
          >
            {product.name}
          </Link>

          <p className="hidden text-[15px] leading-relaxed text-charcoal/60 sm:line-clamp-2 sm:block">
            {product.description}
          </p>

          <PackPicker product={product} size={size} onChange={setSize} />

          <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
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

              {cartLine && product.isAvailable ? (
                <div
                  className="flex items-center rounded-full border border-brand bg-white"
                  role="group"
                  aria-label={`Quantity for ${product.name}`}
                >
                  <button
                    type="button"
                    onClick={handleDecrease}
                    aria-label={`Decrease quantity of ${product.name}`}
                    className="rounded-l-full px-2.5 py-2 text-charcoal transition-colors hover:bg-cream"
                  >
                    <Minus className="h-3.5 w-3.5" aria-hidden />
                  </button>
                  <span
                    aria-live="polite"
                    className="min-w-6 text-center text-sm font-bold text-charcoal"
                  >
                    {cartLine.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={cartLine.quantity >= 99}
                    aria-label={`Increase quantity of ${product.name}`}
                    className="rounded-r-full px-2.5 py-2 text-charcoal transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:text-charcoal/30"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!product.isAvailable}
                  aria-label={
                    product.isAvailable
                      ? `Add ${product.name} (${pack?.size}) to cart`
                      : `${product.name} is currently unavailable`
                  }
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-charcoal/20 sm:flex-none"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden /> Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
