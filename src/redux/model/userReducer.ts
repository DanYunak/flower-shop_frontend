import { InferActionsTypes } from '../store';
import { actions } from './userActions';

export type AuthStateType = {
    isLoggedIn: boolean;
    username: string | null;
    error: string | null;
};

const initialState: AuthStateType = {
    isLoggedIn: false,
    username: null,
    error: null,
};

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

export function authReducer(state = initialState, action: ActionsTypes): InitialStateType {
    switch (action.type) {
      case 'AUTH/SUCCESS':
        return { ...state, isLoggedIn: true, username: action.payload.username, error: null };
      case 'AUTH/FAILURE':
        return { ...state, error: action.payload.error };
      case 'AUTH/LOGOUT':
        return { ...state, isLoggedIn: false, username: null, error: null };
      case 'AUTH/SET_FROM_COOKIE':
        return { ...state, isLoggedIn: true, username: action.payload.username, error: null };
      default:
        return state;
    }
}