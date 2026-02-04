import Link from "next/link"
import { Item, Store } from "@/lib/types"

export default function ClassicStorefront({ store, items }: { store: Store; items: Item[] }) {
    return (
        <main>
            <h1>{store.store_name}</h1>
            <div className="grid">
                {items.map(item => (
                    <Link key={item.id} href={`/product/${item.id}`}>
                        <div>
                            <img src={item.image_url} />
                            <h3>{item.name}</h3>
                            <p>₹{item.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}
