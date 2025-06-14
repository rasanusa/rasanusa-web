"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/search?${params.toString()}`);
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) return null;

  // Calculate page range to display (show up to 5 pages)
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className={
            i === currentPage
              ? "h-10 w-10 border-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md hover:from-amber-700 hover:to-orange-700"
              : "h-10 w-10 border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
          }
        >
          {i}
        </Button>,
      );
    }
    return buttons;
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10 border-amber-200 p-0 text-amber-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-amber-700"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {renderPageButtons()}

      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10 border-amber-200 p-0 text-amber-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-amber-700"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
