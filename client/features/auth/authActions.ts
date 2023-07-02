import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RegistrationData from "@/types/RegistrationData";
import RegisterRes from "@/types/RegisterRes";
import LoginData from "@/types/LoginData";
import LoginRes from "@/types/LoginRes";

const backendUrl = "http://localhost:3001";

export const registerUser = createAsyncThunk<RegisterRes, RegistrationData>(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    console.log("registerUser action", username, email, password);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/auth/signup`,
        { username, email, password },
        config
      );

      console.log("data", data);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk<LoginRes, LoginData>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "auth/login",
        { email, password },
        config
      );

      const { data } = response;
      localStorage.setItem("spanishtoken", data.access_token);

      return data; // Return the data property directly
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
