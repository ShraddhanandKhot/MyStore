"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

type Store = {
    id: string
    store_name: string
}

export default function AddItemPage() {
    const router = useRouter()

    const [stores, setStores] = useState<Store[]>([])
    const [storeId, setStoreId] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadStores = async () => {
            const { data: auth } = await supabase.auth.getUser()
            if (!auth.user) {
                router.push("/login")
                return
            }

            const { data } = await supabase
                .from("stores")
                .select("id, store_name")
                .eq("user_id", auth.user.id)

            if (!data || data.length === 0) {
                alert("Create a store first")
                router.push("/dashboard")
                return
            }

            setStores(data)
        }

        loadStores()
    }, [router])

    const uploadItem = async () => {
        if (!storeId || !file || !name || !price) {
            alert("All fields are required")
            return
        }

        setLoading(true)

        const filePath = `${storeId}/${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage
            .from("store-items")
            .upload(filePath, file)

        if (uploadError) {
            setLoading(false)
            alert(uploadError.message)
            return
        }

        const { data: publicUrl } = supabase.storage
            .from("store-items")
            .getPublicUrl(filePath)

        const { error } = await supabase.from("items").insert({
            store_id: storeId,
            image_url: publicUrl.publicUrl,
            name,
            description,
            price: Number(price),
        })

        setLoading(false)

        if (error) {
            alert(error.message)
            return
        }

        alert("Item added")
        router.push("/dashboard")
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold text-center text-gray-900">Add Item</h1>

                <select
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                    className="w-full border px-3 py-2 rounded bg-white text-black"
                >
                    <option value="">Select Store</option>
                    {stores.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.store_name}
                        </option>
                    ))}
                </select>

                <input
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-3 py-2 rounded bg-white text-black placeholder:text-gray-500"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-3 py-2 rounded bg-white text-black placeholder:text-gray-500"
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border px-3 py-2 rounded bg-white text-black placeholder:text-gray-500"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />

                <button
                    onClick={uploadItem}
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                    {loading ? "Uploading..." : "Add Item"}
                </button>
            </div>
        </main>
    )
}
