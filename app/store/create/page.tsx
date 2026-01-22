"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function CreateStore() {
    const router = useRouter()
    const [storeName, setStoreName] = useState("")
    const [subdomain, setSubdomain] = useState("")

    const createStore = async () => {
        if (!storeName || !subdomain) {
            alert("All fields are required")
            return
        }

        const { data: auth } = await supabase.auth.getUser()
        if (!auth.user) {
            router.push("/")
            return
        }

        const { error } = await supabase.from("stores").insert({
            user_id: auth.user.id,
            store_name: storeName,
            subdomain: subdomain.toLowerCase(),
        })

        if (error) {
            alert(error.message)
            return
        }

        router.push("/dashboard")
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Create Store</h1>

            <input
                placeholder="Store Name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
            />
            <br /><br />

            <input
                placeholder="Subdomain (unique)"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
            />
            <br /><br />

            <button onClick={createStore}>Create Store</button>
        </div>
    )
}
