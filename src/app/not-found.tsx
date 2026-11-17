import Link from "next/link";
import { Cookie } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <Cookie className="mx-auto h-16 w-16 text-brand" aria-hidden />
      <h1 className="mt-4 text-4xl font-extrabold text-charcoal">Page Not Found</h1>
      <p className="mt-2 text-charcoal/60">
        This snack seems to have moved off the shelf. Let's get you back to the good stuff.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand px-7 py-3 font-bold text-white hover:bg-brand-dark"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="rounded-full border-2 border-brand px-7 py-3 font-semibold text-brand-dark hover:bg-brand hover:text-white"
        >
          Browse Snacks
        </Link>
      </div>
    </div>
  );
}
