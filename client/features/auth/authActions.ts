import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RegistrationData from "@/types/RegistrationData";
import User from "@/types/User";
import LoginData from "@/types/LoginData";
import LoginRes from "@/types/LoginRes";
import UpdateScoreData from "@/types/UpdateScoreData";

const backendUrl = "http://localhost:3001";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerUser = createAsyncThunk<User, RegistrationData>(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${backendUrl}/auth/signup`,
        { username, email, password },
        config
      );

      if (res.status === 201 && email && password) {
        const data = await loginReq(email, password);
        console.log("data", data);
        return data;
      }
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
      const response = await axios.post(
        `${backendUrl}/auth/login`,
        { email, password },
        config
      );

      const { data } = response;
      localStorage.setItem("spanishtoken", data.access_token);

      console.log(data);

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

export const updateScore = createAsyncThunk(
  "auth/updateScore",
  async (updateScoreData: UpdateScoreData, { rejectWithValue }) => {
    console.log("updateScoreData", updateScoreData);
    try {
      const { id, score, lessonId, outOf, userId } = updateScoreData;
      const res = await axios.put(
        `${backendUrl}/stats/${id}`,
        { id, score, lessonId, outOf, userId },
        config
      );

      const { data } = res;
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

const loginReq = async (email: string, password: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `${backendUrl}/auth/login`,
    { email, password },
    config
  );

  const { data } = response;
  localStorage.setItem("spanishtoken", data.access_token);
  return data;
};
