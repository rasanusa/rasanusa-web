import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  // Suggested pages that users might be looking for

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* 404 Image and Text */}
          <div className="mb-8 flex flex-col items-center">
            <h1 className="mt-6 text-5xl font-extrabold text-gray-800">404</h1>
            <p className="mt-2 text-2xl font-bold text-orange-600">
              Page Not Found
            </p>
          </div>

          {/* Explanation */}
          <div className="mb-10 rounded-xl bg-white p-8 shadow-sm">
            <p className="mb-6 text-lg text-gray-600">
              The recipe you&apos;re looking for seems to have gone missing from
              our kitchen. It might have been moved, renamed, or it may not
              exist at all.
            </p>

            <div className="mx-auto max-w-lg rounded-lg bg-amber-50 p-4 text-left">
              <h3 className="mb-3 font-medium text-amber-800">
                <span className="mr-2 inline-block rounded-full bg-amber-100 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </span>
                Here are a few suggestions:
              </h3>
              <ul className="ml-6 list-disc space-y-1 text-amber-800">
                <li>Check the URL for typos or errors</li>
                <li>Try searching for your recipe using the search bar</li>
                <li>Navigate back to the homepage and browse our categories</li>
                <li>Explore our regional cuisines section</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="flex items-center rounded-full bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700"
            >
              <Home size={18} className="mr-2" />
              Back to Homepage
            </Link>
            <Link
              href="/search"
              className="flex items-center rounded-full border border-orange-200 bg-white px-6 py-3 font-medium text-orange-600 transition-colors hover:bg-orange-50"
            >
              <Search size={18} className="mr-2" />
              Search for Recipes
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
