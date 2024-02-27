import { apiSlice } from "../apiSlice";

export interface AuthResponse {
  accessJwtToken: string;
  refreshJwtToken: string;
}

type UserRequest = {
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
    test: builder.query({
      query: () => "/demo",
    }),
  }),
});

export const { useSignInMutation, useTestQuery } = authApiSlice;
