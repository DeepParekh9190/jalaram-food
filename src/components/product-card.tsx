"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart-provider";
import { formatINR } from "@/lib/utils";

/** Pack sizes as a segmented control; scrolls on phones when there are many */
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
    return (
      <span className="inline-flex rounded-full bg-cream px-3 py-1.5 text-sm text-charcoal/70">
        {product.packSizes[0].size}
      </span>
    );
  }
  return (
    <div
      className={`inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-cream p-1 ${
        product.packSizes.length > 2
          ? "[mask-image:linear-gradient(to_right,black_85%,transparent)] sm:[mask-image:none]"
          : ""
      }`}
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
          className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
            ps.size === size
              ? "bg-brand text-white shadow-sm"
              : "text-charcoal/70 hover:bg-white hover:text-charcoal"
          }`}
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
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-lg ${
        cartLine ? "bg-brand/[0.02] ring-2 ring-brand/60" : "ring-1 ring-cream-dark"
      }`}
    >
      <div className="flex sm:block">
        {/* Phones: 128px thumbnail on the left. Tablet+: full-width photo on top. */}
        <Link
          href={`/products/${product.slug}`}
          className="relative block h-32 w-32 shrink-0 overflow-hidden bg-cream sm:aspect-[4/3] sm:h-auto sm:w-full"
          aria-label={`View details for ${product.name}`}
        >
          <Image
            src={product.image}
            alt={`${product.name}, ${product.category}`}
            fill
            sizes="(max-width: 640px) 128px, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isBestseller && product.isAvailable && (
            <span className="absolute right-0 top-0 rounded-es-xl rounded-tr-3xl bg-gold px-2 py-1 text-[10px] font-bold text-charcoal shadow sm:px-2.5 sm:text-xs">
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
            className="line-clamp-2 min-h-[3rem] text-base font-semibold leading-6 text-charcoal hover:text-brand sm:text-lg"
          >
            {product.name}
          </Link>

          <p className="hidden text-[15px] leading-relaxed text-charcoal/60 sm:line-clamp-2 sm:block">
            {product.description}
          </p>

          <PackPicker product={product} size={size} onChange={setSize} />

          <div className="mt-auto flex items-center justify-between gap-2 pt-1">
            <span className="text-lg font-bold text-charcoal">{formatINR(pack?.price ?? 0)}</span>
            <div className="flex gap-1.5">
              <Link
                href={`/products/${product.slug}`}
                aria-label={`View details for ${product.name}`}
                className="hidden items-center gap-1 rounded-full border border-cream-dark px-3 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-brand hover:text-brand sm:flex"
              >
                <Eye className="h-3.5 w-3.5" aria-hidden />
                Details
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
                  className="flex items-center justify-center gap-1.5 rounded-full bg-brand px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-charcoal/20"
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
