import { RootState } from "../store";

export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectUserRole = (state: RootState) => state.auth.user?.role;
export const selectUser = (state: RootState) => state.auth.user;