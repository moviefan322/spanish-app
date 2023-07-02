import { createSlice } from "@reduxjs/toolkit";
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
}

const initialState: AuthState = {
  loading: false,
  user: null,
  flashcards: null,
  stats: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
