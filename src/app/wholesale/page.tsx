import type { Metadata } from "next";
import { Box, Handshake, Percent } from "lucide-react";
import { WholesaleClient } from "@/components/wholesale-client";

export const metadata: Metadata = {
  title: "Bulk & Wholesale Orders",
  description:
    "Wholesale quantities and special bulk pricing for shops, events and businesses. Send your enquiry on WhatsApp in a minute.",
};

export default function WholesalePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-charcoal">Bulk Orders Made Simple</h1>
        <p className="mt-3 text-charcoal/70">
          We supply shops, caterers, event organisers and businesses with wholesale
          quantities at special bulk pricing. Tell us what you need and we will confirm
          rates and delivery on WhatsApp.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-cream-dark">
          <Box className="mx-auto h-6 w-6 text-brand" aria-hidden />
          <p className="mt-2 text-sm font-bold text-charcoal">Wholesale Pack Sizes</p>
          <p className="mt-1 text-xs text-charcoal/60">From 8–10 packs minimum, cartons available.</p>
        </div>
        <div className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-cream-dark">
          <Percent className="mx-auto h-6 w-6 text-brand" aria-hidden />
          <p className="mt-2 text-sm font-bold text-charcoal">Special Bulk Pricing</p>
          <p className="mt-1 text-xs text-charcoal/60">Wholesale rates shown on each product apply.</p>
        </div>
        <div className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-cream-dark">
          <Handshake className="mx-auto h-6 w-6 text-brand" aria-hidden />
          <p className="mt-2 text-sm font-bold text-charcoal">Repeat Supply</p>
          <p className="mt-1 text-xs text-charcoal/60">Standing weekly / monthly orders welcome.</p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <WholesaleClient />
      </div>
    </div>
  );
}
