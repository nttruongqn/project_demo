import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  ListParams,
  ListResponse,
  PaginationParams,
} from "../../../models/common";
import { Product } from "../../../models";

export interface ProductSlice {
  loading: boolean;
  list: Product[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: ProductSlice = {
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchProductListSuccess(
      state,
      action: PayloadAction<ListResponse<Product>>
    ) {
      state.list = action.payload.items;
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
  },
});

//actions
export const productActions = productSlice.actions;

// selector
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductFilter = (state: RootState) => state.product.filter;
export const selectProductPagination = (state: RootState) =>
  state.product.pagination;

//reducer
const productReducer = productSlice.reducer;
export default productReducer;
