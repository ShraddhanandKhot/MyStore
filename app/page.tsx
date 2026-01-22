import { getSubdomain } from "@/lib/getSubdomain"
import { supabase } from "@/lib/supabaseClient"

export default async function Home() {
  const subdomain = await getSubdomain()

  // Root domain → Platform landing
  // Root domain → Platform landing
  if (!subdomain || subdomain === "localhost") {
    return (
      <main style={{ padding: 40 }}>
        <h1>Welcome to Store Platform</h1>
        <p>Create your own store with a custom subdomain</p>

        <a href="/login">Login</a>
        <br /><br />
        <a href="/signup">Signup</a>
      </main>
    )
  }


  // Subdomain → Storefront
  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("subdomain", subdomain)
    .single()

  if (!store) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Store not found</h1>
      </main>
    )
  }

  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq("store_id", store.id)

  return (
    <main style={{ padding: 40 }}>
      <h1>{store.store_name}</h1>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {items?.map((item) => (
          <img
            key={item.id}
            src={item.image_url}
            alt="item"
            width={200}
            style={{ borderRadius: 8 }}
          />
        ))}
      </div>
    </main>
  )

}

