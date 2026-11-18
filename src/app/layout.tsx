import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Noto_Sans_Gujarati } from "next/font/google";
import { MessageCircle } from "lucide-react";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { siteConfig, gaMeasurementId, whatsappConfig } from "@/data/site-config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoGujarati = Noto_Sans_Gujarati({
  variable: "--font-noto-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.example.com"), // replace with the real domain after deployment
  title: {
    default: `${siteConfig.brandName}: Authentic Gujarati & Kutchi Snacks`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.brandName}: Authentic Taste of Gujarat`,
    description: siteConfig.description,
    type: "website",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${notoGujarati.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="bg-brand px-4 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-cream sm:text-sm">
          Free delivery all over India on orders above ₹2,000!
          <span className="mx-2 text-gold" aria-hidden>★</span>
          Rajkot &amp; Bhuj – free delivery on orders above ₹500!
        </div>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
        <a
          href={`https://wa.me/${whatsappConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-105"
        >
          <MessageCircle className="h-7 w-7" aria-hidden />
        </a>
        {/* Google Analytics 4: active once gaMeasurementId is set in site-config.ts */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
