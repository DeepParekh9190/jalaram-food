/**
 * ============================================================
 * PRODUCT CATALOGUE, the single file to edit for all products
 * ============================================================
 * Add, remove or edit products here. Prices shown on the website
 * (cards, detail pages, cart, WhatsApp message) ALWAYS come from
 * this file, never hardcode a price in a UI component.
 * After editing, save and redeploy to update the live website.
 */

export type PackSize = {
  /** Display label, e.g. "250g" */
  size: string;
  /** Retail price for this pack in ₹ */
  price: number;
  /** Optional wholesale price for this pack in ₹ */
  wholesalePrice?: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: Category;
  /** Path under /public */
  image: string;
  /** First entry is the default/base pack */
  packSizes: PackSize[];
  /** Wholesale price applies from this many packs onwards */
  minimumWholesaleQuantity?: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  tags: string[];
};

export const categories = [
  "Roasted Items",
  "Maharashtra Special",
  "Saurashtra Special",
  "Kutch Special",
  "Sweet",
  "Bakery",
] as const;

export type Category = (typeof categories)[number];

export const products: Product[] = [
  {
    id: "sev-001",
    slug: "nylon-sev",
    name: "Nylon Sev",
    description:
      "Feather-light, thin and crispy nylon sev fried in small batches. The classic tea-time companion and a favourite topping for poha and chaat.",
    category: "Saurashtra Special",
    image: "/images/products/nylon-sev.png",
    packSizes: [
      { size: "250g", price: 60, wholesalePrice: 52 },
      { size: "500g", price: 120, wholesalePrice: 102 },
      { size: "1kg", price: 220, wholesalePrice: 195 },
    ],
    minimumWholesaleQuantity: 10,
    isAvailable: true,
    isFeatured: true,
    isBestseller: true,
    tags: ["Popular", "Crispy"],
  },
  {
    id: "sev-002",
    slug: "ratlami-sev",
    name: "Ratlami Sev",
    description:
      "Bold, spicy Ratlami sev made with fresh garlic and hand-pounded spices. A fiery Malwa-style classic for those who love heat.",
    category: "Maharashtra Special",
    image: "/images/products/ratlami-sev.png",
    packSizes: [
      { size: "250g", price: 70, wholesalePrice: 60 },
      { size: "500g", price: 135, wholesalePrice: 115 },
      { size: "1kg", price: 250, wholesalePrice: 220 },
    ],
    minimumWholesaleQuantity: 10,
    isAvailable: true,
    isFeatured: true,
    isBestseller: true,
    tags: ["Spicy", "Popular"],
  },
  {
    id: "sev-003",
    slug: "papdi-sev",
    name: "Papdi Sev Mixture",
    description:
      "A crunchy mixture of papdi, sev, peanuts and fried lentils tossed in our house spice blend. The party bowl that never empties.",
    category: "Saurashtra Special",
    image: "/images/products/papdi-sev.png",
    packSizes: [
      { size: "250g", price: 80, wholesalePrice: 70 },
      { size: "500g", price: 155, wholesalePrice: 135 },
    ],
    minimumWholesaleQuantity: 8,
    isAvailable: true,
    isFeatured: false,
    isBestseller: false,
    tags: ["Mixture", "Party"],
  },
  {
    id: "gath-001",
    slug: "bhavnagari-gathiya",
    name: "Bhavnagari Gathiya",
    description:
      "Soft, thick and pepper-kissed gathiya from Bhavnagar's traditional recipe. Best enjoyed hot with green chilli and fried papdi.",
    category: "Saurashtra Special",
    image: "/images/products/bhavnagari-gathiya.png",
    packSizes: [
      { size: "250g", price: 65, wholesalePrice: 55 },
      { size: "500g", price: 125, wholesalePrice: 108 },
      { size: "1kg", price: 230, wholesalePrice: 200 },
    ],
    minimumWholesaleQuantity: 10,
    isAvailable: true,
    isFeatured: true,
    isBestseller: true,
    tags: ["Popular", "Soft"],
  },
  {
    id: "gath-002",
    slug: "tikha-gathiya",
    name: "Tikha Gathiya",
    description:
      "Spicy gathiya dusted with red chilli and ajwain. Crisp strands with a slow Gujarati-style heat that keeps you reaching for more.",
    category: "Saurashtra Special",
    image: "/images/products/tikha-gathiya.png",
    packSizes: [
      { size: "250g", price: 68, wholesalePrice: 58 },
      { size: "500g", price: 130, wholesalePrice: 112 },
      { size: "1kg", price: 240, wholesalePrice: 210 },
    ],
    minimumWholesaleQuantity: 10,
    isAvailable: true,
    isFeatured: false,
    isBestseller: true,
    tags: ["Spicy"],
  },
  {
    id: "gath-003",
    slug: "methi-gathiya",
    name: "Methi Gathiya",
    description:
      "Gathiya laced with kasuri methi and a gentle masala. Earthy, fragrant and perfect with an evening cup of chai.",
    category: "Saurashtra Special",
    image: "/images/products/methi-gathiya.png",
    packSizes: [
      { size: "250g", price: 72, wholesalePrice: 62 },
      { size: "500g", price: 140, wholesalePrice: 120 },
    ],
    minimumWholesaleQuantity: 8,
    isAvailable: true,
    isFeatured: false,
    isBestseller: false,
    tags: ["Methi", "Family Pack"],
  },
  {
    id: "far-002",
    slug: "chana-dal-namkeen",
    name: "Chana Dal Namkeen",
    description:
      "Crunchy fried chana dal seasoned with black salt and amchur. Protein-rich, guilt-free munching for anytime of the day.",
    category: "Roasted Items",
    image: "/images/products/chana-dal.png",
    packSizes: [
      { size: "250g", price: 55, wholesalePrice: 48 },
      { size: "500g", price: 105, wholesalePrice: 92 },
      { size: "1kg", price: 195, wholesalePrice: 172 },
    ],
    minimumWholesaleQuantity: 10,
    isAvailable: true,
    isFeatured: false,
    isBestseller: false,
    tags: ["Healthy", "Crispy"],
  },
  {
    id: "far-003",
    slug: "masala-peanuts",
    name: "Masala Peanuts",
    description:
      "Roasted peanuts coated in a spicy besan shell. The enduring favourite of every Gujarati railway journey and cricket match.",
    category: "Roasted Items",
    image: "/images/products/masala-peanuts.png",
    packSizes: [
      { size: "250g", price: 60, wholesalePrice: 52 },
      { size: "500g", price: 115, wholesalePrice: 100 },
    ],
    minimumWholesaleQuantity: 10,
    isAvailable: true,
    isFeatured: false,
    isBestseller: true,
    tags: ["Spicy", "Popular"],
  },
  {
    id: "far-004",
    slug: "khakhra-classic",
    name: "Classic Wheat Khakhra",
    description:
      "Paper-thin, slow-roasted whole-wheat khakhra. Crackling crisp with ghee-roasted flavour, a wholesome travel snack.",
    category: "Roasted Items",
    image: "/images/products/khakhra-classic.png",
    packSizes: [
      { size: "200g", price: 75, wholesalePrice: 65 },
      { size: "400g", price: 145, wholesalePrice: 125 },
    ],
    minimumWholesaleQuantity: 8,
    isAvailable: true,
    isFeatured: true,
    isBestseller: false,
    tags: ["Roasted", "Travel"],
  },
  {
    id: "far-005",
    slug: "kutchi-dabeli-masala-papdi",
    name: "Kutchi Dabeli Masala Papdi",
    description:
      "Kutch's dabeli spices layered over crisp papdi with peanuts and pomegranate-style sweetness. Street flavours in a ready-to-eat pack.",
    category: "Kutch Special",
    image: "/images/products/kutchi-dabeli-masala-papdi.png",
    packSizes: [
      { size: "300g", price: 90, wholesalePrice: 78 },
      { size: "600g", price: 170, wholesalePrice: 150 },
    ],
    minimumWholesaleQuantity: 8,
    isAvailable: true,
    isFeatured: false,
    isBestseller: false,
    tags: ["Kutchi Special"],
  },
  {
    id: "far-006",
    slug: "chevdo-namkeen",
    name: "Chevdo Namkeen",
    description:
      "Classic Gujarati chevdo with potato threads, sev, cashews and raisins. Light, sweet-salty and endlessly snackable.",
    category: "Saurashtra Special",
    image: "/images/products/chevdo-namkeen.png",
    packSizes: [
      { size: "250g", price: 85, wholesalePrice: 74 },
      { size: "500g", price: 165, wholesalePrice: 145 },
    ],
    minimumWholesaleQuantity: 8,
    isAvailable: true,
    isFeatured: false,
    isBestseller: false,
    tags: ["Family Pack"],
  },
  {
    id: "far-007",
    slug: "vanela-gathiya",
    name: "Vanela Gathiya",
    description:
      "Rolled, soft vanela gathiya, the Jamnagar style that stays fresh for hours. Comes with fried chillies and papdi on the side.",
    category: "Saurashtra Special",
    image: "/images/products/vanela-gathiya.png",
    packSizes: [
      { size: "400g", price: 98, wholesalePrice: 85 },
      { size: "800g", price: 188, wholesalePrice: 165 },
    ],
    minimumWholesaleQuantity: 8,
    isAvailable: false,
    isFeatured: false,
    isBestseller: false,
    tags: ["Soft", "Jamnagar Style"],
  },
];

/* ---------- helpers (used across the site) ---------- */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller && p.isAvailable);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.isFeatured && p.isAvailable);
}

export function getRelated(product: Product, count = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id && p.isAvailable
  );
  const rest = products.filter(
    (p) => p.category !== product.category && p.id !== product.id && p.isAvailable
  );
  return [...sameCategory, ...rest].slice(0, count);
}

/** Base (first) pack, used for "from ₹x" display and sorting */
export function getBasePrice(product: Product): number {
  return product.packSizes[0]?.price ?? 0;
}

export function getPack(product: Product, size: string): PackSize | undefined {
  return product.packSizes.find((ps) => ps.size === size);
}
