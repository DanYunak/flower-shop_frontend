import { ShopType, ProductType } from '../types/FlowerShops.type';

export const actions = {
    getAllShops: () => ({ type: 'GET_ALL_SHOPS' } as const),
    setAllShops: (shops: ShopType[]) => ({ type: 'SET_ALL_SHOPS', shops } as const),

    getAllProducts: () => ({ type: 'GET_ALL_PRODUCTS' as const }),
    setAllProducts: (products: ProductType[]) => ({ type: 'SET_ALL_PRODUCTS', products } as const),

    setSelectedShop: (id: number) => ({ type: 'SET_SELECTED_SHOP', id } as const)
}