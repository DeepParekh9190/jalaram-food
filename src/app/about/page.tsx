import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, Leaf, Users } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `${siteConfig.brandName} brings authentic Gujarati and Kutchi snacks from trusted local halwais to homes and shops across India.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-charcoal">About {siteConfig.brandName}</h1>
        <p className="font-gujarati mt-2 text-lg text-brown">સ્વાદમાં અસલિયાત, સેવામાં ભરોસો.</p>
      </header>

      <Image
        src="/images/brand-story.jpg"
        alt="Traditional Gujarati snack preparation"
        width={1000}
        height={560}
        priority
        className="mt-10 w-full rounded-[2.5rem] shadow-md"
      />

      <div className="mt-10 space-y-5 leading-relaxed text-charcoal/70">
        <p>
          {siteConfig.brandName} is a family-run namkeen business from Rajkot, Gujarat. We
          buy fresh sev, gathiya, fafda and other farsan in bulk from trusted halwais in
          Saurashtra and Kutch, and deliver them to retail customers and wholesale buyers
          across the region.
        </p>
        <p>
          Every product we list follows the same rule: it must taste like it came from the
          best local farsan shop — soft gathiya that stays fresh for hours, sev that
          crackles, and spice blends that respect the original recipes. We never sit on
          stock; small batches mean what reaches you is days old, not weeks.
        </p>
        <p>
          We serve two kinds of customers: families who want their evening chai companion,
          and shopkeepers, caterers and event organisers who need reliable wholesale
          supply at fair prices. Both get the same care.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {[
          { icon: Award, title: "Authenticity", text: "Traditional recipes, no shortcuts." },
          { icon: Leaf, title: "Freshness", text: "Small batches, quick dispatch." },
          { icon: Users, title: "Both Retail & Wholesale", text: "One pack or one hundred — same care." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-cream-dark">
            <Icon className="mx-auto h-6 w-6 text-brand" aria-hidden />
            <h2 className="mt-3 font-bold text-charcoal">{title}</h2>
            <p className="mt-1 text-sm text-charcoal/60">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/products"
          className="inline-block rounded-full bg-brand px-8 py-3.5 font-bold text-white shadow-md hover:bg-brand-dark"
        >
          Explore Our Snacks
        </Link>
      </div>
    </div>
  );
}
