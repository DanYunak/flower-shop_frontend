import { instance } from "./axiosInstance"

export type AxiosResponse = {
    data: [
        {
            id: number
            name: string
            address: string
            phone: string
        }
    ]
}

export const getAllShopsAPI: () => Promise<AxiosResponse> = () => {
    return instance.get('/shops')
}