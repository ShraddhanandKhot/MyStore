"use client"

import { useState } from "react"
import Link from "next/link"
import { Item, Store, Category } from "@/lib/types"
import { Search, ShoppingBag, User, Heart } from "lucide-react"

import ClassicNavbar from "./Navbar"

export default function ClassicStorefront({
    store,
    items,
    categories,
    initialSearch = "",
    initialCategory = null
}: {
    store: Store;
    items: Item[];
    categories: Category[];
    initialSearch?: string;
    initialCategory?: string | null;
}) {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(initialCategory)
    const [searchQuery, setSearchQuery] = useState(initialSearch)

    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategoryId ? item.category_id === selectedCategoryId : true
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <main className="min-h-screen bg-stone-50 font-serif text-black">
            <ClassicNavbar
                store={store}
                categories={categories}
                onCategorySelect={setSelectedCategoryId}
                selectedCategoryId={selectedCategoryId}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onHomeClick={() => {
                    setSelectedCategoryId(null)
                    setSearchQuery("")
                }}
            />

            {/* Hero Section */}
            {!selectedCategoryId && !searchQuery && (
                <div className="bg-white border-b border-stone-200">
                    <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto italic mb-8">
                            Timeless elegance and quality. Explore our carefully selected products designed to last a lifetime.
                        </p>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 gap-4 border-b border-stone-100 pb-8">
                    <h2 className="text-3xl font-bold text-gray-900 font-serif">
                        {searchQuery
                            ? `Search results for "${searchQuery}"`
                            : selectedCategoryId
                                ? categories.find(c => c.id === selectedCategoryId)?.name
                                : "Featured Collection"}
                    </h2>
                    {searchQuery && (
                        <p className="text-sm text-stone-500 font-sans italic">
                            Found {filteredItems.length} {filteredItems.length === 1 ? 'product' : 'products'}
                        </p>
                    )}
                </div>

                {filteredItems.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl border border-stone-200 shadow-sm">
                        <Search className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                        <p className="text-stone-500 text-lg mb-2">No products found.</p>
                        <p className="text-stone-400 text-sm mb-6 font-sans">Try adjusting your search or filters to find what you're looking for.</p>
                        <button
                            onClick={() => {
                                setSelectedCategoryId(null)
                                setSearchQuery("")
                            }}
                            className="bg-orange-600 text-white px-8 py-3 rounded-md font-bold hover:bg-orange-700 transition transform hover:scale-105"
                        >
                            Explore All Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredItems.map(item => (
                            <Link key={item.id} href={`/product/${item.id}`} className="group block">
                                <div className="space-y-4">
                                    <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative rounded-lg border border-stone-200 shadow-sm transition-shadow group-hover:shadow-md">
                                        <img
                                            src={item.image_url || "/placeholder.png"}
                                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                            alt={item.name}
                                        />
                                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <button className="w-full bg-white/95 backdrop-blur-sm text-black py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                                                Quick View
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-center space-y-1">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-orange-600 font-bold text-xl">₹ {item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
