import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Truck } from "lucide-react";
import { categories, getProductBySlug, getRelated, products } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = PageProps<"/products/[slug]">;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${siteConfig.brandName}`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage(props: Props) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-charcoal/50">
        <Link href="/" className="hover:text-brand">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <Link href="/products" className="hover:text-brand">Shop</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-brand"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span aria-current="page" className="text-charcoal">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.category}`}
          width={900}
          height={700}
          priority
          className="w-full rounded-[2.5rem] bg-cream shadow-md"
        />

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand">
            {product.category}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-charcoal sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 leading-relaxed text-charcoal/70">{product.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gold/40 px-3 py-1 text-xs font-semibold text-brown"
              >
                {tag}
              </span>
            ))}
          </div>

          <ProductPurchase product={product} />

          <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-cream-dark">
            <p className="flex items-start gap-2 text-sm text-charcoal/70">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-brown" aria-hidden />
              {siteConfig.deliveryInfo.join(" ")}
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section aria-labelledby="related-heading" className="mt-16">
        <h2 id="related-heading" className="text-2xl font-bold text-charcoal">
          You May Also Like
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
