import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (token: string) => {
    console.log("fetchUserDetails-token", token);
    const response = await fetch("http://localhost:3001/profile", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(response.headers, data);
    return data;
  }
);

export const getUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (id: number) => {
    const response = await fetch(`http://localhost:3001/${id}`);
    const data = await response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: "",
    flashcards: [],
    stats: [],
    isLoggedIn: false,
    isLoading: false,
    error: undefined,
  },
  reducers: {
    setState: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.flashcards = action.payload.flashcards;
      state.stats = action.payload.stats;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUserDetails.fulfilled, (state, action) => {
      //   state.user = action.payload.user;
      //   state.token, (state.flashcards = action.payload.flashcards);
      //   state.stats = action.payload.stats;
      //   state.isLoggedIn = true;
      //   state.isLoading = false;
      //   state.error = undefined;
      // })
      // .addCase(fetchUserDetails.pending, (state, action) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchUserDetails.rejected, (state, action: any) => {
      //   state.error = action.error.message;
      //   state.isLoading = false;
      // })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token, (state.flashcards = action.payload.flashcards);
        state.stats = action.payload.stats;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getUserDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.rejected, (state, action: any) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { setState } = userSlice.actions;

export default userSlice.reducer;
