import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "@/features/auth/authActions";
import User from "@/types/User";
import AuthState from "@/types/AuthState";

let token;
if (typeof localStorage !== "undefined") {
  token = localStorage.getItem("spanishtoken") ?? null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  flashcards: null,
  stats: null,
  token,
  error: null,
  success: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("spanishtoken");
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.stats = null;
      state.flashcards = null;
      state.isLoggedIn = false;
    },
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.flashcards = payload.flashcards;
      state.stats = payload.stats;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          console.log("payload", payload);
          state.loading = false;
          state.success = true;
          state.user = payload;
          state.isLoggedIn = true;
        }
      )
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.currentUser;
        state.flashcards = payload.flashcards;
        state.stats = payload.stats;
        state.token = payload.access_token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {});
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
