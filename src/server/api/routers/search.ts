import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import axios, { type AxiosError } from "axios";
import https from "https";

interface SearchResult {
  hits?: {
    total: {
      value: number;
    };
    hits?: Array<{
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

export const searchRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { query, page, limit } = input;
        const searchBody = {
          from: (page - 1) * limit, // Calculate the starting index for pagination
          size: limit, // Number of results per page
          query: {
            multi_match: {
              query: query,
              fields: [
                "title^3",
                "title_cleaned^3",
                "ingredients_cleaned^2",
                "category^1.5",
                "steps",
              ],
              type: "best_fields",
              operator: "or",
              fuzziness: "AUTO",
            },
          },
        };

        const httpsAgent = new https.Agent({
          rejectUnauthorized: false,
        });

        const response = await axios({
          method: "post",
          url: `${process.env.ELASTIC_SEARCH_URL}?filter_path=hits.total.value,hits.hits._source`,
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

        // Handle empty response or no hits
        if (!data || Object.keys(data).length === 0) {
          return {
            results: [],
            total: 0,
            page,
            limit,
          };
        }

        // Handle response with hits structure but empty hits array
        if (!data.hits?.hits || data.hits.hits.length === 0) {
          return {
            results: [],
            total: 0,
            page,
            limit,
          };
        }

        return {
          results: data.hits.hits.map((hit) => hit._source),
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
});
