import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import type { RootState } from "../types/store.type";
import {
  selectAccessToken,
  selectRefreshToken,
  setToken,
  resetAccessToken,
  signOut,
} from "../slices/user/user.slice";
import { AuthResponse } from "./authentication/authApiSlice";

const mutex = new Mutex();

const BASE_URL = "http://localhost:8080/api/v1/";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState() as RootState);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        api.dispatch(resetAccessToken());
        const refreshToken = selectRefreshToken(api.getState() as RootState);
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
          api,
          extraOptions
        );
        if (refreshResult?.data) {
          api.dispatch(setToken(refreshResult?.data as AuthResponse));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(signOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["auth", "products"],
  endpoints: () => ({}),
});
