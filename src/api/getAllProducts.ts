import { ProductType } from '../redux/types/FlowerShops.type';
import { instance } from './axiosInstance';

export type AxiosResponse = {
    data: ProductType[]
}

export const getAllProductsAPI: () => Promise<AxiosResponse> = () => {
    return instance.get('/products')
}