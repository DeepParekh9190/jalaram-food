import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Store,
  Quote,
} from "lucide-react";
import { categories, getBestsellers } from "@/data/products";
import { siteConfig, whatsappConfig } from "@/data/site-config";
import { ProductCard } from "@/components/product-card";

const categoryImages: Record<string, string> = {
  Sev: "/images/categories/sev.svg",
  Gathiya: "/images/categories/gathiya.svg",
  Farsan: "/images/categories/farsan.svg",
  "Spicy Snacks": "/images/categories/spicy.svg",
  "Traditional Snacks": "/images/categories/traditional.svg",
  "Special Combos": "/images/categories/combos.svg",
};

const benefits = [
  {
    icon: Award,
    title: "Authentic Gujarati Taste",
    text: "Recipes straight from the halwais of Saurashtra and Kutch — nothing watered down.",
  },
  {
    icon: Leaf,
    title: "Quality Ingredients",
    text: "Fresh besan, cold-pressed oils and hand-pounded spices in every small batch.",
  },
  {
    icon: Store,
    title: "Retail & Wholesale Orders",
    text: "From a single pack for home to full cartons for shops and events — we serve both.",
  },
  {
    icon: MessageCircle,
    title: "Easy WhatsApp Ordering",
    text: "No account needed. Build your cart and send the order on WhatsApp in one tap.",
  },
];

const testimonials = [
  {
    name: "Priya M.",
    city: "Rajkot",
    text: "The Bhavnagari gathiya tasted exactly like the one from our local farsan shop — soft and fresh.",
  },
  {
    name: "Kiran S.",
    city: "Ahmedabad",
    text: "Ordered the festival hamper for Diwali gifting. Beautifully packed and everyone loved the ratlami sev.",
  },
  {
    name: "Jignesh P.",
    city: "Mumbai",
    text: "Monthly wholesale order for my shop. Prices are fair and the stock always arrives crisp and on time.",
  },
];

export default function HomePage() {
  const bestsellers = getBestsellers().slice(0, 8);

  return (
    <>
      {/* 1. HERO */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-gold/40 px-4 py-1.5 text-sm font-semibold text-leaf">
              <Sparkles className="h-4 w-4" aria-hidden />
              Fresh batches every morning
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-charcoal sm:text-5xl lg:text-6xl">
              Authentic Taste of{" "}
              <span className="text-brand">Gujarat</span>
            </h1>
            <p className="mt-4 text-lg text-charcoal/70 sm:text-xl">
              Traditional Gujarati &amp; Kutchi Snacks, Made for Every Moment.
            </p>
            <p className="mt-2 font-gujarati text-lg text-leaf">
              સ્વાદ જે દિલમાં ઘર કરી લે — ગુજરાતના પરંપરાગત નમકીન.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full bg-brand px-7 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-brand-dark"
              >
                Explore Our Snacks
              </Link>
              <Link
                href="/cart"
                className="rounded-full border-2 border-leaf px-7 py-3.5 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white"
              >
                Order Now
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/hero.svg"
              alt="Assortment of fresh Gujarati namkeen — sev, gathiya and fafda in a brass platter"
              width={900}
              height={700}
              priority
              className="w-full rounded-[2.5rem] shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SECTION */}
      <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 id="categories-heading" className="text-center text-3xl font-bold text-charcoal">
          Shop by Category
        </h2>
        <p className="mt-2 text-center text-charcoal/60">
          From everyday chai-time munching to festive hampers.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-cream-dark transition-shadow hover:shadow-lg"
            >
              <Image
                src={categoryImages[category]}
                alt={`${category} snacks`}
                width={400}
                height={300}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <p className="p-3 text-center text-sm font-semibold text-charcoal group-hover:text-brand">
                {category}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS */}
      <section aria-labelledby="bestsellers-heading" className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="bestsellers-heading" className="text-3xl font-bold text-charcoal">
                Our Bestsellers
              </h2>
              <p className="mt-2 text-charcoal/60">The packs our customers reorder again and again.</p>
            </div>
            <Link href="/products" className="hidden shrink-0 font-semibold text-brand hover:text-brand-dark sm:block">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="font-semibold text-brand">
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section aria-labelledby="why-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 id="why-heading" className="text-center text-3xl font-bold text-charcoal">
          Why Choose Us
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cream-dark transition-shadow hover:shadow-md"
            >
              <span className="inline-flex rounded-2xl bg-leaf/10 p-3 text-leaf">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold text-charcoal">{title}</h3>
              <p className="mt-1.5 text-sm text-charcoal/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHOLESALE BANNER */}
      <section className="bg-leaf py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Looking for Snacks in Bulk?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Get in touch with us for wholesale quantities and special bulk-order pricing.
            Perfect for shops, events, weddings and corporate gifting.
          </p>
          <a
            href={`https://wa.me/${whatsappConfig.rajkotNumber}?text=${encodeURIComponent(
              "Hello, I would like to enquire about wholesale snack prices."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-bold text-charcoal shadow-md transition-colors hover:bg-brand hover:text-white"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Enquire on WhatsApp
          </a>
        </div>
      </section>

      {/* 6. BRAND STORY */}
      <section aria-labelledby="story-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/brand-story.svg"
            alt="Traditional Gujarati snack preparation"
            width={800}
            height={600}
            className="w-full rounded-[2.5rem] shadow-md"
          />
          <div>
            <h2 id="story-heading" className="text-3xl font-bold text-charcoal">
              Our Story
            </h2>
            <p className="mt-4 leading-relaxed text-charcoal/70">
              {siteConfig.brandName} began with a simple belief: the taste of a Gujarati
              farsan shop should travel anywhere. We source sev, gathiya, fafda and
              namkeen from trusted halwais across Saurashtra and Kutch, pack them fresh
              in small batches, and deliver them to homes and shops.
            </p>
            <p className="mt-4 leading-relaxed text-charcoal/70">
              Whether it is a family's evening chai, a child's tiffin box, or a shop
              shelf that must never run empty — we treat every order like it is for our
              own table.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block font-semibold text-brand hover:text-brand-dark"
            >
              Read more about us →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TRUST (sample content) */}
      <section aria-labelledby="reviews-heading" className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/40 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-leaf">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Sample content for demonstration
            </span>
            <h2 id="reviews-heading" className="mt-4 text-3xl font-bold text-charcoal">
              What Customers Say
            </h2>
            <p className="mt-2 text-sm text-charcoal/50">
              These are demonstration testimonials, not genuine customer reviews.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl bg-cream p-6 ring-1 ring-cream-dark">
                <Quote className="h-6 w-6 text-gold" aria-hidden />
                <blockquote className="mt-3 text-sm leading-relaxed text-charcoal/80">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-charcoal">
                  {t.name}
                  <span className="ml-1 font-normal text-charcoal/50">· {t.city}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
