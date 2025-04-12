import { login, logout, setUser } from "../slices/authSlice";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<any, void>({
      query: () => "/user/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(setUser(data));
        }
      },
    }),

    registerUserWithRole: builder.mutation<any, { email: string; password: string; role: string; accessToken: string }>({
      query: ({ email, password, role }) => ({
        url: "/user/register",
        method: "POST",
        body: { email, password, role },
      })
    }),
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(login({ token: data.access_token }));
        }
      }
    }),
    logoutUser : builder.mutation<any, string>({
      query: (accessToken) => ({      
        url: "/auth/logout",
        method: "POST",
        token: accessToken,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(logout());
        }
      }
    }),
  })
})

export const {
  useGetUserQuery,
  useRegisterUserWithRoleMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;