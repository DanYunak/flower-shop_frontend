import { InferActionsTypes } from '../store';
import { actions } from './flowerShopsActions';
import { ShopType, ProductType } from '../types/FlowerShops.type';

const initialState = {
    shops: [] as ShopType[],
    products: [] as ProductType[],
    selectedShop: 1
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

export const flowerShopsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SET_ALL_SHOPS':
            return {
                ...state,
                shops: [...action.shops]
            }

        case 'SET_ALL_PRODUCTS':
            return {
                ...state,
                products: [...action.products]
            }

        case 'SET_SELECTED_SHOP':
            return {
                ...state,
                selectedShop: action.id
            }

        default: return state
    }
}