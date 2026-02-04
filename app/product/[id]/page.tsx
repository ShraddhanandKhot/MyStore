import { getSubdomain } from "@/lib/getSubdomain"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, Check } from "lucide-react"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const subdomain = await getSubdomain()

    if (!subdomain || subdomain === "localhost") {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">Store not found</h1>
            </main>
        )
    }

    const { data: store } = await supabase
        .from("stores")
        .select("id, store_name")
        .eq("subdomain", subdomain)
        .single()

    if (!store) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold">Store not found</h1>
            </main>
        )
    }

    const { data: item } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .eq("store_id", store.id) // Ensure item belongs to this store
        .single()

    if (!item) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Product not found</h1>
                    <Link href="/" className="text-purple-400 hover:text-purple-300">Return to Store</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 glass border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Store</span>
                    </Link>
                    <div className="font-bold text-lg">{store.store_name}</div>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="glass rounded-3xl overflow-hidden aspect-square lg:aspect-[4/5] p-2">
                            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-neutral-900">
                                <img
                                    src={item.image_url || "/placeholder.png"}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                        {/* Decorative blur elements */}
                        <div className="absolute -inset-4 bg-purple-500/20 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8 lg:sticky lg:top-32">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                                {item.name}
                            </h1>
                            <div className="text-3xl font-bold text-purple-400">
                                ₹{item.price}
                            </div>
                        </div>

                        <div className="h-px bg-white/10" />

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">Description</h3>
                            <p className="text-neutral-400 leading-relaxed text-lg">
                                {item.description}
                            </p>
                        </div>

                        <div className="pt-6 space-y-4">
                            <button className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-neutral-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                                <Check className="w-4 h-4 text-green-500" />
                                <span>In stock and ready to ship</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
