import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "@/features/auth/authSilce";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});
