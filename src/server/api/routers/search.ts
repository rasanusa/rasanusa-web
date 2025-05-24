/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import axios, { type AxiosError } from "axios";
import https from "https";

// Available recipe categories
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

interface SearchResult {
  hits?: {
    total: {
      value: number;
    };
    hits?: Array<{
      _id: string; // Add _id to the interface
      _source: {
        title: string;
        ingredients: string;
        steps: string;
        loves: number;
        url: string;
        category: string;
        total_ingredients: number;
        total_steps: number;
        image_url: string;
      };
    }>;
  };
}

interface RecipeDocument {
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

interface ElasticSearchError {
  error: {
    root_cause: Array<{
      type: string;
      reason: string;
    }>;
    type: string;
    reason: string;
  };
  status: number;
}

interface LLMResponse {
  generated_text?: string;
  choices?: Array<{
    message: {
      content: string;
    };
  }>;
}

export const searchRouter = createTRPCRouter({
  // Generate food description based on query
  generateFoodDescription: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const response = await axios.post(
          "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
          {
            inputs: `Write a brief, appetizing description (2-3 sentences) about "${input.query}" in Indonesian cuisine. Focus on what makes it special, its flavors, or cultural significance. Ensure that the response doesnt exceeds 80 max new tokens.

Query: ${input.query}

Description:`,
            parameters: {
              max_new_tokens: 80,
              temperature: 0.4,
              do_sample: true,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.HF_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = response.data as LLMResponse;
        let description = "";

        if (Array.isArray(data) && data[0]?.generated_text) {
          const generatedText = data[0].generated_text;
          const descriptionPart = generatedText
            .split("Description:")[1]
            ?.trim();
          if (descriptionPart) {
            description = descriptionPart.split("\n")[0] ?? descriptionPart;
          }
        }

        return { description };
      } catch (error) {
        console.error("Description generation error:", error);
        return { description: "" };
      }
    }),

  // Generate AI summary for a recipe
  generateRecipeSummary: publicProcedure
    .input(
      z.object({
        title: z.string(),
        ingredients: z.string(),
        steps: z.string(),
        category: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const response = await axios.post(
          "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
          {
            inputs: `Create a brief, appetizing summary (2-3 sentences) for this Indonesian recipe (ensure that the response doesnt exceeds 80 max new tokens):

Title: ${input.title}
Category: ${input.category}
Ingredients: ${input.ingredients.substring(0, 400)}...
Steps: ${input.steps.substring(0, 500)}...

Summary:`,
            parameters: {
              max_new_tokens: 80,
              temperature: 0.4,
              do_sample: true,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.HF_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = response.data as LLMResponse;
        let summary = "";

        if (Array.isArray(data) && data[0]?.generated_text) {
          const generatedText = data[0].generated_text;
          const summaryPart = generatedText.split("Summary:")[1]?.trim();
          if (summaryPart) {
            summary = summaryPart.split("\n")[0] ?? summaryPart;
          }
        }

        return { summary };
      } catch (error) {
        console.error("Summary generation error:", error);
        return { summary: "" };
      }
    }),

  // Generate cooking tips
  generateCookingTips: publicProcedure
    .input(
      z.object({
        title: z.string(),
        ingredients: z.string(),
        category: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const response = await axios.post(
          `https://api-inference.huggingface.co/models/${process.env.LANGUAGE_MODEL}`,
          {
            inputs: `Provide 1-2 helpful cooking tips for this Indonesian recipe (ensure that the response doesnt exceeds 60 max new tokens):

Recipe: ${input.title}
Category: ${input.category}
Key ingredients: ${input.ingredients.substring(0, 250)}

Tips:`,
            parameters: {
              max_new_tokens: 60,
              temperature: 0.5,
              do_sample: true,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.HF_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = response.data as LLMResponse;
        let tips = "";

        if (Array.isArray(data) && data[0]?.generated_text) {
          const generatedText = data[0].generated_text;
          const tipsPart = generatedText.split("Tips:")[1]?.trim();
          if (tipsPart) {
            tips = tipsPart.split("\n")[0] ?? tipsPart;
          }
        }

        return { tips };
      } catch (error) {
        console.error("Tips generation error:", error);
        return { tips: "" };
      }
    }),

  // Get single recipe by document ID
  getRecipe: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }): Promise<RecipeDocument> => {
      try {
        console.log("Looking for recipe with ID:", input.id);

        const httpsAgent = new https.Agent({
          rejectUnauthorized: false,
        });

        // Use Elasticsearch Get API to fetch document by ID
        const response = await axios({
          method: "get",
          url: `${process.env.ELASTIC_RECIPES}/_doc/${input.id}?_source_excludes=`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASSWORD}`,
            ).toString("base64")}`,
          },
          httpsAgent,
        });

        console.log("Get response:", JSON.stringify(response.data, null, 2));

        if (!response.data._source) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Recipe not found",
          });
        }

        return response.data._source as RecipeDocument;
      } catch (error) {
        console.error("Get recipe error:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error response:", error.response?.data);
          if (error.response?.status === 404) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Recipe not found",
            });
          }
        }
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch recipe",
          cause: error,
        });
      }
    }),

  // Updated search to include document IDs
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
        category: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { query, page, limit, category } = input;

        // Build search query
        const mustQueries = [];

        if (query.trim()) {
          mustQueries.push({
            multi_match: {
              query: query,
              fields: [
                "title^4",
                "title_cleaned^4",
                "ingredients_cleaned^2",
                "category^1.5",
                "steps",
              ],
              type: "best_fields",
              operator: "or",
              fuzziness: "AUTO",
            },
          });
        } else {
          mustQueries.push({
            match_all: {},
          });
        }

        // Add category filter if specified
        if (category?.trim()) {
          mustQueries.push({
            term: {
              category: category,
            },
          });
        }

        const searchBody = {
          from: (page - 1) * limit,
          size: limit,
          query: {
            bool: {
              must: mustQueries,
            },
          },
          sort: [{ loves: { order: "desc" } }, "_score"],
        };

        const httpsAgent = new https.Agent({
          rejectUnauthorized: false,
        });

        // Updated to include _id in the response
        const response = await axios({
          method: "post",
          url: `${process.env.ELASTIC_SEARCH_URL}?filter_path=hits.total.value,hits.hits._id,hits.hits._source`,
          data: searchBody,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASSWORD}`,
            ).toString("base64")}`,
          },
          httpsAgent,
        });

        const data = response.data as SearchResult;

        if (!data || Object.keys(data).length === 0) {
          return {
            results: [],
            total: 0,
            page,
            limit,
          };
        }

        if (!data.hits?.hits || data.hits.hits.length === 0) {
          return {
            results: [],
            total: 0,
            page,
            limit,
          };
        }

        // Map results to include document ID
        const results = data.hits.hits.map((hit) => ({
          id: hit._id, // Include document ID
          ...hit._source,
        }));

        return {
          results,
          total: data.hits.total.value,
          page,
          limit,
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ElasticSearchError>;
          console.error("Axios error details:", {
            response: axiosError.response?.data,
            status: axiosError.response?.status,
            headers: axiosError.response?.headers,
          });
          const errorMessage =
            axiosError.response?.data?.error?.reason ??
            "Failed to perform search";
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: errorMessage,
            cause: error,
          });
        }
        console.error("Search error:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to perform search",
          cause: error,
        });
      }
    }),

  // Get available categories (now just returns the constant)
  getCategories: publicProcedure.query(async () => {
    return { categories: RECIPE_CATEGORIES };
  }),
});
