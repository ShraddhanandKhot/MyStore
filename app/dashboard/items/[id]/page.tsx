"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"

export default function EditItem() {
    const router = useRouter()
    const params = useParams()
    const itemId = params.id as string

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [storeId, setStoreId] = useState("")

    useEffect(() => {
        const loadItem = async () => {
            const { data, error } = await supabase
                .from("items")
                .select("name, description, price, store_id")
                .eq("id", itemId)
                .single()

            if (error) {
                alert(error.message)
                return
            }

            setName(data.name)
            setDescription(data.description || "")
            setPrice(String(data.price))
            setStoreId(data.store_id)
        }

        loadItem()
    }, [itemId])

    const updateItem = async () => {
        const { error } = await supabase
            .from("items")
            .update({
                name,
                description,
                price: Number(price),
            })
            .eq("id", itemId)

        if (error) {
            alert(error.message)
            return
        }

        alert("Item updated")
        router.push(`/dashboard/items?store_id=${storeId}`)
    }

    return (
        <main className="p-6 max-w-md mx-auto space-y-4 text-black">
            <h1 className="text-xl font-bold text-gray-900">Edit Item</h1>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded bg-white text-black placeholder:text-gray-500 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Item Name"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-3 py-2 rounded bg-white text-black placeholder:text-gray-500 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Description"
            />

            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border px-3 py-2 rounded bg-white text-black placeholder:text-gray-500 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Price"
            />

            <button
                onClick={updateItem}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
                Save Changes
            </button>
        </main>
    )
}
