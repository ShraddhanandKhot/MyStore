import { Item, Store } from "@/lib/types"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ClassicProductDetails({ store, item }: { store: Store; item: Item }) {
    return (
        <main className="min-h-screen bg-white text-black font-serif">
            <header className="border-b py-6">
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="text-sm uppercase tracking-widest hover:underline">
                        &larr; Back
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tighter">{store.store_name}</h1>
                    <ShoppingBag className="w-6 h-6" />
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-gray-50 border p-8">
                        <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-auto object-contain mix-blend-multiply"
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-6">
                        <h2 className="text-4xl font-serif italic text-gray-900">{item.name}</h2>
                        <span className="text-2xl font-medium">₹{item.price}</span>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>

                        <button className="w-full bg-black text-white py-4 uppercase tracking-widest hover:bg-gray-800 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
