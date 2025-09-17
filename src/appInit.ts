import Cookies from 'js-cookie';
import { actions } from './redux/model/userActions';
import { store } from './redux/store';

export async function initializeAuth() {
  const token = Cookies.get('token');
  if (!token) return;

  try {
    const payload = (() => {
      try {
        const p = token.split('.')[1];
        const padded = p.padEnd(p.length + (4 - (p.length % 4)) % 4, '=');
        return JSON.parse(atob(padded));
      } catch {
        return null;
      }
    })();

    if (payload && payload.username) {
      store.dispatch(actions.setAuthFromCookie(payload.username));
    } else {
      Cookies.remove('token');
    }
  } catch {
    Cookies.remove('token');
  }
}
