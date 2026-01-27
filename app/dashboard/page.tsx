"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const router = useRouter()
    const [profile, setProfile] = useState<any>(null)
    const [stores, setStores] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            const { data: auth } = await supabase.auth.getUser()

            if (!auth.user) {
                router.push("/")
                return
            }

            const { data: profileData } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", auth.user.id)
                .single()

            const { data: storeData } = await supabase
                .from("stores")
                .select("*")
                .eq("user_id", auth.user.id)

            setProfile(profileData)
            setStores(storeData || [])
            setLoading(false)
        }

        loadData()
    }, [router])

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
                <p className="text-gray-500">Loading dashboard...</p>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-100 p-6 text-black">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="bg-white p-6 rounded-xl shadow mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500">
                            Welcome, {profile?.username || "User"}
                        </p>
                    </div>

                    <button
                        onClick={async () => {
                            await supabase.auth.signOut()
                            router.push("/")
                        }}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => router.push("/store/create")}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Create Store
                    </button>

                    <button
                        onClick={() => router.push("/store/items")}
                        className="px-4 py-2 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm font-medium"
                    >
                        Add Item
                    </button>
                </div>

                {/* Stores */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Stores</h2>

                    {stores.length === 0 ? (
                        <p className="text-gray-500">No stores created yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {stores.map((store) => {
                                const isLocalhost = typeof window !== "undefined" &&
                                    window.location.hostname.includes("localhost")

                                const storeUrl = isLocalhost
                                    ? `http://${store.subdomain}.localhost:3000`
                                    : `https://${store.subdomain}.${window.location.hostname.replace(/^www\./, "")}`

                                return (
                                    <div
                                        key={store.id}
                                        className="border rounded-lg p-4 hover:shadow transition flex justify-between items-center"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {store.store_name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {store.subdomain}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => window.open(storeUrl, "_blank")}
                                            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                                        >
                                            Open Store
                                        </button>
                                    </div>
                                )
                            })}

                        </div>
                    )}
                </div>

            </div>
        </main>
    )
}
