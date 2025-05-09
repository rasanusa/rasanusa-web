/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useEffect } from "react";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import RecipeCard from "./RecipeCard";
import Pagination from "./Pagination";
import NoResults from "./NoResults";
import FilterBar from "./FilterBar";
import { Loader2 } from "lucide-react";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const categoryFilter = searchParams.get("category") ?? "";

  // Use tRPC to fetch search results
  const { data, isLoading, error, refetch } = api.search.search.useQuery(
    {
      query,
      page: currentPage,
      limit: 12, // Adjust limit as needed
    },
    {
      // Only run query if we have a search term
      enabled: !!query,
    },
  );

  // Refetch when search parameters change
  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query, currentPage, categoryFilter, refetch]);

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-orange-500" />
        <p className="mt-4 text-orange-700">Searching recipes...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-red-50 p-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <span className="text-2xl">❌</span>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-red-800">
          Search Error
        </h3>
        <p className="text-red-600">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No results state
  if (!data?.results.length) {
    return <NoResults />;
  }

  return (
    <div className="space-y-8">
      {/* Results header with filter bar */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div>
          <p className="text-orange-800">
            Found{" "}
            <span className="font-bold text-orange-900">{data.total}</span>{" "}
            recipes
            {query ? ` matching "${query}"` : ""}
          </p>
        </div>

        <FilterBar />
      </div>

      {/* Results grid with improved spacing and layout */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.results.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
