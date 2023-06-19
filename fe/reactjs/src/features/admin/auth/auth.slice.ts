import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginModel } from "../../../models/auth.model";
import { User } from "../../../models/user.model";
import { RootState } from "../../../app/store";

export interface AuthSlice {
    isLoggedIn: boolean;
    logging?: boolean;
    authLogin: LoginModel;
    currentUser?: User;
}

const initialState: AuthSlice = {
    logging: false,
    isLoggedIn: false,
    authLogin: {
        email: '',
        password: ''
    },
    currentUser: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginModel>) {
            state.logging = true
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.logging = false
            state.currentUser = action.payload
            state.isLoggedIn = true
        },
        loginFailed(state) {
            state.logging = false
        },
        logout() {},
        logoutSuccess(state) {
            console.log('Logout success')
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }
    }
})

export const authActions = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;


const authReducer = authSlice.reducer;
export default authReducer