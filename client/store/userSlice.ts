import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: "",
    flashcards: [],
    stats: [],
    isLoggedIn: false,
  },
  reducers: {
    setState: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.flashcards = action.payload.flashcards;
      state.stats = action.payload.stats;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { setState } = userSlice.actions;

export default userSlice.reducer;
