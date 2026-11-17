/**
 * ============================================================
 * BUSINESS CONFIGURATION, edit this file to update the website
 * ============================================================
 * Everything here (brand name, contacts, WhatsApp numbers,
 * delivery info) is sample content for the client presentation.
 * Change the values and redeploy, no other code needs editing.
 *
 * NOTE: no logo is used yet, the client does not have one. The
 * header and footer show only the brand name as text, and the
 * favicon is a simple snack-bowl glyph. When a real logo exists,
 * add a `logo` path back here.
 */

export const siteConfig = {
  /** Brand name shown in header, footer, metadata */
  brandName: "Jalaram Food",
  /** Tagline used in metadata and footer */
  tagline: "Authentic Gujarati & Kutchi Namkeen",
  /** Short business description for footer / about */
  description:
    "Traditional Gujarati and Kutchi snacks like sev, gathiya, fafda and more, made fresh in small batches with quality ingredients.",

  /** Contact details */
  phone: "+91 70284 64273",
  email: "orders@jalaramfood.example",
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
 * Rajkot city orders go to the city team number, every other
 * location goes to the dispatch number.
 * Format: country code + number, digits only.
 */
export const whatsappConfig = {
  /** Number A: orders from RAJKOT customers */
  rajkotNumber: "917028464273",
  /** Number B: orders from every other city */
  otherCitiesNumber: "919727019097",
  /** Wholesale / bulk enquiries (Phase 11) */
  wholesaleNumber: "917028464273",
} as const;

/** Cities that route to the Rajkot number (compare lowercase after trim) */
export const rajkotCityName = "rajkot";

/**
 * City list for the checkout location dropdown.
 * The first option (Rajkot) routes to the city team number,
 * all others (and "Other") route to the dispatch number.
 */
export const deliveryCities = [
  "Rajkot",
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Bhavnagar",
  "Jamnagar",
  "Junagadh",
  "Gandhinagar",
  "Anand",
  "Morbi",
  "Surendranagar",
  "Bhuj (Kutch)",
  "Porbandar",
  "Amreli",
  "Gondal",
  "Jetpur",
  "Other",
] as const;

/**
 * City-aware delivery info, shown in the checkout once a city is
 * selected and added to the WhatsApp order message.
 */
export const deliveryZones = {
  rajkot: {
    label: "Same-day delivery in Rajkot",
    detail: "Free delivery in Rajkot on orders above Rs. 500.",
    message: "Delivery: Same day (Rajkot city team). Free above Rs. 500.",
  },
  other: {
    label: "Courier delivery, 2 to 4 days",
    detail: "Delivered by courier anywhere in Gujarat and across India.",
    message: "Delivery: Courier, 2 to 4 days (dispatch team).",
  },
} as const;

/** Google Analytics 4 measurement ID (paste "G-XXXXXXXXXX" to enable; empty = off) */
export const gaMeasurementId = "";
