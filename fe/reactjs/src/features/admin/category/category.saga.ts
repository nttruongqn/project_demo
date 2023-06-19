import { PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListResponse } from "../../../models/common";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { categoryActions } from "./category.slice";
import { Category } from "../../../models";
import { categoryApi } from "../../../api/categoryApi";

function* fetchCategoryList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Category> = yield call(
      categoryApi.getList,
      action.payload
    );
    yield put(categoryActions.fetchCategoryListSuccess(response));
  } catch (error) {
    console.log("Fetch category list failed");
    yield put(categoryActions.fetchCategoryListFailed());
  }
}

function* fetchCategoryAll() {
  try {
    const response: ListResponse<Category> = yield call(
      categoryApi.getAll,
    );
    yield put(categoryActions.fetchCategoryListSuccess(response));
  } catch (error) {
    console.log("Fetch category list failed");
    yield put(categoryActions.fetchCategoryListFailed());
  }
}


function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(categoryActions.setFilter(action.payload));
}

export default function* categorySaga() {
  yield takeLatest(categoryActions.fetchCategoryList.type, fetchCategoryList);
  yield takeLatest(categoryActions.fetchCategoryAll.type, fetchCategoryAll);

  yield debounce(
    500,
    categoryActions.setFilterWithDebounce.type,
    handleSearchDebounce
  );
}
