import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/user.slice";
import { apiSlice } from "./api/apiSlice";
import searchSlice from "./slices/search/search.slice";
import cartSlice from "./slices/cart/cart.slice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart"],
};

const rootReducers = combineReducers({
  user: userSlice.reducer,
  search: searchSlice.reducer,
  cart: cartSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});
