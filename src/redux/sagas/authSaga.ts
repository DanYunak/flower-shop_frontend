import { takeEvery, put, call } from "redux-saga/effects";
import Cookies from "js-cookie";
import { registerAPI, loginAPI, AuthCredentials } from "../../api/auth";
import { actions } from "../model/userActions";

function* handleRegister(action: ReturnType<typeof actions.registerRequest>) {
  try {
    yield call(registerAPI, action.payload);
    // @ts-ignore
    const response = yield call(loginAPI, action.payload);
    Cookies.set("token", response.token, { expires: 7, sameSite: "Lax" });
    yield put(actions.authSuccess(response.username));
  } catch (err: any) {
    yield put(actions.authFailure(err.message || "Register error"));
  }
}

function* handleLogin(action: ReturnType<typeof actions.loginRequest>) {
  try {
    // @ts-ignore
    const response = yield call(loginAPI, action.payload);
    Cookies.set("token", response.token, { expires: 7, sameSite: "Lax" });
    yield put(actions.authSuccess(response.username));
  } catch (err: any) {
    yield put(actions.authFailure(err.message || "Login error"));
  }
}

function* handleLogout() {
  Cookies.remove("token");
}

export function* watchAuth() {
  yield takeEvery("AUTH/REGISTER_REQUEST", handleRegister);
  yield takeEvery("AUTH/LOGIN_REQUEST", handleLogin);
  yield takeEvery("AUTH/LOGOUT", handleLogout);
}
