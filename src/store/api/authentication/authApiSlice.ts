import { apiSlice } from "../apiSlice";

export interface AuthResponse {
  accessJwtToken: string;
  refreshJwtToken: string;
}

type UserRequest = {
  email: string;
  password: string;
};

type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials: UserRequest) => ({
        url: "/auth/authenticate",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: AuthResponse) => response,
      invalidatesTags: ["auth"],
    }),
    registerUser: builder.mutation<null, IUser>({
      query: ({ ...patch }) => ({
        url: "/auth/register",
        method: "POST",
        body: patch,
      }),
    }),
    test: builder.query({
      query: () => "/test",
    }),
  }),
});

export const { useSignInMutation, useRegisterUserMutation, useTestQuery } =
  authApiSlice;
