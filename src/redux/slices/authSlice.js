import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/authApi";
import { clearAuthToken, setAuthToken } from "../authToken";

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
    accessToken: null,   // 🔴 IN MEMORY
    user: null,
    loading: false,
    error: null,
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
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.data.accessToken; // 🔴 STORE IN MEMORY
        setAuthToken(action.payload.data.accessToken);
        console.log("token stored "+state.accessToken);
        
        state.user = { email: action.meta.arg.email };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;

