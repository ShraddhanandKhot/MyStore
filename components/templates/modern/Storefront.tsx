import { Item, Store } from "@/lib/types"
import { ArrowRight, Search, User, Heart, ShoppingBag, Phone, Mail } from "lucide-react"
import Link from "next/link"

import ModernNavbar from "./Navbar"

export default function ModernStorefront({ store, items }: { store: Store; items: Item[] }) {
    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">

            <ModernNavbar store={store} />

            {/* Hero / Promo Banner (Optional, keep simplified or remove if user didn't ask, but good to have a spacer) */}
            <div className="bg-gray-50 py-16 text-center">
                <h2 className="text-4xl font-bold uppercase mb-4">New Arrivals</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">Discover the latest additions to our collection.</p>
            </div>


            {/* Product Grid */}
            <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {items.map(item => (
                        <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            className="group block"
                        >
                            <div className="bg-white">
                                {/* Image Container */}
                                <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative mb-4">
                                    <img
                                        src={item.image_url || "/placeholder.png"}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Sale Badge Example */}
                                    <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 uppercase">
                                        Sale
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold uppercase tracking-wide group-hover:underline decoration-1 underline-offset-4">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-900">
                                            ₹{item.price}
                                        </span>
                                        <span className="text-xs text-gray-400 line-through">
                                            ₹{(item.price * 1.5).toFixed(0)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    )
}
