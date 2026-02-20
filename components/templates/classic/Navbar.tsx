"use client"

import Link from "next/link"
import { Store } from "@/lib/types"
import { Search, ShoppingBag, User, Heart } from "lucide-react"

export default function ClassicNavbar({ store }: { store: Store }) {
    const categories = [
        "Electronics & Gadgets",
        "Home & Kitchen",
        "Kids & Toys",
        "Health & Beauty",
        "Contact Us"
    ]

    return (
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
    )
}
