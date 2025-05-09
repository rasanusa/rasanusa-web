"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar({ defaultValue = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }

    // Reset to page 1 when search query changes
    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto w-full max-w-2xl">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for Indonesian recipes..."
        className="w-full rounded-full py-6 pr-12 pl-6 text-lg shadow-lg focus:ring-2 focus:ring-yellow-500"
      />
      <Button
        type="submit"
        className="absolute top-2 right-2 rounded-full bg-yellow-500 p-2 text-white hover:bg-yellow-600"
        size="icon"
      >
        <Search size={18} />
      </Button>
    </form>
  );
}
