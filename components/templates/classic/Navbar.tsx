"use client"

import Link from "next/link"
import { Store, Category } from "@/lib/types"
import { Search, ShoppingBag, User, Heart } from "lucide-react"

export default function ClassicNavbar({
    store,
    categories,
    onCategorySelect,
    selectedCategoryId,
    searchQuery,
    onSearchChange,
    onHomeClick
}: {
    store: Store;
    categories: Category[];
    onCategorySelect: (id: string | null) => void;
    selectedCategoryId: string | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onHomeClick: () => void;
}) {
    return (
        <header className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between gap-4">
                    {/* Left: Search */}
                    <div className="flex-1 max-w-xs relative group">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find products..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600/10 focus:border-orange-600 transition-all placeholder:text-stone-400"
                        />
                    </div>

                    {/* Center: Store Name */}
                    <div className="flex-1 flex justify-center">
                        <button
                            onClick={onHomeClick}
                            className="text-2xl font-serif font-bold text-gray-900 tracking-wide hover:text-orange-600 transition"
                        >
                            {store.store_name}
                        </button>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
                        <button className="p-2 text-gray-600 hover:text-gray-900 hidden sm:block">
                            <User className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900 hidden sm:block">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">0</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Orange Nav Bar */}
            <div className="bg-orange-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex h-12 items-center justify-center space-x-8">
                        <button
                            onClick={() => onCategorySelect(null)}
                            className={`font-medium hover:text-orange-100 transition-colors ${selectedCategoryId === null ? 'underline underline-offset-4' : ''}`}
                        >
                            Home
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => onCategorySelect(category.id)}
                                className={`font-medium hover:text-orange-100 transition-colors ${selectedCategoryId === category.id ? 'underline underline-offset-4' : ''}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}
