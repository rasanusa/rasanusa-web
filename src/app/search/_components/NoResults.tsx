import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoResults({ query }: { query: string }) {
  return (
    <div className="my-16 flex flex-col items-center justify-center">
      <div className="mb-4 rounded-full bg-orange-100 p-6">
        <Search size={48} className="text-orange-500" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-800">No recipes found</h3>
      <p className="mb-6 text-center text-gray-600">
        We couldn&apos;t find any recipes that match &quot;{query}&quot;.
        <br />
        Try using different keywords or removing some filters.
      </p>
      <Button
        asChild
        className="rounded-full bg-orange-600 hover:bg-orange-700"
      >
        <Link href="/">Back to Homepage</Link>
      </Button>
    </div>
  );
}
