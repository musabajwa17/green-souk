import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  name: string
  price: string
  image?: string
  image1?: string
  image2?: string
  href?: string
  onSale?: boolean
  originalPrice?: string
  showButtonsOnHover?: boolean
}

export default function ProductCard({ name, price, image, image1, image2, href = "/product", onSale = false, originalPrice, showButtonsOnHover = false }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <Link href={href} className="block">
        <div className="p-2 sm:p-3 lg:p-4">
          {onSale && (
            <span className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded z-10">Sale</span>
          )}
          <div className="aspect-square bg-gray-100 rounded-lg mb-2 sm:mb-3 flex items-center justify-center overflow-hidden relative">
            {image1 && image2 ? (
              <>
                <img 
                  src={image1} 
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                />
                <img 
                  src={image2} 
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </>
            ) : image ? (
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
      
      {/* Hover Buttons - Positioned inline, fixed height to prevent card shift */}
      <div className="px-2 sm:px-3 lg:px-4">
        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 ease-in-out border-t-0 group-hover:border-t group-hover:border-gray-200">
          <div className="flex flex-row gap-1.5 sm:gap-2 py-2 sm:py-2.5">
            <button 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // Handle quick shop - could open a modal or quick add to cart
              }}
              className="flex-1 bg-white border border-black text-black py-1.5 sm:py-2 px-2 rounded text-xs font-medium hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
            >
              Quick shop
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.location.href = href
              }}
              className="flex-1 bg-black text-white py-1.5 sm:py-2 px-2 rounded text-xs font-medium hover:bg-gray-800 transition-colors duration-200 whitespace-nowrap"
            >
              Choose options
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

