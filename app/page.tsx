"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  const categories = [
    { name: "Plant Bundles", emoji: "🌿", gradient: "from-green-100 to-green-200" },
    { name: "Seasonal Flowering Plants", emoji: "🌸", gradient: "from-pink-100 to-pink-200" },
    { name: "Easy Care Indoor Plants", emoji: "🌵", gradient: "from-green-100 to-emerald-200" },
    { name: "Soil and Fertilizers", emoji: "🪴", gradient: "from-amber-100 to-orange-200" },
  ]

  const indoorPlants = [
    { name: "Nephrolepis exaltata \"Green Lady\", Boston Fern or Sword Fern", price: "Dhs. 45.00 - Dhs. 165.00", onSale: false },
    { name: "Peace Lily or Spathiphyllum", price: "Dhs. 30.00 Dhs. 350.00", originalPrice: "Dhs. 60.00 Dhs. 650.00", onSale: true },
    { name: "Asplenium Nidus or Bird's Nest Fern 50-60cm spread", price: "Dhs. 55.00 - Dhs. 90.00", originalPrice: "Dhs. 200.00 Dhs. 300.00", onSale: true },
    { name: "Chamaedorea Elegans, Parlour Palm or Bamboo Palm", price: "Dhs. 25.00 - Dhs. 45.00", onSale: false },
    { name: "Pachira Aquatica twisted (Money Tree) - 30cm", price: "Dhs. 55.00 Dhs. 88.00", originalPrice: "Dhs. 65.00 Dhs. 92.00", onSale: true },
    { name: "Spider Plant or Air Plant", price: "Dhs. 40.00 - Dhs. 120.00", onSale: true },
    { name: "White Orchids 50-70cm", price: "Dhs. 80.00 - Dhs. 250.00", onSale: false },
    { name: "Opuntia Consolea in White", price: "Dhs. 50.00 - Dhs. 150.00", onSale: false },
    { name: "Zamioculcas Zamiifolia", price: "Dhs. 90.00 - Dhs. 280.00", onSale: true },
    { name: "Andreanum or The Flamingo", price: "Dhs. 35.00 - Dhs. 90.00", onSale: true },
  ]

  const outdoorPlants = [
    { name: "Bougainvillea Specimen \"Single Head\"", price: "Dhs. 220.00 - Dhs. 3,800.00", onSale: false },
    { name: "Road Kill Cactus Console - Opuntia Consolea", price: "Dhs. 30.00 Dhs. 60.00", originalPrice: "Dhs. 55.00 Dhs. 125.00", onSale: true },
    { name: "Areca Palm 1.2-1.5m Outdoor In Fiber Glass Pot", price: "Dhs. 550.00 Dhs. 575.00", originalPrice: "Dhs. 650.00 Dhs. 950.00", onSale: true },
    { name: "Portulaca Grandiflora | Rose Moss | 9cm pot", price: "Dhs. 9.00 Dhs. 38.00", originalPrice: "Dhs. 20.00 Dhs. 52.00", onSale: true },
    { name: "Bougainvillea Spectabilis \"30 to 160cm\" Dark Pink", price: "Dhs. 14.00 - Dhs. 225.00", originalPrice: "Dhs. 20.00 Dhs. 225.00", onSale: true },
    { name: "Musa Paradisiaca Or Banana Tree \"80cm-90cm\"", price: "Dhs. 90.00", onSale: false },
    { name: "Vinca flowers 10-15cm", price: "Dhs. 8.50 - Dhs. 34.00", onSale: false },
    { name: "Arabian Jasmine Motia \"Jasminum Sambac\"", price: "Dhs. 20.00 - Dhs. 95.00", originalPrice: "Dhs. 20.00 Dhs. 100.00", onSale: true },
    { name: "Mint Plant or Mentha", price: "Dhs. 7.00 - Dhs. 10.00", originalPrice: "Dhs. 15.00 Dhs. 30.00", onSale: true },
    { name: "Ocimum Tenuiflorum/Tulsi plant/Holy Basil", price: "Dhs. 12.00 - Dhs. 40.00", originalPrice: "Dhs. 40.00", onSale: true },
  ]

  const plantCareProducts = [
    { name: "Desert Energy Liqui-Fert", price: "30 Aed Only", emoji: "🧴" },
    { name: "Grow Fast Organic Revitalizer", price: "24 Aed Only", emoji: "🧴" },
    { name: "Ocean Bio-Fert", price: "57 Aed Only", emoji: "🧴" },
    { name: "Rootmax Humifull", price: "45 Aed Only", emoji: "🧴" },
    { name: "Citru Feed", price: "30 Aed Only", emoji: "🧴" },
    { name: "Desert Energy Ironganese", price: "40 Aed Only", emoji: "🧴" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Promotional Banners */}
        <section className="bg-gray-100 py-6 sm:py-8 lg:py-12">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {/* Best Seller Large Plants Bundle */}
              <Link href="/collections" className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200/50 to-transparent"></div>
                  <div className="text-center z-10 p-4 sm:p-6">
                    <div className="text-6xl sm:text-7xl mb-4">🌿</div>
                    <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-2 drop-shadow-lg">Best Seller Large Plants Bundle</h3>
                    <div className="text-orange-500 text-2xl sm:text-3xl font-bold mb-4">1050 AED</div>
                    <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded hover:bg-gray-800 text-sm sm:text-base font-medium">
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>

              {/* Home Decorator Bundle */}
              <Link href="/collections" className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-transparent"></div>
                  <div className="text-center z-10 p-4 sm:p-6">
                    <div className="text-6xl sm:text-7xl mb-4">🪴</div>
                    <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-2 drop-shadow-lg">Home Decorator Bundle</h3>
                    <div className="text-orange-500 text-2xl sm:text-3xl font-bold mb-4">799 AED</div>
                    <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded hover:bg-gray-800 text-sm sm:text-base font-medium">
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>

              {/* Urban Jungle Bundle */}
              <Link href="/collections" className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] bg-gradient-to-br from-lime-50 to-lime-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-200/50 to-transparent"></div>
                  <div className="text-center z-10 p-4 sm:p-6">
                    <div className="text-6xl sm:text-7xl mb-4">🌳</div>
                    <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-2 drop-shadow-lg">Urban Jungle Bundle</h3>
                    <div className="text-orange-500 text-2xl sm:text-3xl font-bold mb-4">725 Aed</div>
                    <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded hover:bg-gray-800 text-sm sm:text-base font-medium">
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Top Categories */}
        <section className="py-6 sm:py-8 lg:py-12 bg-white">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center text-gray-900">Top Categories this Week</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((category, index) => (
                <Link key={index} href="/collections" className="text-center group">
                  <div className={`aspect-square bg-gradient-to-br ${category.gradient} rounded-full mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                    <span className="text-5xl sm:text-6xl">{category.emoji}</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-green-600 transition-colors">{category.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Plant Care Products */}
        <section className="bg-gray-800 py-6 sm:py-8 lg:py-12">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center text-white">Featured Plant Care Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {plantCareProducts.map((product, i) => (
                <Link key={i} href="/product" className="bg-white rounded-lg p-3 sm:p-4 text-center group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <span className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform duration-300">{product.emoji}</span>
                  </div>
                  <p className="text-xs sm:text-sm mb-2 text-gray-800 group-hover:text-green-600 transition-colors duration-300 font-medium line-clamp-2">{product.name}</p>
                  <p className="text-green-600 font-semibold mb-2 text-xs sm:text-sm lg:text-base">{product.price}</p>
                  <div className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 text-xs sm:text-sm transition-colors duration-300 font-medium">
                    Shop Now
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Top Selling Indoor Plants */}
        <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900">Top Selling Indoor Plants</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {indoorPlants.map((plant, index) => (
                <ProductCard 
                  key={index} 
                  name={plant.name} 
                  price={plant.price}
                  onSale={plant.onSale}
                  originalPrice={plant.originalPrice}
                  showButtonsOnHover={true}
                />
              ))}
            </div>
            <div className="text-center">
              <Link href="/collections" className="inline-block bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded hover:bg-gray-800 text-sm sm:text-base font-medium">
                Shop Collection
              </Link>
            </div>
          </div>
        </section>

        {/* Top Selling Outdoor Plants */}
        <section className="py-6 sm:py-8 lg:py-12 bg-white">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900">Top Selling Outdoor Plants</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {outdoorPlants.map((plant, index) => (
                <ProductCard 
                  key={index} 
                  name={plant.name} 
                  price={plant.price}
                  onSale={plant.onSale}
                  originalPrice={plant.originalPrice}
                />
              ))}
            </div>
            <div className="text-center">
              <Link href="/collections" className="inline-block bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded hover:bg-gray-800 text-sm sm:text-base font-medium">
                Shop Collection
              </Link>
            </div>
        </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-3 sm:px-4 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-center text-gray-900">Newsletter</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">Invite customers to join your mailing list.</p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 sm:px-6 py-3 border border-gray-300 rounded-l-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-black text-white px-6 sm:px-8 py-3 rounded-r-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-gray-800 font-medium text-sm sm:text-base"
              >
                Sign up
              </button>
            </form>
        </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
