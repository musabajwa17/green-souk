"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import Hero from "@/components/Hero"
import Subheader from "@/components/Subheader"
import { MobileMenuProvider } from "@/components/MobileMenuContext"

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
    { name: "Plant Bundles", image: "/product4.jpg" },
    { name: "Seasonal Flowering Plants", image: "/product5.jpg" },
    { name: "Easy Care Indoor Plants", image: "/product6.jpg" },
    { name: "Soil and Fertilizers", image: "/product7.jpg" },
    { name: "Boxed Greenery", image: "/product8.jpg" },
    { name: "Gardening Pots", image: "/product9.jpg" },
    { name: "Herbs and Vegetables Plants", image: "/product10.jpg" },
    { name: "Outdoor Plants", image: "/product11.jpg" },
  ]

  const indoorPlants = [
    { name: "Nephrolepis exaltata \"Green Lady\", Boston Fern or Sword Fern", price: "Dhs. 45.00 - Dhs. 165.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/nephrolepis-exaltata-green-lady-boston-fern-or-sword-fern-7830823_275x275.png?v=1763155092", image2: "https://greensouq.ae/cdn/shop/files/nephrolepis-exaltata-green-lady-boston-fern-or-sword-fern-8544382_275x275.jpg?v=1761072412" },
    { name: "Peace Lily or Spathiphyllum", price: "Dhs. 30.00 Dhs. 350.00", originalPrice: "Dhs. 60.00 Dhs. 650.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/peace-lily-or-spathiphyllum-or-znbk-alslam-7553839_275x275.png?v=1763933980", image2: "https://greensouq.ae/cdn/shop/files/peace-lily-or-spathiphyllum-or-znbk-alslam-3183243_275x275.png?v=1763909813" },
    { name: "Asplenium Nidus or Bird's Nest Fern 50-60cm spread", price: "Dhs. 55.00 - Dhs. 90.00", originalPrice: "Dhs. 200.00 Dhs. 300.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/asplenium-nidus-or-birds-nest-fern-50-60cm-spread-1270518_275x275.jpg?v=1761049871", image2: "https://greensouq.ae/cdn/shop/files/asplenium-nidus-or-birds-nest-fern-50-60cm-spread-1968903_275x275.png?v=1762405469" },
    { name: "Chamaedorea Elegans, Parlour Palm or Bamboo Palm", price: "Dhs. 25.00 - Dhs. 45.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/chamaedorea-elegans-parlour-palm-or-bamboo-palm-4666480_250x275.webp?v=1761072417", image2: "https://greensouq.ae/cdn/shop/files/chamaedorea-elegans-parlour-palm-or-bamboo-palm-6099488_275x275.png?v=1761072418" },
    { name: "Pachira Aquatica twisted (Money Tree) - 30cm", price: "Dhs. 55.00 Dhs. 88.00", originalPrice: "Dhs. 65.00 Dhs. 92.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/pachira-aquatica-money-tree-30cm-8349279_275x275.webp?v=1760971028", image2: "https://greensouq.ae/cdn/shop/files/pachira-aquatica-twisted-money-tree-30cm-2913551_275x275.png?v=1760984867" },
    { name: "Spider Plant or Air Plant", price: "Dhs. 40.00 - Dhs. 120.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/spider-plant-or-air-plant-chlorophytum-comosum-variegatum-3877929_275x275.jpg?v=1763792398", image2: "https://greensouq.ae/cdn/shop/files/spider-plant-or-air-plant-chlorophytum-comosum-variegatum-3877929_275x275.png?v=1763792398" },
    { name: "White Orchids 50-70cm", price: "Dhs. 80.00 - Dhs. 250.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/white-orchids-50-70cm-4034968_275x275.jpg?v=1761034916", image2: "https://greensouq.ae/cdn/shop/files/white-orchids-50-70cm-1589476_275x275.jpg?v=1761072410" },
    { name: "Opuntia Consolea in White", price: "Dhs. 50.00 - Dhs. 150.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-in-white-ceramic-pot-30-40cm-1727602_250x275.webp?v=1761157799", image2: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-in-white-ceramic-pot-30-40cm-3521106_275x275.jpg?v=1762405581" },
    { name: "Zamioculcas Zamiifolia", price: "Dhs. 90.00 - Dhs. 280.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/zamioculcas-zamiifolia-zanzibar-gem-or-zz-plant-6039048_275x275.png?v=1763906597", image2: "https://greensouq.ae/cdn/shop/files/zamioculcas-zamiifolia-zanzibar-gem-or-zz-plant-8006729_270x276.jpg?v=1764003153" },
    { name: "Andreanum or The Flamingo", price: "Dhs. 35.00 - Dhs. 90.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/andreanum-or-the-flamingo-flower-4778845_275x275.jpg?v=1762405359", image2: "https://greensouq.ae/cdn/shop/files/andreanum-or-the-flamingo-flower-5440200_275x275.png?v=1762461985" },
  ]

  const outdoorPlants = [
    { name: "Bougainvillea Specimen \"Single Head\"", price: "Dhs. 220.00 - Dhs. 3,800.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/bougainvillea-specimen-single-head-8265064_275x275.webp?v=1763484810", image2: "https://greensouq.ae/cdn/shop/files/bougainvillea-specimen-single-head-6264324_248x276.png?v=1763484707" },
    { name: "Road Kill Cactus Console - Opuntia Consolea", price: "Dhs. 30.00 Dhs. 60.00", originalPrice: "Dhs. 55.00 Dhs. 125.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-road-kill-cactus-5342448_275x275.jpg?v=1761111276", image2: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-road-kill-cactus-5342448_275x275.jpg?v=1761111276" },
    { name: "Areca Palm 1.2-1.5m Outdoor In Fiber Glass Pot", price: "Dhs. 550.00 Dhs. 575.00", originalPrice: "Dhs. 650.00 Dhs. 950.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/areca-palm-12-15m-outdoor-in-fiber-glass-pot-grp70x30x30-2246705_275x275.jpg?v=1761886296", image2: "https://greensouq.ae/cdn/shop/files/areca-palms-outdoor-in-fiber-glass-pot-grp70x30x30-9758079_268x275.jpg?v=1761886296" },
    { name: "Portulaca Grandiflora | Rose Moss | 9cm pot", price: "Dhs. 9.00 Dhs. 38.00", originalPrice: "Dhs. 20.00 Dhs. 52.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/portulaca-grandiflora-rose-moss-9cm-pot-4848780_276x253.jpg?v=1756309460", image2: "https://greensouq.ae/cdn/shop/files/portulaca-grandiflora-rose-moss-9cm-pot-8741165_275x275.jpg?v=1756309459" },
    { name: "Bougainvillea Spectabilis \"30 to 160cm\" Dark Pink", price: "Dhs. 14.00 - Dhs. 225.00", originalPrice: "Dhs. 20.00 Dhs. 225.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/bougainvillea-spectabilis-30-to-160cm-dark-pink-1332587_275x275.jpg?v=1758204414", image2: "https://greensouq.ae/cdn/shop/files/bougainvillea-spectabilis-30-to-160cm-dark-pink-1263364_275x275.png?v=1758296128" },
    { name: "Musa Paradisiaca Or Banana Tree \"80cm-90cm\"", price: "Dhs. 90.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/musa-paradisiaca-or-banana-tree-12m-25m-shjr-almoz-4655205_276x253.jpg?v=1758292769", image2: "https://greensouq.ae/cdn/shop/files/musa-paradisiaca-or-banana-tree-12m-25m-shjr-almoz-8769761_275x275.jpg?v=1758292769" },
    { name: "Vinca flowers 10-15cm", price: "Dhs. 8.50 - Dhs. 34.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/vinca-flowers-10-15cm-5655922_276x253.jpg?v=1756308671", image2: "https://greensouq.ae/cdn/shop/files/vinca-flowers-10-15cm-2261113_276x253.jpg?v=1756308670" },
    { name: "Arabian Jasmine Motia \"Jasminum Sambac\"", price: "Dhs. 20.00 - Dhs. 95.00", originalPrice: "Dhs. 20.00 Dhs. 100.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/arabian-jasmine-motia-jasminum-sambac-3756227_275x275.webp?v=1756309363", image2: "https://greensouq.ae/cdn/shop/files/arabian-jasmine-motia-jasminum-sambac-9384830_275x275.jpg?v=1756309363" },
    { name: "Mint Plant or Mentha", price: "Dhs. 7.00 - Dhs. 10.00", originalPrice: "Dhs. 15.00 Dhs. 30.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/mint-plant-or-mentha-8948421_276x259.jpg?v=1762373747", image2: "https://greensouq.ae/cdn/shop/files/mint-plant-or-mentha-9258354_275x275.png?v=1762461778" },
    { name: "Ocimum Tenuiflorum/Tulsi plant/Holy Basil", price: "Dhs. 12.00 - Dhs. 40.00", originalPrice: "Dhs. 40.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/ocimum-tenuiflorumtulsi-plantholy-basil-3298535_276x253.webp?v=1761327725", image2: "https://greensouq.ae/cdn/shop/files/ocimum-tenuiflorumtulsi-plantholy-basil-9058238_275x275.jpg?v=1761333987" },
  ]

   const newArrivals = [
    { name: "Exquisite White Fluted Pot Flamingo Flower 30-40cm (Suitable as Gift)", price: "Dhs. 195.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/FlamingoFinal_276x273.jpg?v=1764412109", image2: "https://greensouq.ae/cdn/shop/files/FlamingoFinal_276x273.jpg?v=1764412109" },
    { name: "Cute Mom & Dad Face Succulent Planters with Glasses (Set of 2) (Best as Gift)", price: "Dhs. 75.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/cute-mom-dad-face-succulent-planters-with-glasses-set-of-2-best-as-gift-4148611_275x275.jpg?v=1764365766", image2: "https://greensouq.ae/cdn/shop/files/cute-mom-dad-face-succulent-planters-with-glasses-set-of-2-best-as-gift-4148611_275x275.jpg?v=1764365766" },
    { name: "Majestic Duo White Orchid Arrangement (Suitable as Gift)", price: "Dhs. 295.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/majestic-duo-white-orchid-arrangement-suitable-as-gift-6554607_275x275.jpg?v=1764365765", image2: "https://greensouq.ae/cdn/shop/files/majestic-duo-white-orchid-arrangement-suitable-as-gift-6554607_275x275.jpg?v=1764365765" },
    { name: "Ceramic Planter/Pot Blue Glazed for Modern Home & Garden", price: "Dhs. 150.00 Dhs. 180.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/ceramic-planterpot-blue-glazed-for-modern-home-garden-1732525_275x275.png?v=1764105967", image2: "https://greensouq.ae/cdn/shop/files/ceramic-planterpot-blue-glazed-for-modern-home-garden-1732525_275x275.png?v=1764105967" },
    { name: "ORGA STAR PLANIC RTU | Organic Fungicide for Plant Recovery (500ml)", price: "Dhs. 95.00", originalPrice: "Dhs. 65.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/orga-star-planic-rtu-organic-fungicide-for-plant-recovery-500ml-7444921_261x275.jpg?v=1764019409", image2: "https://greensouq.ae/cdn/shop/files/orga-star-planic-rtu-organic-fungicide-for-plant-recovery-500ml-7444921_261x275.jpg?v=1764019409" },
    { name: "ORGA STAR RTU | Organic Plant Pest Control Spray (500ml)", price: "Dhs. 95.00",originalPrice: "Dhs. 65.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/orga-star-planic-rtu-organic-fungicide-for-plant-recovery-500ml-7444921_261x275.jpg?v=1764019409", image2: "https://greensouq.ae/cdn/shop/files/orga-star-planic-rtu-organic-fungicide-for-plant-recovery-500ml-7444921_261x275.jpg?v=1764019409" },
    { name: "Christmas Tree Nordmann Fir Europe Super Premium", price: "Dhs. 400.00 - Dhs. 3000.00",originalPrice: "Dhs. 600.00 - Dhs. 7500.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/christmas-tree-nordmann-fir-europe-super-premium-1387318_276x259.png?v=1763675243", image2: "https://greensouq.ae/cdn/shop/files/vinca-flowers-10-15cm-2261113_276x253.jpg?v=1756308670" },
    { name: "Green Plastic Garden Twist Ties without Wire - Durable Reusable Plant Support & General Purpose Fastener(3mm x 50M)", price: "Dhs. 40.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/1_275x275.jpg?v=1763637951", image2: "https://greensouq.ae/cdn/shop/files/arabian-jasmine-motia-jasminum-sambac-9384830_275x275.jpg?v=1756309363" },
    { name: "Green Plastic Garden Twist Ties without Wire - Durable Reusable Plant Support & General Purpose Fastener(3mm x 50M)", price: "Dhs. 40.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/1_275x275.jpg?v=1763637951", image2: "https://greensouq.ae/cdn/shop/files/mint-plant-or-mentha-9258354_275x275.png?v=1762461778" },
    { name: "Modern Fiber Reinforced Plastic Pot | FRP (Dia 46cm x Height x 46cm)- All Colors", price: "Dhs. 150.00", originalPrice: "Dhs. 600.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/modern-fiber-reinforced-plastic-pot-frp-dia-46cm-x-height-x-46cm-all-colors-7663475_275x276.jpg?v=1763673207", image2: "https://greensouq.ae/cdn/shop/files/ocimum-tenuiflorumtulsi-plantholy-basil-9058238_275x275.jpg?v=1761333987" },
  ]

   const gardeningAccesories = [
    { name: "Bougainvillea Specimen \"Single Head\"", price: "Dhs. 220.00 - Dhs. 3,800.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/bougainvillea-specimen-single-head-8265064_275x275.webp?v=1763484810", image2: "https://greensouq.ae/cdn/shop/files/bougainvillea-specimen-single-head-6264324_248x276.png?v=1763484707" },
    { name: "Road Kill Cactus Console - Opuntia Consolea", price: "Dhs. 30.00 Dhs. 60.00", originalPrice: "Dhs. 55.00 Dhs. 125.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-road-kill-cactus-5342448_275x275.jpg?v=1761111276", image2: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-road-kill-cactus-5342448_275x275.jpg?v=1761111276" },
    { name: "Areca Palm 1.2-1.5m Outdoor In Fiber Glass Pot", price: "Dhs. 550.00 Dhs. 575.00", originalPrice: "Dhs. 650.00 Dhs. 950.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/areca-palm-12-15m-outdoor-in-fiber-glass-pot-grp70x30x30-2246705_275x275.jpg?v=1761886296", image2: "https://greensouq.ae/cdn/shop/files/areca-palms-outdoor-in-fiber-glass-pot-grp70x30x30-9758079_268x275.jpg?v=1761886296" },
    { name: "Portulaca Grandiflora | Rose Moss | 9cm pot", price: "Dhs. 9.00 Dhs. 38.00", originalPrice: "Dhs. 20.00 Dhs. 52.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/portulaca-grandiflora-rose-moss-9cm-pot-4848780_276x253.jpg?v=1756309460", image2: "https://greensouq.ae/cdn/shop/files/portulaca-grandiflora-rose-moss-9cm-pot-8741165_275x275.jpg?v=1756309459" },
    { name: "Bougainvillea Spectabilis \"30 to 160cm\" Dark Pink", price: "Dhs. 14.00 - Dhs. 225.00", originalPrice: "Dhs. 20.00 Dhs. 225.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/bougainvillea-spectabilis-30-to-160cm-dark-pink-1332587_275x275.jpg?v=1758204414", image2: "https://greensouq.ae/cdn/shop/files/bougainvillea-spectabilis-30-to-160cm-dark-pink-1263364_275x275.png?v=1758296128" },]


       const sellingPlanters = [
    { name: "Bougainvillea Specimen \"Single Head\"", price: "Dhs. 220.00 - Dhs. 3,800.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/bougainvillea-specimen-single-head-8265064_275x275.webp?v=1763484810", image2: "https://greensouq.ae/cdn/shop/files/bougainvillea-specimen-single-head-6264324_248x276.png?v=1763484707" },
    { name: "Road Kill Cactus Console - Opuntia Consolea", price: "Dhs. 30.00 Dhs. 60.00", originalPrice: "Dhs. 55.00 Dhs. 125.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-road-kill-cactus-5342448_275x275.jpg?v=1761111276", image2: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-road-kill-cactus-5342448_275x275.jpg?v=1761111276" },
    { name: "Areca Palm 1.2-1.5m Outdoor In Fiber Glass Pot", price: "Dhs. 550.00 Dhs. 575.00", originalPrice: "Dhs. 650.00 Dhs. 950.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/areca-palm-12-15m-outdoor-in-fiber-glass-pot-grp70x30x30-2246705_275x275.jpg?v=1761886296", image2: "https://greensouq.ae/cdn/shop/files/areca-palms-outdoor-in-fiber-glass-pot-grp70x30x30-9758079_268x275.jpg?v=1761886296" },
    { name: "Portulaca Grandiflora | Rose Moss | 9cm pot", price: "Dhs. 9.00 Dhs. 38.00", originalPrice: "Dhs. 20.00 Dhs. 52.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/portulaca-grandiflora-rose-moss-9cm-pot-4848780_276x253.jpg?v=1756309460", image2: "https://greensouq.ae/cdn/shop/files/portulaca-grandiflora-rose-moss-9cm-pot-8741165_275x275.jpg?v=1756309459" },
    { name: "Bougainvillea Spectabilis \"30 to 160cm\" Dark Pink", price: "Dhs. 14.00 - Dhs. 225.00", originalPrice: "Dhs. 20.00 Dhs. 225.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/bougainvillea-spectabilis-30-to-160cm-dark-pink-1332587_275x275.jpg?v=1758204414", image2: "https://greensouq.ae/cdn/shop/files/bougainvillea-spectabilis-30-to-160cm-dark-pink-1263364_275x275.png?v=1758296128" },]


       const fertilizers = [
    { name: "Bougainvillea Specimen \"Single Head\"", price: "Dhs. 220.00 - Dhs. 3,800.00", onSale: false, image1: "https://greensouq.ae/cdn/shop/files/bougainvillea-specimen-single-head-8265064_275x275.webp?v=1763484810", image2: "https://greensouq.ae/cdn/shop/files/bougainvillea-specimen-single-head-6264324_248x276.png?v=1763484707" },
    { name: "Road Kill Cactus Console - Opuntia Consolea", price: "Dhs. 30.00 Dhs. 60.00", originalPrice: "Dhs. 55.00 Dhs. 125.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-road-kill-cactus-5342448_275x275.jpg?v=1761111276", image2: "https://greensouq.ae/cdn/shop/files/opuntia-consolea-road-kill-cactus-5342448_275x275.jpg?v=1761111276" },
    { name: "Areca Palm 1.2-1.5m Outdoor In Fiber Glass Pot", price: "Dhs. 550.00 Dhs. 575.00", originalPrice: "Dhs. 650.00 Dhs. 950.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/areca-palm-12-15m-outdoor-in-fiber-glass-pot-grp70x30x30-2246705_275x275.jpg?v=1761886296", image2: "https://greensouq.ae/cdn/shop/files/areca-palms-outdoor-in-fiber-glass-pot-grp70x30x30-9758079_268x275.jpg?v=1761886296" },
    { name: "Portulaca Grandiflora | Rose Moss | 9cm pot", price: "Dhs. 9.00 Dhs. 38.00", originalPrice: "Dhs. 20.00 Dhs. 52.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/portulaca-grandiflora-rose-moss-9cm-pot-4848780_276x253.jpg?v=1756309460", image2: "https://greensouq.ae/cdn/shop/files/portulaca-grandiflora-rose-moss-9cm-pot-8741165_275x275.jpg?v=1756309459" },
    { name: "Bougainvillea Spectabilis \"30 to 160cm\" Dark Pink", price: "Dhs. 14.00 - Dhs. 225.00", originalPrice: "Dhs. 20.00 Dhs. 225.00", onSale: true, image1: "https://greensouq.ae/cdn/shop/files/bougainvillea-spectabilis-30-to-160cm-dark-pink-1332587_275x275.jpg?v=1758204414", image2: "https://greensouq.ae/cdn/shop/files/bougainvillea-spectabilis-30-to-160cm-dark-pink-1263364_275x275.png?v=1758296128" },]


    // const plantCareProducts = [
  //   { name: "Desert Energy Liqui-Fert", price: "30 Aed Only", emoji: "🧴" },
  //   { name: "Grow Fast Organic Revitalizer", price: "24 Aed Only", emoji: "🧴" },
  //   { name: "Ocean Bio-Fert", price: "57 Aed Only", emoji: "🧴" },
  //   { name: "Rootmax Humifull", price: "45 Aed Only", emoji: "🧴" },
  //   { name: "Citru Feed", price: "30 Aed Only", emoji: "🧴" },
  //   { name: "Desert Energy Ironganese", price: "40 Aed Only", emoji: "🧴" },
  // ]

  return (
    <div className="min-h-screen flex flex-col">
      <MobileMenuProvider>
        <Header />
        <Subheader />
      </MobileMenuProvider>
      <Hero />
      <main className="flex-grow">
        {/* Promotional Banners */}
        <section className="py-6 sm:py-8 lg:py-12">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {/* Best Seller Large Plants Bundle */}
              <Link href="/collections" className="relative group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[5/4] flex items-center justify-center relative overflow-hidden">
                  <img src="/product1.jpg" alt="Best Seller" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="z-10 p-6 w-full h-full flex flex-col justify-end pb-16">
                    <h3 className="text-white text-lg mb-2 drop-shadow-lg">Best Seller Large Plants Bundle</h3>
                    <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-gray-800 text-sm sm:text-base font-medium absolute left-4 bottom-4">
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>

              {/* Home Decorator Bundle */}
              <Link href="/collections" className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[5/4] flex items-center justify-center relative overflow-hidden">
                  <img src="/product2.jpg" alt="Home Decorator" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="z-10 p-6 w-full h-full flex flex-col justify-end pb-16">
                    <h3 className="text-white text-lg mb-2 drop-shadow-lg">Home Decorator Bundle</h3>
                    <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-gray-800 text-sm sm:text-base font-medium absolute left-4 bottom-4">
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>

              {/* Urban Jungle Bundle */}
              <Link href="/collections" className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[5/4] flex items-center justify-center relative overflow-hidden">
                  <img src="/product3.jpg" alt="Urban Jungle" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="z-10 p-6 w-full h-full flex flex-col justify-end pb-16">
                    <h3 className="text-white text-lg mb-2 drop-shadow-lg">Urban Jungle Bundle</h3>
                    <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-gray-800 text-sm sm:text-base font-medium absolute left-4 bottom-4">
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
          <div className="container mx-auto px-8 sm:px-10 lg:px-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center text-gray-900">Top Categories this Week</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((category, index) => (
                <Link key={index} href="/collections" className="text-center group">
                  <div className="aspect-square rounded-full mb-3 flex items-center justify-center shadow-md overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-green-600 transition-colors">{category.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Plant Care Products */}
        {/* <section className="bg-gray-800 py-6 sm:py-8 lg:py-12">
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
        </section> */}

        {/* Top Selling Indoor Plants */}
        <section className="py-6 sm:py-8 lg:py-12">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-4 sm:mb-6 lg:mb-8 text-center text-gray-900">Top Selling Indoor Plants</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {indoorPlants.map((plant, index) => (
                <ProductCard 
                  key={index} 
                  name={plant.name} 
                  price={plant.price}
                  onSale={plant.onSale}
                  originalPrice={plant.originalPrice}
                  image1={plant.image1}
                  image2={plant.image2}
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
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-center mb-4 sm:mb-6 lg:mb-8 text-gray-900">Top Selling Outdoor Plants</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {outdoorPlants.map((plant, index) => (
                <ProductCard 
                  key={index} 
                  name={plant.name} 
                  price={plant.price}
                  onSale={plant.onSale}
                  originalPrice={plant.originalPrice}
                  image1={plant.image1}
                  image2={plant.image2}
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


        <section className="py-6 sm:py-8 lg:py-12 bg-white">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-center mb-4 sm:mb-6 lg:mb-8 text-gray-900">New Arrivals</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {newArrivals.map((plant, index) => (
                <ProductCard 
                  key={index} 
                  name={plant.name} 
                  price={plant.price}
                  onSale={plant.onSale}
                  originalPrice={plant.originalPrice}
                  image1={plant.image1}
                  image2={plant.image2}
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



        <section className="py-6 sm:py-8 lg:py-12 bg-white">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-center mb-4 sm:mb-6 lg:mb-8 text-gray-900">Gardening Accesories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {gardeningAccesories.map((plant, index) => (
                <ProductCard 
                  key={index} 
                  name={plant.name} 
                  price={plant.price}
                  onSale={plant.onSale}
                  originalPrice={plant.originalPrice}
                  image1={plant.image1}
                  image2={plant.image2}
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

        <section className="py-6 sm:py-8 lg:py-12 bg-white">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-center mb-4 sm:mb-6 lg:mb-8 text-gray-900">Top Selling Pots & Planters</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {sellingPlanters.map((plant, index) => (
                <ProductCard 
                  key={index} 
                  name={plant.name} 
                  price={plant.price}
                  onSale={plant.onSale}
                  originalPrice={plant.originalPrice}
                  image1={plant.image1}
                  image2={plant.image2}
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

        <section className="py-6 sm:py-8 lg:py-12 bg-white">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-center mb-4 sm:mb-6 lg:mb-8 text-gray-900">Best Selling Soil & Fertilisers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {fertilizers.map((plant, index) => (
                <ProductCard 
                  key={index} 
                  name={plant.name} 
                  price={plant.price}
                  onSale={plant.onSale}
                  originalPrice={plant.originalPrice}
                  image1={plant.image1}
                  image2={plant.image2}
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
