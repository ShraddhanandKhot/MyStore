"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

type Item = {
    id: string
    name: string
    description: string
    price: number
    image_url: string
}

export default function ManageItems() {
    const router = useRouter()
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadItems = async () => {
            const { data: auth } = await supabase.auth.getUser()
            if (!auth.user) {
                router.push("/login")
                return
            }

            const { data, error } = await supabase
                .from("items")
                .select(`
          id,
          name,
          description,
          price,
          image_url,
          stores!inner(user_id)
        `)
                .eq("stores.user_id", auth.user.id)

            if (error) {
                alert(error.message)
                return
            }

            setItems(data as Item[])
            setLoading(false)
        }

        loadItems()
    }, [router])

    if (loading) return <p className="p-6">Loading items...</p>

    return (
        <main className="p-6 max-w-5xl mx-auto text-black">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Manage Items</h1>

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
                                className="px-4 py-1 border rounded hover:bg-gray-50 transition"
                            >
                                ✏️ Edit
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
}
