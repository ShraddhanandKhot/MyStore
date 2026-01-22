"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function SignupPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const signup = async () => {
        if (!username.trim()) {
            alert("Username is required")
            return
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            alert(error.message)
            return
        }

        await supabase.from("profiles").insert({
            id: data.user?.id,
            username,
        })

        router.push("/dashboard")
    }

    return (
        <main style={{ padding: 40 }}>
            <h1>Signup</h1>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br /><br />

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />

            <button onClick={signup}>Create Account</button>
        </main>
    )
}
