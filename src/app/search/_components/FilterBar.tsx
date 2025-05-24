"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const RECIPE_CATEGORIES = [
  "udang", // Shrimp
  "tempe", // Tempeh
  "sapi", // Beef
  "telur", // Egg
  "kambing", // Goat
  "ikan", // Fish
  "ayam", // Chicken
  "tahu", // Tofu
];

const CATEGORY_NAMES: Record<string, string> = {
  ayam: "Chicken",
  ikan: "Fish",
  sapi: "Beef",
  udang: "Shrimp",
  telur: "Egg",
  tahu: "Tofu",
  tempe: "Tempeh",
  kambing: "Goat",
};

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-gray-500" />
        <span className="text-sm text-gray-600">Filter by:</span>
      </div>

      <Select
        value={currentCategory || "all"}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {RECIPE_CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {CATEGORY_NAMES[category] ?? category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {currentCategory && (
        <Button
          onClick={clearFilters}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={14} className="mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
