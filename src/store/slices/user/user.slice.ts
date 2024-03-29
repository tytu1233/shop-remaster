import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserAuthType } from "./type/auth.type";
import type { RootState } from "../../types/store.type";
import { AuthResponse } from "../../api/authentication/authApiSlice";

const initialState: UserAuthType = {
  accessToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthResponse>) => {
      const { accessJwtToken, refreshJwtToken } = action.payload;
      state.accessToken = accessJwtToken;
      state.refreshToken = refreshJwtToken;
    },
    resetAccessToken: (state) => {
      state.accessToken = "";
    },
    signOut: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { setToken, signOut, resetAccessToken } = userSlice.actions;

export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectRefreshToken = (state: RootState) => state.user.refreshToken;

export default userSlice;
