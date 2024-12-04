import { createSlice } from "@reduxjs/toolkit";
import { googleLoginAsync } from "../http/authRoutes";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    access_token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLoginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLoginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(googleLoginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Google login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
