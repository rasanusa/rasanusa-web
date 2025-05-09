import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";
import SearchPageContent from "./_components/SearchPageContent";
import { Suspense } from "react";

function SearchLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50/30">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
        <p className="mt-4 font-medium text-amber-800">
          Loading search results...
        </p>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Search Recipes - RasaNusa",
  description: "Search for authentic Indonesian recipes",
};

export default function SearchPage() {
  return (
    <HydrateClient>
      <Suspense fallback={<SearchLoading />}>
        <SearchPageContent />
      </Suspense>
    </HydrateClient>
  );
}
