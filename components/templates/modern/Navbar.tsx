"use client"

import Link from "next/link"
import { Store } from "@/lib/types"
import { Search, ShoppingBag, User, Heart, Phone, Mail } from "lucide-react"

export default function ModernNavbar({ store }: { store: Store }) {
    return (
        <>
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
            <header className="border-b border-gray-100 bg-white sticky top-0 z-50 text-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">

                        {/* Left: Navigation Links */}
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wide">
                            <Link href="/" className="hover:text-gray-600 transition">Home</Link>
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
        </>
    )
}
