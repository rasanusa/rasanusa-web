export interface SearchResult {
  id?: string;
  title: string;
  ingredients: string;
  steps: string;
  loves: number;
  url: string;
  category: string;
  total_ingredients: number;
  total_steps: number;
  image_url: string;
}

export interface RecipeDetail {
  title: string;
  ingredients: string;
  steps: string;
  loves: number;
  url: string;
  category: string;
  total_ingredients: number;
  total_steps: number;
  image_url: string;
}

export interface EnhancedSearchResult extends SearchResult {
  ai_summary?: string;
  cooking_tips?: string;
}

export interface PaginatedSearchResults {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
}

export interface AIFeatures {
  summary?: string;
  tips?: string;
}
