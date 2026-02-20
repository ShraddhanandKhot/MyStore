import Link from "next/link"
import { Store } from "@/lib/types"

interface NavbarProps {
    store: Store
    variant?: "modern" | "classic" | "minimal"
}

export default function StoreNavbar({ store, variant = "modern" }: NavbarProps) {
    const isModern = variant === "modern"
    const isClassic = variant === "classic"
    const isMinimal = variant === "minimal"

    return (
        <nav className={`
            w-full py-4 px-6 md:px-12 flex justify-between items-center z-50
            ${isModern ? "bg-black/80 backdrop-blur-md text-white border-b border-white/10 sticky top-0" : ""}
            ${isClassic ? "bg-white text-gray-900 border-b border-gray-200 font-serif" : ""}
            ${isMinimal ? "bg-white text-black border-b border-black font-mono" : ""}
        `}>
            {/* Logo / Home Link */}
            <Link href="/" className="text-lg font-bold hover:opacity-80 transition">
                {store.store_name}
            </Link>

            {/* Nav Links */}
            <div className={`flex gap-6 ${isMinimal ? "uppercase text-sm tracking-widest" : "text-sm font-medium"}`}>
                <Link href="#" className="hover:opacity-70 transition">
                    About
                </Link>
                <Link href="#" className="hover:opacity-70 transition">
                    Contact
                </Link>
                <Link href="/#products" className="hover:opacity-70 transition">
                    Products
                </Link>
                <Link href="#" className="hover:opacity-70 transition">
                    Collections
                </Link>
            </div>

            {/* Cart / Action (Optional placeholder) */}
            <div className="flex gap-4">
                <button className="hover:opacity-70">
                    Cart (0)
                </button>
            </div>
        </nav>
    )
}
