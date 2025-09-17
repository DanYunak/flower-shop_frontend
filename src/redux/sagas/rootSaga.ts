import { all, fork } from '@redux-saga/core/effects';
import { flowerShopsRootSaga } from './flowerShopsRootSaga';
import { authRootSaga } from './authRootSaga';

export function* rootSaga() {
    yield all([
        fork(flowerShopsRootSaga),
        fork(authRootSaga)
    ])
}