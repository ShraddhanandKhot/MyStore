import { Item, Store } from "@/lib/types"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function MinimalProductDetails({ store, item }: { store: Store; item: Item }) {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 font-mono">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-12">
                    <Link href="/" className="text-sm text-gray-400 hover:text-black transition">
                        /back
                    </Link>
                    <div className="text-sm font-bold uppercase">{store.store_name}</div>
                </div>

                <div className="space-y-8">
                    <div className="aspect-square bg-gray-200 overflow-hidden">
                        <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                        />
                    </div>

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
