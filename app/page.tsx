import { getSubdomain } from "@/lib/getSubdomain"
import { supabase } from "@/lib/supabaseClient"
import { Store, ShoppingBag, ArrowRight, PackageOpen } from "lucide-react"
import Link from "next/link"
import Classic from "@/components/templates/classic/Storefront"
import Modern from "@/components/templates/modern/Storefront"
import Minimal from "@/components/templates/minimal/Storefront"

const templates: any = {
  classic: Classic,
  modern: Modern,
  minimal: Minimal,
}

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
            Store Platform!!
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
    .select("id, store_name, template")
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

  /* ======================================================
     DYNAMIC TEMPLATE RENDERING
     ====================================================== */

  const Template = templates[store.template] || templates.classic

  return <Template store={store} items={items || []} />
}
