import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/user.slice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
