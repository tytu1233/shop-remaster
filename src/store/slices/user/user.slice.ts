import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserAuthType } from "./type/auth.type";
import { authenticateUser } from "./thunks/user.thunks";

const initialState: UserAuthType = {
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      authenticateUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        console.log(action.payload);
        const response = action.payload;
        console.log(response.token);
        state.token = response.token;
      }
    );
  },
});

export const { setToken } = userSlice.actions;

export default userSlice;
