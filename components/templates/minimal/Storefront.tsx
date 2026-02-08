import { Item, Store } from "@/lib/types"
import { Home, ShoppingBag, Phone, Check, ShieldCheck, Truck, RotateCcw, MessageCircle, Headphones } from "lucide-react"
import Link from "next/link"

export default function MinimalStorefront({ store, items }: { store: Store; items: Item[] }) {
    // For this template, we'll focus on the first item as the "Featured" product
    //In a real scenario, we might want to let the user select a featured product.
    const featuredItem = items[0] || {
        id: "placeholder",
        name: "Featured Product",
        price: 999,
        description: "This is a placeholder for your featured product.",
        image_url: "/placeholder.png"
    }

    const discountPercentage = 40
    const originalPrice = (featuredItem.price / (1 - discountPercentage / 100)).toFixed(2)

    return (
        <main className="min-h-screen bg-gray-50 pb-24 font-sans text-gray-800">

            {/* 1. Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
                    <Link href="/" className="text-gray-600">
                        <Home className="w-6 h-6" />
                    </Link>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                        {store.store_name}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            SAR
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. Hero / Product Section */}
            <div className="max-w-lg mx-auto bg-white">
                {/* Product Image */}
                <div className="relative aspect-square w-full bg-gray-100">
                    <img
                        src={featuredItem.image_url || "/placeholder.png"}
                        alt={featuredItem.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Flash Deal Banner */}
                <div className="bg-gradient-to-r from-blue-700 to-pink-500 text-white p-3 flex justify-between items-center">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{featuredItem.price.toFixed(2)}</span>
                            <span className="text-xs bg-red-600 px-1 rounded">-{discountPercentage}% OFF</span>
                        </div>
                        <div className="text-xs opacity-80 line-through">SAR {originalPrice}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-pink-200">Ends in:</div>
                        <div className="text-xl font-bold font-mono">06:37:41</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="px-4 py-2 bg-white">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Flash Deals</span>
                        <span>90277 sold</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-pink-500 h-2.5 rounded-full w-[85%]"></div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4 bg-white border-b">
                    <h1 className="text-xl font-bold mb-2 text-gray-900">{featuredItem.name}</h1>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {featuredItem.description || "Unleash your potential with this amazing product. Designed for quality and performance, it fits perfectly into your lifestyle."}
                    </p>
                    {/* Simulated Language Selector */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-2">Language</h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border rounded text-sm text-gray-500">اللغة العربية</button>
                            <button className="px-3 py-1 border border-pink-500 text-pink-500 rounded text-sm bg-pink-50 font-medium">English</button>
                        </div>
                    </div>
                </div>

                {/* Service Guarantees */}
                <div className="p-4 bg-gray-50 grid grid-cols-2 gap-y-3 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <span>Cash on Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gray-500" />
                        <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-gray-500" />
                        <span>Genuine Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-gray-500" />
                        <span>After-sales Service</span>
                    </div>
                </div>

                {/* Product List (Other items) */}
                <div className="p-4 bg-white mt-2">
                    <h2 className="font-bold text-gray-900 mb-4">More Products</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {items.slice(1).map(item => (
                            <Link key={item.id} href={`/product/${item.id}`} className="block group">
                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                                    <img src={item.image_url || "/placeholder.png"} className="w-full h-full object-cover" alt={item.name} />
                                </div>
                                <div className="text-sm font-bold text-gray-900">₹{item.price}</div>
                                <div className="text-xs text-gray-500 truncate">{item.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            {/* Floating WhatsApp */}
            <a href="https://wa.me/" target="_blank" className="fixed bottom-20 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition z-50">
                <MessageCircle className="w-6 h-6" />
            </a>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-50">
                <div className="max-w-lg mx-auto flex gap-3">
                    <button className="p-3 border rounded-lg text-gray-600 hover:bg-gray-50">
                        <Headphones className="w-6 h-6" />
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full py-3 text-lg shadow-lg hover:opacity-90 transition">
                        Shop Now
                    </button>
                </div>
            </div>

        </main>
    )
}
