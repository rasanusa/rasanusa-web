"use client";

import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function NoResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <div className="my-16 flex flex-col items-center justify-center rounded-xl bg-white p-8 shadow-sm">
      <div className="mb-4 rounded-full bg-orange-100 p-6">
        <Search size={48} className="text-orange-500" />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-gray-800">
        No recipes found
      </h3>
      <p className="mb-6 text-center text-gray-600">
        We couldn&apos;t find any recipes that match{" "}
        <span className="font-semibold">&ldquo;{query}&rdquo;</span>
        <br />
        Try using different keywords or browsing by category.
      </p>

      {/* Suggested searches */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <p className="w-full text-center text-sm text-gray-500">
          Try searching for:
        </p>
        <Link
          href="/search?q=rendang"
          className="rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-800 hover:bg-orange-200"
        >
          Rendang
        </Link>
        <Link
          href="/search?q=nasi+goreng"
          className="rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-800 hover:bg-orange-200"
        >
          Nasi Goreng
        </Link>
        <Link
          href="/search?q=ayam"
          className="rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-800 hover:bg-orange-200"
        >
          Ayam
        </Link>
      </div>

      <Button
        asChild
        variant="outline"
        className="flex items-center gap-2 rounded-full border-orange-200 text-orange-800 hover:bg-orange-50"
      >
        <Link href="/">
          <ArrowLeft size={16} />
          Back to Homepage
        </Link>
      </Button>
    </div>
  );
}
