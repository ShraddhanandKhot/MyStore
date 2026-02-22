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
    category_id?: string
    sale_timer_enabled?: boolean
    sale_timer_hours?: number
    sale_timer_minutes?: number
    sale_timer_seconds?: number
}

export type Category = {
    id: string
    name: string
    store_id: string
    created_at: string
}
