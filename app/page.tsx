import { getSubdomain } from "@/lib/getSubdomain"
import { supabase } from "@/lib/supabaseClient"
import { Store, ShoppingBag, ArrowRight, PackageOpen } from "lucide-react"
import Link from "next/link"

// Server Component
export default async function Home() {
  const subdomain = await getSubdomain()

  /* ======================================================
     ROOT DOMAIN → PLATFORM LANDING PAGE
     ====================================================== */
  if (!subdomain || subdomain === "localhost") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="max-w-3xl text-center space-y-8">
          <div className="mx-auto bg-black/5 p-4 rounded-2xl w-16 h-16 flex items-center justify-center">
            <Store className="w-8 h-8" />
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent">
            Store Platform
          </h1>

          <p className="text-xl text-zinc-600 max-w-xl mx-auto">
            Create your own online store with a custom subdomain in minutes.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-3 rounded-full bg-black text-white flex items-center gap-2"
            >
              Login <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/signup"
              className="px-8 py-3 rounded-full border"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
    )
  }

  /* ======================================================
     SUBDOMAIN → STOREFRONT
     ====================================================== */

  const { data: store } = await supabase
    .from("stores")
    .select("id, store_name")
    .eq("subdomain", subdomain)
    .single()

  if (!store) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Store not found !!</h1>
      </main>
    )
  }

  const { data: items } = await supabase
    .from("items")
    .select("id, image_url, name, description, price, created_at")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur border-b z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-4">
          <div className="bg-zinc-900 text-white p-3 rounded-xl">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h1 className="font-bold text-lg">{store.store_name}</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">Latest Products</h2>
          <p className="text-zinc-500">
            Browse items available in this store.
          </p>
        </div>
      </section>

      {/* Items */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {!items || items.length === 0 ? (
          <div className="py-32 text-center text-zinc-500">
            <PackageOpen className="mx-auto w-10 h-10 mb-4" />
            No products yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.id} className="group">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 shadow">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>
                    <span className="font-medium">
                      ₹{item.price}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-sm text-zinc-500 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
