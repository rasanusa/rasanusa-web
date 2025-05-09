import Link from "next/link";
import { Search } from "lucide-react";
import { HydrateClient } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        {/* Hero Section with Search Only */}
        <div className="relative min-h-screen w-full">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-gradient-to-br from-amber-200/40 to-orange-300/40 blur-3xl"></div>
            <div className="absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-gradient-to-tr from-orange-200/40 to-amber-300/40 blur-3xl"></div>
          </div>

          {/* Floating food elements (subtle) */}
          <div className="pointer-events-none absolute hidden md:block">
            <div className="absolute top-1/3 right-[10%] rotate-6">
              <Image
                src="/images/rendang.jpg"
                alt="Rendang"
                width={140}
                height={140}
                className="rounded-xl opacity-80 shadow-lg"
              />
            </div>
            <div className="absolute bottom-1/3 left-[10%] -rotate-6">
              <Image
                src="/images/nasi-goreng.jpg"
                alt="Nasi Goreng"
                width={140}
                height={140}
                className="rounded-xl opacity-80 shadow-lg"
              />
            </div>
          </div>

          {/* Main content with search */}
          <div className="container mx-auto flex h-screen flex-col items-center justify-center px-4">
            <div className="text-center">
              <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-amber-800 sm:text-7xl">
                Rasa<span className="text-orange-600">Nusa</span>
              </h1>
              <p className="mx-auto mb-10 max-w-lg text-lg text-amber-900/80">
                Discover authentic Indonesian recipes from across the
                archipelago
              </p>

              {/* Enhanced Search Bar */}
              <div className="relative mx-auto w-full max-w-2xl">
                <form action="/search" method="get">
                  <div className="relative flex overflow-hidden rounded-full bg-white shadow-xl">
                    <input
                      type="text"
                      name="q"
                      placeholder="Search for Indonesian recipes..."
                      className="w-full border-none bg-white px-6 py-5 text-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      aria-label="Search recipes"
                    />
                    <button
                      type="submit"
                      className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-3 font-medium text-white hover:from-amber-700 hover:to-orange-700"
                      aria-label="Search"
                    >
                      <Search size={20} className="mr-1" />
                      <span className="hidden sm:inline">Search</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Popular searches */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <p className="w-full text-center text-sm text-amber-800/60">
                  Popular searches:
                </p>
                <Link
                  href="/search?q=rendang"
                  className="rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm hover:bg-white hover:shadow"
                >
                  Rendang
                </Link>
                <Link
                  href="/search?q=nasi+goreng"
                  className="rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm hover:bg-white hover:shadow"
                >
                  Nasi Goreng
                </Link>
                <Link
                  href="/search?q=satay"
                  className="rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm hover:bg-white hover:shadow"
                >
                  Satay
                </Link>
                <Link
                  href="/search?q=gado+gado"
                  className="rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm hover:bg-white hover:shadow"
                >
                  Gado-gado
                </Link>
                <Link
                  href="/search?q=soto"
                  className="rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm hover:bg-white hover:shadow"
                >
                  Soto
                </Link>
              </div>
            </div>

            {/* Food categories (minimal) */}
            <div className="mt-12 md:mt-20">
              <h2 className="mb-6 text-center text-xl font-medium text-amber-900">
                Or browse by category
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {[
                  { name: "Main Course", emoji: "🍲" },
                  { name: "Breakfast", emoji: "🍳" },
                  { name: "Dessert", emoji: "🍧" },
                  { name: "Soup", emoji: "🥘" },
                  { name: "Snack", emoji: "🥟" },
                ].map((category) => (
                  <Link
                    key={category.name}
                    href={`/search?category=${encodeURIComponent(category.name)}`}
                    className="flex flex-col items-center rounded-xl bg-white/80 p-4 text-center shadow-sm transition-all hover:bg-white hover:shadow"
                  >
                    <span className="text-2xl">{category.emoji}</span>
                    <span className="mt-2 text-sm font-medium text-amber-900">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
