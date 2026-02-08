"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Store, Plus, ExternalLink, Settings, Package, LogOut, TrendingUp, Users, DollarSign } from "lucide-react"

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
            <main className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading your empire...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 text-black font-sans">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-black text-white p-1.5 rounded-lg">
                            <Store className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">MyStore</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">{profile?.username || "Merchant"}</p>
                            <p className="text-xs text-gray-500">Starter Plan</p>
                        </div>
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut()
                                router.push("/")
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

                {/* 1. Hero / CTA Section */}
                <div className="text-center py-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Build Your Brand. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Start Selling.</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Launch a new store in seconds. Manage everything from one place.
                    </p>
                    <button
                        onClick={() => router.push("/store/create")}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-800 hover:scale-105 active:scale-95 shadow-xl"
                    >
                        <Plus className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform" />
                        Create New Store
                    </button>
                </div>

                {/* 2. Quick Stats (Mockup) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <h3 className="text-gray-500 font-medium">Total Revenue</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">₹0.00</p>
                        <p className="text-sm text-green-600 flex items-center mt-2">
                            <TrendingUp className="w-4 h-4 mr-1" /> +0% from last month
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-gray-500 font-medium">Total Customers</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-400 mt-2">No active customers yet</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                                <Store className="w-6 h-6" />
                            </div>
                            <h3 className="text-gray-500 font-medium">Active Stores</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stores.length}</p>
                        <p className="text-sm text-gray-400 mt-2">Manage your stores below</p>
                    </div>
                </div>

                {/* 3. Your Stores List */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Your Stores</h2>
                        <div className="text-sm text-gray-500">
                            Showing {stores.length} store{stores.length !== 1 && 's'}
                        </div>
                    </div>

                    {stores.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                            <Store className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No stores created yet.</p>
                            <button
                                onClick={() => router.push("/store/create")}
                                className="text-blue-600 hover:underline mt-2 text-sm"
                            >
                                Create your first store
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {stores.map((store) => {
                                const isLocalhost = typeof window !== "undefined" &&
                                    window.location.hostname.includes("localhost")

                                const storeUrl = isLocalhost
                                    ? `http://${store.subdomain}.localhost:3000`
                                    : `https://${store.subdomain}.${window.location.hostname.replace(/^www\./, "")}`

                                return (
                                    <div
                                        key={store.id}
                                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                                    >
                                        <div className="h-32 bg-gray-100 relative flex items-center justify-center">
                                            {/* Pattern overlay */}
                                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#444cf7_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                            <Store className="w-12 h-12 text-gray-300 group-hover:text-blue-500 transition-colors" />
                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                Live
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="mb-6">
                                                <h3 className="font-bold text-xl text-gray-900 mb-1">{store.store_name}</h3>
                                                <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 w-fit transition-colors">
                                                    {store.subdomain}.mystore.com <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={() => router.push(`/dashboard/manage/${store.id}`)}
                                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    Settings
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/dashboard/items?store_id=${store.id}`)}
                                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                                                >
                                                    <Package className="w-4 h-4" />
                                                    Products
                                                </button>
                                            </div>
                                        </div>
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
