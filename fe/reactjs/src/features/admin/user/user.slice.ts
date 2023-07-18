import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../models";
import { ListParams, ListResponse, PaginationParams } from "../../../models/common";
import { RootState } from "../../../app/store";

export interface UserSlice {
    loading: boolean;
    list: User[];
    filter: ListParams;
    pagination: PaginationParams;
}

const initialState: UserSlice = {
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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUserList(state, action: PayloadAction<ListParams>) {
            state.loading = true;
        },
        fetchUserListSuccess(
            state,
            action: PayloadAction<ListResponse<User>>
        ) {
            state.list = action.payload.items;
            state.pagination = action.payload.meta;
            state.loading = false;
        },
        fetchUserListFailed(state) {
            state.loading = false;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setFilterWithDebounce(state, action: PayloadAction<ListParams>) { },
    },
});

//actions
export const userActions = userSlice.actions;

// selector
export const selectUserList = (state: RootState) => state.user.list;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserFilter = (state: RootState) => state.user.filter;
export const selectUserPagination = (state: RootState) =>
    state.user.pagination;

//reducer
const userReducer = userSlice.reducer;
export default userReducer;