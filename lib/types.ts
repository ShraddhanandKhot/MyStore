export type Store = {
    id: string
    store_name: string
    template: string
    subdomain: string
}

export type Item = {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    created_at: string
    template?: string
}
