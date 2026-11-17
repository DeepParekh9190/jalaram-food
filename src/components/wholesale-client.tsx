"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { products } from "@/data/products";
import { whatsappConfig } from "@/data/site-config";
import { buildWhatsAppUrl, isValidWhatsAppNumber, normalizeCity } from "@/lib/whatsapp";

type Errors = Partial<Record<"name" | "mobile" | "city" | "quantity" | "products", string>>;

export function WholesaleClient() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    city: "",
    mobile: "",
    quantity: "",
    requirements: "",
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  function toggleProduct(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Errors = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!/^(\+?91[- ]?)?[0-9]{10}$/.test(form.mobile.replace(/[- ]/g, "")))
      errs.mobile = "Enter a valid 10-digit mobile number.";
    if (!form.city.trim()) errs.city = "Please enter your city.";
    if (!form.quantity.trim() || !/^[0-9]+$/.test(form.quantity.trim()) || Number(form.quantity) < 1)
      errs.quantity = "Enter the quantity you need (e.g. 25).";
    if (selected.length === 0) errs.products = "Select at least one product.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const chosen = products.filter((p) => selected.includes(p.id));
    const lines = chosen
      .map(
        (p) =>
          `- ${p.name} (${p.packSizes.map((ps) => ps.size).join(", ")}), wholesale rate ${
            psPrice(p)
          }`
      )
      .join("\n");
    const message = [
      "Hello, I would like to send a wholesale enquiry.",
      "",
      "Enquiry Details:",
      `Name: ${form.name.trim()}`,
      form.business.trim() ? `Business / Shop: ${form.business.trim()}` : null,
      `City: ${form.city.trim()}`,
      `Mobile: ${form.mobile.trim()}`,
      `Required Quantity: ${form.quantity.trim()} packs/cartons`,
      "",
      "Products of Interest:",
      lines,
      form.requirements.trim() ? `\nAdditional Requirements: ${form.requirements.trim()}` : null,
      "",
      "Please share wholesale rates and delivery details. Thank you!",
    ]
      .filter((l) => l !== null)
      .join("\n");

    // Wholesale enquiries go to the dedicated wholesale number from site-config
    const number = whatsappConfig.wholesaleNumber;
    if (!isValidWhatsAppNumber(number)) {
      setErrors({ products: "WhatsApp number is not configured. Please contact us directly." });
      return;
    }
    window.open(buildWhatsAppUrl(number, message), "_blank", "noopener");
  }

  function psPrice(p: (typeof products)[number]): string {
    return p.packSizes
      .filter((ps) => ps.wholesalePrice != null)
      .map((ps) => `${ps.size} ₹${ps.wholesalePrice}`)
      .join(" / ");
  }

  const cities = normalizeCity(form.city);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cream-dark sm:p-8"
      aria-label="Wholesale enquiry form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="w-name"
          label="Your Name"
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          error={errors.name}
          placeholder="e.g. Ramesh Patel"
        />
        <Input
          id="w-business"
          label="Business / Shop Name (optional)"
          value={form.business}
          onChange={(v) => setForm((f) => ({ ...f, business: v }))}
          placeholder="e.g. Patel Farsan Mart"
        />
        <Input
          id="w-city"
          label="City"
          value={form.city}
          onChange={(v) => setForm((f) => ({ ...f, city: v }))}
          error={errors.city}
          placeholder="e.g. Jamnagar"
          hint={cities === "rajkot" ? "Great, our Rajkot team serves you directly." : undefined}
        />
        <Input
          id="w-mobile"
          label="Mobile Number"
          value={form.mobile}
          onChange={(v) => setForm((f) => ({ ...f, mobile: v }))}
          error={errors.mobile}
          type="tel"
          placeholder="e.g. 98765 43210"
        />
        <Input
          id="w-quantity"
          label="Required Quantity"
          value={form.quantity}
          onChange={(v) => setForm((f) => ({ ...f, quantity: v }))}
          error={errors.quantity}
          placeholder="e.g. 25 packs"
        />
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-charcoal">Products You Need</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {products
            .filter((p) => p.isAvailable)
            .map((p) => (
              <label
                key={p.id}
                className={
                  selected.includes(p.id)
                    ? "flex cursor-pointer items-center gap-2 rounded-xl border-2 border-brand bg-brand/10 px-3 py-2 text-xs font-semibold text-brand"
                    : "flex cursor-pointer items-center gap-2 rounded-xl border border-cream-dark bg-cream px-3 py-2 text-xs font-medium text-charcoal hover:border-brand"
                }
              >
                <input
                  type="checkbox"
                  checked={selected.includes(p.id)}
                  onChange={() => toggleProduct(p.id)}
                  className="accent-brand"
                />
                {p.name}
              </label>
            ))}
        </div>
        {errors.products && (
          <p className="mt-1 text-xs font-semibold text-red-600">{errors.products}</p>
        )}
      </fieldset>

      <div className="mt-5">
        <label htmlFor="w-requirements" className="text-sm font-semibold text-charcoal">
          Additional Requirements (optional)
        </label>
        <textarea
          id="w-requirements"
          value={form.requirements}
          onChange={(e) => setForm((f) => ({ ...f, requirements: e.target.value }))}
          rows={3}
          placeholder="Delivery schedule, packaging needs, GST details…"
          className="mt-1 w-full rounded-xl border border-cream-dark bg-cream px-3.5 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-bold text-white shadow-md transition-colors hover:bg-[#1fb955] sm:w-auto sm:px-10"
      >
        <Send className="h-5 w-5" aria-hidden />
        Send Wholesale Enquiry on WhatsApp
      </button>
      <p className="mt-3 text-xs text-charcoal/50">
        WhatsApp opens with your enquiry prefilled, press Send there to submit. Our team
        replies with wholesale rates and delivery timelines.
      </p>
    </form>
  );
}

function Input({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-charcoal">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={
          error
            ? "mt-1 w-full rounded-xl border-2 border-red-400 bg-white px-3.5 py-2.5 text-sm focus:border-red-500 focus:outline-none"
            : "mt-1 w-full rounded-xl border border-cream-dark bg-cream px-3.5 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        }
      />
      {hint && !error && <p className="mt-1 text-xs text-charcoal/50">{hint}</p>}
      {error && <p className="mt-1 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}
