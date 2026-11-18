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

/** Single source of truth for the delivery offer numbers and wording */
const deliveryThresholds = {
  india: 2000,
  local: 500,
  perKg: 30,
} as const;

export const deliveryOffers = {
  india: `Free delivery all over India on orders above ₹${deliveryThresholds.india.toLocaleString(
    "en-IN"
  )}`,
  local: `Rajkot & Bhuj — free delivery on orders above ₹${deliveryThresholds.local}`,
  perKg: `₹${deliveryThresholds.perKg} per kg, calculated on the total order weight`,
} as const;

export const siteConfig = {
  /** Brand name shown in header, footer, metadata */
  brandName: "Jalaram Food",
  /** Tagline used in metadata and footer */
  tagline: "Authentic Gujarati & Kutchi Namkeen",
  /** Short business description for footer / about */
  description:
    "Traditional Gujarati and Kutchi snacks like sev, gathiya, fafda and more, made fresh in small batches with quality ingredients.",

  /** Contact details */
  phone: "+91 93270 12723",
  email: "orders@jalaramfood.example",
  address: "Shop 12, Danapith Market, Rajkot, Gujarat 360001",

  /** Social links (placeholder) */
  instagram: "https://instagram.com/",
  whatsappCatalog: "https://wa.me/919327012723",

  /** Delivery information shown on cart / contact / product pages */
  deliveryInfo: [
    `${deliveryOffers.india}.`,
    `${deliveryOffers.local}.`,
    `For all other orders, delivery is ${deliveryOffers.perKg}.`,
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
  /** Official contact / WhatsApp number, used everywhere on the site */
  whatsappNumber: "919327012723",
  /** Kept for city-aware routing; both routes reach the official number */
  rajkotNumber: "919327012723",
  otherCitiesNumber: "919327012723",
  wholesaleNumber: "919327012723",
} as const;

/** Cities that route to the Rajkot number (compare lowercase after trim) */
export const rajkotCityName = "rajkot";

/** Cities offered as suggestions in checkout; customers may type any city */
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

/** Indian states and union territories for the checkout State dropdown */
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
] as const;

/** Delivery charge rules, shared by the UI and the WhatsApp order message */
export const deliveryPolicy = {
  indiaFreeAbove: deliveryThresholds.india,
  localFreeAbove: deliveryThresholds.local,
  perKg: deliveryThresholds.perKg,
} as const;

/**
 * City-aware delivery info, shown in the checkout once a city is
 * selected and added to the WhatsApp order message.
 */
export const deliveryZones = {
  rajkot: {
    label: "Same-day delivery in Rajkot",
    detail: `Free delivery in Rajkot on orders above ₹${deliveryPolicy.localFreeAbove}.`,
    message: `Delivery: Same day in Rajkot. Free above ₹${deliveryPolicy.localFreeAbove}, else ₹${deliveryPolicy.perKg}/kg by total weight.`,
  },
  bhuj: {
    label: "Courier delivery to Bhuj, 2 to 4 days",
    detail: `Free delivery in Bhuj on orders above ₹${deliveryPolicy.localFreeAbove}.`,
    message: `Delivery: Courier to Bhuj. Free above ₹${deliveryPolicy.localFreeAbove}, else ₹${deliveryPolicy.perKg}/kg by total weight.`,
  },
  other: {
    label: "Courier delivery, 2 to 4 days",
    detail: `${deliveryOffers.india}. Otherwise ${deliveryOffers.perKg}.`,
    message: `Delivery: Courier, 2 to 4 days. Free India above ₹${deliveryPolicy.indiaFreeAbove} (Bhuj above ₹${deliveryPolicy.localFreeAbove}), else ₹${deliveryPolicy.perKg}/kg by total weight.`,
  },
} as const;

/** Google Analytics 4 measurement ID (paste "G-XXXXXXXXXX" to enable; empty = off) */
export const gaMeasurementId = "";
