import { all } from "redux-saga/effects";
import authSaga from "../features/admin/auth/auth.saga";
import categorySaga from "../features/admin/category/category.saga";
import productSaga from "../features/admin/product/product.saga";

export default function* rootSaga(){
    yield all([authSaga(), categorySaga(), productSaga()])
}