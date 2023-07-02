import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RegistrationData from "@/types/RegistrationData";

const backendUrl = "http://localhost:3001";

export const registerUser = createAsyncThunk<void, RegistrationData>(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    console.log("registerUser action", username, email, password);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendUrl}/auth/signup`,
        { username, email, password },
        config
      );
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
