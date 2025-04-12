import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import { api } from "./api/api";
import { authApi } from "./api/auth.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { clearApiCache } from "./middlewares/clearApiCache";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, clearApiCache),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
