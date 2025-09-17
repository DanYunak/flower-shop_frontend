import { all } from '@redux-saga/core/effects';
import { watchAuth } from './authSaga';

export function* authRootSaga() {
    yield all([
        watchAuth()
    ])
}