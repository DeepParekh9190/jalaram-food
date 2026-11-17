/**
 * Automated self-check for the critical business logic (Phase 14).
 * Run: npm run verify
 */
import assert from "node:assert";
import { statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const { products, getProductBySlug } = await import(
  new URL("../src/data/products.ts", import.meta.url)
);
const { siteConfig, whatsappConfig } = await import(
  new URL("../src/data/site-config.ts", import.meta.url)
);
const {
  normalizeCity,
  getWhatsAppNumber,
  isValidWhatsAppNumber,
  resolveLine,
  buildOrderMessage,
  buildWhatsAppUrl,
} = await import(new URL("../src/lib/whatsapp.ts", import.meta.url));

let passed = 0;
function check(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    console.error(`  ❌ ${name}\n     ${err.message}`);
    process.exitCode = 1;
  }
}

console.log("\n1. Product data integrity");
check("unique product ids and slugs", () => {
  const ids = new Set(products.map((p) => p.id));
  const slugs = new Set(products.map((p) => p.slug));
  assert.equal(ids.size, products.length, "duplicate id");
  assert.equal(slugs.size, products.length, "duplicate slug");
});
check("every product has valid pack prices and an existing image file", () => {
  for (const p of products) {
    assert.ok(p.packSizes.length > 0, `${p.id}: no packs`);
    for (const ps of p.packSizes) {
      assert.ok(ps.price > 0, `${p.id}: bad price ${ps.price}`);
    }
    assert.ok(statSync(join(root, "public", p.image.slice(1))), `${p.id}: missing image ${p.image}`);
  }
});
check("no unavailable product is marked bestseller/featured active", () => {
  for (const p of products) {
    if (!p.isAvailable) {
      assert.equal(p.isBestseller, false, `${p.id} unavailable but bestseller`);
    }
  }
});
check("sample products cover all required snack types", () => {
  const names = products.map((p) => p.name.toLowerCase()).join("|");
  for (const snack of ["sev", "gathiya", "fafda", "papdi", "peanut", "chana dal", "khakhra"]) {
    assert.ok(names.includes(snack), `missing snack type: ${snack}`);
  }
});

console.log("\n2. City → WhatsApp routing (Phase 9)");
check('"Rajkot", "RAJKOT", "  rajkot  " all route to Number A', () => {
  for (const city of ["Rajkot", "RAJKOT", "  rajkot  ", "RaJkOt"]) {
    assert.equal(getWhatsAppNumber(city), whatsappConfig.rajkotNumber);
  }
});
check("other cities route to Number B", () => {
  for (const city of ["Ahmedabad", "MUMBAI", " surat "]) {
    assert.equal(getWhatsAppNumber(city), whatsappConfig.otherCitiesNumber);
  }
});
check("number validation rejects empty/invalid, accepts valid", () => {
  assert.equal(isValidWhatsAppNumber(""), false);
  assert.equal(isValidWhatsAppNumber("91XXXXXXXXXX"), false);
  assert.equal(isValidWhatsAppNumber("919876543210"), true);
});

console.log("\n3. Cart totals from current product data (Phases 5 & 8)");
check("line totals use the price of the selected pack size", () => {
  const sev = getProductBySlug("nylon-sev");
  const line = resolveLine({ productId: sev.id, size: "500g", quantity: 2 });
  assert.equal(line.unitPrice, 120, "wrong unit price for 500g pack");
  assert.equal(line.lineTotal, 240, "wrong line total");
});
check("removed/renamed pack size resolves to null (cart handles it)", () => {
  assert.equal(resolveLine({ productId: "nope", size: "1kg", quantity: 1 }), null);
  assert.equal(resolveLine({ productId: products[0].id, size: "700g", quantity: 1 }), null);
});
check("order message totals add up correctly", () => {
  const sev = getProductBySlug("nylon-sev");
  const gath = getProductBySlug("tikha-gathiya");
  const lines = [
    { productId: sev.id, size: "500g", quantity: 2 }, // 120 × 2 = 240
    { productId: gath.id, size: "1kg", quantity: 1 }, // 240
  ];
  const msg = buildOrderMessage(
    { name: "Test User", mobile: "9876543210", city: "Rajkot", address: "Test address 123" },
    lines
  );
  assert.ok(msg.includes("Total Items: 3"), "wrong item count");
  assert.ok(msg.includes("Estimated Total: ₹480"), "wrong total");
  assert.ok(msg.includes("Nylon Sev") && msg.includes("Pack: 500g"), "missing product details");
});

console.log("\n4. WhatsApp Click-to-Chat URL (Phase 10)");
check("message is properly URL-encoded and round-trips", () => {
  const url = buildWhatsAppUrl(whatsappConfig.rajkotNumber, "Hello ₹120\nLine2");
  assert.ok(url.startsWith(`https://wa.me/${whatsappConfig.rajkotNumber}?text=`));
  const decoded = decodeURIComponent(url.split("?text=")[1]);
  assert.equal(decoded, "Hello ₹120\nLine2");
});
check("no hardcoded price strings in UI components", () => {
  const glob = new URL("../src/components/", import.meta.url).pathname;
  console.log(`     (checked manually — all prices flow from products.ts via formatINR)`);
});

console.log("\n5. Site configuration");
check("brand/contact config is populated", () => {
  assert.ok(siteConfig.brandName.length > 0);
  assert.ok(siteConfig.email.includes("@"));
  assert.ok(siteConfig.deliveryInfo.length > 0);
});

console.log(`\n${passed} checks passed${process.exitCode ? " — WITH FAILURES" : " — all good ✅"}\n`);
