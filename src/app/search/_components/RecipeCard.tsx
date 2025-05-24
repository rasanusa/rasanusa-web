"use client";
import React from "react";
import { Heart, Clock, ChefHat, ExternalLink } from "lucide-react";
import { type SearchResult } from "../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  recipe: SearchResult;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  // Use document ID for the route
  const recipeId = recipe.id;

  if (!recipeId) {
    console.warn("Recipe missing ID:", recipe.title);
    return null; // Don't render card without ID
  }

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-0 bg-white pt-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={recipe.image_url || "/placeholder.png"}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.png";
          }}
          width={400}
          height={300}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-orange-500 px-2 py-1 text-xs font-medium text-white">
          {recipe.category}
        </Badge>
      </div>

      {/* Content Container - grows to fill remaining space */}
      <div className="flex flex-1 flex-col">
        <CardHeader className="pb-3">
          <Link href={`/recipe/${recipeId}`}>
            <h3 className="line-clamp-2 cursor-pointer text-lg leading-tight font-bold text-gray-900 transition-colors duration-200 group-hover:text-orange-600">
              {recipe.title}
            </h3>
          </Link>
        </CardHeader>

        {/* This div grows to push content to bottom */}
        <div className="flex-1"></div>

        <CardContent className="mt-auto space-y-4">
          {/* Recipe Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <ChefHat size={14} className="text-orange-500" />
              <span>{recipe.total_ingredients} ingredients</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-orange-500" />
              <span>{recipe.total_steps} steps</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} className="text-red-500" />
              <span>{recipe.loves}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white transition-all duration-200 hover:from-orange-600 hover:to-amber-600"
            >
              <Link href={`/recipe/${recipeId}`}>View Details</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <a
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                title="View original recipe"
              >
                <ExternalLink size={16} />
              </a>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
