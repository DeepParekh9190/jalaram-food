import type { MetadataRoute } from "next";
import { products } from "@/data/products";

/** Clean URLs for search engines (Phase 13) */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/cart", "/wholesale", "/about", "/contact"].map(
    (path) => ({
      url: `https://www.example.com${path}`, // replace with the real domain after deployment
      lastModified: new Date(),
    })
  );
  const productRoutes = products.map((p) => ({
    url: `https://www.example.com/products/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...routes, ...productRoutes];
}
