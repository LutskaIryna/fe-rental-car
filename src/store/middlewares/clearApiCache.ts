import { Middleware } from "@reduxjs/toolkit";
import { logout } from "../slices/authSlice";
import { authApi } from "../api/auth.api";

export const clearApiCache: Middleware = (store) => (next) => (action: any) => {
  
  if (action.type === logout.type) {
    store.dispatch(authApi.util.resetApiState());
  }
  return next(action);
};