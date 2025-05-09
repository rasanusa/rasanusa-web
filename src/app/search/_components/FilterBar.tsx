"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";
  const currentSort = searchParams.get("sort") ?? "loves";

  const updateFilter = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    // Reset to page 1
    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Category filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-orange-200 text-orange-800 hover:bg-orange-50"
          >
            Category
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuRadioGroup
            value={currentCategory}
            onValueChange={(value) => updateFilter("category", value)}
          >
            <DropdownMenuRadioItem value="" className="cursor-pointer">
              All Categories
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="Main Course"
              className="cursor-pointer"
            >
              Main Course
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Breakfast" className="cursor-pointer">
              Breakfast
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Dessert" className="cursor-pointer">
              Dessert
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Soup" className="cursor-pointer">
              Soup
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Snack" className="cursor-pointer">
              Snack
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-orange-200 text-orange-800 hover:bg-orange-50"
          >
            Sort by
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuRadioGroup
            value={currentSort}
            onValueChange={(value) => updateFilter("sort", value)}
          >
            <DropdownMenuRadioItem value="loves" className="cursor-pointer">
              Most Popular
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="title" className="cursor-pointer">
              Alphabetical (A-Z)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="total_ingredients"
              className="cursor-pointer"
            >
              Fewest Ingredients
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="total_steps"
              className="cursor-pointer"
            >
              Fewest Steps
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear filters button - only show if filters are active */}
      {(currentCategory || currentSort !== "loves") && (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-orange-700 hover:bg-orange-50"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("category");
            params.delete("sort");
            router.push(`/search?${params.toString()}`);
          }}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
