import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  updateScore,
} from "@/features/auth/authActions";
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
  isNewData: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("logging out");
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
    setNewData: (state, { payload }) => {
      state.isNewData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.success = true;
          state.user = payload.currentUser;
          state.flashcards = payload.flashcards;
          state.stats = payload.stats;
          state.token = payload.access_token;
          state.isLoggedIn = true;
        }
      )
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
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
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      .addCase(updateScore.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateScore.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.isNewData = true;
        state.error = null;
      })
      .addCase(updateScore.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
  },
});

export const { logout, setCredentials, setNewData } = authSlice.actions;
export default authSlice.reducer;
