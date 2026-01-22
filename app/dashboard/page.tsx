"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const router = useRouter()
    const [profile, setProfile] = useState<any>(null)
    const [stores, setStores] = useState<any[]>([])

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
        }

        loadData()
    }, [])

    if (!profile) return <p>Loading...</p>

    return (
        <div style={{ padding: 40 }}>
            <h1>Dashboard</h1>

            <p><b>Username:</b> {profile.username || "Not set"}</p>

            <button onClick={() => router.push("/store/create")}>
                Create Store
            </button>

            <h2>Your Stores</h2>

            {stores.length === 0 && <p>No stores created yet</p>}

            <ul>
                {stores.map((store) => (
                    <li key={store.id}>
                        {store.store_name} — <b>{store.subdomain}.yourapp.com</b>
                    </li>
                ))}
            </ul>

            <br />
            <button onClick={() => router.push("/store/items")}>
                Add Item
            </button>

            <button
                onClick={async () => {
                    await supabase.auth.signOut()
                    router.push("/")
                }}
            >
                Logout
            </button>

        </div>
    )
}
