"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark bg-cream/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      {/* Delivery offers scroll as a seamless ticker and stick with the header */}
      <div className="overflow-hidden bg-brand py-1.5 text-[11px] font-bold text-cream sm:py-2 sm:text-sm">
        <div className="anim-marquee flex w-max [animation-duration:26s] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className={cn(
                "flex shrink-0 items-center whitespace-nowrap",
                copy === 1 && "motion-reduce:hidden"
              )}
            >
              Free delivery all over India on orders above ₹2,000
              <span className="mx-3 text-gold" aria-hidden>★</span>
              Rajkot &amp; Bhuj — free delivery on orders above ₹500
              <span className="mx-3 text-gold" aria-hidden>★</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight text-charcoal sm:text-xl">
          {siteConfig.brandName}
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                pathname === link.href
                  ? "bg-brand text-cream"
                  : "text-charcoal hover:bg-gold/30"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          className="relative hidden rounded-full p-2.5 text-charcoal transition-colors hover:bg-gold/30 md:inline-flex"
        >
          <ShoppingBag className="h-5 w-5" aria-hidden />
          {itemCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
