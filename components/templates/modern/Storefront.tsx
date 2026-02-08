import { Item, Store } from "@/lib/types"
import { ArrowRight, Search, User, Heart, ShoppingBag, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function ModernStorefront({ store, items }: { store: Store; items: Item[] }) {
    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">

            {/* 1. Top Bar */}
            <div className="bg-black text-white text-xs py-2 px-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <span>+971 569512995</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            <span>storeemail.ae@gmail.com</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                        <span>store tagline</span>
                    </div>
                </div>
            </div>

            {/* 2. Main Navbar */}
            <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">

                        {/* Left: Navigation Links */}
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wide">
                            <Link href="#" className="hover:text-gray-600 transition">Home</Link>
                            <Link href="#" className="hover:text-gray-600 transition">Shop All</Link>
                            <Link href="#" className="hover:text-gray-600 transition">For Men's</Link>
                            <Link href="#" className="hover:text-gray-600 transition">Majoons</Link>
                            <Link href="#" className="hover:text-gray-600 transition">Oil</Link>
                            <Link href="#" className="hover:text-gray-600 transition">Contact</Link>
                        </nav>

                        {/* Center: Store Name */}
                        <div className="text-2xl font-black uppercase tracking-tight absolute left-1/2 transform -translate-x-1/2">
                            {store.store_name}
                        </div>

                        {/* Right: Icons */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                <User className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                <ShoppingBag className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* 3. Marquee Bar */}
            <div className="bg-black text-white py-3 overflow-hidden relative flex items-center">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-bold uppercase tracking-wider text-sm">
                    <span className="flex items-center gap-4">
                        ★ Free Delivery in Dubai 🚐
                        ★ 7 Days Money Back Guarantee! Book Now and Get 50% Off
                        ★ Free Delivery in Dubai 🚐
                    </span>
                    <span className="flex items-center gap-4">
                        ★ Free Delivery in Dubai 🚐
                        ★ 7 Days Money Back Guarantee! Book Now and Get 50% Off
                        ★ Free Delivery in Dubai 🚐
                    </span>
                    <span className="flex items-center gap-4">
                        ★ Free Delivery in Dubai 🚐
                        ★ 7 Days Money Back Guarantee! Book Now and Get 50% Off
                        ★ Free Delivery in Dubai 🚐
                    </span>
                    <span className="flex items-center gap-4">
                        ★ Free Delivery in Dubai 🚐
                        ★ 7 Days Money Back Guarantee! Book Now and Get 50% Off
                        ★ Free Delivery in Dubai 🚐
                    </span>
                </div>
            </div>

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
