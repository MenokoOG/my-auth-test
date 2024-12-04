import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Login API call
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );
      return response.data; // Expect { user, access_token }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Signup API call
export const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        credentials
      );
      return response.data; // Expect { user, access_token }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Google Login API call
export const googleLoginAsync = createAsyncThunk(
  "auth/googleLoginAsync",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/google/callback",
        {
          withCredentials: true,
        }
      );
      return response.data; // Expect { user, access_token }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Google login failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
