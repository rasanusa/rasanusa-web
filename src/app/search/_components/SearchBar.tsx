"use client";

import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar({ defaultValue = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setSearchQuery(query);
  }, [searchParams]);

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

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto w-full max-w-2xl">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for Indonesian recipes..."
        className="w-full rounded-full bg-amber-50 py-6 pr-12 pl-6 text-lg shadow-lg focus:ring-2 focus:ring-yellow-500"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute top-1/2 right-20 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
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
