import { PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "./auth.slice";
import { call, delay, fork, put, take, takeLatest } from "redux-saga/effects";
import { LoginModel } from "../../../models/auth.model";
import authApi from "../../../api/authApi";
import { User } from "../../../models/user.model";

function* handleLogin(payload: LoginModel) {
  try {
    const { accessToken }: User = yield call(authApi.login, payload);
    const currentUser: User = yield call(authApi.getProfile, accessToken);
    if (currentUser.role?.name === "admin" && accessToken) {
      localStorage.setItem("access_token", accessToken);
      yield put(authActions.loginSuccess(currentUser));
    }
  } catch (error: any) {
    yield put(authActions.loginFailed(error));
  }
}

function* watchFlowLogin() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token_admin"));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginModel> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    }
  }
}

function* handleLogout() {
      localStorage.removeItem("access_token");
      yield put(authActions.logoutSuccess())
}

export default function* authSaga() {
  yield fork(watchFlowLogin);
  yield takeLatest(authActions.logout, handleLogout)
}
