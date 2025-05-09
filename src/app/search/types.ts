export interface SearchResult {
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

export interface PaginatedSearchResults {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
}
