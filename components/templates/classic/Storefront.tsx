import Link from "next/link"
import { Item, Store } from "@/lib/types"
import { Search, ShoppingBag, User, Heart } from "lucide-react"

export default function ClassicStorefront({ store, items }: { store: Store; items: Item[] }) {
    const categories = [
        "Electronics & Gadgets",
        "Home & Kitchen",
        "Kids & Toys",
        "Health & Beauty",
        "Contact Us"
    ]

    return (
        <main className="min-h-screen bg-stone-50 font-serif">
            {/* Top Bar */}
            <header className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Left: Search */}
                        <div className="flex-1">
                            <button className="p-2 text-gray-600 hover:text-gray-900">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Center: Store Name */}
                        <div className="flex-1 flex justify-center">
                            <Link href="/" className="text-2xl font-serif font-bold text-gray-900 tracking-wide">
                                {store.store_name}
                            </Link>
                        </div>

                        {/* Right: Icons */}
                        <div className="flex-1 flex justify-end items-center gap-4">
                            <button className="p-2 text-gray-600 hover:text-gray-900">
                                <User className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900">
                                <ShoppingBag className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orange Nav Bar */}
                <div className="bg-orange-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex h-12 items-center justify-center space-x-8">
                            <Link href="/" className="font-medium hover:text-orange-100 transition-colors">
                                Home
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/category/${category.toLowerCase().replace(/ /g, "-")}`}
                                    className="font-medium hover:text-orange-100 transition-colors"
                                >
                                    {category}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto italic mb-8">
                        Timeless elegance and quality. Explore our carefully selected products designed to last a lifetime.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {items.map(item => (
                        <Link key={item.id} href={`/product/${item.id}`} className="group block">
                            <div className="space-y-4">
                                <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
                                    <img
                                        src={item.image_url || "/placeholder.png"}
                                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                        alt={item.name}
                                    />
                                    {/* Quick action overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="w-full bg-white text-black py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                                            Quick View
                                        </button>
                                    </div>
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="text-base font-medium text-gray-900 group-hover:text-amber-700 transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-500 font-medium">₹{item.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
