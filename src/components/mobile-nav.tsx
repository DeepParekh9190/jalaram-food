"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Contact,
  Ellipsis,
  FileText,
  Home,
  MessageCircle,
  Phone,
  ShoppingBag,
  ShoppingCart,
  Store,
  X,
} from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { siteConfig, whatsappConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [moreOpen, setMoreOpen] = useState(false);

  const tabs = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Shop", icon: ShoppingBag },
    { href: "/cart", label: "Cart", icon: ShoppingCart, badge: true },
    {
      href: `https://wa.me/${whatsappConfig.whatsappNumber}?text=${encodeURIComponent(
        "Hello, I would like to know more about your snacks."
      )}`,
      label: "WhatsApp",
      icon: MessageCircle,
      external: true,
    },
  ];

  const moreLinks = [
    { href: "/wholesale", label: "Wholesale", icon: Store },
    { href: "/about", label: "About Us", icon: FileText },
    { href: "/contact", label: "Contact", icon: Contact },
    {
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
      label: "Call us",
      icon: Phone,
      external: true,
    },
  ];

  return (
    <>
      {moreOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMoreOpen(false)}
          className="fixed inset-0 z-40 bg-charcoal/30 md:hidden"
        />
      )}

      {moreOpen && (
        <div className="fixed inset-x-0 bottom-[4.5rem] z-50 mx-auto max-w-lg px-4 pb-[env(safe-area-inset-bottom)] md:hidden">
          <div className="rounded-3xl bg-white p-4 shadow-xl ring-1 ring-cream-dark">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-charcoal">More</p>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                aria-label="Close menu"
                className="rounded-full p-2 text-charcoal/50 transition-colors hover:bg-cream"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {moreLinks.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  {external ? (
                    <a
                      href={href}
                      target={href.startsWith("tel:") ? undefined : "_blank"}
                      rel={href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-2 rounded-xl bg-cream px-3 py-3 text-sm font-semibold text-charcoal"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-2 rounded-xl bg-cream px-3 py-3 text-sm font-semibold text-charcoal"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-cream-dark bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {tabs.map(({ href, label, icon: Icon, external, badge }) => {
            const active =
              !external &&
              (href === "/" ? pathname === "/" : pathname.startsWith(href));
            const content = (
              <>
                <Icon className="h-6 w-6" aria-hidden />
                <span>{label}</span>
                {badge && itemCount > 0 && (
                  <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </>
            );
            return (
              <li key={label}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold text-[#128C4A]"
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold transition-colors",
                      active ? "text-brand" : "text-charcoal/60"
                    )}
                  >
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              className={cn(
                "flex min-h-16 w-full flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold transition-colors",
                moreOpen ? "text-brand" : "text-charcoal/60"
              )}
            >
              <Ellipsis className="h-6 w-6" aria-hidden />
              <span>More</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
