import { User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  users: User[] | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("access_token"),
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { login, logout, setUser, setUsers } = authSlice.actions;
export default authSlice.reducer;
