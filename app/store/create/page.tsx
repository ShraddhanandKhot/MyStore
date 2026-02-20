"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function CreateStore() {
    const router = useRouter()

    const [storeName, setStoreName] = useState("")
    const [subdomain, setSubdomain] = useState("")
    const [template, setTemplate] = useState("classic")
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const createStore = async () => {
        if (!storeName || !subdomain) {
            alert("All fields are required")
            return
        }

        setLoading(true)

        const { data: auth } = await supabase.auth.getUser()
        if (!auth.user) {
            setLoading(false)
            router.push("/")
            return
        }

        let imageUrl = null

        if (file) {
            const filePath = `logos/${auth.user.id}/${Date.now()}-${file.name}`
            const { error: uploadError } = await supabase.storage
                .from("store-logos")
                .upload(filePath, file)

            if (uploadError) {
                setLoading(false)
                alert("Error uploading logo: " + uploadError.message)
                return
            }

            const { data: publicUrl } = supabase.storage
                .from("store-logos")
                .getPublicUrl(filePath)

            imageUrl = publicUrl.publicUrl
        }

        const { error } = await supabase.from("stores").insert({
            user_id: auth.user.id,
            store_name: storeName,
            subdomain: subdomain.toLowerCase(),
            template,
            image_url: imageUrl,
        })

        setLoading(false)

        if (error) {
            alert(error.message)
            return
        }

        router.push("/dashboard")
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-2 text-center text-gray-900">
                    Create Store
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Set up a new store with a unique subdomain
                </p>

                <div className="space-y-4">
                    {/* Store Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Store Name
                        </label>
                        <input
                            placeholder="My Awesome Store"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-gray-500 bg-white"
                        />
                    </div>

                    {/* Subdomain */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Subdomain
                        </label>
                        <input
                            placeholder="mystore"
                            value={subdomain}
                            onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-gray-500 bg-white"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Your store will be available at:{" "}
                            <span className="font-medium text-gray-700">
                                {subdomain || "yourstore"}.sprynt.works
                            </span>
                        </p>
                    </div>

                    {/* Store Logo */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Store Logo (Optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition"
                        />
                    </div>

                    {/* Template Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Template
                        </label>
                        <select
                            value={template}
                            onChange={(e) => setTemplate(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                        >
                            <option value="classic">Classic</option>
                            <option value="modern">Modern</option>
                            <option value="minimal">Minimal</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={createStore}
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition disabled:opacity-50 font-medium"
                    >
                        {loading ? "Creating store..." : "Create Store"}
                    </button>
                </div>
            </div>
        </main>
    )
}
