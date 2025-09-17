import { instance } from './axiosInstance';

export async function getCartApi() {
    const res = await instance.get('/cart')
    return res.data
}

export async function addToCartApi(productId: number, quantity = 1) {
    const res = await instance.post('/cart/add', { productId, quantity })
    return res.data
}

export async function updateCartItemAPI(productId: number, quantity: number) {
    const res = await instance.patch("/cart/update", { productId, quantity })
    return res.data
}

export async function removeFromCartAPI(productId: number) {
    const res = await instance.delete(`/cart/remove/${productId}`)
    return res.data
}  