"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"
import { Layout, Palette, Tag, IndianRupee, Clock, ArrowLeft, Save, Sparkles, Monitor, Layers } from "lucide-react"

export default function EditItem() {
    const router = useRouter()
    const params = useParams()
    const itemId = params.id as string

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [storeId, setStoreId] = useState("")
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([])
    const [categoryId, setCategoryId] = useState("")
    const [template, setTemplate] = useState("modern")
    const [saleTimerEnabled, setSaleTimerEnabled] = useState(false)
    const [saleTimerHours, setSaleTimerHours] = useState("0")
    const [saleTimerMinutes, setSaleTimerMinutes] = useState("0")
    const [saleTimerSeconds, setSaleTimerSeconds] = useState("0")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadItem = async () => {
            const { data, error } = await supabase
                .from("items")
                .select("name, description, price, store_id, category_id, template, sale_timer_enabled, sale_timer_hours, sale_timer_minutes, sale_timer_seconds")
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
            setCategoryId(data.category_id || "")
            setTemplate(data.template || "modern")
            setSaleTimerEnabled(data.sale_timer_enabled || false)
            setSaleTimerHours(String(data.sale_timer_hours || 0))
            setSaleTimerMinutes(String(data.sale_timer_minutes || 0))
            setSaleTimerSeconds(String(data.sale_timer_seconds || 0))
        }

        loadItem()
    }, [itemId])

    useEffect(() => {
        const loadCategories = async () => {
            if (!storeId) return

            const { data, error } = await supabase
                .from("categories")
                .select("id, name")
                .eq("store_id", storeId)
                .order("name", { ascending: true })

            if (!error && data) {
                setCategories(data)
            }
        }

        loadCategories()
    }, [storeId])

    const updateItem = async () => {
        const { error } = await supabase
            .from("items")
            .update({
                name,
                description,
                price: Number(price),
                category_id: categoryId || null,
                template: template,
                sale_timer_enabled: saleTimerEnabled,
                sale_timer_hours: Number(saleTimerHours),
                sale_timer_minutes: Number(saleTimerMinutes),
                sale_timer_seconds: Number(saleTimerSeconds),
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
        <main className="min-h-screen bg-gray-50 text-black pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-30">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push(`/dashboard/items?store_id=${storeId}`)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Edit Product</h1>
                    </div>
                    <button
                        onClick={updateItem}
                        disabled={loading}
                        className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form Details */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Section 1: Core Details */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b bg-gray-50 flex items-center gap-2">
                            <Tag className="w-4 h-4 text-gray-500" />
                            <h2 className="font-bold text-sm uppercase tracking-wider text-gray-700">Core Details</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border px-4 py-2.5 rounded-lg bg-white text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none"
                                    placeholder="e.g. Premium Silk Scarf"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full border px-4 py-2.5 rounded-lg bg-white text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none resize-none"
                                    placeholder="Describe your product..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Visual Template */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b bg-gray-50 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-gray-500" />
                            <h2 className="font-bold text-sm uppercase tracking-wider text-gray-700">Visual Template</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { id: "modern", name: "Modern", desc: "Glassmorphism & Neon", icon: <Sparkles className="w-5 h-5" /> },
                                    { id: "classic", name: "Classic", desc: "Clean & Serif", icon: <Monitor className="w-5 h-5" /> },
                                    { id: "minimal", name: "Minimal", desc: "Stark & Monospace", icon: <Layers className="w-5 h-5" /> },
                                ].map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTemplate(t.id)}
                                        className={`
                                            p-4 rounded-xl border-2 text-left transition-all relative group
                                            ${template === t.id ? 'border-black bg-gray-50 shadow-md' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'}
                                        `}
                                    >
                                        <div className={`
                                            w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors
                                            ${template === t.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}
                                        `}>
                                            {t.icon}
                                        </div>
                                        <div className="font-bold text-sm">{t.name}</div>
                                        <div className="text-[10px] text-gray-500">{t.desc}</div>
                                        {template === t.id && (
                                            <div className="absolute top-2 right-2">
                                                <div className="w-2 h-2 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings */}
                <div className="space-y-8">

                    {/* Section 3: Pricing */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b bg-gray-50 flex items-center gap-2">
                            <IndianRupee className="w-4 h-4 text-gray-500" />
                            <h2 className="font-bold text-sm uppercase tracking-wider text-gray-700">Pricing</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Price (INR)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full border pl-8 pr-4 py-2.5 rounded-lg bg-white text-black focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none font-bold"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="w-full border px-4 py-2.5 rounded-lg bg-white text-black focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none appearance-none cursor-pointer"
                                >
                                    <option value="">No Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Conversion Tools (Sale Timer) */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b bg-orange-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <h2 className="font-bold text-sm uppercase tracking-wider text-orange-800">Sale Timer</h2>
                            </div>
                            <input
                                type="checkbox"
                                checked={saleTimerEnabled}
                                onChange={(e) => setSaleTimerEnabled(e.target.checked)}
                                className="w-5 h-5 accent-orange-600 cursor-pointer"
                            />
                        </div>
                        <div className={`p-6 space-y-4 transition-all duration-300 ${!saleTimerEnabled ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: "Hours", val: saleTimerHours, set: setSaleTimerHours },
                                    { label: "Mins", val: saleTimerMinutes, set: setSaleTimerMinutes },
                                    { label: "Secs", val: saleTimerSeconds, set: setSaleTimerSeconds },
                                ].map((unit) => (
                                    <div key={unit.label} className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400">{unit.label}</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={unit.val}
                                            onChange={(e) => unit.set(e.target.value)}
                                            className="w-full border px-2 py-2 rounded text-sm bg-white font-mono text-center focus:border-orange-500 outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-orange-700/60 font-medium italic text-center">
                                Drives urgency with a live countdown on product page.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
