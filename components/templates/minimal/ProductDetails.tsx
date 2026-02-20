"use client"

import { Item, Store } from "@/lib/types"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import StoreNavbar from "@/components/store/Navbar"

export default function MinimalProductDetails({ store, item }: { store: Store; item: Item }) {
    const [selectedImage, setSelectedImage] = useState(item.image_urls?.[0] || item.image_url || "/placeholder.png")
    const images = item.image_urls && item.image_urls.length > 0 ? item.image_urls : [item.image_url]

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 font-mono">
            <StoreNavbar store={store} variant="minimal" />
            <div className="max-w-4xl mx-auto px-4 py-8">

                <div className="space-y-4">
                    <div className="aspect-square bg-gray-200 overflow-hidden relative">
                        <img
                            src={selectedImage}
                            alt={item.name}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                        />
                    </div>

                    {images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`w-16 h-16 bg-gray-200 flex-shrink-0 border ${selectedImage === img ? 'border-black' : 'border-transparent'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover grayscale" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-black pt-8">
                        <div className="md:col-span-2 space-y-2">
                            <h1 className="text-3xl font-bold uppercase tracking-tighter">{item.name}</h1>
                            <p className="text-sm text-gray-600 max-w-md">{item.description}</p>
                        </div>
                        <div className="flex flex-col justify-between items-start md:items-end space-y-4">
                            <span className="text-xl">₹{item.price}</span>
                            <button className="bg-transparent border border-black px-8 py-2 text-sm uppercase hover:bg-black hover:text-white transition w-full md:w-auto">
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
