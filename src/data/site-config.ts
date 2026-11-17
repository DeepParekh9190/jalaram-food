/**
 * ============================================================
 * BUSINESS CONFIGURATION — edit this file to update the website
 * ============================================================
 * Everything here (brand name, contacts, WhatsApp numbers,
 * delivery info) is sample content for the client presentation.
 * Change the values and redeploy — no other code needs editing.
 */

export const siteConfig = {
  /** Brand name shown in header, footer, metadata */
  brandName: "Swad Rani",
  /** Tagline used in metadata and footer */
  tagline: "Authentic Gujarati & Kutchi Namkeen",
  /** Short business description for footer / about */
  description:
    "Traditional Gujarati & Kutchi snacks — sev, gathiya, fafda and more — made fresh in small batches with quality ingredients.",
  /** Logo path in /public (replace public/images/logo.svg with the real logo, keep the same name) */
  logo: "/images/logo.svg",

  /** Contact details */
  phone: "+91 98765 43210",
  email: "orders@swadrani.example",
  address: "Shop 12, Danapith Market, Rajkot, Gujarat 360001",

  /** Social links (placeholder) */
  instagram: "https://instagram.com/",
  whatsappCatalog: "https://wa.me/919876543210",

  /** Delivery information shown on cart / contact pages */
  deliveryInfo: [
    "Free delivery within Rajkot city on orders above ₹500.",
    "Courier delivery across Gujarat in 2–4 days.",
    "Pan-India shipping available on bulk orders.",
  ],

  /** Open hours */
  hours: "Mon–Sat, 9:00 AM – 8:00 PM",
} as const;

/**
 * WhatsApp Click-to-Chat numbers (Phase 9 routing).
 * Placeholders — replace with the real business numbers.
 * Format: country code + number, digits only, e.g. "919876543210"
 */
export const whatsappConfig = {
  /** Number A — orders from RAJKOT customers */
  rajkotNumber: "919876543210",
  /** Number B — orders from every other city */
  otherCitiesNumber: "919812345678",
  /** Wholesale / bulk enquiries (Phase 11) */
  wholesaleNumber: "919876543210",
} as const;

/** Cities that route to the Rajkot number (compare lowercase after trim) */
export const rajkotCityName = "rajkot";
