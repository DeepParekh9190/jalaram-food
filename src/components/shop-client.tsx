"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, PackageSearch } from "lucide-react";
import { categories, getBasePrice, products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

type Sort = "popular" | "price-asc" | "price-desc" | "name";

const sortOptions: { value: Sort; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A–Z" },
];

export function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    (categories as readonly string[]).includes(initialCategory) ? initialCategory : "All"
  );
  const [sort, setSort] = useState<Sort>("popular");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => getBasePrice(a) - getBasePrice(b));
      case "price-desc":
        return [...list].sort((a, b) => getBasePrice(b) - getBasePrice(a));
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        // popularity: bestsellers first, then featured, then alphabetical
        return [...list].sort(
          (a, b) =>
            Number(b.isBestseller) - Number(a.isBestseller) ||
            Number(b.isFeatured) - Number(a.isFeatured) ||
            a.name.localeCompare(b.name)
        );
    }
  }, [query, category, sort]);

  return (
    <div className="mt-8">
      {/* Search + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search products</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sev, gathiya, namkeen…"
            className="w-full rounded-full border border-cream-dark bg-white py-3 pl-11 pr-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="sm:w-56">
          <span className="sr-only">Sort products</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="w-full rounded-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Category filter pills */}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              category === c
                ? "bg-brand text-cream"
                : "bg-white text-charcoal ring-1 ring-cream-dark hover:ring-brand"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-14 rounded-3xl bg-white p-12 text-center ring-1 ring-cream-dark">
          <PackageSearch className="mx-auto h-12 w-12 text-charcoal/25" aria-hidden />
          <p className="mt-4 text-lg font-semibold text-charcoal">No snacks found</p>
          <p className="mt-1 text-sm text-charcoal/60">
            Nothing matches “{query}”{category !== "All" ? ` in ${category}` : ""}. Try a
            different search or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-cream hover:bg-brand-dark"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-charcoal/50" aria-live="polite">
            Showing {filtered.length} of {products.length} products
          </p>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
