"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async () => {
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
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
                    Welcome Back
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Login to your account
                </p>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-gray-500 bg-white"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-gray-500 bg-white"
                    />

                    <button
                        onClick={login}
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition disabled:opacity-50 font-medium"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-black font-medium hover:underline">
                        Signup
                    </a>
                </p>
            </div>
        </main>
    )
}
