"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"
import { Store, ArrowLeft, Check, LayoutTemplate } from "lucide-react"

export default function ManageStore() {
    const router = useRouter()
    const params = useParams()
    const storeId = params.storeId as string

    const [store, setStore] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
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
            setSelectedTemplate(storeData.template || "classic")
            setLoading(false)
        }

        loadStore()
    }, [storeId, router])

    const handleSave = async () => {
        setSaving(true)
        console.log(`Attempting to update store ${storeId} with template ${selectedTemplate}`)

        const { data, error } = await supabase
            .from("stores")
            .update({ template: selectedTemplate })
            .eq("id", storeId)
            .select()

        if (error) {
            console.error("Supabase update error:", error)
            alert(`Failed to update template: ${error.message}`)
        } else {
            console.log("Update success, data returned:", data)
            if (!data || data.length === 0) {
                alert("Update succeeded but no rows were returned. This usually means the ID didn't match or RLS blocked the update.")
            } else {
                // Update local state to reflect saved changes
                setStore({ ...store, template: selectedTemplate })
                alert("Template updated successfully!")
                router.refresh()
            }
        }
        setSaving(false)
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
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                                <div className={`h-32 ${template.previewColor} w-full flex items-center justify-center`}>
                                    {/* Simplified Preview Placeholder */}
                                    <div className="w-16 h-16 bg-white/50 rounded-lg shadow-sm"></div>
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

            </div>
        </main>
    )
}
