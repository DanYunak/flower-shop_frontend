import { AppStateType } from '../store';

export const getAllShops = (state: AppStateType) => {
    return state.flowerShops.shops
}

export const getAllProducts = (state: AppStateType) => {
    return state.flowerShops.products
}

export const getSelectedShop = (state: AppStateType) => {
    return state.flowerShops.selectedShop
}