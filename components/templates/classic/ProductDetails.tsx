"use client"

import { Item, Store, Category } from "@/lib/types"
import { ShoppingBag, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import ClassicNavbar from "./Navbar"

export default function ClassicProductDetails({
    store,
    item,
    categories
}: {
    store: Store;
    item: Item;
    categories: Category[]
}) {
    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState(item.image_urls?.[0] || item.image_url || "/placeholder.png")
    const images = item.image_urls && item.image_urls.length > 0 ? item.image_urls : [item.image_url]

    // Mock discount logic
    const [quantity, setQuantity] = useState(1);
    const [selectedOffer, setSelectedOffer] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // Countdown Logic
    const [timeLeft, setTimeLeft] = useState({
        hours: item.sale_timer_hours || 0,
        minutes: item.sale_timer_minutes || 0,
        seconds: item.sale_timer_seconds || 0
    });

    useEffect(() => {
        if (!item.sale_timer_enabled) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                clearInterval(timer);
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [item.id, item.sale_timer_enabled]);

    const offers = [
        { id: 1, quantity: 1, discount: 0, label: "1 Pc", price: item.price, originalPrice: item.price * 1.45 },
        { id: 2, quantity: 2, discount: 40, label: "2 Pc", price: (item.price * 2) * 0.6, originalPrice: (item.price * 2) * 1.45, badge: "Limited Time Offer" },
        { id: 3, quantity: 3, discount: 70, label: "3 Pc", price: (item.price * 3) * 0.3, originalPrice: (item.price * 3) * 1.45, badge: "Factory Price 🔥" },
    ]

    return (
        <main className="min-h-screen bg-white text-black font-sans">
            <ClassicNavbar
                store={store}
                categories={categories}
                onCategorySelect={(id) => {
                    // Navigate to home with category filter
                    router.push(`/?category=${id}`)
                }}
                selectedCategoryId={null}
                searchQuery={searchQuery}
                onSearchChange={(query) => {
                    setSearchQuery(query)
                    // Redirect to home with search query
                    router.push(`/?search=${encodeURIComponent(query)}`)
                }}
                onHomeClick={() => router.push("/")}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Image Gallery */}
                    <div className="bg-gray-50 border p-2 rounded-xl relative group">
                        <div className="aspect-square bg-gray-100 relative rounded-lg overflow-hidden border border-gray-200">
                            {/* Mock Overlay Badge */}
                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                {/* <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">HOT</span> */}
                            </div>

                            <img
                                src={selectedImage}
                                alt={item.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                            />

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const currentIndex = images.indexOf(selectedImage);
                                            const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
                                            setSelectedImage(images[nextIndex]);
                                        }}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-gray-800" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const currentIndex = images.indexOf(selectedImage);
                                            const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
                                            setSelectedImage(images[nextIndex]);
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-gray-800 rotate-180" />
                                    </button>

                                    {/* Dots Indicator */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedImage(img)}
                                                className={`w-2 h-2 rounded-full transition-all ${selectedImage === img ? 'bg-black w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col space-y-6">
                        {/* Rating Mock */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="flex text-yellow-400">
                                {"★".repeat(5)}
                            </div>
                            <span>Trusted by Thousands of Happy Customers</span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{item.name}</h1>

                        {/* Recent Reviews Mock */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="flex text-yellow-400 text-xs">
                                {"★".repeat(5)}
                            </div>
                            <span>6 Reviews</span>
                        </div>

                        {/* Live View Mock */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                                <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                            </div>
                            <span><strong>29 people</strong> are viewing this right now</span>
                        </div>


                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-red-600">Dhs. {item.price.toFixed(2)}</span>
                            <span className="text-lg text-gray-400 line-through decoration-gray-400">Dhs. {(item.price * 1.45).toFixed(2)}</span>
                        </div>

                        {item.sale_timer_enabled && (
                            <div className="bg-stone-50 border border-stone-100 p-5 rounded-lg flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">
                                    <Clock className="w-3 h-3" /> Sale Ends In
                                </div>
                                <div className="flex gap-4">
                                    {[
                                        { val: timeLeft.hours, label: 'Hours' },
                                        { val: timeLeft.minutes, label: 'Mins' },
                                        { val: timeLeft.seconds, label: 'Secs' }
                                    ].map((unit, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className="text-2xl font-serif font-bold text-stone-800 bg-white border border-stone-200 px-3 py-1 rounded shadow-sm min-w-[3.5rem] text-center">
                                                {String(unit.val).padStart(2, '0')}
                                            </div>
                                            <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-tighter">{unit.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                        <div className="border-t border-gray-200 pt-6"></div>

                        {/* Buy More Save More */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                                <span>🔥 Buy More Save More 🔥</span>
                            </div>

                            <div className="space-y-3">
                                {offers.map((offer) => (
                                    <div
                                        key={offer.id}
                                        onClick={() => setSelectedOffer(offer.id)}
                                        className={`
                                            relative cursor-pointer border rounded-lg p-4 flex items-center justify-between transition-all
                                            ${selectedOffer === offer.id
                                                ? 'border-red-600 bg-red-50/10 ring-1 ring-red-600'
                                                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                                            }
                                        `}
                                    >
                                        {offer.badge && (
                                            <div className="absolute -top-2.5 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                                {offer.badge}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedOffer === offer.id ? 'border-red-600' : 'border-gray-400'}`}>
                                                {selectedOffer === offer.id && <div className="w-2.5 h-2.5 rounded-full bg-red-600" />}
                                            </div>
                                            <span className="font-semibold text-gray-900">{offer.label}</span>
                                            {offer.discount > 0 && <span className="bg-black text-white text-xs font-bold px-1.5 py-0.5 rounded ml-2">{offer.discount}% OFF</span>}
                                        </div>

                                        <div className="text-right">
                                            <div className="font-bold text-gray-900">Dhs. {offer.price.toFixed(2)}</div>
                                            {offer.discount > 0 && <div className="text-xs text-gray-500 line-through">Dhs. {offer.originalPrice.toFixed(2)}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <button className="w-full bg-red-600 text-white py-4 rounded font-bold text-lg hover:bg-red-700 transition shadow-lg mt-4 uppercase">
                            Order Now - Free Delivery
                        </button>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-6 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" /><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" /><circle cx="7" cy="18" r="2" /><path d="M15 18H9" /><circle cx="17" cy="18" r="2" /></svg>
                                </div>
                                <span className="text-xs font-bold text-gray-800">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                </div>
                                <span className="text-xs font-bold text-gray-800">30-Day Guarantee</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                                </div>
                                <span className="text-xs font-bold text-gray-800">Secure Checkout</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 my-6"></div>

                        {/* Accordion / Description */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-2 cursor-pointer">
                                <span className="font-semibold text-gray-700">How it works</span>
                                <ArrowLeft className="w-4 h-4 -rotate-90 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 uppercase tracking-wide">Description:</h2>
                    <div className="prose prose-lg text-gray-700">
                        <p>
                            {item.description}
                        </p>
                    </div>

                    <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                        <img
                            src={item.image_url || "/placeholder.png"}
                            alt="Product Feature"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
