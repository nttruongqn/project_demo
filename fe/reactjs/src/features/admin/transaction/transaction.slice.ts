import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListParams, ListResponse, PaginationParams } from "../../../models/common";
import { TransactionOrder } from "../../../models/transaction-order.model";
import { RootState } from "../../../app/store";

export interface TransactionSlice {
    loading: boolean;
    list: TransactionOrder[];
    filter: ListParams;
    pagination: PaginationParams;
}

const initialState: TransactionSlice = {
    loading: false,
    list: [],
    filter: {
        page: 1,
        limit: 4,
    },
    pagination: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 1,
        totalPages: 1,
        currentPage: 1,
    },
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        fetchTransactionList(state, action: PayloadAction<ListParams>){
            state.loading = true;
        },
        fetchTransactionListSuccess(state, action: PayloadAction<ListResponse<TransactionOrder>>) {
            state.list = action.payload.items;
            state.pagination = action.payload.meta;
            state.loading = false;
        },
        fetchTransactionListFailed(state) {
            state.loading = false;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setFilterWithDebounce(state, action: PayloadAction<ListParams>) { },
    }
})

//actions
export const transactionActions = transactionSlice.actions;

// selector
export const selectTransactionList = (state: RootState) => state.transaction.list;
export const selectTransactionLoading = (state: RootState) => state.transaction.loading;
export const selectTransactionFilter = (state: RootState) => state.transaction.filter;
export const selectTransactionPagination = (state: RootState) =>
    state.transaction.pagination;


//reducer
const transactionReducer = transactionSlice.reducer;
export default transactionReducer;