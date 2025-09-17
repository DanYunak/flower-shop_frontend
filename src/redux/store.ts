import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { flowerShopsReducer } from './model/flowerShopsReducer';
import { rootSaga } from './sagas/rootSaga';
import { authReducer } from './model/userReducer';

const rootReducer = combineReducers({
    flowerShops: flowerShopsReducer,
    auth: authReducer

})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: true
})

sagaMiddleware.run(rootSaga)