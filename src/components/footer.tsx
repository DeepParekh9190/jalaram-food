import Link from "next/link";
import { Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { categories, getBestsellers } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { CurrentYear } from "@/components/current-year";

export function Footer() {
  const topProducts = getBestsellers()
    .slice(0, 4)
    .map((p) => ({ name: p.name, href: `/products/${p.slug}` }));

  return (
    <footer className="mt-16 border-t border-cream-dark bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <p className="text-lg font-bold text-charcoal">{siteConfig.brandName}</p>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
            {siteConfig.description}
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (placeholder link)"
              className="rounded-full bg-cream p-2 ring-1 ring-cream-dark transition-colors hover:bg-brand hover:text-white"
            >
              <Camera className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={siteConfig.whatsappCatalog}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="rounded-full bg-cream p-2 ring-1 ring-cream-dark transition-colors hover:bg-brand hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer quick links">
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
            Quick Links
          </p>
          <ul className="mt-3 space-y-2 text-sm text-charcoal/60">
            <li><Link className="hover:text-brand" href="/">Home</Link></li>
            <li><Link className="hover:text-brand" href="/products">Shop</Link></li>
            <li><Link className="hover:text-brand" href="/wholesale">Wholesale Orders</Link></li>
            <li><Link className="hover:text-brand" href="/about">About Us</Link></li>
            <li><Link className="hover:text-brand" href="/contact">Contact Us</Link></li>
            <li><Link className="hover:text-brand" href="/cart">Cart</Link></li>
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label="Footer product categories">
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
            Categories
          </p>
          <ul className="mt-3 space-y-2 text-sm text-charcoal/60">
            {categories.map((c) => (
              <li key={c}>
                <Link className="hover:text-brand" href={`/products?category=${encodeURIComponent(c)}`}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-charcoal/50">
            Popular
          </p>
          <ul className="mt-3 space-y-2 text-sm text-charcoal/60">
            {topProducts.map((p) => (
              <li key={p.href}>
                <Link className="hover:text-brand" href={p.href}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
            Contact
          </p>
          <ul className="mt-3 space-y-3 text-sm text-charcoal/60">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              {siteConfig.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand">
                {siteConfig.email}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-charcoal/50">{siteConfig.hours}</p>
        </div>
      </div>

      <div className="border-t border-cream-dark py-5 text-center text-xs text-charcoal/50">
        © <CurrentYear /> {siteConfig.brandName}. Sample website for client presentation, 
        all branding, prices and images are placeholders.
      </div>
    </footer>
  );
}
