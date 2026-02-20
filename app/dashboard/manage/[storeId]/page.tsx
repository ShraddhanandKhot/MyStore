"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"
import { Store as StoreIcon, ArrowLeft, Check, LayoutTemplate, Trash2, AlertTriangle, Save, Eye } from "lucide-react"

// Import Templates for Live Preview
import ModernStorefront from "@/components/templates/modern/Storefront"
import ClassicStorefront from "@/components/templates/classic/Storefront"
import MinimalStorefront from "@/components/templates/minimal/Storefront"
import { Store, Item } from "@/lib/types"

export default function ManageStore() {
    const router = useRouter()
    const params = useParams()
    const storeId = params.storeId as string

    const [store, setStore] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)

    // Form State
    const [storeName, setStoreName] = useState("")
    const [subdomain, setSubdomain] = useState("")
    const [selectedTemplate, setSelectedTemplate] = useState<string>("classic")

    const templates = [
        {
            id: "classic",
            name: "Classic",
            description: "A timeless design with a focus on products.",
            previewColor: "bg-blue-100",
        },
        {
            id: "modern",
            name: "Modern",
            description: "Clean lines and ample whitespace for a contemporary look.",
            previewColor: "bg-zinc-100",
        },
        {
            id: "minimal",
            name: "Minimal",
            description: "Stripped back to essentials to highlight your brand.",
            previewColor: "bg-white border",
        },
    ]

    useEffect(() => {
        const loadStore = async () => {
            const { data: auth } = await supabase.auth.getUser()
            if (!auth.user) {
                router.push("/")
                return
            }

            const { data: storeData, error } = await supabase
                .from("stores")
                .select("*")
                .eq("id", storeId)
                .eq("user_id", auth.user.id)
                .single()

            if (error || !storeData) {
                router.push("/dashboard")
                return
            }

            setStore(storeData)
            setStoreName(storeData.store_name)
            setSubdomain(storeData.subdomain)
            setSelectedTemplate(storeData.template || "classic")
            setLoading(false)
        }

        loadStore()
    }, [storeId, router])

    const handleSave = async () => {
        if (!storeName.trim() || !subdomain.trim()) {
            alert("Store name and subdomain are required")
            return
        }

        setSaving(true)
        console.log(`Attempting to update store ${storeId}`)

        const { data, error } = await supabase
            .from("stores")
            .update({
                store_name: storeName,
                subdomain: subdomain.toLowerCase(),
                template: selectedTemplate
            })
            .eq("id", storeId)
            .select()

        if (error) {
            console.error("Supabase update error:", error)
            alert(`Failed to update store: ${error.message}`)
        } else {
            console.log("Update success, data returned:", data)
            if (!data || data.length === 0) {
                alert("Update succeeded but no rows were returned. This usually means the ID didn't match or RLS blocked the update.")
            } else {
                setStore({ ...store, store_name: storeName, subdomain: subdomain, template: selectedTemplate })
                alert("Store updated successfully!")
                router.refresh()
            }
        }
        setSaving(false)
    }

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this store? This action cannot be undone and all products will be lost."
        )

        if (!confirmed) return

        setDeleting(true)

        const { error } = await supabase
            .from("stores")
            .delete()
            .eq("id", storeId)

        if (error) {
            alert("Failed to delete store: " + error.message)
            setDeleting(false)
        } else {
            alert("Store deleted successfully")
            router.push("/dashboard")
        }
    }

    // Mock Objects for Live Preview
    const mockStore: Store = {
        id: "preview",
        store_name: storeName || "Your Store Name",
        subdomain: subdomain || "your-store",
        user_id: "preview",
        created_at: new Date().toISOString(),
        template: selectedTemplate,
        image_url: store?.image_url
    }

    const mockItems: Item[] = [
        {
            id: "preview-item-1",
            name: "Premium Wireless Headphones",
            description: "Experience crystal clear sound with our latest noise-cancelling technology.",
            price: 299,
            image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            image_urls: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"],
            created_at: new Date().toISOString(),
            store_id: "preview"
        },
        {
            id: "preview-item-2",
            name: "Ergonomic Office Chair",
            description: "Work in comfort with our ergonomic chair designed for long hours.",
            price: 199,
            image_url: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
            image_urls: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80"],
            created_at: new Date().toISOString(),
            store_id: "preview"
        },
        {
            id: "preview-item-3",
            name: "Mechanical Keyboard",
            description: "Tactile feedback and durable construction for the ultimate typing experience.",
            price: 149,
            image_url: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
            image_urls: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"],
            created_at: new Date().toISOString(),
            store_id: "preview"
        },
        {
            id: "preview-item-4",
            name: "Smart Watch Series 5",
            description: "Stay connected and track your fitness with our latest smart watch.",
            price: 399,
            image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
            image_urls: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"],
            created_at: new Date().toISOString(),
            store_id: "preview"
        }
    ]

    const renderPreview = () => {
        switch (selectedTemplate) {
            case "modern":
                return <ModernStorefront store={mockStore} items={mockItems} />
            case "minimal":
                return <MinimalStorefront store={mockStore} items={mockItems} />
            case "classic":
            default:
                return <ClassicStorefront store={mockStore} items={mockItems} />
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 animate-pulse">Loading store details...</p>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 p-6 text-black">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="p-2 hover:bg-gray-200 rounded-full transition"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manage Store</h1>
                        <p className="text-gray-500">{store.store_name}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN: Settings & Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* General Settings */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <StoreIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
                                    <p className="text-gray-500 text-sm">Update your store's identity.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Store Name</label>
                                    <input
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                                        placeholder="My Awesome Store"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Subdomain</label>
                                    <div className="flex items-center">
                                        <input
                                            value={subdomain}
                                            onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                                            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                                            placeholder="mystore"
                                        />
                                        <span className="px-4 py-2 border border-l-0 rounded-r-lg bg-gray-50 text-gray-500 text-sm">
                                            .sprynt.works
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Template Selection */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <LayoutTemplate className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Store Template</h2>
                                    <p className="text-gray-500 text-sm">Choose how your store looks to your customers.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {templates.map((template) => (
                                    <div
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`
                                            cursor-pointer rounded-xl border-2 transition-all duration-200 relative overflow-hidden group
                                            ${selectedTemplate === template.id
                                                ? "border-black ring-1 ring-black/5"
                                                : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                                            }
                                        `}
                                    >
                                        <div className="h-40 w-full bg-gray-50 border-b border-gray-100 relative overflow-hidden">
                                            {/* Preview Container */}
                                            <div className="absolute inset-0 p-3 select-none pointer-events-none">

                                                {/* Classic Preview */}
                                                {template.id === 'classic' && (
                                                    <div className="w-full h-full bg-white border shadow-sm flex flex-col p-2 gap-2">
                                                        <div className="text-center border-b pb-1">
                                                            <div className="h-1 w-12 bg-gray-800 mx-auto rounded-full mb-0.5"></div>
                                                            <div className="flex justify-center gap-1">
                                                                <div className="h-0.5 w-4 bg-gray-300"></div>
                                                                <div className="h-0.5 w-4 bg-gray-300"></div>
                                                                <div className="h-0.5 w-4 bg-gray-300"></div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 bg-gray-50 flex items-center justify-center border">
                                                            <div className="w-8 h-8 rounded-full border border-gray-300"></div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-1">
                                                            <div className="aspect-square bg-gray-50 border"></div>
                                                            <div className="aspect-square bg-gray-50 border"></div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Modern Preview */}
                                                {template.id === 'modern' && (
                                                    <div className="w-full h-full bg-neutral-900 rounded-lg shadow-sm flex flex-col p-2 gap-2 text-white relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/30 blur-xl rounded-full"></div>
                                                        <div className="flex justify-between items-center z-10">
                                                            <div className="h-1.5 w-8 bg-white/20 rounded-full"></div>
                                                            <div className="h-1.5 w-4 bg-white/20 rounded-full"></div>
                                                        </div>
                                                        <div className="flex-1 bg-white/5 rounded-md border border-white/10 flex items-center justify-center backdrop-blur-sm z-10">
                                                            <div className="h-8 w-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg shadow-lg"></div>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-1 z-10">
                                                            <div className="h-6 rounded bg-white/5"></div>
                                                            <div className="h-6 rounded bg-white/5"></div>
                                                            <div className="h-6 rounded bg-white/5"></div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Minimal Preview */}
                                                {template.id === 'minimal' && (
                                                    <div className="w-full h-full bg-white flex flex-col gap-2">
                                                        <div className="flex justify-between items-end border-b-2 border-black pb-1">
                                                            <div className="h-2 w-10 bg-black"></div>
                                                            <div className="h-1 w-4 bg-gray-400"></div>
                                                        </div>
                                                        <div className="flex-1 bg-gray-100 flex items-center justify-center relative">
                                                            <div className="absolute inset-2 border border-gray-300"></div>
                                                            <div className="h-6 w-6 bg-black rotate-45"></div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <div className="flex-1 h-2 bg-gray-200"></div>
                                                            <div className="w-6 h-2 bg-black"></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                                                {selectedTemplate === template.id && (
                                                    <div className="bg-black text-white p-1 rounded-full">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {template.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button
                                    onClick={handleSave}
                                    disabled={saving || selectedTemplate === store.template}
                                    className={`
                                        px-6 py-2.5 rounded-lg font-medium transition-all
                                        ${saving || selectedTemplate === store.template
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-black text-white hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                                        }
                                    `}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>

                        {/* Save Button Duplicate (Optional, but kept for consistency) */}
                        <div className="flex justify-end lg:hidden">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-black text-white hover:bg-gray-900 transition-shadow hover:shadow-lg disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? "Saving Changes..." : "Save Changes"}
                            </button>
                        </div>

                        {/* Danger Zone */}
                        <div className="border border-red-200 rounded-2xl overflow-hidden">
                            <div className="bg-red-50 p-6 border-b border-red-100 flex items-start gap-4">
                                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-red-900">Danger Zone</h3>
                                    <p className="text-red-700 text-sm mt-1">
                                        Make sure you want to do this. Actions here cannot be undone.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-6 flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-900">Delete this store</h4>
                                    <p className="text-sm text-gray-500">
                                        This will permanently delete the store and all its products.
                                    </p>
                                </div>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors text-sm font-medium"
                                >
                                    {deleting ? "Deleting..." : "Delete Store"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Live Preview */}
                    <div className="hidden lg:block lg:col-span-1 sticky top-8">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                            <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50 backdrop-blur-sm">
                                <Eye className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-500">Live Preview</span>
                            </div>

                            {/* Device Frame */}
                            <div className="relative w-full aspect-[9/19] bg-gray-100 overflow-hidden group">
                                <div className="absolute inset-0 origin-top-left transform scale-[0.35] w-[285.7%] h-[285.7%] pointer-events-none select-none">
                                    {renderPreview()}
                                </div>

                                {/* Overlay/Interaction Block */}
                                <div className="absolute inset-0 bg-transparent"></div>
                            </div>

                            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                                <p className="text-xs text-gray-400">Previewing {selectedTemplate} template</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
