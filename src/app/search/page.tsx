import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";
import SearchPageContent from "./_components/SearchPageContent";

export const metadata: Metadata = {
  title: "Search Recipes - RasaNusa",
  description: "Search for authentic Indonesian recipes",
};

export default function SearchPage() {
  return (
    <HydrateClient>
      <SearchPageContent />
    </HydrateClient>
  );
}
