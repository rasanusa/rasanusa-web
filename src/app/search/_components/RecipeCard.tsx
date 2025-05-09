import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SearchResult } from "../types";

interface RecipeCardProps {
  recipe: SearchResult;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={recipe.url}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
          <Image
            src={recipe.image_url || "/images/placeholder.jpg"}
            alt={recipe.title}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Heart size={16} fill="#ef4444" className="text-red-500" />
              <span>{recipe.loves}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
          <Badge variant="outline" className="bg-orange-100 text-orange-800">
            {recipe.category}
          </Badge>
          <span className="text-xs text-gray-500">
            {recipe.total_ingredients} ingredients • {recipe.total_steps} steps
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
