"use client"

import Link from "next/link"
import React from "react"
import { useMobileMenu } from "@/components/MobileMenuContext"

export default function Subheader() {
  const { mobileMenuOpen } = useMobileMenu()

  return (
    <nav className={`text-black bg-[#a1d132] ${mobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
      <div className="container mx-auto px-3 sm:px-4 md:mx-25">
        <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 xl:gap-6 py-3 lg:py-3 text-xs sm:text-base overflow-x-auto lg:overflow-x-visible">
          <li><Link href="/" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Indoor Plants <span className="text-xs text-black hidden lg:inline">▼</span></Link></li>
          <li><Link href="/" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Outdoor Plants <span className="text-xs text-black hidden lg:inline">▼</span></Link></li>
          <li><Link href="/" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Soil & Stones <span className="text-xs text-black hidden lg:inline">▼</span></Link></li>
          <li><Link href="/" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Fertilizer & Pesticides <span className="text-xs text-black hidden lg:inline">▼</span></Link></li>
          <li><Link href="/" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Pots & Planters <span className="text-xs text-black hidden lg:inline">▼</span></Link></li>
          <li><Link href="/" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Seeds <span className="text-xs text-black hidden lg:inline">▼</span></Link></li>
          <li><Link href="/" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Hydroponics</Link></li>
          <li><Link href="/" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Garden Services</Link></li>
          <li><Link href="/" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Plant Talk</Link></li>
          <li><Link href="/collections" className="hover:underline flex items-center gap-1 text-black whitespace-nowrap font-medium">Collections</Link></li>
        </ul>
      </div>
    </nav>
  )
}