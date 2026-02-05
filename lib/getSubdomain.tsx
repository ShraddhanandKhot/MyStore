

import { headers } from "next/headers"

export async function getSubdomain() {
    const headersList = await headers()
    const host = headersList.get("host") ?? ""

    const cleanHost = host.split(":")[0] // remove port
    const parts = cleanHost.split(".")

    // Localhost
    if (cleanHost === "localhost") return null
    if (cleanHost.endsWith(".localhost")) return parts[0]

    // Root domain (sprynt.works)
    if (parts.length === 2) return null

    // www.sprynt.works
    if (parts[0] === "www") return null

    // subdomain.sprynt.workscd 
    return parts[0]
}
