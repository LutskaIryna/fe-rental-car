import { createListenerMiddleware } from "@reduxjs/toolkit";
import { login, logout } from "../slices/authSlice";
import { authApi } from "../api/auth.api";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  actionCreator: login,
  effect: async (action) => {
    localStorage.setItem("access_token", action.payload.token);
  },
});

authListenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (action, listenerApi) => {
    localStorage.removeItem("access_token");
    listenerApi.dispatch(authApi.util.resetApiState());
  },
});
