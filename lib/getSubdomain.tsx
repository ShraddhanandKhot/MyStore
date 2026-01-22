import { headers } from "next/headers"

export async function getSubdomain() {
    const headersList = await headers()
    const host = headersList.get("host") ?? ""

    const cleanHost = host.split(":")[0]

    const parts = cleanHost.split(".")

    // localhost OR www → no store
    if (parts.length < 2) return null

    return parts[0]
}
