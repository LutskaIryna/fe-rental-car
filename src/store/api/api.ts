import { API_BASE_URL } from "@/config";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { login, logout } from "../slices/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token; 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await rawBaseQuery({
      url: "/auth/refresh",
      method: "POST",
    }, api, extraOptions);
    if (refreshResult.data) {
      const newToken = (refreshResult.data as any).access_token;

      localStorage.setItem("access_token", newToken);
      api.dispatch(login(newToken));

      const updatedArgs = typeof args === "string" ? { url: args } : { ...args };
      
      const currentHeaders = new Headers(updatedArgs.headers as HeadersInit);
      currentHeaders.set("Authorization", `Bearer ${newToken}`);
      
      updatedArgs.headers = currentHeaders;
      
      result = await rawBaseQuery(updatedArgs, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "Cars", "UserActiveRental"],
  endpoints: () => ({}),
});

export const apiReducer = api.reducer;
export const apiMiddleware = api.middleware;

