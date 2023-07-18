import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest, debounce } from "redux-saga/effects";
import { ListParams, ListResponse } from "../../../models/common";
import { Product } from "../../../models/product.model";
import { productActions } from "./product.slice";
import { productApi } from "../../../api/productApi";


function* fetchProductList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Product> = yield call(
      productApi.getAllPaginate,
      action.payload
    );
    yield put(productActions.fetchProductListSuccess(response));
  } catch (error) {
    console.log("Fetch product list failed");
    yield put(productActions.fetchProductListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(productActions.setFilter(action.payload));
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProductList.type, fetchProductList);
  yield debounce(
    500,
    productActions.setFilterWithDebounce.type,
    handleSearchDebounce
  );
}
