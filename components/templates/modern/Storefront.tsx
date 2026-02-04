import { Item, Store } from "@/lib/types"
import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ModernStorefront({ store, items }: { store: Store; items: Item[] }) {
    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 glass border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg">
                            {store.store_name.charAt(0)}
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">{store.store_name}</h1>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent pb-2">
                        Welcome to {store.store_name}
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        Discover our curated collection of premium items.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map(item => (
                        <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            className="group relative"
                        >
                            <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
                                {/* Image Container */}
                                <div className="aspect-[4/5] overflow-hidden bg-neutral-900 relative">
                                    <img
                                        src={item.image_url || "/placeholder.png"}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <span className="text-sm font-medium text-white flex items-center gap-2">
                                            View Details <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 space-y-2">
                                    <h3 className="text-lg font-semibold truncate group-hover:text-purple-400 transition-colors">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-neutral-400 text-sm line-clamp-2 flex-1 mr-4">
                                            {item.description}
                                        </p>
                                        <span className="text-lg font-bold text-white whitespace-nowrap">
                                            ₹{item.price}
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
