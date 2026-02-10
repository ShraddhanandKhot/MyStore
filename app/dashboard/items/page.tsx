"use client"

import { useEffect, useState, Suspense } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useSearchParams } from "next/navigation"

type Item = {
    id: string
    name: string
    description: string
    price: number
    image_url: string
}

function ManageItemsContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const storeId = searchParams.get("store_id")

    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadItems = async () => {
            const { data: auth } = await supabase.auth.getUser()
            if (!auth.user) {
                router.push("/login")
                return
            }


            let query = supabase
                .from("items")
                .select(`
          id,
          name,
          description,
          price,
          image_url,
          stores!inner(user_id, store_name)
        `)
                .eq("stores.user_id", auth.user.id)

            if (storeId) {
                query = query.eq("store_id", storeId)
            }

            const { data, error } = await query

            if (error) {
                alert(error.message)
                return
            }

            setItems(data as Item[])
            setLoading(false)
        }

        loadItems()
    }, [router, storeId])

    async function deleteItem(itemId: string) {
        const confirmDelete = confirm("Are you sure?")
        if (!confirmDelete) return

        const { error } = await supabase
            .from("items")
            .delete()
            .eq("id", itemId)

        if (error) {
            alert(error.message)
            return
        }

        setItems((prev) => prev.filter((item) => item.id !== itemId))
    }

    if (loading) return <p className="p-6">Loading items...</p>

    return (
        <main className="p-6 max-w-5xl mx-auto text-gray">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">
                    {storeId ? "Manage Store Items" : "Manage All Items"}
                </h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push(storeId ? `/dashboard/items/new?store_id=${storeId}` : `/dashboard/items/new`)}
                        className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        + Add New Item
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>

            {items.length === 0 && <p className="text-gray-500">No items found</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="border rounded-xl p-4 bg-white shadow-sm">
                        <img
                            src={item.image_url}
                            className="h-40 w-full object-cover rounded mb-3"
                        />

                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <p className="font-medium mt-1 text-black">₹{item.price}</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => router.push(`/dashboard/items/${item.id}`)}
                                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                ✏️Edit
                            </button>

                            <button
                                onClick={() => deleteItem(item.id)}
                                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default function ManageItems() {
    return (
        <Suspense fallback={<p className="p-6">Loading items...</p>}>
            <ManageItemsContent />
        </Suspense>
    )
}


