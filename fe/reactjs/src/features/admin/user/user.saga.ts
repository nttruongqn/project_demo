import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { userActions } from "./user.slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListResponse } from "../../../models/common";
import { User } from "../../../models";
import { userApi } from "../../../api/userApi";


function* fetchUserList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<User> = yield call(userApi.getAllPaginate, action.payload)
        yield put(userActions.fetchUserListSuccess(response))
    } catch (error) {
        console.log("Fetch user list failed");
        yield put(userActions.fetchUserListFailed())

    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put(userActions.setFilter(action.payload));
}


export default function* userSaga() {
    yield takeLatest(userActions.fetchUserList.type, fetchUserList)
    yield debounce(
        500,
        userActions.setFilterWithDebounce.type,
        handleSearchDebounce
    );
}