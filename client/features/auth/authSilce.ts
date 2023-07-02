import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser } from "@/features/auth/authActions";
import User from "@/types/User";
import Flashcard from "@/types/Flashcard";
import Stats from "@/types/Stats";

interface AuthState {
  loading: boolean;
  user: User | null;
  flashcards: Flashcard[] | null;
  stats: Stats[] | null;
  userToken: string | null;
  error: string | null | unknown;
  success: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  flashcards: null,
  stats: null,
  userToken: null,
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
      });
  },
});

export default authSlice.reducer;