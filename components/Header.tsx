"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { ShoppingCart, User, Menu, X, Search, MessageCircle, Leaf, LogIn } from "lucide-react"
import { useState } from "react"
import { useMobileMenu } from "@/components/MobileMenuContext"

export default function Header() {
  const { data: session } = useSession()
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="bg-[#a1d132] sticky top-0 z-50">
      {/* Main header with logo, search, and contact - Green background */}
        <div className="text-black py-3 sm:py-4">
          <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-6">
            {/* Logo with hamburger menu */}
            <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-center lg:justify-start">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-black hover:bg-green-600 rounded"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
                {/* <span className="text-2xl sm:text-3xl">🌿</span> */}
                <span className="text-2xl sm:text-3xl"><Leaf className="text-black" width={35} height={35} /></span>
                <span className="text-black font-bold">GreenSouq</span>
              </Link>
            </div>
            
            {/* Search Bar - Centered */}
            <div className="w-full lg:flex-1 lg:max-w-2xl order-3 lg:order-2">
              <form onSubmit={handleSearch} className="flex items-stretch shadow-md rounded overflow-hidden">
                <select className="hidden w-40 sm:block px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 text-sm sm:text-base border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>All categories</option>
                  <option>Indoor Plants</option>
                  <option>Outdoor Plants</option>
                  <option>Soil & Stones</option>
                  <option>Fertilizer & Pesticides</option>
                  <option>Pots & Planters</option>
                  <option>Seeds</option>
                </select>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-gray-700 text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </form>
            </div>

            {/* Contact Info and User Actions - Right side */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 order-2 lg:order-3 w-full lg:w-auto justify-between lg:justify-end">
              {/* Contact Info */}
              <div className="flex items-center gap-2 sm:gap-3 text-black">
                <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                <div className="flex flex-col sm:flex-col text-xs sm:text-sm">
                  <span className="font-medium">+971 58 512 1105</span>
                  {/* <span className="hidden sm:inline">•</span> */}
                  <span className="font-medium">info@greensouq.ae</span>
                </div>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-3 sm:gap-4">
                {session ? (
                  <>
                    <Link href="/favorites" className="hover:opacity-80 text-black font-medium text-xs sm:text-sm hidden sm:inline">
                      Favorites
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="hover:opacity-80 text-white flex flex-row text-blakc gap-1 font-medium text-xs sm:text-sm hidden sm:inline"
                    >
                      <span><LogIn width={20} height={20} className="text-black"/> </span>
                    <span className="text-black"> Logout</span>
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="flex items-center gap-1 hover:opacity-80 text-white font-medium text-xs sm:text-sm">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                )}
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-black hover:opacity-80" />
              </div>
            </div>
          </div>
          </div>
        </div>

      {/* Subheader is rendered by pages (so header remains purely sticky) */}
    </header>
  )
}

