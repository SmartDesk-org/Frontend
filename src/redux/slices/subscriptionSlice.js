import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPlansApi } from "../api/subscriptionApi";

export const fetchPlans = createAsyncThunk(
  "subscription/fetchPlans",
  async (_, { rejectWithValue }) => {
    console.log("🔵 [THUNK] fetchPlans triggered");

    try {
      const res = await getAllPlansApi();

      console.log("🟢 [THUNK SUCCESS] Plans received:", res.data?.data);
      return res.data.data;
    } catch (err) {
      console.log("🔴 [THUNK ERROR] fetchPlans failed:", err.response?.data || err);
      return rejectWithValue(err.response?.data || "Failed to load");
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    plans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        console.log("🔵 [SLICE] fetchPlans.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        console.log("🟢 [SLICE] fetchPlans.fulfilled");
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        console.log("🔴 [SLICE] fetchPlans.rejected", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;
