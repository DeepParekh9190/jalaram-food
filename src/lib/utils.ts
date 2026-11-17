import { categories } from "@/data/products";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a rupee amount, e.g. 120 -> "₹120" (INR everywhere, no decimals) */
export function formatINR(amount: number): string {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount)}`;
}

/** Check a category string is one of our known categories */
export function isCategory(value: string): boolean {
  return (categories as readonly string[]).includes(value);
}
