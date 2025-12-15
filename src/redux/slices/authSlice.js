import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../api/authApi";
import { clearAuthToken, setAuthToken } from "../authToken";

/* ===================== LOGIN ===================== */

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("🔵 [AUTH THUNK] Login started");
      const res = await loginApi(email, password);
      return res;
    } catch (err) {
      console.error("🔴 [AUTH THUNK] Login error:", err.response?.data || err);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

/* ===================== FORGOT PASSWORD ===================== */

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await forgotPasswordApi(email);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send reset link"
      );
    }
  }
);

/* ===================== RESET PASSWORD ===================== */

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await resetPasswordApi(token, newPassword);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password reset failed"
      );
    }
  }
);

/* ===================== SLICE ===================== */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,   // 🔴 IN MEMORY
    user: null,
    loading: false,
    error: null,
    message: null,      // 🔴 ADDED (forgot/reset feedback)
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      clearAuthToken();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- LOGIN ---------- */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.data.accessToken;
        setAuthToken(action.payload.data.accessToken);

        console.log("token stored " + state.accessToken);

        state.user = { email: action.meta.arg.email };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FORGOT PASSWORD ---------- */
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- RESET PASSWORD ---------- */
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
