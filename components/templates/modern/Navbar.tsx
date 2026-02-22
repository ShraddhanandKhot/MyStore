"use client"

import Link from "next/link"
import { Store, Category } from "@/lib/types"
import { Search, ShoppingBag, User, Heart, Phone, Mail } from "lucide-react"

export default function ModernNavbar({
    store,
    categories,
    onCategorySelect,
    selectedCategoryId,
    searchQuery,
    onSearchChange
}: {
    store: Store;
    categories: Category[];
    onCategorySelect: (id: string | null) => void;
    selectedCategoryId: string | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}) {
    return (
        <>
            {/* 1. Top Bar */}
            <div className="bg-black text-white text-[10px] sm:text-xs py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Phone className="w-3 h-3" />
                            <span className="hidden sm:inline">+971 569512995</span>
                            <span className="sm:hidden">Call</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Mail className="w-3 h-3" />
                            <span className="hidden sm:inline">storeemail.ae@gmail.com</span>
                            <span className="sm:hidden">Email</span>
                        </div>
                    </div>
                    <div className="font-bold uppercase tracking-tighter sm:tracking-normal">
                        Premium Shopping
                    </div>
                </div>
            </div>

            {/* 2. Main Navbar */}
            <header className="border-b border-gray-100 bg-white sticky top-0 z-50 text-black shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between gap-4">

                        {/* Left: Navigation Links */}
                        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
                            <button
                                onClick={() => onCategorySelect(null)}
                                className={`hover:text-gray-400 transition-colors ${selectedCategoryId === null ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                            >
                                Home
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => onCategorySelect(cat.id)}
                                    className={`hover:text-gray-400 transition-colors ${selectedCategoryId === cat.id ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </nav>

                        {/* Center: Store Name */}
                        <div className="text-xl sm:text-2xl font-black uppercase tracking-tighter absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
                            {store.store_name}
                        </div>

                        {/* Right: Search & Icons */}
                        <div className="flex items-center gap-1 sm:gap-4 flex-1 justify-end">
                            <div className="relative max-w-[120px] sm:max-w-xs w-full group">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black/5 transition-all placeholder:text-gray-400"
                                />
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <User className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                                    <Heart className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                                    <ShoppingBag className="w-5 h-5" />
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full font-bold">0</span>
                                </button>
                            </div>
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
        </>
    )
}
