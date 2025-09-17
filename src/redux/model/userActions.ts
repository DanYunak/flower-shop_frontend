import { AuthCredentials } from '../../api/auth';

export const actions = {
    registerRequest: (payload: AuthCredentials) => ({ type: 'AUTH/REGISTER_REQUEST', payload } as const),
    loginRequest: (payload: AuthCredentials) => ({ type: 'AUTH/LOGIN_REQUEST', payload } as const),
    authSuccess: (username: string) => ({ type: 'AUTH/SUCCESS', payload: { username } } as const),
    authFailure: (error: string) => ({ type: 'AUTH/FAILURE', payload: { error } } as const),
    logout: () => ({ type: 'AUTH/LOGOUT' } as const),
    setAuthFromCookie: (username: string) => ({ type: 'AUTH/SET_FROM_COOKIE', payload: { username } } as const),
  };
  
  export type AuthAction = ReturnType<(typeof actions)[keyof typeof actions]>;