import { all } from "redux-saga/effects";
import authSaga from "../features/admin/auth/auth.saga";
import categorySaga from "../features/admin/category/category.saga";
import productSaga from "../features/admin/product/product.saga";
import userSaga from "../features/admin/user/user.saga";
import transactionSaga from "../features/admin/transaction/transaction.saga";
import productListSaga from "../features/user/productList/productList.saga";

export default function* rootSaga(){
    yield all([authSaga(), categorySaga(), productSaga(), userSaga(), transactionSaga(), productListSaga()])
}