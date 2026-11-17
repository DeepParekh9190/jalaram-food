"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { resolveLine, type CartLine } from "@/lib/whatsapp";

const STORAGE_KEY = "jalaram-food-cart-v1";

type ResolvedLine = {
  key: string;
  product: Product;
  size: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type CartContextValue = {
  lines: ResolvedLine[];
  /** Raw lines for the WhatsApp message builder */
  rawLines: CartLine[];
  itemCount: number;
  total: number;
  add: (productId: string, size: string, quantity?: number) => void;
  remove: (productId: string, size: string) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  changeSize: (productId: string, fromSize: string, toSize: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(productId: string, size: string) {
  return `${productId}__${size}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Raw lines only — prices are always re-resolved from products.ts,
  // so a price edit in the data file applies to the cart too.
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setRaw(JSON.parse(stored));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      // storage full/unavailable — cart still works in-memory
    }
  }, [raw, hydrated]);

  const add = useCallback((productId: string, size: string, quantity = 1) => {
    setRaw((prev) => {
      const existing = prev.find(
        (l) => l.productId === productId && l.size === size
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { productId, size, quantity }];
    });
  }, []);

  const remove = useCallback((productId: string, size: string) => {
    setRaw((prev) =>
      prev.filter((l) => !(l.productId === productId && l.size === size))
    );
  }, []);

  const setQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      setRaw((prev) =>
        quantity <= 0
          ? prev.filter((l) => !(l.productId === productId && l.size === size))
          : prev.map((l) =>
              l.productId === productId && l.size === size
                ? { ...l, quantity }
                : l
            )
      );
    },
    []
  );

  const changeSize = useCallback(
    (productId: string, fromSize: string, toSize: string) => {
      setRaw((prev) => {
        const line = prev.find(
          (l) => l.productId === productId && l.size === fromSize
        );
        if (!line) return prev;
        const target = prev.find(
          (l) => l.productId === productId && l.size === toSize
        );
        if (target) {
          // merge into the target size, drop the old line
          return prev
            .map((l) =>
              l === target ? { ...l, quantity: l.quantity + line.quantity } : l
            )
            .filter((l) => l !== line);
        }
        return prev.map((l) => (l === line ? { ...l, size: toSize } : l));
      });
    },
    []
  );

  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo<CartContextValue>(() => {
    const resolved: ResolvedLine[] = raw.flatMap((l) => {
      const r = resolveLine(l);
      if (!r) return []; // product/pack no longer exists in catalogue
      return [
        {
          key: lineKey(l.productId, l.size),
          product: r.product,
          size: l.size,
          quantity: l.quantity,
          unitPrice: r.unitPrice,
          lineTotal: r.lineTotal,
        },
      ];
    });
    return {
      lines: resolved,
      rawLines: raw,
      itemCount: resolved.reduce((s, l) => s + l.quantity, 0),
      total: resolved.reduce((s, l) => s + l.lineTotal, 0),
      add,
      remove,
      setQuantity,
      changeSize,
      clear,
    };
  }, [raw, add, remove, setQuantity, changeSize, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function lineKeyOf(productId: string, size: string) {
  return lineKey(productId, size);
}

export { STORAGE_KEY };
export type { CartLine, ResolvedLine };

/** Sanity check used by scripts/verify.mjs (Phase 14) */
export function assertCatalogIntegrity(): string[] {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const ids = new Set<string>();
  for (const p of products) {
    if (ids.has(p.id)) errors.push(`Duplicate id: ${p.id}`);
    if (slugs.has(p.slug)) errors.push(`Duplicate slug: ${p.slug}`);
    ids.add(p.id);
    slugs.add(p.slug);
    if (p.packSizes.length === 0) errors.push(`${p.id}: no pack sizes`);
    for (const ps of p.packSizes) {
      if (ps.price <= 0) errors.push(`${p.id}: invalid price for ${ps.size}`);
    }
  }
  return errors;
}
