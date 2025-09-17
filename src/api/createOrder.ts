import { instance } from './axiosInstance';

export type AxiosResponse = {
    id: number
    createdAt: Date
    userEmail: string
    userPhone: string
    deliveryAddress: string
    totalPrice: number
    items: any[]
}

export type DataType = {
    userEmail: string
    userPhone: string
    deliveryAddress: string
}

export async function createOrderApi(data: DataType): Promise<AxiosResponse> {
    const res = await instance.post('/order', data)
    return res.data
}