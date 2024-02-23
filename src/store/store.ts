import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/user.slice";

export const store = configureStore({
  reducer: {
    auth: userSlice.reducer,
  },
});
