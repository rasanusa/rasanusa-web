"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import {
  ArrowLeft,
  Heart,
  Clock,
  ChefHat,
  ExternalLink,
  Sparkles,
  Lightbulb,
  Loader2,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface RecipeDetailContentProps {
  recipeId: string;
}

export default function RecipeDetailContent({
  recipeId,
}: RecipeDetailContentProps) {
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const [showIngredientsTranslation, setShowIngredientsTranslation] =
    useState(false);
  const [showStepsTranslation, setShowStepsTranslation] = useState(false);
  const [aiData, setAiData] = useState<{
    summary?: string;
    tips?: string;
  }>({});
  const [translationData, setTranslationData] = useState<{
    ingredients?: string;
    steps?: string;
  }>({});

  // Fetch recipe details by ID
  const recipeQuery = api.search.getRecipe.useQuery(
    { id: recipeId },
    { enabled: !!recipeId },
  );

  const { data: recipe, isLoading, error } = recipeQuery;

  // AI mutations
  const summaryMutation = api.search.generateRecipeSummary.useMutation({
    onSuccess: (data) => {
      setAiData((prev) => ({ ...prev, summary: data.summary }));
    },
  });

  const tipsMutation = api.search.generateCookingTips.useMutation({
    onSuccess: (data) => {
      setAiData((prev) => ({ ...prev, tips: data.tips }));
    },
  });

  // Translation mutations
  const translateIngredientsMutation =
    api.search.translateIngredients.useMutation({
      onSuccess: (data) => {
        setTranslationData((prev) => ({
          ...prev,
          ingredients: data.ingredients,
        }));
      },
    });

  const translateStepsMutation = api.search.translateSteps.useMutation({
    onSuccess: (data) => {
      setTranslationData((prev) => ({ ...prev, steps: data.steps }));
    },
  });

  const handleToggleAIFeatures = () => {
    if (!showAIFeatures && recipe) {
      setShowAIFeatures(true);

      // Generate AI content if not already generated
      if (!aiData.summary && !summaryMutation.isPending) {
        summaryMutation.mutate({
          title: recipe.title,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          category: recipe.category,
        });
      }

      if (!aiData.tips && !tipsMutation.isPending) {
        tipsMutation.mutate({
          title: recipe.title,
          ingredients: recipe.ingredients,
          category: recipe.category,
        });
      }
    } else {
      setShowAIFeatures(false);
    }
  };

  const handleIngredientsTranslation = () => {
    if (!showIngredientsTranslation && recipe) {
      setShowIngredientsTranslation(true);

      if (
        !translationData.ingredients &&
        !translateIngredientsMutation.isPending
      ) {
        translateIngredientsMutation.mutate({
          ingredients: recipe.ingredients,
          title: recipe.title,
        });
      }
    } else {
      setShowIngredientsTranslation(false);
    }
  };

  const handleStepsTranslation = () => {
    if (!showStepsTranslation && recipe) {
      setShowStepsTranslation(true);

      if (!translationData.steps && !translateStepsMutation.isPending) {
        translateStepsMutation.mutate({
          steps: recipe.steps,
          title: recipe.title,
        });
      }
    } else {
      setShowStepsTranslation(false);
    }
  };

  const isAILoading = summaryMutation.isPending || tipsMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50/30">
        <div className="flex flex-col items-center justify-center">
          <Loader2 size={40} className="animate-spin text-orange-500" />
          <p className="mt-4 text-orange-700">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50/30 py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md rounded-lg bg-red-50 p-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-2xl">❌</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-red-800">
              Recipe Not Found
            </h3>
            <p className="mb-4 text-red-600">
              The recipe you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
            <Button asChild>
              <Link href="/search">
                <ArrowLeft size={16} className="mr-2" />
                Back to Search
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Parse ingredients and steps
  const ingredientsList = recipe.ingredients
    .split("--")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const stepsList = recipe.steps.split("\n").filter((step) => step.trim());

  // Parse translated content with restriction to original count
  const translatedIngredientsList = translationData.ingredients
    ? translationData.ingredients
        .split("--")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
        .slice(0, ingredientsList.length) // Restrict to original count
    : [];

  const translatedStepsList = translationData.steps
    ? translationData.steps
        .split("\n")
        .filter((step) => step.trim())
        .slice(0, stepsList.length) // Restrict to original count
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-600 py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <Link href="/search">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-white">Recipe Details</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
          {/* Recipe Header */}
          <Card className="p-0">
            <CardContent className="p-4 md:p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Recipe Image */}
                <div className="relative h-64 overflow-hidden rounded-lg md:h-80">
                  <Image
                    src={recipe.image_url || "/placeholder.png"}
                    alt={recipe.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.png";
                    }}
                    width={600}
                    height={400}
                  />
                </div>

                {/* Recipe Info */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Badge className="bg-orange-500 text-white">
                      {recipe.category}
                    </Badge>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {recipe.title}
                    </h2>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="mb-1 flex items-center justify-center gap-1 text-orange-500">
                        <ChefHat size={20} />
                      </div>
                      <p className="text-sm text-gray-600">Ingredients</p>
                      <p className="font-bold text-gray-900">
                        {recipe.total_ingredients}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 flex items-center justify-center gap-1 text-orange-500">
                        <Clock size={20} />
                      </div>
                      <p className="text-sm text-gray-600">Steps</p>
                      <p className="font-bold text-gray-900">
                        {recipe.total_steps}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 flex items-center justify-center gap-1 text-red-500">
                        <Heart size={20} />
                      </div>
                      <p className="text-sm text-gray-600">Loves</p>
                      <p className="font-bold text-gray-900">{recipe.loves}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 max-sm:flex-col">
                    <Button
                      onClick={handleToggleAIFeatures}
                      variant={showAIFeatures ? "default" : "outline"}
                      className={
                        showAIFeatures
                          ? "bg-gradient-to-r from-purple-500 to-amber-500 text-white"
                          : ""
                      }
                    >
                      <Sparkles size={16} className="mr-2" />
                      {showAIFeatures
                        ? "Hide AI Summary and Tips"
                        : "Show AI Summary and Tips"}
                    </Button>
                    <Button asChild variant="outline">
                      <a
                        href={recipe.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Original Recipe
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          {showAIFeatures && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* AI Summary */}
              <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Sparkles size={20} />
                    AI Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isAILoading && !aiData.summary ? (
                    <div className="space-y-2">
                      <div className="h-4 animate-pulse rounded bg-purple-200" />
                      <div className="h-4 w-3/4 animate-pulse rounded bg-purple-200" />
                    </div>
                  ) : (
                    <p className="leading-relaxed text-gray-700">
                      {aiData.summary ?? "Generating AI summary..."}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Cooking Tips */}
              <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Lightbulb size={20} />
                    Cooking Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isAILoading && !aiData.tips ? (
                    <div className="space-y-2">
                      <div className="h-4 animate-pulse rounded bg-amber-200" />
                      <div className="h-4 w-3/4 animate-pulse rounded bg-amber-200" />
                    </div>
                  ) : (
                    <p className="leading-relaxed text-gray-700">
                      {aiData.tips ?? "Generating cooking tips..."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recipe Content */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="text-orange-500" size={24} />
                  Ingredients
                  {showIngredientsTranslation && (
                    <Badge variant="outline" className="ml-2 text-blue-600">
                      English
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Ingredients List */}
                {showIngredientsTranslation &&
                translatedIngredientsList.length > 0 ? (
                  <ul className="space-y-2">
                    {translatedIngredientsList.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                ) : showIngredientsTranslation &&
                  translateIngredientsMutation.isPending ? (
                  <div className="space-y-2">
                    {ingredientsList.map((_, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="mt-2 h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-blue-200" />
                        <div className="h-4 w-full animate-pulse rounded bg-blue-200" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {ingredientsList.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-400" />
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Translation Button */}
                <div className="border-t pt-4">
                  <Button
                    onClick={handleIngredientsTranslation}
                    variant="outline"
                    size="sm"
                    disabled={translateIngredientsMutation.isPending}
                    className="w-full text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {translateIngredientsMutation.isPending ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Languages size={16} className="mr-2" />
                        {showIngredientsTranslation
                          ? "Show Indonesian"
                          : "Translate to English"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-orange-500" size={24} />
                  Instructions
                  {showStepsTranslation && (
                    <Badge variant="outline" className="ml-2 text-blue-600">
                      English
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Steps List */}
                {showStepsTranslation && translatedStepsList.length > 0 ? (
                  <ol className="space-y-4">
                    {translatedStepsList.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed text-gray-700">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : showStepsTranslation && translateStepsMutation.isPending ? (
                  <div className="space-y-4">
                    {stepsList.map((_, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="h-6 w-6 animate-pulse rounded-full bg-blue-200" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 animate-pulse rounded bg-blue-200" />
                          <div className="h-4 w-3/4 animate-pulse rounded bg-blue-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ol className="space-y-4">
                    {stepsList.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed text-gray-700">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Translation Button */}
                <div className="border-t pt-4">
                  <Button
                    onClick={handleStepsTranslation}
                    variant="outline"
                    size="sm"
                    disabled={translateStepsMutation.isPending}
                    className="w-full text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {translateStepsMutation.isPending ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Languages size={16} className="mr-2" />
                        {showStepsTranslation
                          ? "Show Indonesian"
                          : "Translate to English"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
