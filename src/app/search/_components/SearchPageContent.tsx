"use client";

import { useSearchParams } from "next/navigation";
import { ChefHat } from "lucide-react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Link from "next/link";

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50/30">
      {/* Header Section with Search */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-700 to-orange-600 py-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-white"></div>
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-white"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="mb-8 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Link href="/">
              <ChefHat size={32} className="text-yellow-300" />
            </Link>
            <h1 className="text-center text-3xl font-bold text-white">
              {query ? `Recipes with "${query}"` : "Browse All Recipes"}
            </h1>
          </div>

          {/* Search Bar */}
          <SearchBar defaultValue={query} />
        </div>
      </div>

      {/* Results area with subtle background */}
      <div className="container mx-auto px-4 py-8">
        <SearchResults />
      </div>
    </main>
  );
}
