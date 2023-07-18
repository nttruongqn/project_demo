import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListResponse } from "../../../models/common";
import { transactionActions } from "./transaction.slice";
import { TransactionOrder } from "../../../models/transaction-order.model";
import { transactionApi } from "../../../api/transactionApi";


function* fetchTransactionList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<TransactionOrder> = yield call(transactionApi.getAllPaginate, action.payload)
        yield put(transactionActions.fetchTransactionListSuccess(response))
    } catch (error) {
        console.log("Fetch user list failed");
        yield put(transactionActions.fetchTransactionListFailed())

    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put(transactionActions.setFilter(action.payload));
}


export default function* transactionSaga() {
    yield takeLatest(transactionActions.fetchTransactionList.type, fetchTransactionList)
    yield debounce(
        500,
        transactionActions.setFilterWithDebounce.type,
        handleSearchDebounce
    );
}