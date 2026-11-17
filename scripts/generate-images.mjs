/**
 * One-time generator for the sample SVG placeholder images.
 * Replace files in public/images/ with real photography (keep the
 * same filenames) and this script is no longer needed.
 * Run: node scripts/generate-images.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const img = (...p) => join(root, "public", "images", ...p);

const PALETTE = {
  orange: "#E87524",
  cream: "#FFF8EC",
  creamDark: "#F0E6D2",
  green: "#244B35",
  gold: "#F4C44E",
  charcoal: "#252525",
};

function wavySnack(cx, cy, r, color) {
  // stylised pile of crispy strands
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

function roundDots(cx, cy, r, color) {
  let s = `<g fill="${color}">`;
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    s += `<circle cx="${cx + Math.cos(a) * r}" cy="${cy + Math.sin(a) * r * 0.7}" r="${
      10 + (i % 3) * 3
    }"/>`;
  }
  return s + "</g>";
}

function plateSVG({ w, h, title, accent, snackType = "wavy", label = true }) {
  const cx = w / 2;
  const cy = h / 2 + h * 0.06;
  const r = Math.min(w, h) * 0.27;
  const snack =
    snackType === "wavy"
      ? wavySnack(cx, cy, r, accent)
      : snackType === "dots"
        ? roundDots(cx, cy, r, accent)
        : wavySnack(cx, cy, r, accent) + roundDots(cx - r * 0.9, cy + r * 0.6, r * 0.35, PALETTE.green);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
<defs><clipPath id="c"><rect width="${w}" height="${h}" rx="${Math.min(w, h) * 0.12}"/></clipPath></defs>
<g clip-path="url(#c)">
<rect width="${w}" height="${h}" fill="${PALETTE.cream}"/>
<circle cx="${w * 0.85}" cy="${h * 0.12}" r="${h * 0.16}" fill="${PALETTE.gold}" opacity="0.35"/>
<circle cx="${w * 0.1}" cy="${h * 0.9}" r="${h * 0.12}" fill="${PALETTE.green}" opacity="0.15"/>
<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.45}" ry="${r * 0.62}" fill="#ffffff" stroke="${PALETTE.creamDark}" stroke-width="4"/>
<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.15}" ry="${r * 0.45}" fill="${PALETTE.creamDark}" opacity="0.6"/>
${snack}
${
  label
    ? `<rect x="16" y="16" rx="10" width="${w * 0.36}" height="30" fill="${PALETTE.charcoal}" opacity="0.75"/>
<text x="28" y="37" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff">SAMPLE IMAGE</text>
<text x="${cx}" y="${h * 0.93}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.max(
        16,
        w * 0.05
      )}" font-weight="bold" fill="${PALETTE.charcoal}">${title}</text>`
    : ""
}
</g></svg>`;
}

const productImages = [
  ["nylon-sev", "Nylon Sev", "wavy", PALETTE.gold],
  ["ratlami-sev", "Ratlami Sev", "wavy", PALETTE.orange],
  ["papdi-sev", "Papdi Sev Mixture", "mixed", PALETTE.gold],
  ["bhavnagari-gathiya", "Bhavnagari Gathiya", "dots", PALETTE.charcoal],
  ["tikha-gathiya", "Tikha Gathiya", "dots", PALETTE.orange],
  ["methi-gathiya", "Methi Gathiya", "dots", PALETTE.green],
  ["fafda", "Fafda Combo", "wavy", PALETTE.gold],
  ["chana-dal", "Chana Dal Namkeen", "dots", PALETTE.orange],
  ["masala-peanuts", "Masala Peanuts", "dots", PALETTE.charcoal],
  ["khakhra", "Classic Khakhra", "wavy", PALETTE.gold],
  ["dabeli-papdi", "Kutchi Dabeli Papdi", "mixed", PALETTE.orange],
  ["chevdo", "Chevdo Namkeen", "mixed", PALETTE.gold],
  ["vanela-gathiya", "Vanela Gathiya", "dots", PALETTE.green],
  ["festival-hamper", "Festival Hamper", "mixed", PALETTE.orange],
  ["chai-time-combo", "Chai Time Combo", "mixed", PALETTE.gold],
  ["spicy-lovers-box", "Spicy Lovers Box", "mixed", PALETTE.orange],
];

const categoryImages = [
  ["sev", "Sev", "wavy", PALETTE.gold],
  ["gathiya", "Gathiya", "dots", PALETTE.charcoal],
  ["farsan", "Farsan", "mixed", PALETTE.gold],
  ["spicy", "Spicy Snacks", "mixed", PALETTE.orange],
  ["traditional", "Traditional Snacks", "dots", PALETTE.green],
  ["combos", "Special Combos", "mixed", PALETTE.orange],
];

// products (4:3)
mkdirSync(img("products"), { recursive: true });
for (const [file, title, type, color] of productImages) {
  writeFileSync(img("products", `${file}.svg`), plateSVG({ w: 800, h: 600, title, accent: color, snackType: type }));
}

// categories (4:3, larger text)
mkdirSync(img("categories"), { recursive: true });
for (const [file, title, type, color] of categoryImages) {
  writeFileSync(img("categories", `${file}.svg`), plateSVG({ w: 400, h: 300, title, accent: color, snackType: type }));
}

// hero
writeFileSync(
  img("hero.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700">
<defs><clipPath id="c"><rect width="900" height="700" rx="40"/></clipPath></defs>
<g clip-path="url(#c)">
<rect width="900" height="700" fill="${PALETTE.cream}"/>
<circle cx="760" cy="120" r="180" fill="${PALETTE.gold}" opacity="0.4"/>
<circle cx="120" cy="620" r="140" fill="${PALETTE.green}" opacity="0.15"/>
<ellipse cx="450" cy="420" rx="330" ry="120" fill="#ffffff" stroke="${PALETTE.creamDark}" stroke-width="6"/>
<ellipse cx="450" cy="410" rx="260" ry="85" fill="${PALETTE.creamDark}" opacity="0.6"/>
${wavySnack(360, 400, 120, PALETTE.gold)}
${roundDots(560, 420, 80, PALETTE.orange)}
${wavySnack(470, 330, 55, PALETTE.charcoal)}
<rect x="60" y="60" rx="12" width="240" height="40" fill="${PALETTE.charcoal}" opacity="0.75"/>
<text x="80" y="88" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff">SAMPLE PHOTOGRAPHY</text>
</g></svg>`
);

// brand story
writeFileSync(img("brand-story.svg"), plateSVG({ w: 800, h: 560, title: "Made the Traditional Way", accent: PALETTE.orange, snackType: "mixed" }));

// logo
writeFileSync(
  img("logo.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
<circle cx="64" cy="64" r="60" fill="${PALETTE.orange}"/>
<circle cx="64" cy="70" r="34" fill="${PALETTE.gold}"/>
<circle cx="52" cy="62" r="4.5" fill="${PALETTE.charcoal}"/>
<circle cx="64" cy="54" r="4.5" fill="${PALETTE.charcoal}"/>
<circle cx="76" cy="62" r="4.5" fill="${PALETTE.charcoal}"/>
<path d="M52 80q12 10 24 0" stroke="${PALETTE.charcoal}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
<rect x="30" y="22" width="68" height="14" rx="7" fill="${PALETTE.green}"/>
</svg>`
);

console.log("Generated sample images in public/images/");
