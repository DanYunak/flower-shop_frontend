export type ShopType = {
    id: number
    address: string
    name: string
    phone: string
}

export type ProductType = {
    id: number
    name: string
    price: number
    imageUrl: string
    createdAt: Date
    updatedAt: Date
    shopId: number
    shop: ShopType
}