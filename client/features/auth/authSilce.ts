import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "@/features/auth/authActions";
import User from "@/types/User";
import Flashcard from "@/types/Flashcard";
import Stats from "@/types/Stats";
import RegisterRes from "@/types/RegisterRes";

interface AuthState {
  loading: boolean;
  user: User | null;
  flashcards: Flashcard[] | null;
  stats: Stats[] | null;
  token: string | null;
  error: string | null | unknown;
  success: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  flashcards: null,
  stats: null,
  token: null,
  error: null,
  success: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<RegisterRes>) => {
          console.log("payload", payload);
          state.loading = false;
          state.success = true;
          state.user = payload.user;
          state.isLoggedIn = true;
          state.token = payload.access_token;
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
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
