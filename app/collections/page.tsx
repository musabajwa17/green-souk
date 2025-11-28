"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function CollectionsPage() {
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

  const collections = [
    { name: "Affordable Indoor Plants", emoji: "🪴", gradient: "from-green-100 to-green-200" },
    { name: "Air Purifying Plant Sets for Dubai Zone", emoji: "🌿", gradient: "from-emerald-100 to-emerald-200" },
    { name: "Air Purifying Plants Bundle", emoji: "🌱", gradient: "from-lime-100 to-lime-200" },
    { name: "Annual Flower Sets", emoji: "🌸", gradient: "from-pink-100 to-pink-200" },
    { name: "Aquatic Plants", emoji: "🪷", gradient: "from-blue-100 to-blue-200" },
    { name: "Artificial Plants", emoji: "🌺", gradient: "from-purple-100 to-purple-200" },
    { name: "Aurora Pots", emoji: "🏺", gradient: "from-amber-100 to-amber-200" },
    { name: "Balcony Plants", emoji: "🌳", gradient: "from-teal-100 to-teal-200" },
    { name: "Bathroom Plants", emoji: "🪴", gradient: "from-cyan-100 to-cyan-200" },
    { name: "Beautiful Indoor Plants", emoji: "🌿", gradient: "from-green-100 to-emerald-200" },
    { name: "Bedroom Plants", emoji: "🌱", gradient: "from-lime-100 to-green-200" },
    { name: "Beginners Plant Sets", emoji: "🪴", gradient: "from-emerald-100 to-teal-200" },
    { name: "Bonsai Collection", emoji: "🌲", gradient: "from-green-200 to-emerald-300" },
    { name: "Cactus Collection", emoji: "🌵", gradient: "from-lime-100 to-green-200" },
    { name: "Ceramic Planters", emoji: "🏺", gradient: "from-orange-100 to-amber-200" },
    { name: "Christmas Plants", emoji: "🎄", gradient: "from-red-100 to-green-200" },
    { name: "Desktop Plants", emoji: "🪴", gradient: "from-green-100 to-lime-200" },
    { name: "Fertilizers & Soil", emoji: "🌾", gradient: "from-amber-100 to-orange-200" },
    { name: "Garden Tools", emoji: "🔧", gradient: "from-gray-100 to-gray-200" },
    { name: "Hanging Plants", emoji: "🌿", gradient: "from-green-100 to-emerald-200" },
    { name: "Herb Garden Sets", emoji: "🌿", gradient: "from-lime-100 to-green-200" },
    { name: "Large Indoor Plants", emoji: "🌳", gradient: "from-emerald-100 to-teal-200" },
    { name: "Office Plants", emoji: "🪴", gradient: "from-green-100 to-cyan-200" },
    { name: "Outdoor Flowering Plants", emoji: "🌸", gradient: "from-pink-100 to-rose-200" },
    { name: "Pet Safe Plants", emoji: "🐾", gradient: "from-green-100 to-lime-200" },
    { name: "Plant Care Accessories", emoji: "🧴", gradient: "from-blue-100 to-cyan-200" },
    { name: "Rare Plants Collection", emoji: "🌿", gradient: "from-purple-100 to-pink-200" },
    { name: "Seed Starter Kits", emoji: "🌱", gradient: "from-green-100 to-emerald-200" },
    { name: "Succulent Collection", emoji: "🌵", gradient: "from-lime-100 to-green-200" },
    { name: "Terrarium Plants", emoji: "🪴", gradient: "from-cyan-100 to-blue-200" },
    { name: "Vertical Garden Plants", emoji: "🌿", gradient: "from-green-100 to-teal-200" },
    { name: "Window Sill Plants", emoji: "🌱", gradient: "from-lime-100 to-emerald-200" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Breadcrumb */}
          <nav className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-green-600">Home</Link> / <span>Collections</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">Plant Collections</h1>

          {/* Collections Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {collections.map((collection, index) => (
              <Link 
                key={index} 
                href="/product" 
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className={`aspect-square bg-gradient-to-br ${collection.gradient} flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
                  <span className="text-5xl sm:text-6xl lg:text-7xl transition-transform duration-300 group-hover:scale-110">{collection.emoji}</span>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-xs sm:text-sm lg:text-base text-gray-800 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 sm:mt-12 flex justify-center items-center gap-2">
            <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm sm:text-base font-medium">
              1
            </button>
            <button className="px-3 sm:px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 text-sm sm:text-base font-medium">
              2
            </button>
            <button className="px-3 sm:px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 text-sm sm:text-base font-medium">
              3
            </button>
            <span className="px-2 text-gray-500 text-sm sm:text-base">...</span>
            <button className="px-3 sm:px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 text-sm sm:text-base font-medium">
              11
            </button>
            <button className="px-3 sm:px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 text-sm sm:text-base font-medium">
              Next &gt;
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

