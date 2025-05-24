"use client";

import { useEffect } from "react";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import RecipeCard from "./RecipeCard";
import Pagination from "./Pagination";
import NoResults from "./NoResults";
import FilterBar from "./FilterBar";
import { Loader2, Sparkles, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const categoryFilter = searchParams.get("category") ?? "";

  // Fetch search results
  const { data, isLoading, error, refetch } = api.search.search.useQuery(
    {
      query,
      page: currentPage,
      limit: 12,
      category: categoryFilter,
    },
    {
      enabled: true,
    },
  );

  // Generate food description for the query
  const {
    data: foodDescription,
    mutate: generateDescription,
    isPending: isDescriptionLoading,
  } = api.search.generateFoodDescription.useMutation();

  // Generate description when query changes
  useEffect(() => {
    if (query.trim()) {
      generateDescription({ query });
    }
  }, [query, generateDescription]);

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  // Handle refetch with proper async handling
  const handleRefetch = () => {
    void refetch();
  };

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
          onClick={handleRefetch}
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
      {/* Results Header with Filter */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="space-y-2">
          <p className="text-orange-800">
            Found{" "}
            <span className="font-bold text-orange-900">
              {data.total}
              {data.total == 10000 ? "+" : ""}
            </span>{" "}
            recipes
            {query ? ` matching "${query}"` : ""}
            {categoryFilter && (
              <span className="text-sm text-gray-600">
                {" "}
                in &quot;{categoryFilter}&quot;
              </span>
            )}
          </p>
        </div>

        <FilterBar />
      </div>

      {/* AI-Generated Food Description */}
      {query.trim() && (
        <Card className="border border-purple-200 bg-gradient-to-r from-purple-50 to-amber-50">
          <CardContent className="px-4">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <div className="w-fit">
                <h3 className="mb-2 font-semibold text-purple-800">
                  About &quot;{query}&quot;
                </h3>
                {isDescriptionLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 animate-pulse rounded bg-purple-200"></div>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-purple-200"></div>
                  </div>
                ) : foodDescription?.description ? (
                  <p className="leading-relaxed text-gray-700">
                    {foodDescription.description}
                  </p>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Info size={16} />
                    <span>Generating description...</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.results.map((recipe, index) => (
          <RecipeCard key={`${recipe.url}-${index}`} recipe={recipe} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
