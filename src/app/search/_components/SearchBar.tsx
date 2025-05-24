"use client";

import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = "" }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setSearchQuery(query);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const performSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for Indonesian recipes..."
          className="w-full rounded-full bg-amber-50 p-6 pr-20 text-sm shadow-lg focus:ring-2 focus:ring-yellow-500 md:text-lg"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute top-1/2 right-12 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}

        {/* Search Button */}
        <Button
          type="submit"
          className="absolute top-2 right-2 rounded-full bg-yellow-500 p-2 text-white transition-colors hover:bg-yellow-600"
          size="icon"
        >
          <Search size={18} />
        </Button>
      </form>
    </div>
  );
}
