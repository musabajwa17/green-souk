import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  name: string
  price: string
  image?: string
  href?: string
  onSale?: boolean
  originalPrice?: string
  showButtonsOnHover?: boolean
}

export default function ProductCard({ name, price, image, href = "/product", onSale = false, originalPrice, showButtonsOnHover = false }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <Link href={href} className="block">
        <div className="p-2 sm:p-3 lg:p-4">
          {onSale && (
            <span className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded z-10">Sale</span>
          )}
          <div className="aspect-square bg-gray-100 rounded-lg mb-2 sm:mb-3 flex items-center justify-center overflow-hidden relative">
            {image ? (
              <Image 
                src={image} 
                alt={name} 
                width={200} 
                height={200} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl sm:text-4xl group-hover:scale-125 transition-transform duration-300">🌱</span>
              </div>
            )}
          </div>
          <h3 className="font-medium text-xs sm:text-sm mb-1 text-gray-800 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">{name}</h3>
          <div className="mb-2">
            {originalPrice && (
              <p className="text-xs text-gray-400 line-through mb-1">{originalPrice}</p>
            )}
            <p className="text-green-600 font-semibold text-xs sm:text-sm lg:text-base">{price}</p>
          </div>
        </div>
      </Link>
      
      {/* Hover Buttons - Only show if showButtonsOnHover is true */}
      {showButtonsOnHover && (
        <div className="px-0 pb-0 group-hover:px-2 sm:group-hover:px-3 lg:group-hover:px-4 group-hover:pb-2 sm:group-hover:pb-3 lg:group-hover:pb-4 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-300 ease-in-out border-t-0 group-hover:border-t group-hover:border-gray-200">
          <div className="flex flex-col gap-2 pt-0 group-hover:pt-2">
            <button 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // Handle quick shop - could open a modal or quick add to cart
              }}
              className="w-full bg-white border-2 border-black text-black py-2 px-4 rounded text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Quick shop
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.location.href = href
              }}
              className="w-full bg-black text-white py-2 px-4 rounded text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Choose options
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

