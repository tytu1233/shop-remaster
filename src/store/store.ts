import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/user.slice";
import { apiSlice } from "./api/apiSlice";
import searchSlice from "./slices/search/search.slice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search: searchSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
