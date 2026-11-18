# Jalaram Food, Gujarati & Kutchi Snacks Website (Sample)

A premium, mobile-first sample e-commerce website for a Gujarati and Kutchi snacks
business, built for client presentation. **No database, no backend, no environment
variables**, everything is editable from two data files, and orders are received
through WhatsApp Click-to-Chat.

> All branding, prices, images and email address are sample placeholders; the WhatsApp numbers are the client's real ones.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- lucide-react icons
- React Context + localStorage (cart only)

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build (Vercel-compatible)
npm start        # run the production build
npm run verify   # automated self-checks of prices, routing and messages
```

## Where Things Live

```
src/
  data/
    products.ts        ← ALL products & prices (the one file the client edits)
    site-config.ts     ← brand name, logo, contacts, WhatsApp numbers, delivery info
  lib/
    whatsapp.ts        ← city routing + WhatsApp message builder
    utils.ts           ← ₹ formatting and helpers
  components/          ← header, footer, product card, cart, forms
  app/                 ← pages: home, /products, /products/[slug], /cart,
                          /wholesale, /about, /contact
public/images/          ← product and category photos
```

---

## Client Update Guide (no programming needed)

### 1. Change the brand name
Open `src/data/site-config.ts`, change `brandName` (and `tagline` / `description`
if you like). Save.

### 2. Replace the logo (currently none, name-only header and footer)
The header and footer show only the brand name as text and the browser icon is a
simple snack-bowl glyph (`src/app/icon.svg`) because the client does not have a
logo yet. When a real logo exists:
1. Put the file in `public/images/logo.png`.
2. Add `logo: "/images/logo.png"` to `site-config.ts`.
3. Show it next to the name in `src/components/header.tsx` and `footer.tsx` with an
   `<Image>`, and replace `src/app/icon.svg` with the real favicon.

### 3. Add a new snack
Open `src/data/products.ts`, copy any existing product block, and edit:

```ts
{
  id: "sev-004",                    // any unique id
  slug: "new-sev",                  // the URL: /products/new-sev (unique, lowercase)
  name: "New Sev",
  description: "Your description here.",
  category: "Saurashtra Special",   // one of the categories listed above the array
  image: "/images/products/new-sev.png",      // put the photo in public/images/products/
  packSizes: [
    { size: "250g", price: 65, wholesalePrice: 55 },
    { size: "500g", price: 125 },
  ],
  minimumWholesaleQuantity: 10,
  isAvailable: true,                // false → shows "Currently Unavailable"
  isFeatured: false,
  isBestseller: false,              // true → appears in the homepage Bestsellers
  tags: ["Popular"],
}
```

### 4. Remove a snack
Delete its whole block from `products.ts`. Anything left in a customer's cart for it
is simply dropped automatically.

### 5. Change a price (or 6. pack sizes / 7. images)
Open `src/data/products.ts`, find the product, and edit the numbers:

```ts
packSizes: [
  { size: "250g", price: 65, wholesalePrice: 55 },  // price in ₹
  { size: "500g", price: 125 },                     // add/remove sizes freely
],
```

The new price appears **everywhere automatically**, product cards, the product
page, the cart and the WhatsApp order message. Nothing else to change.

To update a photo: replace the file in `public/images/products/` keeping the same
filename (e.g. `nylon-sev.png` → put a real photo with the same name and update
the `image:` path in `products.ts`).

### 8. Change the WhatsApp number
Open `src/data/site-config.ts`:

```ts
export const whatsappConfig = {
  whatsappNumber: "919327012723",  // official number, used across the site
  rajkotNumber: "919327012723",    // city route
  otherCitiesNumber: "919327012723", // courier route
  wholesaleNumber: "919327012723",  // wholesale enquiries
};
```

Use digits only with country code (e.g. `91` + 10-digit number). All routes and
buttons currently point at the single official number; change them together.

### 9. Update business contact details
Same file: `phone`, `email`, `address`, `instagram`, `deliveryInfo`, `hours`.

### 10. Deploy the updated website
1. Push the changed files to the GitHub repository.
2. Vercel rebuilds and publishes automatically (connect the repo once at
   vercel.com → New Project → Import).
3. After deploying, update the domain in `src/app/sitemap.ts`, `src/app/robots.ts`
   and `metadataBase` in `src/app/layout.tsx`.

### 11. Delivery charges & zones
`deliveryPolicy` in `src/data/site-config.ts` holds the rules: free all over India
above ₹2,000, free in Rajkot & Bhuj above ₹500, otherwise ₹30 per kg of total
order weight (rounded up to the next kg). The checkout dropdown and the WhatsApp
message both use these rules. Edit the text in `deliveryZones` there as needed.

### 12. Enable Google Analytics (optional)
Analytics is wired up but off by default. Paste your GA4 measurement ID
(`G-XXXXXXXXXX` from analytics.google.com) into `gaMeasurementId` in
`src/data/site-config.ts` and redeploy. No other step is needed.

**That's the whole maintenance model:** edit the two files in `src/data/`,
push to GitHub, Vercel redeploys. There is no admin panel by design, with no
database, editing the data file is the safe, honest way to keep the site accurate.

---

## How Ordering Works

1. Customer adds snacks to the cart (pack size selectable per product, price
   updates with the pack).
2. On the cart page they enter name, mobile, city, address.
3. "Place Order on WhatsApp" opens WhatsApp with a formatted order message,
   including the order weight, delivery charges and payable total.
4. The customer presses **Send** in WhatsApp; the team confirms delivery and
   payment manually. Nothing is auto-submitted or paid online.

## Notes

- Images in `public/images/` are sample photos; replace them with real ones.
- `npm run verify` re-checks price integrity, delivery rules and message formatting
  after any data edits.
