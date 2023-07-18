import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { ListParams, ListResponse, PaginationParams } from "../../../models/common";
import { Product } from "../../../models";
import { RootState } from "../../../app/store";

export interface producListSlice {
    loading: boolean;
    list: Product[];
    listForUser: Product[],
    filter: ListParams;
    pagination: PaginationParams;
}

const initialState: producListSlice = {
    loading: false,
    list: [],
    listForUser: [],
    filter: {
        page: 1,
        limit: 5,
    },
    pagination: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 1,
        totalPages: 1,
        currentPage: 1,
    },

}

const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        fetchProductList(state, action: PayloadAction<ListParams>) {
            state.loading = true;
        },
        setListForUser(state) {
            state.list = [];
            state.listForUser = [];
        },
        fetchProductListSuccess(state, action: PayloadAction<ListResponse<Product>>) {
            state.list = action.payload.items;
            state.listForUser = state.listForUser.concat(state.list);
            state.pagination = action.payload.meta;
            state.loading = false;
        },
        fetchProductListFailed(state) {
            state.loading = false;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    }
})

//actions
export const productListActions = productListSlice.actions;

//selector
export const selectProductList = (state: RootState) => state.productList.list;
export const selectProductForUser =  (state: RootState) => state.productList.listForUser;
export const selectProductListLoading = (state: RootState) => state.productList.loading;
export const selectProductListFilter = (state: RootState) => state.productList.filter;
export const selectProductListPagination = (state: RootState) =>
  state.productList.pagination;

//reducer
export const productListReducer = productListSlice.reducer;
export default productListReducer;
