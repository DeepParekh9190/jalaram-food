import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.brandName} for orders, wholesale enquiries and feedback, on WhatsApp, phone or email.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-charcoal">Contact Us</h1>
        <p className="mt-2 text-charcoal/60">
          We are happy to help with orders, bulk enquiries and feedback.
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="space-y-4">
          <a
            href={`https://wa.me/${whatsappConfig.rajkotNumber}?text=${encodeURIComponent(
              "Hello, I have a question about your snacks."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-cream-dark transition-shadow hover:shadow-md"
          >
            <span className="rounded-2xl bg-[#25D366]/15 p-3 text-[#128C4A]">
              <MessageCircle className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="font-bold text-charcoal">WhatsApp (fastest)</p>
              <p className="text-sm text-charcoal/60">Message us your order or query directly.</p>
            </div>
          </a>

          <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-cream-dark">
            <span className="rounded-2xl bg-brand/15 p-3 text-brand">
              <Phone className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="font-bold text-charcoal">Phone</p>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="text-sm text-charcoal/60 hover:text-brand"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-cream-dark">
            <span className="rounded-2xl bg-brand/10 p-3 text-brand-dark">
              <Mail className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="font-bold text-charcoal">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="text-sm text-charcoal/60 hover:text-brand">
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-cream-dark">
            <span className="rounded-2xl bg-gold/30 p-3 text-brand-dark">
              <MapPin className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="font-bold text-charcoal">Shop Address</p>
              <p className="text-sm text-charcoal/60">{siteConfig.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-cream-dark">
            <span className="rounded-2xl bg-charcoal/10 p-3 text-charcoal">
              <Clock className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="font-bold text-charcoal">Open Hours</p>
              <p className="text-sm text-charcoal/60">{siteConfig.hours}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gold/25 p-8 text-charcoal">
          <h2 className="text-2xl font-bold">Want to order right away?</h2>
          <p className="mt-3 text-charcoal/70">
            Build your cart on the shop page and send the full order to us on WhatsApp, no
            account or online payment needed.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/products"
              className="rounded-full bg-brand px-6 py-3 text-center font-bold text-white hover:bg-brand-dark"
            >
              Start Shopping
            </Link>
            <Link
              href="/wholesale"
              className="rounded-full border-2 border-charcoal/30 px-6 py-3 text-center font-semibold hover:bg-white/60"
            >
              Wholesale / Bulk Enquiry
            </Link>
          </div>

          <h3 className="mt-8 font-bold">Delivery Information</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-charcoal/70">
            {siteConfig.deliveryInfo.map((info, i) => (
              <li key={i}>{info}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
