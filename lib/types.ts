export type Store = {
    id: string
    store_name: string
    template: string
    subdomain: string
    user_id: string
    created_at: string
    image_url?: string
}

export type Item = {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    image_urls?: string[]
    created_at: string
    template?: string
    store_id: string
}
