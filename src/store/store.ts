import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import { api } from "./api/api";
import { authApi } from "./api/auth.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authListenerMiddleware } from "./middlewares/authMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .prepend(authListenerMiddleware.middleware) 
    .concat(authApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
