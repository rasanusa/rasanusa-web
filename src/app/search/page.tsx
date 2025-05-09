import Link from "next/link";
import Image from "next/image";
import { Search, Heart } from "lucide-react";

import { HydrateClient } from "@/trpc/server";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    category?: string;
    region?: string;
    sortBy?: string;
  };
}) {
  // Get search query from URL params
  const query = searchParams.q ?? "";
  const categoryFilter = searchParams.category ?? "";
  const sortBy = searchParams.sortBy ?? "popular";

  // Fetch search results (replace with actual tRPC query later)
  // This is dummy data that will be replaced with actual search results
  const searchResults = [
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
      image: "/images/rendang.jpg",
      total_ingredients: 16,
      total_steps: 8,
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
      image: "/images/nasi-goreng.jpg",
      total_ingredients: 12,
      total_steps: 7,
    },
    {
      id: 5,
      title: "Ayam Betutu",
      title_cleaned: "ayam betutu bali",
      ingredients:
        "1 ekor ayam utuh, 10 cabai merah, 6 cabai rawit, 8 siung bawang merah, 5 siung bawang putih, 5 cm kencur, 4 cm kunyit, 3 cm jahe, 4 batang serai, 5 lembar daun jeruk, 3 lembar daun salam, 2 sdm terasi bakar, 1 sdm ketumbar, 4 butir kemiri, 1 sdm garam, 2 sdm minyak kelapa",
      ingredients_cleaned:
        "ayam cabai bawang merah bawang putih kencur kunyit jahe serai daun jeruk daun salam terasi ketumbar kemiri garam minyak kelapa",
      steps:
        "1. Bersihkan ayam dan belah di bagian dada. 2. Haluskan semua bumbu kecuali daun jeruk, daun salam, dan serai. 3. Geprek serai. 4. Tumis bumbu halus bersama serai, daun jeruk, dan daun salam hingga harum. 5. Lumuri ayam dengan bumbu tumis hingga rata. 6. Bungkus ayam dengan daun pisang. 7. Kukus selama 45 menit, lalu panggang 15 menit. 8. Sajikan dengan plecing kangkung.",
      loves: 845,
      url: "/recipe/ayam-betutu",
      category: "Main Course",
      image: "/images/ayam-betutu.jpg",
      total_ingredients: 15,
      total_steps: 8,
    },
    {
      id: 6,
      title: "Sate Padang",
      title_cleaned: "sate padang daging sapi",
      ingredients:
        "500g daging sapi, 250g lidah sapi, 3 batang serai, 4 lembar daun jeruk, 2 lembar daun kunyit, 2 lembar daun salam, 1 ruas lengkuas, 800ml air, 100g kacang tanah goreng, 3 sdm tepung beras, Bumbu halus: 8 siung bawang merah, 5 siung bawang putih, 4 buah cabai merah, 3 cm jahe, 2 cm kunyit, 1 sdm ketumbar, 4 butir kemiri, 1 sdt jintan, 1 sdt merica, 1 sdt garam",
      ingredients_cleaned:
        "daging sapi lidah sapi serai daun jeruk daun kunyit daun salam lengkuas kacang tanah tepung beras bawang merah bawang putih cabai jahe kunyit ketumbar kemiri jintan merica garam",
      steps:
        "1. Rebus daging dan lidah sapi hingga empuk, potong dadu. 2. Haluskan bumbu halus, tumis dengan serai, daun jeruk, daun kunyit, daun salam, dan lengkuas hingga harum. 3. Masukkan potongan daging dan lidah, aduk rata. 4. Tambahkan air, masak hingga mendidih. 5. Haluskan kacang tanah goreng. 6. Larutkan tepung beras dengan sedikit air, masukkan ke dalam kuah. 7. Masukkan kacang tanah halus, aduk hingga kuah mengental. 8. Tusuk daging dengan tusukan sate, bakar sebentar. 9. Siram dengan kuah kacang.",
      loves: 920,
      url: "/recipe/sate-padang",
      category: "Main Course",
      image: "/images/sate-padang.jpg",
      total_ingredients: 21,
      total_steps: 9,
    },
    {
      id: 7,
      title: "Es Cendol",
      title_cleaned: "es cendol tepung hunkwe",
      ingredients:
        "100g tepung hunkwe, 30g tepung beras, 100ml air daun pandan, 200ml air, 1/2 sdt pasta pandan, 1/2 sdt garam, 200ml santan kental, 1/4 sdt garam, 200g gula merah, 200ml air, 2 lembar daun pandan, Es batu secukupnya",
      ingredients_cleaned:
        "tepung hunkwe tepung beras daun pandan pasta pandan garam santan gula merah es batu",
      steps:
        "1. Rebus gula merah, air, dan daun pandan hingga gula larut, saring, sisihkan. 2. Rebus santan dan garam dengan api kecil hingga mendidih, sisihkan. 3. Campurkan tepung hunkwe, tepung beras, air daun pandan, air, pasta pandan, dan garam. 4. Masak campuran tepung hingga mengental dan matang. 5. Cetak adonan menggunakan cetakan cendol ke dalam air es. 6. Sajikan cendol dengan sirup gula merah, santan, dan es batu.",
      loves: 760,
      url: "/recipe/es-cendol",
      category: "Dessert",
      image: "/images/es-cendol.jpg",
      total_ingredients: 10,
      total_steps: 6,
    },
    {
      id: 8,
      title: "Pempek Palembang",
      title_cleaned: "pempek palembang ikan tenggiri",
      ingredients:
        "500g ikan tenggiri giling, 250g tepung sagu, 100ml air es, 2 butir telur, 1 sdt garam, 1/2 sdt merica, Bahan kuah cuka: 500ml air, 200g gula merah, 3 sdm cuka, 4 siung bawang putih, 5 buah cabai rawit, 1 sdt garam, 1 sdm ebi sangrai, Pelengkap: mentimun, mi kuning",
      ingredients_cleaned:
        "ikan tenggiri tepung sagu telur garam merica gula merah cuka bawang putih cabai ebi mentimun mi kuning",
      steps:
        "1. Campurkan ikan giling dengan garam dan merica, uleni hingga rata. 2. Masukkan telur, uleni kembali. 3. Tambahkan tepung sagu sedikit-sedikit sambil diuleni. 4. Tambahkan air es jika adonan terlalu kering. 5. Bentuk adonan sesuai selera (kapal selam, lenjer, dll). 6. Rebus dalam air mendidih hingga mengapung. 7. Untuk kuah: rebus air, gula merah, bawang putih, cabai rawit, dan ebi hingga mendidih. 8. Tambahkan cuka dan garam, aduk rata. 9. Sajikan pempek dengan kuah cuka dan pelengkap.",
      loves: 890,
      url: "/recipe/pempek-palembang",
      category: "Snacks",
      image: "/images/pempek.jpg",
      total_ingredients: 14,
      total_steps: 9,
    },
  ];

  // Filter results if needed (this would be done by the API in production)
  let filteredResults = searchResults;

  if (query) {
    filteredResults = searchResults.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients_cleaned.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (categoryFilter) {
    filteredResults = filteredResults.filter(
      (recipe) =>
        recipe.category.toLowerCase() === categoryFilter.toLowerCase(),
    );
  }

  // Sort results
  if (sortBy === "popular") {
    filteredResults.sort((a, b) => b.loves - a.loves);
  }

  return (
    <HydrateClient>
      <main className="min-h-screen bg-white">
        {/* Header Section with Search */}
        <div className="bg-gradient-to-r from-amber-800 to-orange-600 py-10">
          <div className="container mx-auto px-4">
            <h1 className="mb-6 text-center text-3xl font-bold text-white">
              Search Results {query ? `for "${query}"` : ""}
            </h1>

            {/* Search Bar */}
            <div className="relative mx-auto mb-4 max-w-2xl">
              <form action="/search" method="get">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search for Indonesian recipes..."
                  className="w-full rounded-full bg-white/90 py-3 pr-12 pl-6 text-lg shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute top-2 right-4 rounded-full bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="px-8 py-4">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Found <span className="font-bold">{filteredResults.length}</span>{" "}
              recipes
              {query ? ` matching "${query}"` : ""}
            </p>
          </div>

          {/* Search Results */}
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredResults.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={recipe.url}
                  className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

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
          ) : (
            <div className="my-16 flex flex-col items-center justify-center">
              <div className="mb-4 rounded-full bg-orange-100 p-6">
                <Search size={48} className="text-orange-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                No recipes found
              </h3>
              <p className="mb-6 text-center text-gray-600">
                We couldn&apos;t find any recipes that match your search
                criteria.
                <br />
                Try using different keywords or removing some filters.
              </p>
              <Link
                href="/"
                className="rounded-full bg-orange-600 px-6 py-2 font-medium text-white hover:bg-orange-700"
              >
                Back to Homepage
              </Link>
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
