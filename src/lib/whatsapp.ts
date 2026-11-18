/**
 * WhatsApp Click-to-Chat helpers (Phases 9 & 10).
 * The site never claims auto-submission or payment, clicking the
 * button only opens WhatsApp with a prefilled message, which the
 * customer still has to press Send on.
 */
import {
  deliveryPolicy,
  deliveryZones,
  rajkotCityName,
  siteConfig,
  whatsappConfig,
} from "../data/site-config.ts";
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
  state: string;
  city: string;
  pincode: string;
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

/** True when the selected city gets same-day delivery (Rajkot) */
export function isRajkotCity(city: string): boolean {
  return normalizeCity(city) === rajkotCityName;
}

/** Rajkot & Bhuj share the lower free-delivery threshold */
export function isLocalDeliveryCity(city: string): boolean {
  const normalized = normalizeCity(city);
  return (
    normalized === rajkotCityName ||
    normalized === "bhuj" ||
    normalized === "bhuj (kutch)"
  );
}

/** Pack labels like "500g", "1kg", "1.2kg Box" → grams */
export function packWeightGrams(size: string): number {
  const match = size.match(/([\d.]+)\s*(kg|g)/i);
  if (!match) return 0;
  return Math.round(Number(match[1]) * (match[2].toLowerCase() === "kg" ? 1000 : 1));
}

/** Total shipping weight of a cart, in grams */
export function getCartWeightGrams(lines: CartLine[]): number {
  return lines.reduce(
    (sum, line) => sum + packWeightGrams(line.size) * line.quantity,
    0
  );
}

/** ₹30/kg (rounded up to whole kg) unless a free-delivery threshold is met */
export function getDeliveryCharge(
  city: string,
  orderTotal: number,
  weightGrams: number
): number {
  if (isLocalDeliveryCity(city) && orderTotal > deliveryPolicy.localFreeAbove) return 0;
  if (orderTotal > deliveryPolicy.indiaFreeAbove) return 0;
  return Math.ceil(weightGrams / 1000) * deliveryPolicy.perKg;
}

/** Delivery info for the selected city, used in the checkout UI */
export function getDeliveryZone(city: string) {
  const normalized = normalizeCity(city);
  if (normalized === rajkotCityName) return deliveryZones.rajkot;
  if (normalized === "bhuj" || normalized === "bhuj (kutch)") return deliveryZones.bhuj;
  return deliveryZones.other;
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

/** Stable, short reference derived from the cart contents */
export function orderRefFor(lines: CartLine[]): string {
  const seed = lines.map((l) => `${l.productId}|${l.size}|${l.quantity}`).join(";");
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return `JF-${(hash % 9000) + 1000}`;
}

/** Structured order message, matching the on-page order bill */
export function buildOrderMessage(
  customer: CustomerDetails,
  lines: CartLine[],
  ref: string = orderRefFor(lines)
): string {
  const resolved = lines
    .map((l) => {
      const r = resolveLine(l);
      return r ? { line: l, ...r } : null;
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const totalItems = resolved.reduce((sum, l) => sum + l.line.quantity, 0);
  const total = resolved.reduce((sum, l) => sum + l.lineTotal, 0);
  const weightGrams = getCartWeightGrams(lines);
  const deliveryCharge = getDeliveryCharge(customer.city, total, weightGrams);
  const billedKg = Math.ceil(weightGrams / 1000);

  const itemLines = resolved
    .map(
      (l, i) =>
        `${i + 1}) ${l.product.name} — ${l.pack.size}\n   ₹${l.unitPrice} × ${
          l.line.quantity
        } = ₹${l.lineTotal}`
    )
    .join("\n");

  const deliveryLabel =
    deliveryCharge === 0
      ? "FREE"
      : `₹${deliveryCharge} (${billedKg} kg × ₹${deliveryPolicy.perKg})`;

  const message = [
    `🛒 NEW ORDER — ${siteConfig.brandName}`,
    `Ref: ${ref} · ${new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    })}`,
    "",
    "CUSTOMER",
    `Name: ${customer.name}`,
    `Mobile: ${customer.mobile}`,
    `State: ${customer.state}`,
    `City: ${customer.city}`,
    `PIN: ${customer.pincode}`,
    `Address: ${customer.address}`,
    customer.instructions ? `Instructions: ${customer.instructions}` : null,
    "",
    "ITEMS",
    itemLines,
    "",
    `Total items: ${totalItems}`,
    `Total weight: ${(weightGrams / 1000).toFixed(2)} kg`,
    `Item total: ₹${total}`,
    `Delivery: ${deliveryLabel}`,
    `PAYABLE: ₹${total + deliveryCharge}`,
    "",
    getDeliveryZone(customer.city).message,
    "",
    "Please confirm stock, delivery date and final amount.",
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
  lines: CartLine[],
  ref?: string
): boolean {
  const number = getWhatsAppNumber(customer.city);
  if (!isValidWhatsAppNumber(number)) return false; // never expose a bad number
  const url = buildWhatsAppUrl(number, buildOrderMessage(customer, lines, ref));
  window.open(url, "_blank", "noopener");
  return true;
}
