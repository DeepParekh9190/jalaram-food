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
    <footer className="mt-16 bg-charcoal text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <p className="text-lg font-bold text-gold">{siteConfig.brandName}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {siteConfig.description}
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (placeholder link)"
              className="rounded-full bg-white/10 p-2 transition-colors hover:bg-brand"
            >
              <Camera className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={siteConfig.whatsappCatalog}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="rounded-full bg-white/10 p-2 transition-colors hover:bg-brand"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer quick links">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Quick Links
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link className="hover:text-white" href="/">Home</Link></li>
            <li><Link className="hover:text-white" href="/products">Shop</Link></li>
            <li><Link className="hover:text-white" href="/wholesale">Wholesale Orders</Link></li>
            <li><Link className="hover:text-white" href="/about">About Us</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact Us</Link></li>
            <li><Link className="hover:text-white" href="/cart">Cart</Link></li>
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label="Footer product categories">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Categories
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {categories.map((c) => (
              <li key={c}>
                <Link className="hover:text-white" href={`/products?category=${encodeURIComponent(c)}`}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-gold">
            Popular
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {topProducts.map((p) => (
              <li key={p.href}>
                <Link className="hover:text-white" href={p.href}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Contact
          </p>
          <ul className="mt-3 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              {siteConfig.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-white/50">{siteConfig.hours}</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © <CurrentYear /> {siteConfig.brandName}. Sample website for client presentation —
        all branding, prices and images are placeholders.
      </div>
    </footer>
  );
}
