import Link from "next/link";
import { Search, ChefHat } from "lucide-react";
import { HydrateClient } from "@/trpc/server";

// Category data with proper names and emojis
const CATEGORY_DATA = [
  { key: "ayam", name: "Chicken", emoji: "🐔", description: "Chicken dishes" },
  { key: "ikan", name: "Fish", emoji: "🐟", description: "Fresh fish recipes" },
  { key: "sapi", name: "Beef", emoji: "🥩", description: "Beef specialties" },
  {
    key: "udang",
    name: "Shrimp",
    emoji: "🦐",
    description: "Shrimp delicacies",
  },
  { key: "telur", name: "Egg", emoji: "🥚", description: "Egg-based dishes" },
  { key: "tahu", name: "Tofu", emoji: "🧈", description: "Tofu creations" },
  { key: "tempe", name: "Tempeh", emoji: "🫘", description: "Tempeh recipes" },
  {
    key: "kambing",
    name: "Goat",
    emoji: "🐐",
    description: "Goat meat dishes",
  },
];

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
            {/* Food pattern decorations */}
            <div className="absolute top-20 left-10 opacity-20">
              <ChefHat size={40} className="text-amber-600" />
            </div>
            <div className="absolute right-16 bottom-32 opacity-20">
              <span className="text-4xl">🍜</span>
            </div>
            <div className="absolute top-1/3 right-20 opacity-20">
              <span className="text-3xl">🌶️</span>
            </div>
          </div>

          {/* Main content with search */}
          <div className="container mx-auto flex h-screen flex-col items-center justify-center px-4">
            <div className="text-center">
              {/* Logo/Brand */}
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 p-3">
                  <ChefHat size={32} className="text-white" />
                </div>
                <h1 className="text-6xl font-extrabold tracking-tight text-amber-800 sm:text-7xl">
                  Rasa<span className="text-orange-600">Nusa</span>
                </h1>
              </div>

              <p className="mx-auto mb-4 max-w-lg text-lg text-amber-900/80">
                Discover authentic Indonesian recipes from across the
                archipelago
              </p>

              <p className="mx-auto mb-10 max-w-md text-sm text-amber-800/60">
                From traditional family recipes to modern Indonesian cuisine
              </p>

              {/* Enhanced Search Bar */}
              <div className="relative mx-auto w-full max-w-2xl">
                <form action="/search" method="get">
                  <div className="relative flex overflow-hidden rounded-full bg-white shadow-xl ring-1 ring-amber-200">
                    <input
                      type="text"
                      name="q"
                      placeholder="Search for Indonesian recipes..."
                      className="w-full border-none bg-white px-6 py-4 text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      aria-label="Search recipes"
                    />
                    <button
                      type="submit"
                      className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 font-medium text-white transition-all hover:from-amber-700 hover:to-orange-700 hover:shadow-md"
                      aria-label="Search"
                    >
                      <Search size={20} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Popular searches */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <p className="mb-3 w-full text-center text-sm text-amber-800/60">
                  Popular searches:
                </p>
                <Link
                  href="/search?q=rendang"
                  className="z-10 rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm transition-all hover:scale-105 hover:bg-white hover:shadow"
                >
                  Rendang
                </Link>
                <Link
                  href="/search?q=nasi+goreng"
                  className="z-10 rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm transition-all hover:scale-105 hover:bg-white hover:shadow"
                >
                  Nasi Goreng
                </Link>
                <Link
                  href="/search?q=satay"
                  className="z-10 rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm transition-all hover:scale-105 hover:bg-white hover:shadow"
                >
                  Satay
                </Link>
                <Link
                  href="/search?q=gado+gado"
                  className="z-10 rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm transition-all hover:scale-105 hover:bg-white hover:shadow"
                >
                  Gado-gado
                </Link>
                <Link
                  href="/search?q=soto"
                  className="z-10 rounded-full bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm transition-all hover:scale-105 hover:bg-white hover:shadow"
                >
                  Soto
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Browse Recipe Categories
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Explore recipes organized by main ingredients. Each category
                features traditional Indonesian dishes with authentic flavors.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {CATEGORY_DATA.map((category) => (
                <Link
                  key={category.key}
                  href={`/search?category=${encodeURIComponent(category.key)}`}
                  className="group flex flex-col items-center rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center shadow-sm transition-all hover:scale-105 hover:from-amber-100 hover:to-orange-100 hover:shadow-lg"
                >
                  <div className="mb-4 transform transition-transform group-hover:scale-110">
                    <span className="text-4xl">{category.emoji}</span>
                  </div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-3 font-medium text-white transition-all hover:from-amber-700 hover:to-orange-700 hover:shadow-lg"
              >
                <Search size={20} />
                Browse All Recipes
              </Link>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-gradient-to-r from-amber-700 to-orange-600 py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Ready to Start Cooking?
            </h3>
            <p className="mx-auto mb-6 max-w-md text-amber-100">
              Join thousands of home cooks exploring the rich culinary heritage
              of Indonesia
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-amber-700 transition-all hover:bg-amber-50 hover:shadow-lg"
            >
              <ChefHat size={20} />
              Start Exploring
            </Link>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
