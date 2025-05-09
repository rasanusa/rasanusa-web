import Link from "next/link";
import Image from "next/image";
import { Search, Clock, Heart } from "lucide-react";

import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  // Fetch featured recipes (replace with actual tRPC query later)
  const featuredRecipes = [
    {
      id: 1,
      title: "Rendang Daging",
      title_cleaned: "rendang daging sapi",
      ingredients:
        "1 kg daging sapi, 700 ml santan kental, 300 ml santan encer, 4 lembar daun jeruk, 2 batang serai, 2 lembar daun kunyit, 2 cm lengkuas, Bumbu halus: 15 butir bawang merah, 10 siung bawang putih, 5 buah cabai merah besar, 15 buah cabai merah keriting, 2 cm jahe, 2 cm kunyit, 1 sdm ketumbar, 4 butir kemiri, 1/2 sdt jintan, 1 sdt garam",
      ingredients_cleaned:
        "daging sapi santan daun jeruk serai daun kunyit lengkuas bawang merah bawang putih cabai merah jahe kunyit ketumbar kemiri jintan garam",
      steps:
        "1. Haluskan semua bahan bumbu halus. 2. Tumis bumbu halus hingga harum. 3. Masukkan daging, aduk rata. 4. Tambahkan santan encer, daun jeruk, serai, daun kunyit, dan lengkuas. 5. Masak dengan api sedang hingga santan menyusut. 6. Tambahkan santan kental, masak hingga daging empuk dan bumbu meresap. 7. Aduk sesekali agar tidak gosong. 8. Masak terus hingga rendang mengering dan berwarna cokelat kehitaman.",
      loves: 1250,
      url: "/recipe/rendang-daging",
      category: "Main Course",
      region: "Sumatera Barat",
      image: "/images/rendang.jpg",
      total_ingredients: 16,
      total_steps: 8,
      prepTime: "180 min",
    },
    {
      id: 2,
      title: "Nasi Goreng",
      title_cleaned: "nasi goreng spesial",
      ingredients:
        "2 piring nasi putih, 2 butir telur, 3 siung bawang putih, 5 butir bawang merah, 5 buah cabai rawit, 1 buah tomat, 1 sdm kecap manis, 1 sdt garam, 1/2 sdt merica bubuk, 2 sdm minyak goreng, Pelengkap: kerupuk, timun, tomat",
      ingredients_cleaned:
        "nasi telur bawang putih bawang merah cabai tomat kecap garam merica minyak kerupuk timun",
      steps:
        "1. Haluskan bawang merah, bawang putih, dan cabai. 2. Panaskan minyak, tumis bumbu halus hingga harum. 3. Masukkan telur, orak-arik hingga matang. 4. Masukkan nasi, aduk rata. 5. Tambahkan kecap, garam, dan merica. 6. Aduk hingga semua bumbu tercampur rata. 7. Sajikan dengan kerupuk, timun, dan tomat.",
      loves: 980,
      url: "/recipe/nasi-goreng",
      category: "Breakfast",
      region: "Jawa",
      image: "/images/nasi-goreng.jpg",
      total_ingredients: 12,
      total_steps: 7,
      prepTime: "25 min",
    },
    {
      id: 3,
      title: "Soto Ayam",
      title_cleaned: "soto ayam lamongan",
      ingredients:
        "1 ekor ayam, 2 liter air, 4 lembar daun jeruk, 2 lembar daun salam, 2 batang serai, 2 cm lengkuas, Bumbu halus: 8 siung bawang merah, 6 siung bawang putih, 4 butir kemiri, 1 sdt kunyit bubuk, 1 sdt ketumbar, 1/2 sdt merica, 2 cm jahe, Pelengkap: telur rebus, soun, kol, taoge, jeruk nipis, sambal, bawang goreng",
      ingredients_cleaned:
        "ayam daun jeruk daun salam serai lengkuas bawang merah bawang putih kemiri kunyit ketumbar merica jahe telur soun kol taoge jeruk nipis sambal bawang goreng",
      steps:
        "1. Rebus ayam hingga empuk, ambil kaldunya. 2. Tumis bumbu halus dengan daun jeruk, daun salam, serai, dan lengkuas hingga harum. 3. Masukkan tumisan bumbu ke dalam kaldu. 4. Masak hingga mendidih dan bumbu meresap. 5. Suwir-suwir daging ayam. 6. Sajikan soto dengan pelengkap.",
      loves: 850,
      url: "/recipe/soto-ayam",
      category: "Soup",
      region: "Jawa Timur",
      image: "/images/soto.jpg",
      total_ingredients: 19,
      total_steps: 6,
      prepTime: "60 min",
    },
    {
      id: 4,
      title: "Gado-gado",
      title_cleaned: "gado gado jakarta",
      ingredients:
        "100g tauge, 100g kacang panjang, 1 buah kentang, 1 buah wortel, 1/4 kol, 2 butir telur, 100g tahu, 100g tempe, Bahan saus: 150g kacang tanah, 2 siung bawang putih, 3 buah cabai merah, 2 sdm gula merah, 1 sdt garam, 100ml air, 1 sdm air asam jawa",
      ingredients_cleaned:
        "tauge kacang panjang kentang wortel kol telur tahu tempe kacang tanah bawang putih cabai gula merah garam air asam jawa",
      steps:
        "1. Rebus semua sayuran secara terpisah hingga matang. 2. Goreng tahu dan tempe hingga kecokelatan. 3. Rebus telur hingga matang, potong menjadi 4 bagian. 4. Sangrai kacang tanah hingga matang. 5. Haluskan kacang tanah bersama bawang putih, cabai, gula merah, dan garam. 6. Tambahkan air dan air asam jawa, masak hingga mengental. 7. Sajikan sayuran, tahu, tempe, dan telur dengan saus kacang.",
      loves: 730,
      url: "/recipe/gado-gado",
      category: "Salad",
      region: "Jakarta",
      image: "/images/gado-gado.jpg",
      total_ingredients: 16,
      total_steps: 7,
      prepTime: "30 min",
    },
  ];

  return (
    <HydrateClient>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[500px] w-full bg-gradient-to-r from-amber-800 to-orange-600">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container mx-auto flex h-full flex-col items-center justify-center px-4 py-16 text-center">
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Rasa<span className="text-yellow-400">Nusa</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-white/90">
              Discover the rich and diverse flavors of Indonesian cuisine
              through our collection of authentic recipes from across the
              archipelago
            </p>

            {/* Search Bar */}
            <div className="relative w-full max-w-2xl">
              <form action="/search" method="get">
                <input
                  type="text"
                  name="q"
                  placeholder="Search for Indonesian recipes..."
                  className="w-full rounded-full bg-white/90 py-4 pr-12 pl-6 text-lg shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  aria-label="Search recipes"
                />
                <button
                  type="submit"
                  className="absolute top-3 right-4 rounded-full bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Featured Recipes */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Recipes
            </h2>
            <Link href="/search" className="text-orange-600 hover:underline">
              View all recipes
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={recipe.url}
                className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800">
                    {recipe.region}
                  </div>
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {recipe.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart
                        size={16}
                        fill="#ef4444"
                        className="text-red-500"
                      />
                      <span>{recipe.loves}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="mr-1 inline-block rounded-full bg-orange-100 px-2 py-1">
                      {recipe.category}
                    </span>
                    <span className="inline-block">
                      {recipe.total_ingredients} ingredients •{" "}
                      {recipe.total_steps} steps
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-gradient-to-r from-amber-700 to-orange-600 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold">About RasaNusa</h2>
              <p className="mb-8 text-lg">
                RasaNusa is dedicated to preserving and sharing the rich
                culinary heritage of Indonesia. Our collection features
                authentic recipes from across the archipelago, from Sabang to
                Merauke, celebrating the diverse flavors that make Indonesian
                cuisine so special.
              </p>
              <Link
                href="/about"
                className="inline-block rounded-full border-2 border-white bg-transparent px-6 py-3 font-medium transition-colors hover:bg-white hover:text-orange-600"
              >
                Learn more about our mission
              </Link>
            </div>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
