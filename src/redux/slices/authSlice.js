import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/authApi";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("🔵 [AUTH THUNK] Login started");
      const res = await loginApi(email, password);
      return res; // backend sends { statusCode, message, accessToken?, refreshToken? }
    } catch (err) {
      console.error("🔴 [AUTH THUNK] Login error:", err.response?.data || err);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // optional
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = { email: action.meta.arg.email }; 
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
