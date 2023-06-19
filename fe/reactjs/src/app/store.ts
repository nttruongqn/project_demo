import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import rootSaga from './rootSaga';
import authReducer, { AuthSlice } from '../features/admin/auth/auth.slice';
import categoryReducer from '../features/admin/category/category.slice';
import productReducer from '../features/admin/product/product.slice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { Reducer } from 'react';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const profileConfig = {
  ...commonConfig,
  key: 'profile',
  whitelist: ['currentUser', 'isLoggedIn']
}

const persistedReducer = persistReducer<AuthSlice>(profileConfig, authReducer)

const rootReducer = combineReducers({
  auth: persistedReducer,
  category: categoryReducer,
  product: productReducer
});



const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
