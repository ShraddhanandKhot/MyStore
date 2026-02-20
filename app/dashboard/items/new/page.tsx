"use client"

import { useEffect, useState, Suspense } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useSearchParams } from "next/navigation"

type Store = {
    id: string
    store_name: string
}

function AddItemPageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const queryStoreId = searchParams.get("store_id")

    const [stores, setStores] = useState<Store[]>([])
    const [storeId, setStoreId] = useState(queryStoreId || "")
    const [files, setFiles] = useState<File[]>([])

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [template, setTemplate] = useState("modern")

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

    useEffect(() => {
        if (queryStoreId) {
            setStoreId(queryStoreId)
        }
    }, [queryStoreId])

    const uploadItem = async () => {
        if (!storeId || files.length === 0 || !name || !price) {
            alert("All fields are required")
            return
        }

        setLoading(true)

        const uploadedUrls: string[] = []

        for (const file of files) {
            const filePath = `${storeId}/${Date.now()}-${file.name}`

            const { error: uploadError } = await supabase.storage
                .from("store-items")
                .upload(filePath, file)

            if (uploadError) {
                setLoading(false)
                alert(`Error uploading ${file.name}: ${uploadError.message}`)
                return
            }

            const { data: publicUrl } = supabase.storage
                .from("store-items")
                .getPublicUrl(filePath)

            uploadedUrls.push(publicUrl.publicUrl)
        }

        const { error } = await supabase.from("items").insert({
            store_id: storeId,
            image_url: uploadedUrls[0], // Backwards compatibility
            image_urls: uploadedUrls,
            name,
            description,
            price: Number(price),
            template: template,
        })

        setLoading(false)

        if (error) {
            alert(error.message)
            return
        }

        alert("Item added")
        // Redirect back to the store items list if storeId was provided, otherwise dashboard
        if (queryStoreId) {
            router.push(`/dashboard/items?store_id=${queryStoreId}`)
        } else {
            router.push("/dashboard")
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold text-center text-gray-900">Add Item</h1>

                {queryStoreId ? (
                    <div className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700">
                        Store: <span className="font-semibold text-black">{stores.find(s => s.id === queryStoreId)?.store_name || "Loading..."}</span>
                    </div>
                ) : (
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
                )}

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

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Product Page Template</label>
                    <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="w-full border px-3 py-2 rounded bg-white text-black"
                    >
                        <option value="modern">Modern (Dark, Glassmorphism)</option>
                        <option value="classic">Classic (Clean, Serif)</option>
                        <option value="minimal">Minimal (Monospace, Stark)</option>
                    </select>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        if (e.target.files) {
                            setFiles(Array.from(e.target.files))
                        }
                    }}
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

export default function AddItemPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <AddItemPageContent />
        </Suspense>
    )
}
