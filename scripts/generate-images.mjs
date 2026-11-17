/**
 * Regenerates the remaining sample SVG placeholder images
 * (products that had no suitable photo on the reference site).
 * Run: node scripts/generate-images.mjs
 * All other product/category photos are real images in public/images.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const img = (...p) => join(root, "public", "images", ...p);

const P = {
  brand: "#E8820C", // saffron
  cream: "#FFF9F0",
  creamDark: "#F3E7D3",
  brown: "#4A2A12",
  gold: "#F4C44E",
};

function wavySnack(cx, cy, r, color) {
  let s = `<g stroke="${color}" stroke-width="7" stroke-linecap="round" fill="none">`;
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * r * 0.35;
    const y1 = cy + Math.sin(a) * r * 0.35;
    const x2 = cx + Math.cos(a + 0.7) * r * 0.85;
    const y2 = cy + Math.sin(a + 0.7) * r * 0.85;
    s += `<path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - r * 0.25} ${x2} ${y2}"/>`;
  }
  return s + "</g>";
}

function plate(title, accent, w = 800, h = 600) {
  const cx = w / 2;
  const cy = h / 2 + h * 0.06;
  const r = Math.min(w, h) * 0.27;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
<defs><clipPath id="c"><rect width="${w}" height="${h}" rx="${Math.min(w, h) * 0.12}"/></clipPath></defs>
<g clip-path="url(#c)">
<rect width="${w}" height="${h}" fill="${P.cream}"/>
<circle cx="${w * 0.85}" cy="${h * 0.12}" r="${h * 0.16}" fill="${P.gold}" opacity="0.35"/>
<circle cx="${w * 0.1}" cy="${h * 0.9}" r="${h * 0.12}" fill="${P.brown}" opacity="0.15"/>
<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.45}" ry="${r * 0.62}" fill="#ffffff" stroke="${P.creamDark}" stroke-width="4"/>
<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.15}" ry="${r * 0.45}" fill="${P.creamDark}" opacity="0.6"/>
${wavySnack(cx, cy, r, accent)}
<rect x="16" y="16" rx="10" width="${w * 0.36}" height="30" fill="${P.brown}" opacity="0.75"/>
<text x="28" y="37" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff">SAMPLE IMAGE</text>
<text x="${cx}" y="${h * 0.93}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.max(16, w * 0.05)}" font-weight="bold" fill="${P.charcoal || P.brown}">${title}</text>
</g></svg>`;
}

writeFileSync(img("products", "fafda.svg"), plate("Fafda Combo", P.gold));
writeFileSync(img("products", "festival-hamper.svg"), plate("Festival Hamper", P.brand));
console.log("Regenerated placeholder SVGs (fafda, festival-hamper)");
