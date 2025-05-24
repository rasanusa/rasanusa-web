import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";
import RecipeDetailContent from "./_components/RecipeDetailContent";
import { Suspense } from "react";

function RecipeLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50/30">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
        <p className="mt-4 font-medium text-amber-800">Loading recipe...</p>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Recipe Details - RasaNusa",
  description: "View detailed recipe information",
};

interface RecipeDetailPageProps {
  params: {
    slug: string; // This is now the document ID
  };
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const recipeId = params.slug; // The slug is actually the document ID

  return (
    <HydrateClient>
      <Suspense fallback={<RecipeLoading />}>
        <RecipeDetailContent recipeId={recipeId} />
      </Suspense>
    </HydrateClient>
  );
}
