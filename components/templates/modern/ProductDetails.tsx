import { Item, Store } from "@/lib/types"
import { ShoppingBag, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

import StoreNavbar from "@/components/store/Navbar"

export default function ModernProductDetails({ store, item }: { store: Store; item: Item }) {
    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30">
            <StoreNavbar store={store} variant="modern" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="glass rounded-3xl overflow-hidden aspect-square lg:aspect-[4/5] p-2">
                            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-neutral-900">
                                <img
                                    src={item.image_url || "/placeholder.png"}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                        {/* Decorative blur elements */}
                        <div className="absolute -inset-4 bg-purple-500/20 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8 lg:sticky lg:top-32">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                                {item.name}
                            </h1>
                            <div className="text-3xl font-bold text-purple-400">
                                ₹{item.price}
                            </div>
                        </div>

                        <div className="h-px bg-white/10" />

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">Description</h3>
                            <p className="text-neutral-400 leading-relaxed text-lg">
                                {item.description}
                            </p>
                        </div>

                        <div className="pt-6 space-y-4">
                            <button className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-neutral-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                                <Check className="w-4 h-4 text-green-500" />
                                <span>In stock and ready to ship</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
