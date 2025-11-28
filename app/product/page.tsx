"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import { ShoppingCart, Heart, Share2 } from "lucide-react"

export default function ProductPage() {
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
  const productImages = [
    { id: 1, emoji: "🪴", gradient: "from-green-100 to-green-200" },
    { id: 2, emoji: "🌿", gradient: "from-green-200 to-green-300" },
    { id: 3, emoji: "🌱", gradient: "from-emerald-100 to-emerald-200" },
    { id: 4, emoji: "🍃", gradient: "from-lime-100 to-lime-200" },
  ]

  const [selectedImage, setSelectedImage] = useState(productImages[0])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Breadcrumb */}
          <nav className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            <span>Home</span> / <span>Plants</span> / <span>Indoor Plants</span> / <span>Peace Lily</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden transition-all duration-300">
                <div className={`w-full h-full bg-gradient-to-br ${selectedImage.gradient} flex items-center justify-center transition-all duration-300`}>
                  <span className="text-9xl transition-transform duration-300 hover:scale-110">{selectedImage.emoji}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image) => (
                  <div 
                    key={image.id} 
                    onMouseEnter={() => setSelectedImage(image)}
                    className={`aspect-square bg-gray-100 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      selectedImage.id === image.id 
                        ? "border-green-600 scale-105" 
                        : "border-gray-200 hover:border-green-400"
                    }`}
                  >
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">{image.emoji}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Peace Lily</h1>
              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center flex-wrap">
                  <span className="text-yellow-400 text-base sm:text-lg">★★★★★</span>
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">(24 reviews)</span>
                </div>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">Dir. 75.00 - Dir. 200.00</p>
                <p className="text-xs sm:text-sm text-gray-600">Price varies by size</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Peace Lily is a popular indoor plant known for its elegant white flowers and air-purifying qualities. 
                  It thrives in low to medium light conditions and requires minimal maintenance. Perfect for beginners and 
                  experienced plant enthusiasts alike. This beautiful plant helps improve indoor air quality by removing 
                  toxins from the air.
                </p>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Size Options</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm border-2 border-gray-300 rounded hover:border-green-600 hover:bg-green-50">
                    Small (6-8")
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm border-2 border-green-600 bg-green-50 rounded">
                    Medium (10-12")
                  </button>
                  <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm border-2 border-gray-300 rounded hover:border-green-600 hover:bg-green-50">
                    Large (14-16")
                  </button>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Quantity</h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  <button className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-300 rounded flex items-center justify-center hover:border-green-600 text-sm sm:text-base">
                    -
                  </button>
                  <span className="text-base sm:text-lg font-semibold">1</span>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-300 rounded flex items-center justify-center hover:border-green-600 text-sm sm:text-base">
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                <button className="flex-1 bg-black text-white py-2.5 sm:py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 text-sm sm:text-base font-medium">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  Add to Cart
                </button>
                <div className="flex gap-2 sm:gap-4">
                  <button className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg hover:border-green-600 flex items-center justify-center">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg hover:border-green-600 flex items-center justify-center">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="font-semibold">Care Level:</span>
                    <span>Easy</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold">Light:</span>
                    <span>Low to Medium</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold">Water:</span>
                    <span>Weekly</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold">Pet Safe:</span>
                    <span>No</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <section className="mt-8 sm:mt-12 lg:mt-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Link key={i} href="/product" className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 group cursor-pointer">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <span className="text-4xl group-hover:scale-125 transition-transform duration-300">🌱</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 group-hover:text-green-600 transition-colors duration-300">Related Plant {i}</h3>
                  <p className="text-green-600 font-semibold">Dir. {(50 + i * 10)}.00</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

