"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { ShoppingCart, User, Menu, X, Search, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Main header with logo, search, and contact - Green background */}
      <div className="bg-green-500 text-white py-3 sm:py-4">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-6">
            {/* Logo with hamburger menu */}
            <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-center lg:justify-start">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-green-600 rounded"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
                <span className="text-2xl sm:text-3xl">🌿</span>
                <span className="text-white font-bold">GreenSouq</span>
              </Link>
            </div>
            
            {/* Search Bar - Centered */}
            <div className="w-full lg:flex-1 lg:max-w-2xl order-3 lg:order-2">
              <form onSubmit={handleSearch} className="flex items-stretch shadow-md rounded overflow-hidden">
                <select className="hidden sm:block px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 text-sm sm:text-base border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
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
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </form>
            </div>

            {/* Contact Info and User Actions - Right side */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 order-2 lg:order-3 w-full lg:w-auto justify-between lg:justify-end">
              {/* Contact Info */}
              <div className="flex items-center gap-2 sm:gap-3 text-white">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="font-medium">+971 58 512 1105</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="font-medium">info@greensouq.ae</span>
                </div>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-3 sm:gap-4">
                {session ? (
                  <>
                    <Link href="/favorites" className="hover:opacity-80 text-white font-medium text-xs sm:text-sm hidden sm:inline">
                      Favorites
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="hover:opacity-80 text-white font-medium text-xs sm:text-sm hidden sm:inline"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="flex items-center gap-1 hover:opacity-80 text-white font-medium text-xs sm:text-sm">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                )}
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-white hover:opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Light green background */}
      <nav className={`bg-green-400 text-white ${mobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="container mx-auto px-3 sm:px-4">
          <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 xl:gap-6 py-3 lg:py-3 text-xs sm:text-sm overflow-x-auto lg:overflow-x-visible">
            <li><Link href="/" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Indoor Plants <span className="text-xs text-white hidden lg:inline">▼</span></Link></li>
            <li><Link href="/" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Outdoor Plants <span className="text-xs text-white hidden lg:inline">▼</span></Link></li>
            <li><Link href="/" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Soil & Stones <span className="text-xs text-white hidden lg:inline">▼</span></Link></li>
            <li><Link href="/" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Fertilizer & Pesticides <span className="text-xs text-white hidden lg:inline">▼</span></Link></li>
            <li><Link href="/" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Pots & Planters <span className="text-xs text-white hidden lg:inline">▼</span></Link></li>
            <li><Link href="/" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Seeds <span className="text-xs text-white hidden lg:inline">▼</span></Link></li>
            <li><Link href="/" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Hydroponics</Link></li>
            <li><Link href="/" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Garden Services</Link></li>
            <li><Link href="/" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Plant Talk</Link></li>
            <li><Link href="/collections" className="hover:underline flex items-center gap-1 text-white whitespace-nowrap font-medium">Collections</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

