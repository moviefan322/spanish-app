import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: "",
    flashcards: [],
    stats: [],
  },
  reducers: {
    setState: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.flashcards = action.payload.flashcards;
      state.stats = action.payload.stats;
    },
  },
});

export const { setState } = userSlice.actions;

export default userSlice.reducer;
