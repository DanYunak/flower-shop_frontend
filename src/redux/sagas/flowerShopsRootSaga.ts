import { all } from '@redux-saga/core/effects';
import { watchHandleAllShops } from './handleAllShops';
import { watchHandleAllProducts } from './handleAllProducts';

export function* flowerShopsRootSaga() {
    yield all([
        watchHandleAllShops(),
        watchHandleAllProducts()
    ])
}