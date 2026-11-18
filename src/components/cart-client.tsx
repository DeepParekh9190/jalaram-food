"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import {
  openWhatsAppOrder,
  getDeliveryZone,
  getCartWeightGrams,
  getDeliveryCharge,
  type CustomerDetails,
} from "@/lib/whatsapp";
import { formatINR } from "@/lib/utils";
import { siteConfig, deliveryCities } from "@/data/site-config";

type FieldErrors = Partial<Record<keyof CustomerDetails, string>>;

function validate(customer: CustomerDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!customer.name.trim()) errors.name = "Please enter your name.";
  // Indian mobile numbers: 10 digits, optional +91/0 prefix
  if (!/^(\+?91[- ]?)?[0-9]{10}$/.test(customer.mobile.replace(/[- ]/g, "")))
    errors.mobile = "Enter a valid 10-digit mobile number.";
  if (!customer.city.trim()) errors.city = "Please select your city.";
  if (customer.address.trim().length < 10)
    errors.address = "Please enter your full delivery address.";
  return errors;
}

export function CartClient() {
  const { lines, rawLines, itemCount, total, setQuantity, remove, changeSize, clear } =
    useCart();
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: "",
    mobile: "",
    city: "",
    address: "",
    instructions: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [placed, setPlaced] = useState(false);

  const hasItems = lines.length > 0;

  const weightGrams = useMemo(() => getCartWeightGrams(rawLines), [rawLines]);
  const deliveryCharge = useMemo(
    () => getDeliveryCharge(customer.city, total, weightGrams),
    [customer.city, total, weightGrams]
  );

  const deliveryNote = useMemo(
    () =>
      siteConfig.deliveryInfo.map((info, i) => (
        <li key={i}>{info}</li>
      )),
    []
  );

  function handlePlaceOrder() {
    const validation = validate(customer);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setPlaced(false);
      return;
    }
    // Rajkot → Number A, other cities → Number B (handled inside the helper)
    const opened = openWhatsAppOrder(customer, rawLines);
    if (opened) {
      setPlaced(true);
      clear();
    } else {
      setErrors({ city: "WhatsApp number is not configured. Please contact us directly." });
    }
  }

  if (!hasItems && !placed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <ShoppingBag className="mx-auto h-16 w-16 text-charcoal/20" aria-hidden />
        <h1 className="mt-4 text-3xl font-bold text-charcoal">Your Cart is Empty</h1>
        <p className="mt-2 text-charcoal/60">
          Add some fresh namkeen and your evening chai will thank you.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-brand px-8 py-3.5 font-bold text-white shadow-md hover:bg-brand-dark"
        >
          Browse Our Snacks
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
          <Send className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-charcoal">Almost done: one tap left</h1>
        <p className="mt-3 text-charcoal/70">
          WhatsApp has opened with your order message ready. Press <strong>Send</strong> in
          WhatsApp and our team will confirm your order and delivery details shortly.
        </p>
        <p className="mt-2 text-sm text-charcoal/50">
          Note: the order is not placed automatically, you need to send the message in WhatsApp.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-brand px-8 py-3.5 font-bold text-white shadow-md hover:bg-brand-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-charcoal sm:text-4xl">Your Order</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Cart items */}
        <section aria-label="Cart items" className="lg:col-span-3">
          <ul className="space-y-4">
            {lines.map((line) => (
              <li
                key={line.key}
                className="flex gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-cream-dark"
              >
                <Image
                  src={line.product.image}
                  alt={line.product.name}
                  width={96}
                  height={96}
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/products/${line.product.slug}`}
                        className="font-semibold text-charcoal hover:text-brand"
                      >
                        {line.product.name}
                      </Link>
                      <p className="text-xs text-charcoal/50">{line.product.category}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.product.id, line.size)}
                      aria-label={`Remove ${line.product.name} from cart`}
                      className="rounded-full p-2 text-charcoal/40 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {/* Change pack size */}
                    <label className="sr-only" htmlFor={`size-${line.key}`}>
                      Pack size for {line.product.name}
                    </label>
                    <select
                      id={`size-${line.key}`}
                      value={line.size}
                      onChange={(e) => changeSize(line.product.id, line.size, e.target.value)}
                      className="rounded-full border border-cream-dark bg-cream px-3 py-1.5 text-xs font-semibold text-charcoal focus:border-brand focus:outline-none"
                    >
                      {line.product.packSizes.map((ps) => (
                        <option key={ps.size} value={ps.size}>
                          {ps.size}
                        </option>
                      ))}
                    </select>

                    {/* Quantity */}
                    <div className="flex items-center rounded-full border border-cream-dark">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.product.id, line.size, line.quantity - 1)}
                        aria-label={`Decrease quantity of ${line.product.name}`}
                        className="rounded-full p-2 hover:bg-gold/30"
                      >
                        <Minus className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.product.id, line.size, line.quantity + 1)}
                        aria-label={`Increase quantity of ${line.product.name}`}
                        className="rounded-full p-2 hover:bg-gold/30"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </div>

                    <span className="ml-auto text-sm font-bold text-charcoal">
                      {formatINR(line.lineTotal)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={clear}
            className="mt-4 flex items-center gap-1.5 text-sm text-charcoal/50 hover:text-red-600"
          >
            <X className="h-4 w-4" aria-hidden /> Clear cart
          </button>
        </section>

        {/* Summary + customer details */}
        <section aria-label="Order summary and customer details" className="lg:col-span-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cream-dark">
            <h2 className="font-bold text-charcoal">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-charcoal/60">Total items</dt>
                <dd className="font-semibold">{itemCount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal/60">Total weight</dt>
                <dd className="font-semibold">{(weightGrams / 1000).toFixed(2)} kg</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal/60">Delivery charges</dt>
                <dd className={`font-semibold ${deliveryCharge === 0 ? "text-brand" : "text-charcoal"}`}>
                  {deliveryCharge === 0 ? "FREE" : formatINR(deliveryCharge)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-cream-dark pt-3 text-base">
                <dt className="font-bold">Payable Total</dt>
                <dd className="font-extrabold text-brand">{formatINR(total + deliveryCharge)}</dd>
              </div>
            </dl>

            <div className="mt-4 rounded-2xl bg-gold/20 p-4 ring-1 ring-gold/60">
              <p className="text-xs font-bold uppercase tracking-wide text-charcoal/60">
                Delivery promise
              </p>
              <p className="mt-1 text-sm font-semibold text-charcoal">
                {deliveryCharge === 0
                  ? "You've unlocked FREE delivery on this order!"
                  : `Delivery is ₹30 per kg of total order weight. Free all over India above ₹2,000 and in Rajkot & Bhuj above ₹500.`}
              </p>
            </div>

            {/* Customer details */}
            <h2 className="mt-6 font-bold text-charcoal">Delivery Details</h2>
            <div className="mt-3 space-y-3">
              <Field
                label="Full Name"
                value={customer.name}
                error={errors.name}
                onChange={(v) => setCustomer((c) => ({ ...c, name: v }))}
                placeholder="e.g. Ramesh Patel"
                autoComplete="name"
              />
              <Field
                label="Mobile Number"
                value={customer.mobile}
                error={errors.mobile}
                onChange={(v) => setCustomer((c) => ({ ...c, mobile: v }))}
                placeholder="e.g. 98765 43210"
                type="tel"
                autoComplete="tel"
              />
              <CitySelect
                value={customer.city}
                error={errors.city}
                onChange={(v) => setCustomer((c) => ({ ...c, city: v }))}
              />
              <Field
                label="Full Delivery Address"
                value={customer.address}
                error={errors.address}
                onChange={(v) => setCustomer((c) => ({ ...c, address: v }))}
                placeholder="House / shop no., street, area, PIN code"
              />
              <Field
                label="Instructions (optional)"
                value={customer.instructions ?? ""}
                onChange={(v) => setCustomer((c) => ({ ...c, instructions: v }))}
                placeholder="e.g. Deliver after 6 PM"
              />
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-bold text-white shadow-md transition-colors hover:bg-[#1fb955]"
            >
              <Send className="h-5 w-5" aria-hidden />
              Place Order on WhatsApp
            </button>

            <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-charcoal/50">{deliveryNote}</ul>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  autoComplete,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
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
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={
          error
            ? "mt-1 w-full rounded-xl border-2 border-red-400 bg-white px-3.5 py-2.5 text-sm focus:border-red-500 focus:outline-none"
            : "mt-1 w-full rounded-xl border border-cream-dark bg-cream px-3.5 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        }
      />
      {hint && !error && <p className="mt-1 text-xs text-charcoal/50">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Location dropdown: Rajkot routes to the city team, all others to dispatch */
function CitySelect({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const zone = getDeliveryZone(value);
  return (
    <div>
      <label htmlFor="city" className="text-sm font-semibold text-charcoal">
        City / Location
      </label>
      <select
        id="city"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "city-error" : undefined}
        className={
          error
            ? "mt-1 w-full rounded-xl border-2 border-red-400 bg-white px-3.5 py-2.5 text-sm focus:border-red-500 focus:outline-none"
            : "mt-1 w-full rounded-xl border border-cream-dark bg-cream px-3.5 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        }
      >
        <option value="">Select your city</option>
        {deliveryCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs text-charcoal/50">
        Rajkot &amp; Bhuj: free above ₹500. All other locations: free above ₹2,000, otherwise
        ₹30 per kg of total order weight.
      </p>
      {value && !error && (
        <div className="mt-2 rounded-xl bg-white px-3.5 py-2.5 text-sm text-charcoal ring-1 ring-gold/60">
          <span className="font-bold">{zone.label}:</span> {zone.detail}
        </div>
      )}
      {error && (
        <p id="city-error" className="mt-1 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
