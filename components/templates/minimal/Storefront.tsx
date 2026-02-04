import Link from "next/link"
import { Item, Store } from "@/lib/types"

export default function MinimalStorefront({ store, items }: { store: Store; items: Item[] }) {
    return (
        <main className="max-w-4xl mx-auto p-8 font-mono">
            <header className="mb-12 text-center border-b pb-4">
                <h1 className="text-3xl font-light uppercase tracking-widest">{store.store_name}</h1>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {items.map(item => (
                    <Link key={item.id} href={`/product/${item.id}`} className="group block">
                        <div>
                            <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                            </div>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-medium">{item.name}</h3>
                                <span className="text-gray-500">₹{item.price}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    )
}
