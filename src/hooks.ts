import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { store } from './redux/store';
import { RootState } from './redux/store';

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
