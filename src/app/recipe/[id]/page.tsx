import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";
import RecipeDetailContent from "./_components/RecipeDetailContent";
import { Suspense } from "react";
import type { NextPage } from "next";

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

const RecipeDetailPage: NextPage<{
  params: { id: string };
}> = ({ params }) => {
  const id = params.id;

  return (
    <HydrateClient>
      <Suspense fallback={<RecipeLoading />}>
        <RecipeDetailContent recipeId={id} />
      </Suspense>
    </HydrateClient>
  );
};

export default RecipeDetailPage;
