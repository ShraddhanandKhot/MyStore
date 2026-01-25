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
        if (!storeId) {
            alert("Select a store")
            return
        }

        if (!file) {
            alert("Select an image")
            return
        }

        setLoading(true)

        const fileName = `${storeId}/${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage
            .from("store-items")
            .upload(fileName, file)

        if (uploadError) {
            setLoading(false)
            alert(uploadError.message)
            return
        }

        const { data: publicUrl } = supabase.storage
            .from("store-items")
            .getPublicUrl(fileName)

        const { error } = await supabase.from("items").insert({
            store_id: storeId,
            image_url: publicUrl.publicUrl,
        })

        setLoading(false)

        if (error) {
            alert(error.message)
            return
        }

        alert("Item added successfully")
        router.push("/dashboard")
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-2 text-center">
                    Add Item
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Upload an item image to one of your stores
                </p>

                <div className="space-y-4">
                    {/* Store Selector */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Select Store
                        </label>
                        <select
                            value={storeId}
                            onChange={(e) => setStoreId(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="">Choose a store</option>
                            {stores.map((store) => (
                                <option key={store.id} value={store.id}>
                                    {store.store_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Item Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="w-full text-sm"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        onClick={uploadItem}
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : "Upload Item"}
                    </button>
                </div>
            </div>
        </main>
    )
}
