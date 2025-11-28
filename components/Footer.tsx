import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8 sm:mt-12 lg:mt-16">
      {/* Footer links */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          <div>
            <h4 className="font-bold mb-4">Follow us</h4>
            <div className="flex gap-3 flex-wrap">
              <Mail className="w-5 h-5 cursor-pointer hover:text-green-600" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-green-600" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-green-600" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-green-600" />
              <span className="w-5 h-5 flex items-center justify-center cursor-pointer hover:text-green-600 text-xs">P</span>
              <span className="w-5 h-5 flex items-center justify-center cursor-pointer hover:text-green-600 text-xs">T</span>
              <span className="w-5 h-5 flex items-center justify-center cursor-pointer hover:text-green-600 text-xs">W</span>
              <span className="w-5 h-5 flex items-center justify-center cursor-pointer hover:text-green-600 text-xs">S</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Find It Fast</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-green-600">Latest Blogs</Link></li>
              <li><Link href="/" className="hover:text-green-600">FAQ's</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Important Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-green-600">About us</Link></li>
              <li><Link href="/" className="hover:text-green-600">Contact us</Link></li>
              <li><Link href="/" className="hover:text-green-600">Shipping charges</Link></li>
              <li><Link href="/" className="hover:text-green-600">Terms and Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Hot Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-green-600">My Account</Link></li>
              <li><Link href="/" className="hover:text-green-600">Checkout</Link></li>
              <li><Link href="/" className="hover:text-green-600">Your Cart</Link></li>
              <li><Link href="/" className="hover:text-green-600">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>Mobile: +971 58 512 1105</li>
              <li>Email: info@greensouq.ae</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">Copyright © 2025 Greensouq. Powered by Shopify</p>
          <div className="flex gap-3 sm:gap-4 items-center flex-wrap justify-center">
            <span className="text-xs font-semibold">American Express</span>
            <span className="text-xs font-semibold">Mastercard</span>
            <span className="text-xs font-semibold">Visa</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

