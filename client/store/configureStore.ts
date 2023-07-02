import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "@/features/auth/authSilce";
import { authApi } from "@/services/auth/authService";

export type RootState = ReturnType<typeof authReducer>;

export default configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(authApi.middleware),
});
