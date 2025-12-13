import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPlansApi,
  createPlanApi,
  updatePlanApi,
  deletePlanApi,
  changePlanStatusApi,
} from "../api/subscriptionApi";

/* ================= FETCH ================= */

export const fetchPlans = createAsyncThunk(
  "subscription/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllPlansApi();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

/* ================= CREATE ================= */

export const createPlan = createAsyncThunk(
  "subscription/createPlan",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createPlanApi(payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

/* ================= UPDATE ================= */

export const updatePlan = createAsyncThunk(
  "subscription/updatePlan",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await updatePlanApi(id, payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

/* ================= DELETE ================= */

export const deletePlan = createAsyncThunk(
  "subscription/deletePlan",
  async (id, { rejectWithValue }) => {
    try {
      await deletePlanApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

/* ================= CHANGE STATUS ================= */

export const changePlanStatus = createAsyncThunk(
  "subscription/changePlanStatus",
  async (id, { rejectWithValue }) => {
    try {
      await changePlanStatusApi(id);
      return id; // backend toggles, frontend flips
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Status change failed"
      );
    }
  }
);

/* ================= SLICE ================= */

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

      /* FETCH */
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })

      /* UPDATE */
      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.plans[index] = action.payload;
      })

      /* DELETE */
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(
          (p) => p.id !== action.payload
        );
      })

      /* CHANGE STATUS ✅ */
      .addCase(changePlanStatus.fulfilled, (state, action) => {
        const plan = state.plans.find(
          (p) => p.id === action.payload
        );
        if (plan) {
          plan.isActive = !plan.isActive;
        }
      });
  },
});

export default subscriptionSlice.reducer;
