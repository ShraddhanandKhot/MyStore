import { getSubdomain } from "@/lib/getSubdomain"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import ModernProductDetails from "@/components/templates/modern/ProductDetails"
import ClassicProductDetails from "@/components/templates/classic/ProductDetails"
import MinimalProductDetails from "@/components/templates/minimal/ProductDetails"

const templates: any = {
    modern: ModernProductDetails,
    classic: ClassicProductDetails,
    minimal: MinimalProductDetails,
}

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

    // Default to modern if no template specified or template not found
    const Template = templates[item.template || "modern"] || templates.modern

    return <Template store={store} item={item} />
}
