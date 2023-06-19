import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Category } from "../../../models";
import {
  ListParams,
  ListResponse,
  PaginationParams,
} from "../../../models/common";

export interface CategorySlice {
  loading: boolean;
  list: Category[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: CategorySlice = {
  loading: false,
  list: [],
  filter: {
    page: 1,
    limit: 2,
  },
  pagination: {
    totalItems: 1,
    itemCount: 1,
    itemsPerPage: 1,
    totalPages: 1,
    currentPage: 1,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoryAll(state) {
        state.loading = true;
    },
    fetchCategoryList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchCategoryListSuccess(
      state,
      action: PayloadAction<ListResponse<Category>>
    ) {
      state.list = action.payload.items;
      state.pagination = action.payload.meta;
      state.loading = false;
    },
    fetchCategoryListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

//actions
export const categoryActions = categorySlice.actions;

// selector
export const selectCategoryList = (state: RootState) => state.category.list;
export const selectCategoryOptions = createSelector(
  selectCategoryList,
  (categoryList) =>
    categoryList.map((item) => ({
      label: item.name,
      value: item.id,
    }))
);
export const selectCategoryLoading = (state: RootState) =>
  state.category.loading;
export const selectCategoryFilter = (state: RootState) => state.category.filter;
export const selectCategoryPagination = (state: RootState) =>
  state.category.pagination;

//reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
