/**
 * WhatsApp Click-to-Chat helpers (Phases 9 & 10).
 * The site never claims auto-submission or payment — clicking the
 * button only opens WhatsApp with a prefilled message, which the
 * customer still has to press Send on.
 */
import { rajkotCityName, whatsappConfig } from "../data/site-config.ts";
import { products } from "../data/products.ts";
import type { Product } from "@/data/products";

export type CartLine = {
  productId: string;
  size: string;
  quantity: number;
};

export type CustomerDetails = {
  name: string;
  mobile: string;
  city: string;
  address: string;
  instructions?: string;
};

/** Trim + lowercase city so "Rajkot", "RAJKOT", "rajkot" all match */
export function normalizeCity(city: string): string {
  return city.trim().toLowerCase();
}

/** Resolve Number A vs Number B from the city (Phase 9 routing) */
export function getWhatsAppNumber(city: string): string {
  return normalizeCity(city) === rajkotCityName
    ? whatsappConfig.rajkotNumber
    : whatsappConfig.otherCitiesNumber;
}

/** A number is usable only if it's 10–15 digits (optionally with country code) */
export function isValidWhatsAppNumber(number: string): boolean {
  return /^[0-9]{10,15}$/.test(number.trim());
}

/** Resolve current prices for a cart line directly from products.ts */
export function resolveLine(line: CartLine): {
  product: Product;
  pack: NonNullable<Product["packSizes"][number]>;
  unitPrice: number;
  lineTotal: number;
} | null {
  const product = products.find((p) => p.id === line.productId);
  const pack = product?.packSizes.find((ps) => ps.size === line.size);
  if (!product || !pack) return null; // product or pack removed from catalogue
  const unitPrice = pack.price;
  return { product, pack, unitPrice, lineTotal: unitPrice * line.quantity };
}

/** Build the WhatsApp message exactly as specified in Phase 10 */
export function buildOrderMessage(
  customer: CustomerDetails,
  lines: CartLine[]
): string {
  const resolved = lines
    .map((l) => {
      const r = resolveLine(l);
      return r ? { line: l, ...r } : null;
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const totalItems = resolved.reduce((sum, l) => sum + l.line.quantity, 0);
  const total = resolved.reduce((sum, l) => sum + l.lineTotal, 0);

  const itemLines = resolved
    .map(
      (l, i) =>
        `${i + 1}. ${l.product.name}\n   Pack: ${l.pack.size}\n   Quantity: ${l.line.quantity}\n   Price: ₹${l.lineTotal}`
    )
    .join("\n\n");

  const message = [
    "Hello, I would like to place an order.",
    "",
    "Customer Details:",
    `Name: ${customer.name}`,
    `Mobile: ${customer.mobile}`,
    `City: ${customer.city}`,
    `Address: ${customer.address}`,
    customer.instructions ? `Instructions: ${customer.instructions}` : null,
    "",
    "Order Details:",
    "",
    itemLines,
    "",
    `Total Items: ${totalItems}`,
    `Estimated Total: ₹${total}`,
    "",
    "Please confirm the order and delivery details.",
    "",
    "Thank you!",
  ]
    .filter((line) => line !== null)
    .join("\n");

  return message;
}

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Full flow: validate the resolved number, build the URL, open WhatsApp */
export function openWhatsAppOrder(
  customer: CustomerDetails,
  lines: CartLine[]
): boolean {
  const number = getWhatsAppNumber(customer.city);
  if (!isValidWhatsAppNumber(number)) return false; // never expose a bad number
  const url = buildWhatsAppUrl(number, buildOrderMessage(customer, lines));
  window.open(url, "_blank", "noopener");
  return true;
}
