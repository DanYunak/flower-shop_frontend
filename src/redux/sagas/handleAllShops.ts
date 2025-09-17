import { AxiosResponse, getAllShopsAPI } from '../../api/getAllShops';
import { actions } from '../model/flowerShopsActions';
import { call, put, takeEvery } from '@redux-saga/core/effects'

function* handleAllShops() {
    try {
        const res: AxiosResponse = yield call(getAllShopsAPI)
        yield put(actions.setAllShops(res.data))
    } catch {
        yield put({ type: 'SET_ALL_SHOPS_ERRORS', error: 'Error fetching all shops' })
    }
}

export function* watchHandleAllShops() {
    yield takeEvery('GET_ALL_SHOPS', handleAllShops)
}