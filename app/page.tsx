import { getSubdomain } from "@/lib/getSubdomain"
import { supabase } from "@/lib/supabaseClient"

// Server Component
export default async function Home() {
  const subdomain = await getSubdomain()

  /* ======================================================
     ROOT DOMAIN → PLATFORM LANDING PAGE
     ====================================================== */
  if (!subdomain || subdomain === "localhost") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">
            Store Platform
          </h1>

          <p className="text-gray-600 mb-6">
            Create your own online store with a custom subdomain.
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="/login"
              className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
            >
              Login
            </a>

            <a
              href="/signup"
              className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Signup
            </a>
          </div>
        </div>
      </main>
    )
  }

  /* ======================================================
     SUBDOMAIN → STOREFRONT
     ====================================================== */

  // Fetch store by subdomain
  const { data: store, error: storeError } = await supabase
    .from("stores")
    .select("id, store_name, subdomain")
    .eq("subdomain", subdomain)
    .single()

  if (storeError || !store) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-xl font-semibold">Store not found</h1>
          <p className="text-gray-500 mt-2">
            The store you are looking for does not exist.
          </p>
        </div>
      </main>
    )
  }

  // Fetch store items
  const { data: items } = await supabase
    .from("items")
    .select("id, image_url, created_at")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Store Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">
          {store.store_name}
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome to our store
        </p>
      </div>

      {/* Items */}
      <div className="max-w-6xl mx-auto">
        {!items || items.length === 0 ? (
          <p className="text-gray-500">
            No items available in this store.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={item.image_url}
                  alt="Store item"
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
