"use client"

import { Item, Store } from "@/lib/types"
import { Check, Truck, ShieldCheck, Heart, Share2, MessageCircle, BarChart2, ShoppingCart, Clock, CreditCard, ShoppingBag } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

import ModernNavbar from "./Navbar"

export default function ModernProductDetails({ store, item }: { store: Store; item: Item }) {
    const [selectedImage, setSelectedImage] = useState(item.image_urls?.[0] || item.image_url || "/placeholder.png")
    const images = item.image_urls && item.image_urls.length > 0 ? item.image_urls : [item.image_url]

    // Mock Data
    const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 38, seconds: 7 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const [selectedBundle, setSelectedBundle] = useState(1);

    const bundles = [
        { id: 1, label: "1 Pair", price: item.price, originalPrice: item.price * 2, badge: "Standard Price" },
        { id: 2, label: "2 Pair", price: (item.price * 2) * 0.9, originalPrice: (item.price * 2) * 2, badge: "Most Popular", discount: "10% OFF" },
        { id: 3, label: "3 Pair", price: (item.price * 3) * 0.8, originalPrice: (item.price * 3) * 2, badge: null, discount: "20% OFF" },
    ]


    return (
        <main className="min-h-screen bg-white text-black font-sans">
            <ModernNavbar store={store} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                            <img
                                src={selectedImage}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-5 gap-4">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? "border-black" : "border-transparent hover:border-gray-300"}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>

                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex text-yellow-500 text-xs">{"★".repeat(5)}</div>
                            <span className="text-gray-500">22 reviews</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-red-500">₹ {item.price.toLocaleString()} INR</span>
                            <span className="text-gray-400 line-through text-sm">₹ {(item.price * 2).toLocaleString()} INR</span>
                        </div>

                        {/* Social Proof Banner */}
                        <div className="bg-[#D3825C] text-white p-2 text-center text-sm font-bold rounded flex items-center justify-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-[#D3825C]" />
                                ))}
                            </div>
                            1,000+ HAPPY CUSTOMERS
                        </div>

                        {/* Real-time Stats */}
                        <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-4 flex justify-center"><Check className="w-4 h-4" /></div>
                                <span><strong>42</strong> People are viewing this right now</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 flex justify-center"><ShoppingCart className="w-4 h-4" /></div>
                                <span><strong>6</strong> People have added this to their cart</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 flex justify-center"><Clock className="w-4 h-4 text-red-500" /></div>
                                <span className="text-red-500"><strong>18</strong> Sold in the last <strong>32</strong> hours</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                            In Stock
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Lifestyle Carousel Placeholder */}
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                                    <img src={`https://source.unsplash.com/random/300x400?sig=${i}`} alt="Lifestyle" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-gray-200 my-4" />

                        <div className="text-center font-bold text-lg mb-4">Bundle & Save</div>

                        <div className="grid grid-cols-3 gap-4">
                            {bundles.map((bundle) => (
                                <div
                                    key={bundle.id}
                                    onClick={() => setSelectedBundle(bundle.id)}
                                    className={`
                                        border-2 rounded-xl p-4 cursor-pointer relative flex flex-col items-center justify-center text-center gap-2 transition-all
                                        ${selectedBundle === bundle.id ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"}
                                    `}
                                >
                                    {bundle.badge && (
                                        <div className="absolute -top-3 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                                            {bundle.badge}
                                        </div>
                                    )}

                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedBundle === bundle.id ? "border-red-500" : "border-gray-300"}`}>
                                        {selectedBundle === bundle.id && <div className="w-2 h-2 rounded-full bg-red-500" />}
                                    </div>

                                    <div className="font-bold text-gray-900">{bundle.label}</div>

                                    {bundle.discount && (
                                        <div className="bg-black text-white text-[10px] font-bold px-1 rounded">{bundle.discount}</div>
                                    )}

                                    <div className="text-xs">
                                        <div className="font-bold text-gray-900">₹ {bundle.price.toLocaleString()}</div>
                                        <div className="text-gray-400 line-through">₹ {bundle.originalPrice.toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add to Cart */}
                        <button className="w-full border-2 border-black bg-white text-black font-bold py-3 mt-4 hover:bg-gray-50 uppercase tracking-widest text-sm">
                            Add to cart
                        </button>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded flex items-center justify-center gap-2 shadow-sm text-sm">
                                <ShoppingBag className="w-4 h-4" />
                                Order Now / Cash on Delivery 🚚 ✨
                            </button>
                            <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded flex items-center justify-center gap-2 shadow-sm text-sm">
                                <CreditCard className="w-4 h-4" />
                                Card Payment 👉
                            </button>
                        </div>

                        {/* Payment Icons */}
                        <div className="flex justify-center gap-2 opacity-60 grayscale">
                            {/* Icons placeholder */}
                            <div className="h-6 w-10 bg-gray-200 rounded" />
                            <div className="h-6 w-10 bg-gray-200 rounded" />
                            <div className="h-6 w-10 bg-gray-200 rounded" />
                            <div className="h-6 w-10 bg-gray-200 rounded" />
                        </div>

                        {/* Countdown Timer */}
                        <div className="bg-[#FFF8F0] p-4 rounded-xl text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-red-500 font-bold animate-pulse">
                                🔥 ⏳ Prices Going Up 🔥 ⏳
                            </div>
                            <div className="text-xs text-gray-600">Sale ends in:</div>
                            <div className="flex justify-center gap-2 text-white font-mono font-bold text-xl">
                                <div className="bg-black px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</div>
                                <div className="text-black self-center">:</div>
                                <div className="bg-black px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                <div className="text-black self-center">:</div>
                                <div className="bg-black px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</div>
                            </div>
                        </div>


                        <div className="text-xs text-gray-500 text-center uppercase tracking-wide font-bold pt-4">Start Your Wellness Journey With DUBAI HERBS</div>

                        <div className="flex justify-center gap-6 text-xs text-gray-600 border-t border-b py-3 border-gray-100">
                            <button className="flex items-center gap-1 hover:text-black"><BarChart2 className="w-3 h-3" /> Compare</button>
                            <button className="flex items-center gap-1 hover:text-black"><MessageCircle className="w-3 h-3" /> Ask a question</button>
                            <button className="flex items-center gap-1 hover:text-black"><Share2 className="w-3 h-3" /> Share</button>
                        </div>

                        <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                <span><strong>Estimated Delivery:</strong> Feb 18 - Feb 22</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                <span><strong>Free Shipping & Returns:</strong> On all over UAE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
