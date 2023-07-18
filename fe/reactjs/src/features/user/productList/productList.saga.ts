import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { productApi } from "../../../api/productApi";
import { Product } from "../../../models";
import { ListParams, ListResponse } from "../../../models/common";
import { productListActions } from "./productList.slice";

function* fetchProductList(action: PayloadAction<ListParams>) {
  try {
    console.log(action.payload.checkFilter)
    if(action.payload.checkFilter === true){
      yield put(productListActions.setListForUser());
    }
    const response: ListResponse<Product> = yield call(
      productApi.getAllPaginate,
      action.payload
    );
    yield put(productListActions.fetchProductListSuccess(response));
  } catch (error) {
    console.log("Fetch product list failed");
    yield put(productListActions.fetchProductListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(productListActions.setFilter(action.payload));
}

export default function* productListSaga() {
  yield takeLatest(productListActions.fetchProductList.type, fetchProductList)
  yield debounce(
    600,
    productListActions.setFilterWithDebounce.type,
    handleSearchDebounce
  );
}