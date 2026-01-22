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

    const [file, setFile] = useState<File | null>(null)
    const [stores, setStores] = useState<Store[]>([])
    const [storeId, setStoreId] = useState<string>("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadStores = async () => {
            const { data: auth } = await supabase.auth.getUser()

            if (!auth.user) {
                router.push("/login")
                return
            }

            const { data, error } = await supabase
                .from("stores")
                .select("id, store_name")
                .eq("user_id", auth.user.id)

            if (error) {
                alert(error.message)
                return
            }

            if (!data || data.length === 0) {
                alert("Create a store first")
                router.push("/dashboard")
                return
            }

            setStores(data)
            setLoading(false)
        }

        loadStores()
    }, [router])

    const uploadItem = async () => {
        if (!file) {
            alert("Please select an image")
            return
        }

        if (!storeId) {
            alert("Please select a store")
            return
        }

        const fileName = `${storeId}/${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage
            .from("store-items")
            .upload(fileName, file)

        if (uploadError) {
            alert(uploadError.message)
            return
        }

        const { data: publicUrl } = supabase.storage
            .from("store-items")
            .getPublicUrl(fileName)

        const { error } = await supabase.rpc("insert_item_for_store", {
            p_store_id: storeId,
            p_image_url: publicUrl.publicUrl,
        })

        if (error) {
            alert(error.message)
            return
        }



        alert("Item uploaded successfully")
        router.push("/dashboard")

    }

    if (loading) {
        return <main style={{ padding: 40 }}>Loading...</main>
    }

    return (
        <main style={{ padding: 40 }}>
            <h1>Add Item</h1>

            {/* Store selector */}
            <select
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
            >
                <option value="">Select Store</option>
                {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                        {store.store_name}
                    </option>
                ))}
            </select>

            <br /><br />

            {/* Image upload */}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <br /><br />

            <button onClick={uploadItem}>Upload Item</button>
        </main>
    )
}
